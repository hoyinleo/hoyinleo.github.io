import { expect, test } from "@playwright/test";
import { DESTINATIONS } from "../destinations.js";

const storageKey = "potato-private-journey:v1";
const destinations = [
  { key: "khh", city: "高雄 (Kaohsiung)", code: "KHH" },
  { key: "taipei", city: "台北 (Taipei)", code: "TPE" },
  { key: "bangkok", city: "曼谷 (Bangkok)", code: "BKK" },
  { key: "seoul", city: "首爾 (Seoul)", code: "ICN" },
];

async function expectNoOverflow(page) {
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
}

test("landing layout fits mobile and desktop with a loaded departure photo", async ({ page }) => {
  for (const viewport of [
    { width: 320, height: 568 },
    { width: 375, height: 667 },
    { width: 430, height: 932 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await expect(page.locator(".invitation__photo")).toHaveJSProperty("complete", true);
    expect(await page.locator(".invitation__photo").evaluate((photo) => photo.naturalWidth)).toBeGreaterThan(0);
    await expectNoOverflow(page);
    const layout = await page.locator(".invitation").evaluate((invitation) => {
      const selectors = [".checkin-header", ".invitation__photo", ".invitation__content", ".invitation__footer"];
      const sections = selectors.map((selector) => invitation.querySelector(selector).getBoundingClientRect());
      return {
        ordered: sections.every((section, index) => index === 0 || section.top >= sections[index - 1].bottom - 1),
        textFits: [...invitation.querySelectorAll("h1, p, button")].every((element) => element.scrollWidth <= element.clientWidth),
      };
    });
    expect(layout.ordered).toBe(true);
    expect(layout.textFits).toBe(true);
    await page.screenshot({ path: `test-results/landing-${viewport.width}.png`, fullPage: true });
  }
});

test("reveals once and restores the locked destination", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(page.locator("#invitation-title")).toBeVisible();
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
  await expect(page.locator(".day-plan--stay")).toBeVisible();
  await expect(page.locator(".itinerary-flight--departure")).toHaveAttribute("aria-label", "去程航班");
  await expect(page.locator(".itinerary-flight--return")).toHaveAttribute("aria-label", "回程航班");
  const itineraryOrder = await page.locator("#plan-days").locator(":scope > *").evaluateAll((items) =>
    items.map((item) => item.className),
  );
  expect(itineraryOrder[0]).toContain("itinerary-flight--departure");
  expect(itineraryOrder.at(-1)).toContain("itinerary-flight--return");
  await expect(page.getByRole("link", { name: "在地圖開啟第 1 天路線 ↗" })).toHaveAttribute("href", /^https:\/\/www\.google\.com\/maps\/dir\//);
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
    await expect(page.locator(".detail-card--flight")).toHaveCount(2);
    await expect(page.locator(".detail-card--flight").nth(0).locator(".pass__label")).toHaveText("出發");
    await expect(page.locator(".detail-card--flight").nth(1).locator(".pass__label")).toHaveText("回程");
    await expect(page.locator(".pass__note")).toBeVisible();
    await expect(page.locator("#plan-button")).toBeVisible();
    await expectNoOverflow(page);
    await page.locator(".actions").evaluate((element) =>
      Promise.all(element.getAnimations().map((animation) => animation.finished)),
    );
    await page.getByRole("button", { name: "查看我們的城市行程" }).click();
    await expect(page.locator(".day-plan")).toHaveCount(3);
    await expect(page.locator(".meal-plan")).toHaveCount(2);
    const selectedDestination = DESTINATIONS.find(({ key }) => key === destination.key);
    await expect(page.locator("#plan-description")).toHaveText(selectedDestination.planIntro);
    for (const [index, day] of selectedDestination.days.entries()) {
      await expect(page.locator(".day-plan:not(.day-plan--stay)").nth(index).locator("h3")).toHaveText(day.title);
    }
    await page.locator("#city-plan").evaluate((element) =>
      Promise.all(element.getAnimations().map((animation) => animation.finished)),
    );
    await page.screenshot({ path: `test-results/${destination.key}.png`, fullPage: true });
  });
}