# BrickDocs Product Audit

**Scope:** Public documentation experience for Brick Shared and Brick Dedicated users.

**Evidence reviewed:** `pasted_content_4.txt`, the live current project preview, the current route model, guide dataset, navigation helpers, reader page, and supplied design references.

## Executive conclusion

The current application is a **documentation-themed interface**, not yet a complete documentation product. Its primary problems are architectural and behavioral rather than cosmetic. It needs a content model that represents editions and page relationships, URL-backed state, a stable shell, an intentional mobile layout, and accessible interaction contracts before additional visual polish.

## Keep

| Asset | Reason to retain |
| --- | --- |
| Public guide source data | It provides the currently published Shared-facing subject matter and is the truthful content baseline. |
| Canonical guide URLs | Existing `/docs/:version/:slug` URLs should remain supported. |
| Existing SEO component | Page-level title and description behavior can be expanded rather than replaced. |
| Existing guide rendering primitives | Copy controls, sections, code regions, and sequential navigation can be redesigned behind stable data contracts. |
| Public assistant boundary | The assistant must continue to answer only from published, user-facing documentation. |

## Rework

| System | Current failure | Required outcome |
| --- | --- | --- |
| Edition selection | Local component state, duplicate controls, and no URL-backed content model | A single URL-backed Shared/Dedicated edition that governs navigation, search, page availability, and page copy. |
| Version selection | Decorative options that do not alter page content or links | A version model that only exposes versions with real content. Until then, keep the version visible but not selectable. |
| Sidebar | Static and visually detached; hierarchy does not map to document relationships | A desktop-local navigation tree with category headings, active item, clear section context, independent scrolling, and task-first labels. |
| Guide page | Inline styling, limited actions, no on-page navigation, generic code labels | Editorial reading layout with breadcrumbs, page metadata, table of contents, content-specific code labels, related guides, and reliable prior/next navigation. |
| Homepage | Repeats navigation in cards and gives an unclear first action | A clear orientation page: what BrickDocs is, who it is for, a single primary starting path, then real categories and guides. |
| Responsive layout | Desktop structure is squeezed into smaller viewports | Separate desktop, tablet, and mobile layout contracts; no sidebars competing with the reading surface on mobile. |
| Theme | Incomplete semantic coverage and unreliable state behavior | A system/light/dark preference contract with persistent, immediate theme application and verified contrast. |
| Motion | Decorative grid effect has been prioritized before product behavior | Remove ambient motion from reading surfaces. Retain only subtle feedback that helps orientation and obeys reduced-motion settings. |

## Remove

- Decorative background grid, pointer trails, auroras, and similar effects from documentation reading surfaces.
- Duplicate or cosmetic edition controls.
- Claim-like labels that do not reflect a real product state, including “Official” or “Reference Manual” phrasing where unnecessary.
- Generic “Terminal / Configuration Example” labels in user-only web-interface documentation.
- Inline styles that prevent consistent responsive and theme behavior.

## Replace

| Replace | With |
| --- | --- |
| Local edition state | `edition` query parameter with safe default, browser-history support, and a shared context for all doc surfaces. |
| Fake version selector | A truth-preserving version indicator until actual parallel-version content exists. |
| Flat guide sequence | Explicit content order, parent category, related content, and per-edition availability. |
| Static mobile sidebar | Focus-managed drawer with escape handling, scrim close, restored focus, and body-scroll lock. |
| Repeated visual cards | Navigation-driven category lists and only purposeful content summaries. |
| Generic dark palette | Semantic tokens tested in light and dark themes, with reading-first text and code contrast. |

## Missing

1. A content model for edition availability, parent relationships, timestamps, status, summaries, related pages, and structured on-page headings.
2. A complete information architecture for Shared and Dedicated editions.
3. A proper on-page table of contents with active section tracking.
4. Page metadata and footer relationships: updated date, related content, and edition context.
5. Purpose-built empty, loading, error, and not-found states.
6. System-theme option and persistence verification.
7. Mobile navigation and search focus-management tests.
8. Route, accessibility, link, and layout regression coverage across breakpoints.

## Broken behavior to fix before visual polish

- Direct edition URLs such as `/shared`, `/dedicated`, and their guide routes resolved to the generic 404 because only `/docs/:edition` had been registered. Both the canonical `/docs/:edition` URLs and concise direct edition aliases must be first-class routes.
- Shared/Dedicated selection does not yet change a defined content model or URL.
- Theme switching is not complete as a Light/Dark/System contract.
- The guide reader has no contextual right-rail navigation despite emitting section anchors.
- Current guide content contains implementation-oriented copy that must be normalized for a public Shared user audience.
- The homepage card grid duplicates sidebar functions instead of improving discovery.
- Desktop and mobile are not independently designed states.

## Correct rebuild order

1. Route and content audit.
2. Information architecture and edition model.
3. Content metadata and page relationship model.
4. Semantic design tokens.
5. Desktop shell.
6. Navigation behavior.
7. Search.
8. Edition switching.
9. Theme system.
10. Documentation components.
11. Responsive layouts.
12. Automated and manual validation.

## Acceptance test

A first-time customer must be able to identify BrickDocs, choose the correct edition, start safely, find a guide, read it, copy a relevant web-UI workflow, and continue to the next task without fighting the layout on desktop or mobile.

## Visual review — 17 August 2026

The rebuilt Shared and Dedicated home routes render as edition-aware documentation surfaces at a 390px mobile width. The reader routes retain a single-column reading flow with readable code blocks, related-guide cards, and previous/next navigation; no horizontal page overflow was observed in the captured mobile views. The compact mobile header retains an edition selector, search trigger, and theme control without wrapping.

One cleanup remains before final checkpoint: the homepage repeats an edition-selection card below the hero even though edition selection is already present in the header. That duplicate should be removed or reduced to non-interactive explanatory context so the page’s first viewport stays focused on guide discovery. The mobile drawer still requires explicit open, close, and keyboard-dismissal verification; a closed-drawer screenshot cannot establish focus-control correctness.
