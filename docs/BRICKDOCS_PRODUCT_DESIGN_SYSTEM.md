# BrickDocs Product Design System

> **Purpose:** This document is the implementation baseline for BrickDocs. It governs the public documentation product, not the Brick Hosting Panel itself. The standard is a calm, reliable documentation interface where finding and understanding an answer takes priority over decoration.

## 1. Product Boundary

BrickDocs serves two separately navigable products:

| Edition | Audience | Content boundary | URL root |
| --- | --- | --- | --- |
| **Shared** | Shared-hosting users and operators | Brick Web UI workflows, tenant-safe operations, managed service guidance | `/docs/shared` |
| **Dedicated** | Dedicated-instance operators | Dedicated Web UI workflows, deployment operations exposed by the product, managed recovery guidance | `/docs/dedicated` |

The edition switcher is a **real navigation control**, not a visual filter. It must update the route, browser history, page metadata, navigation tree, search corpus, previous/next links, related guides, and edition label. If the current guide is unavailable in the target edition, the switcher must navigate to that edition’s first safe entry point.

### Shared public-documentation safety contract

The Shared edition describes the **Web UI** and managed user workflows only. It must not disclose host credentials, shell access, private repository paths, source maps, binary locations, privileged commands, root workflows, or internal implementation details. Private developer content belongs outside the published guide dataset.

## 2. Layout Contract

### Desktop and wide tablet

The documentation workspace uses a stable three-zone model:

1. **Header**: compact, persistent orientation layer; contains brand, edition switcher, search, and theme control.
2. **Sidebar**: independently scrollable topic tree; shows hierarchy and active location without competing with the article.
3. **Reader**: editorial main column with a companion on-page navigation rail when there are enough headings.

The reader remains the visual priority. The sidebar should communicate place, not act as a second homepage. The right rail should assist long-form reading, not create a dense control wall.

### Mobile

Mobile is an intentionally different interaction model:

- Navigation opens as a full-height dialog/drawer with a close control, visible focus, and body-scroll locking.
- Search opens as a dedicated, keyboard-operable overlay.
- Page-level navigation appears inline after the article rather than as a compressed right rail.
- Long code and tables scroll in their own region; they must never create viewport-wide horizontal overflow.

## 3. Navigation and Relationships

Every published article is required to have the following metadata:

- `slug`, `title`, `summary`, `group`, and `edition` availability;
- ordered group position for sidebar order and predictable previous/next links;
- a truthful route title and breadcrumb label;
- headings used to generate in-page navigation and deep-link anchors;
- related guide links based on actual workflow adjacency, not fabricated popularity.

The UI must surface the same model consistently in the sidebar, breadcrumbs, homepage workflow cards, search results, related guides, and previous/next navigation.

## 4. Visual Language

BrickDocs is a technical documentation product with a restrained Brick identity:

- **Tone:** precise, composed, operational, and candid.
- **Surfaces:** semantic background, raised panel, border, and muted layers—not arbitrary per-component colors.
- **Accent:** cyan/blue used for navigation, focus, selection, and primary action. It is never a substitute for hierarchy.
- **Typography:** readable system UI face for prose; monospaced face reserved for technical terms, labels, code, and commands.
- **Spacing:** consistent modular rhythm; avoid large empty marketing bands inside guide pages.
- **Motion:** orienting and confirmatory only. Animations must never delay navigation, search, reading, or copying.

### Explicit exclusions

Do not add decorative dashboards, popularity counters, fake statistics, generic feature grids, testimonials, customer reviews, auto-playing effects, large gradients behind body text, opaque glass panels, or visual experiments that reduce contrast and reading comfort.

## 5. Theme Contract

The theme provider has one source of truth and must:

1. Apply the selected theme class to the document root before/at initial render.
2. Persist the user’s selected light/dark preference.
3. Update semantic CSS variables for every surface and component.
4. Keep text, borders, code blocks, focus rings, and controls within accessible contrast.
5. Avoid stale nested component values when the theme changes.

The visible theme control requires an accessible label that states the action, not only the current icon.

## 6. Search Contract

Search is primary navigation, available from all product surfaces:

- Open with `Meta+K` or `Ctrl+K`; close with `Escape`.
- Autofocus the input and preserve focus safely on close.
- Search only the selected edition’s published guides.
- Support Arrow Up/Down selection and Enter navigation.
- Show section, title, and excerpt for results; show a genuine empty state for no matches.
- Never fabricate popularity, relevance scores, or recently viewed content.

## 7. Accessibility and Resilience

BrickDocs must preserve these guarantees:

- Semantic landmarks and ordered headings.
- Keyboard access to all navigation, search, theme, edition, copy-link, drawer, and dialog controls.
- Visible `:focus-visible` treatment in both themes.
- `prefers-reduced-motion` disables non-essential motion and pointer tracking.
- Mobile body scroll is locked while the drawer is open and restored on close/unmount.
- Long headings, code, links, and tables do not overflow their container.
- Empty, unavailable, and 404 states remain inside the recognizable documentation shell and supply recovery actions.

## 8. Verification Standard

No BrickDocs change is ready merely because it compiles. It must meet the following verification ladder:

| Layer | Required evidence |
| --- | --- |
| Content model | Unit tests cover edition visibility, route helpers, search, and article relationships. |
| Build | `pnpm run build` completes without TypeScript or bundling errors. |
| Interaction | `node scripts/verify-docs-product.mjs` checks theme, edition routing, keyboard search, and mobile drawer behavior. |
| Visual | Screenshots are reviewed at desktop, tablet, and 390px mobile for hierarchy, contrast, overflow, and reading comfort. |
| Safety | Public content sources are checked for host-level or terminal instructions before publication. |

## 9. Current Implementation Decisions

- The header is the **single edition switcher location**; redundant homepage edition panels are not allowed.
- `/docs/shared` and `/docs/dedicated` are first-class routes, with compatibility aliases retained only where required.
- The background motion layer is decorative and must remain low intensity, pointer-safe, touch-safe, and absent under reduced motion. It must never obscure content.
- Dedicated-only guides appear only in Dedicated navigation and search; Shared navigation remains user-safe and tenant-focused.

## 10. Future Change Checklist

Before changing BrickDocs, answer these questions:

1. Does the change improve discovery, reading, orientation, or task completion?
2. Does it preserve the edition’s content boundary?
3. Does it work on mobile before being refined for desktop?
4. Does it work from keyboard and in both themes?
5. Is the content metadata rather than a duplicated UI list the source of truth?
6. Does the interaction have a loading, empty, unavailable, and error path where relevant?
7. Has the verification standard above been completed?

If the answer to any question is no, do not checkpoint the change.

