# Motion and responsive layout audit

## Evidence captured

- At 1024px, the rendered documentation shell occupies only a narrow left portion of the viewport, leaving a large unintentional empty canvas to the right. The sidebar is visually present but does not behave like an independently scrollable navigation rail.
- At 390px, the homepage opens with the mobile header and documentation content, but the background reads as a flat dark surface. No clearly visible grid lines, aurora field, cursor response, route transition, or particle trail can be confirmed from the rendered state.
- The guide route is readable and the content cards are present, but the responsive shell does not expose a strong visual motion signature. The current result should not be described as visibly Framer-like until the grid and layered lighting are observable in screenshots and interaction checks.
- The current CSS/JS likely contains motion tokens and a motion layer, but the implementation is visually over-subtle or hidden behind stacking/opacity/positioning. The next implementation must verify actual paint order, z-index, opacity, fixed positioning, and mobile drawer overflow rather than only changing tokens.

## Required corrections

1. Make the sidebar shell `height: calc(100dvh - header-height)` (with a fallback), set `min-height: 0`, and apply `overflow-y: auto` to the actual navigation column/drawer.
2. Make mobile and tablet drawers independently scrollable while the document body remains usable; preserve a visible close/scrim interaction.
3. Add a visible but restrained grid/aurora stack above the page background and below content, using explicit opacity and z-index verification.
4. Add a low-cost pointer-responsive glow only where pointer input exists, with reduced-motion and touch-safe fallbacks.
5. Re-capture 1024px, 768px, and 390px screenshots after implementation and test drawer scrolling/open-close behavior.

## Post-fix verification — 2026-08-14

At 1024px, the grid is visibly rendered across the docs canvas and the cyan/blue ambient glow is visible behind the page content. The docs shell remains readable, with opaque-enough cards and a transparent canvas. The sidebar footer no longer overlays the visible navigation items after moving scrolling to `.kb-sidebar__nav`.

At 390px, the grid is clearly visible behind both the knowledge-base index and guide article. The mobile content remains readable, with the background kept subordinate to typography and cards. The mobile drawer still needs an interaction-level check with the menu open to confirm the internal nav region scrolls when its list exceeds the viewport.

## Live browser measurement — 2026-08-14

The live preview at the desktop browser viewport reports `.kb-sidebar__nav` with `overflow-y: auto`, `clientHeight: 730`, and `scrollHeight: 913`, confirming a real independent scroll region rather than a visual-only rule. The sidebar itself is `overflow-y: hidden`, preventing footer overlap. The live `.kb-framer-grid` reports `z-index: 1`, an active cyan grid background image, and animated opacity around `0.54`; `.kb-aurora` reports `opacity: 1` and `z-index: 0`.

The pointer interaction test on the live preview confirms the page still paints the grid and ambient field after pointer movement. The browser screenshot is static, so the transient particle emission cannot be judged from a still image; the live CSS/JS path is present and the pointer listener runs only for mouse/pen input. Mobile drawer scrolling still requires a mobile-context interaction test rather than relying on the closed-drawer screenshot.

## Final screenshot evidence — 2026-08-14

The 1024px capture shows the grid spanning the full reading canvas with a visible cyan atmospheric field, while the left rail retains a fixed header/footer and a bounded navigation area. The guide route remains readable with the right-side guide map.

The 768px capture correctly switches to the compact header and drawer-based navigation. The grid is visibly painted across the homepage and guide, with the atmospheric field visible but subordinate to text. The Playwright harness confirms the open drawer exposes an `overflow-y: auto` navigation region and a visible scrim, then closes through the outside edge.

## Supplied resource review

The supplied Skiper UI page presents its interaction language as component-level motion: image reveal, hover members, drag/scroll behavior, Vercel-style tooltips, and an image cursor trail. For Brick Docs, the applicable pattern is restrained component feedback rather than promotional animation: active navigation elevation, a pointer-following spotlight, and a drawer transition.

The supplied Shader Gradient page was inspected for ambient-gradient direction. Brick Docs adapts the relevant principle as layered, low-opacity radial fields behind the reading canvas, not as a saturated full-screen shader. The implementation remains CSS/React-owned and does not claim to have imported or copied proprietary external components.

Resource URLs reviewed:
- https://skiper-ui.com/ — component motion patterns including hover members, drag/scroll, Vercel tooltip, and image cursor trail.
- https://shadergradient.co/ — layered ambient gradient direction adapted as low-opacity radial fields behind the docs canvas.
