import { chromium } from "playwright";

const baseUrl = process.env.BRICK_DOCS_URL ?? "http://127.0.0.1:3000/";
const viewports = [
  { name: "desktop", width: 1024, height: 720 },
  { name: "tablet", width: 768, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const browser = await chromium.launch({ headless: true });
const results = [];

try {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await page.locator(".kb-sidebar").waitFor();

    const before = await page.evaluate(() => {
      const nav = document.querySelector(".kb-sidebar__nav");
      const sidebar = document.querySelector(".kb-sidebar");
      const grid = document.querySelector(".kb-framer-grid");
      const aurora = document.querySelector(".kb-aurora");
      const css = (element) => element ? getComputedStyle(element) : null;
      return {
        nav: nav && { clientHeight: nav.clientHeight, scrollHeight: nav.scrollHeight, overflowY: css(nav).overflowY },
        sidebar: sidebar && { clientHeight: sidebar.clientHeight, overflowY: css(sidebar).overflowY },
        grid: grid && { opacity: Number.parseFloat(css(grid).opacity), backgroundImage: css(grid).backgroundImage },
        aurora: aurora && { opacity: Number.parseFloat(css(aurora).opacity) },
      };
    });

    if (!before.nav || before.nav.overflowY !== "auto") {
      throw new Error(`${viewport.name}: navigation does not expose an independent vertical scroll region (${JSON.stringify(before.nav)})`);
    }
    if (!before.grid || before.grid.opacity <= 0 || before.grid.backgroundImage === "none") {
      throw new Error(`${viewport.name}: grid layer is not visibly painted (${JSON.stringify(before.grid)})`);
    }
    if (!before.aurora || before.aurora.opacity <= 0) {
      throw new Error(`${viewport.name}: aurora layer is not painted (${JSON.stringify(before.aurora)})`);
    }

    if (viewport.width <= 900) {
      const toggle = page.locator("header button[aria-label='Open menu']");
      await toggle.click();
      await page.locator(".kb-sidebar.kb-sidebar--open").waitFor();
      const openState = await page.evaluate(() => {
        const nav = document.querySelector(".kb-sidebar.kb-sidebar--open .kb-sidebar__nav");
        const scrim = document.querySelector(".kb-sidebar-scrim");
        return {
          nav: nav && { clientHeight: nav.clientHeight, scrollHeight: nav.scrollHeight, overflowY: getComputedStyle(nav).overflowY },
          scrimVisible: !!scrim && getComputedStyle(scrim).display !== "none",
        };
      });
      if (!openState.nav || openState.nav.overflowY !== "auto") {
        throw new Error(`${viewport.name}: open drawer navigation does not expose an independent vertical scroll region (${JSON.stringify(openState)})`);
      }
      if (!openState.scrimVisible) {
        throw new Error(`${viewport.name}: drawer scrim is not visible`);
      }
      await page.locator(".kb-sidebar-scrim").click({ position: { x: viewport.width - 8, y: 8 } });
      await page.locator(".kb-sidebar:not(.kb-sidebar--open)").waitFor();
    }

    results.push({ viewport: viewport.name, before });
    await page.close();
  }
} finally {
  await browser.close();
}

console.log(JSON.stringify({ ok: true, baseUrl, results }, null, 2));
