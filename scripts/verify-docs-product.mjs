import { chromium } from "playwright";

const baseUrl = process.env.BRICKDOCS_URL ?? "http://127.0.0.1:3000";
const browser = await chromium.launch({ headless: true });

async function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function assertNoHorizontalOverflow(page, label) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  await assert(!overflow, `${label} has horizontal viewport overflow`);
}

try {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 960 } });
  await desktop.goto(`${baseUrl}/docs/shared`, { waitUntil: "networkidle" });
  await desktop.waitForSelector("#main-content");
  await assertNoHorizontalOverflow(desktop, "Shared desktop homepage");

  const themeButton = desktop.getByRole("button", { name: /use dark theme|use light theme/i });
  const beforeTheme = await desktop.locator("html").getAttribute("data-theme");
  await themeButton.click();
  await desktop.waitForFunction((previous) => document.documentElement.dataset.theme !== previous, beforeTheme);
  const afterTheme = await desktop.locator("html").getAttribute("data-theme");
  await assert(afterTheme === "light" || afterTheme === "dark", "Theme toggle did not set a valid theme");
  await desktop.reload({ waitUntil: "networkidle" });
  await assert((await desktop.locator("html").getAttribute("data-theme")) === afterTheme, "Theme preference did not persist after reload");

  await desktop.getByRole("button", { name: "Dedicated" }).first().click();
  await desktop.waitForURL(/\/docs\/dedicated$/);
  await assert((await desktop.locator("body").innerText()).includes("Dedicated"), "Dedicated content did not render after switching editions");
  await desktop.getByRole("button", { name: "Shared" }).first().click();
  await desktop.waitForURL(/\/docs\/shared$/);

  const askBrick = desktop.getByRole("button", { name: "Open Ask Brick Docs" });
  await askBrick.click();
  const assistant = desktop.getByRole("dialog", { name: "Brick documentation assistant" });
  await assistant.waitFor();
  await assert((await assistant.innerText()).includes("Shared Hosting source boundary"), "Ask AI did not declare the active Shared source boundary");
  await assert((await assistant.innerText()).includes("How do I change my PHP version?"), "Ask AI did not use Shared-safe starting prompts");
  const assistantInput = assistant.getByRole("textbox", { name: "Ask Brick Docs a question" });
  await desktop.waitForFunction(() => document.activeElement?.getAttribute("aria-label") === "Ask Brick Docs a question");
  await assert(await assistantInput.evaluate((element) => element === document.activeElement), "Ask AI did not focus its input when opened");
  await assistant.getByRole("button", { name: "Close documentation assistant" }).click();
  await assert(await desktop.getByRole("dialog", { name: "Brick documentation assistant" }).count() === 0, "Ask AI close control did not dismiss the assistant");

  await desktop.getByRole("button", { name: "Dedicated" }).first().click();
  await desktop.waitForURL(/\/docs\/dedicated$/);
  await askBrick.click();
  const dedicatedAssistant = desktop.getByRole("dialog", { name: "Brick documentation assistant" });
  await assert((await dedicatedAssistant.innerText()).includes("Dedicated source boundary"), "Ask AI did not declare the active Dedicated source boundary");
  await assert((await dedicatedAssistant.innerText()).includes("How do I deploy an app?"), "Ask AI did not use Dedicated starting prompts");
  await dedicatedAssistant.getByRole("button", { name: "Close documentation assistant" }).click();
  await desktop.getByRole("button", { name: "Shared" }).first().click();
  await desktop.waitForURL(/\/docs\/shared$/);

  await desktop.keyboard.press(process.platform === "darwin" ? "Meta+K" : "Control+K");
  await desktop.getByRole("dialog", { name: "Search Brick documentation" }).waitFor();
  const searchInput = desktop.getByRole("textbox", { name: "Search documentation" });
  await searchInput.fill("SSL");
  await desktop.keyboard.press("ArrowDown");
  await assert(await desktop.getByRole("option", { selected: true }).count() === 1, "Search keyboard navigation did not select a result");
  await desktop.keyboard.press("ArrowUp");
  await desktop.keyboard.press("Enter");
  await desktop.waitForURL(/\/docs\/shared\/ssl-tls$/);
  await desktop.getByRole("heading", { name: /SSL/i }).first().waitFor();
  await assertNoHorizontalOverflow(desktop, "Shared guide desktop page");

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await mobile.goto(`${baseUrl}/docs/shared`, { waitUntil: "networkidle" });
  const menuButton = mobile.getByRole("button", { name: "Open documentation navigation" });
  await menuButton.click();
  const drawer = mobile.locator("#docs-sidebar");
  await assert(await drawer.isVisible(), "Mobile documentation drawer did not open");
  await assert((await drawer.getAttribute("aria-modal")) === "true", "Mobile documentation drawer is missing modal semantics");
  await assert(await drawer.getByRole("button", { name: "Close navigation menu" }).evaluate((element) => element === document.activeElement), "Drawer did not move initial keyboard focus to its close control");

  await mobile.keyboard.press("Escape");
  await assert(!(await drawer.getAttribute("aria-modal")), "Escape did not dismiss the mobile documentation drawer");
  await mobile.waitForFunction(() => document.activeElement?.getAttribute("aria-label") === "Open documentation navigation");
  await assert(await menuButton.evaluate((element) => element === document.activeElement), "Drawer did not restore focus to the navigation trigger after Escape");

  await menuButton.click();
  await drawer.getByRole("button", { name: "Close navigation menu" }).waitFor();
  await mobile.locator(".docs-nav-scrim").click({ position: { x: 380, y: 300 } });
  await assert(!(await drawer.getAttribute("aria-modal")), "Scrim click did not dismiss the mobile documentation drawer");
  await mobile.waitForFunction(() => document.activeElement?.getAttribute("aria-label") === "Open documentation navigation");
  await assert(await menuButton.evaluate((element) => element === document.activeElement), "Drawer did not restore focus to the navigation trigger after scrim dismissal");
  await assertNoHorizontalOverflow(mobile, "Shared mobile homepage");
  await mobile.close();
  await desktop.close();
  console.log("BrickDocs product interaction verification passed.");
} finally {
  await browser.close();
}
