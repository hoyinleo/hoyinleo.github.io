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

  await expect(page.locator("#plan-button")).toHaveCount(0);
  await expect(page.locator("#city-plan")).toHaveCount(0);
});

for (const destination of destinations) {
  test(`${destination.city} destination fits a large iPhone`, async ({ page }) => {
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
    await expect(page.locator("#plan-button")).toHaveCount(0);
    await expectNoOverflow(page);
    await page.screenshot({ path: `test-results/${destination.key}.png`, fullPage: true });
  });
}