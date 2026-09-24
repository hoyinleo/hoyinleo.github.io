import { expect, test } from "@playwright/test";

const storageKey = "potato-private-journey:v1";
const destinations = [
  { key: "seoul", city: "首爾", code: "ICN" },
  { key: "taichung", city: "台中", code: "RMQ" },
  { key: "bangkok", city: "曼谷", code: "BKK" },
];

async function expectNoOverflow(page) {
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
}

test("reveals once and restores the locked destination", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /Potato，\s*準備好出發了嗎/ })).toBeVisible();
  await page.screenshot({ path: "test-results/invitation.png", fullPage: true });
  await page.getByRole("button", { name: "開始辦理登機" }).click();
  await expect(page.locator(".reveal")).toBeVisible();

  const selectedCity = await page.locator("#destination-city").textContent();
  await page.reload();
  await expect(page.locator("#destination-city")).toHaveText(selectedCity);
  await expect(page.locator(".reveal")).toBeVisible();
  await expectNoOverflow(page);

  await page.getByRole("button", { name: "查看我們的城市行程" }).click();
  await expect(page.getByRole("heading", { name: /慢慢走就好/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "在地圖開啟第 1 天路線 ↗" })).toHaveAttribute("href", /^https:\/\/www\.google\.com\/maps\/dir\/\?/);
});

for (const destination of destinations) {
  test(`${destination.city} pass fits a large iPhone`, async ({ page }) => {
    await page.setViewportSize({ width: 430, height: 932 });
    await page.addInitScript(({ key, value }) => {
      localStorage.setItem(key, value);
    }, {
      key: storageKey,
      value: JSON.stringify({ version: 1, destination: destination.key }),
    });
    await page.goto("/");

    await expect(page.locator("#destination-city")).toHaveText(destination.city);
    await expect(page.locator("#pass-code")).toHaveText(destination.code);
    await expect(page.getByText("週末小旅行 · 航班詳情稍後公布")).toBeVisible();
    await expect(page.getByRole("button", { name: "查看我們的城市行程" })).toBeVisible();
    await expectNoOverflow(page);
    await page.locator(".actions").evaluate((element) =>
      Promise.all(element.getAnimations().map((animation) => animation.finished)),
    );
    await page.getByRole("button", { name: "查看我們的城市行程" }).click();
    await expect(page.locator(".day-plan")).toHaveCount(2);
    await page.locator("#city-plan").evaluate((element) =>
      Promise.all(element.getAnimations().map((animation) => animation.finished)),
    );
    await page.screenshot({ path: `test-results/${destination.key}.png`, fullPage: true });
  });
}