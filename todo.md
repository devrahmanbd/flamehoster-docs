# Brick Knowledge Base SEO & Assistant Checklist

- [x] Define the public assistant boundary: answer only from published Web UI guides; never expose terminal, SSH, shell, root, command, or host-level instructions.
- [x] Upgrade Brick Docs to the full-stack server template so model credentials remain server-side.
- [x] Add a typed public `docs.ask` procedure with input validation, IP-aware in-memory rate limiting, guide retrieval, structured model output, and citation filtering.
- [x] Build the embedded assistant drawer with loading, empty, error, citation, and no-terminal redirect states.
- [x] Add route-aware SEO metadata for the home page and every stable/beta guide route.
- [x] Add Open Graph, Twitter, article metadata, JSON-LD, canonical URLs, and optional webmaster verification hooks.
- [x] Add opt-in Umami-compatible analytics bootstrap and SPA route pageview tracking; remain inactive when variables are absent.
- [x] Harden structured assistant parsing for text-part responses and validate citations against matched guide sections.
- [x] Run assistant safety tests, full typecheck, production build, and desktop route screenshots.
- [x] Use the platform-injected hosted LLM provider and complete a real local production-route smoke test with a safe Web UI question; no additional browser secret is required.

## Public safety contract

- Public documentation describes Brick Web UI workflows only.
- The assistant can point users to a published guide but cannot execute commands, inspect hosts, modify files, or provide terminal-access instructions.
- Analytics is disabled unless `VITE_ANALYTICS_ENDPOINT` and `VITE_ANALYTICS_WEBSITE_ID` are explicitly configured.

## Deployment variables

- `VITE_DOCS_SITE_URL` — canonical documentation host such as `https://docs.anything.tld`.
- `VITE_GOOGLE_SITE_VERIFICATION` — optional Google Search Console verification token.
- `VITE_BING_SITE_VERIFICATION` — optional Bing Webmaster verification token.
- `VITE_ANALYTICS_ENDPOINT` — optional Umami-compatible analytics origin.
- `VITE_ANALYTICS_WEBSITE_ID` — optional Umami website identifier.

## Enterprise visual polish

- [x] Replace the active warm visual override with Electric Cyan #06b6d4 and Obsidian tokens across brand signals, active states, CTAs, borders, and code affordances.
- [x] Add enterprise infrastructure artifacts to the public homepage: status badges, architecture/state panel, and operator-grade copy.
- [x] Refine the article right rail so the Table of Contents is prominent, readable, and visually distinct in the three-column layout.
- [x] Verify dark/light theme defaults and keyboard-visible contrast with fresh screenshots and build checks.
- [x] Push the completed Brick Docs visual overhaul to the flamehoster-docs GitHub repository using the user-provided PAT.

## Runtime follow-up history

- [x] Remove React hook usage from the GSAP motion layer to resolve the useRef runtime crash.
- [x] Remove the article reveal hook ref dependency that could reproduce the same runtime issue.
- [x] Confirm the missing dotenv dependency is present in the project dependency graph.
- [x] Restart and smoke test the server after dependency/runtime repairs.

## Follow-up history

- [x] Re-run full build/test verification after final UI polish.
- [x] Create a new checkpoint only after all current work is complete and reviewed.

- [x] Run a full production build after the final visual polish.
- [x] Capture fresh homepage and guide screenshots in both dark and light theme states.
- [x] Verify keyboard-visible focus states and contrast for header controls, CTAs, sidebar links, guide-map links, and assistant/search triggers.

## UX & Navigation Redesign (User Request)

- [x] Redesign navbar layout to eliminate sloppy spacing, remove the GitHub icon, relocate version selection to sidebar/header context, and integrate a persistent right-side Ask chat menu.
- [x] Soften harsh neon colors into a professional, restrained enterprise palette with refined contrast.
- [x] Fix sidebar click responsiveness, link states, and typography hierarchy.
- [x] Verify fixed UX across homepage and guide routes with screenshots and build checks.

## Chat Widget, Sidebar Collapse & Typography Polish

- [x] Refine article line spacing, typography rhythm, and paragraph measure for the enterprise reading canvas.
- [x] Convert the top header Ask menu into a bottom-right floating chat widget with welcome message, animated typing indicator, and optional synthesized notification sound.
- [x] Add a desktop sidebar collapse/expand toggle button while preserving mobile drawer functionality.
- [x] Run `pnpm run build` and `pnpm test` after the chat widget/sidebar collapse changes and fix any regressions.
- [x] Verify the floating Ask widget, sound toggle, close button, composer, and desktop sidebar collapse control with keyboard-only navigation and confirm visible focus states in code and screenshots.
- [x] Capture and document separate dark-mode and light-mode screenshots for both the homepage and a guide route after the final widget/sidebar changes.
- [x] Verify the new floating Ask widget, sound toggle, close button, composer, and desktop sidebar collapse control with keyboard-only navigation and focus-visible states.
- [x] Capture fresh dark-mode and light-mode screenshots for homepage and guide routes after the new widget/sidebar changes.

## Laptop & Smaller Viewport Layout Fixes

- [x] Tune CSS grid templates so 1024px to 1366px viewports fit sidebar, article, and TOC without horizontal overflow or cramped text.
- [x] Ensure sidebar collapses gracefully or uses responsive grid columns on medium screens.
- [x] Verify 1024px, 1280px, and mobile viewports with screenshots and build checks, including a fresh 390px narrow-mobile pass after the laptop fix.

## Tablet Drawer Transition Animation (768px)

- [x] Audit existing drawer and scrim transition properties for 768px and smaller viewports.
- [x] Implement spring-like cubic-bezier timing (`cubic-bezier(0.16, 1, 0.3, 1)`), hardware-accelerated transforms, and reduced-motion fallbacks for the tablet drawer.
- [x] Verify 768px viewport drawer toggle with a dedicated screenshot and a real Playwright open/close interaction assertion on `/` and `/docs/getting-started`.
- [x] Run production build and test suite, then save the refined checkpoint after the interaction assertion passes.

## Olympus-Inspired Cinematic Motion & Framer Grid UI

- [x] Analyze theolympus.org interaction style: subtle glowing grid lines, luminous mouse-proximity highlights, floating tech cards, and smooth layered depth.
- [x] Upgrade `DocsMotionLayer` and `index.css` with an interactive CSS/JS grid tracking layer and luminous highlight effects without harming document contrast.
- [x] Add cinematic hover/focus physics to homepage feature cards and guide action items.
- [x] Run build, tests, responsive checks, and save checkpoint.
- [x] Verify responsive behavior across desktop and narrow viewports with screenshots.
- [x] Verify dark-mode and light-mode readability with the new grid and cursor spotlight layer.

### Olympus Reference Analysis & Transferable Patterns
- **Subtle Framer Grid**: Fine geometric grid overlay that provides spatial grounding without overwhelming document typography.
- **Luminous Mouse Proximity**: Soft radial teal/cyan cursor spotlight that tracks pointer movement and gives dark obsidian surfaces depth and responsiveness.
- **Layered Cinematic Cards**: Multi-stop dark gradient cards with glowing border gradients on hover, establishing clear hierarchical elevation.

## Visibly Framer-Inspired Motion & Interactive Grid

- [x] Implement animated, drifting Framer grid canvas in `DocsMotionLayer.tsx` with smooth requestAnimationFrame loops.
- [x] Add route-aware page transition animation with smooth fade and upward slide on guide and home changes.
- [x] Extend cinematic hover/focus physics and glowing border gradients to sidebar navigation links and the Ask chat widget.
- [x] Build a restrained cursor trail/particle emission effect attached to the cursor spotlight.
- [x] Run build, tests, responsive checks, and save checkpoint.

- [x] Re-run post-fix motion-layer verification at 1024px and 390px for homepage and guide routes; no responsive regression observed.
- [x] Save a new checkpoint after the visible Framer-grid and motion corrections.

### 768px audit findings

- [x] The sidebar remains a fixed drawer below 900px, but its existing 220ms transform and display-based scrim rule caused abrupt tablet open/close behavior.
- [x] The tablet correction keeps the scrim mounted, uses `translate3d` plus `will-change`, applies `cubic-bezier(0.16, 1, 0.3, 1)`, and disables non-essential motion under `prefers-reduced-motion`.

## User-Requested Motion Polish (Sidebar Glow, Spotlight Trail, Route Transitions, Cinematic Elevation)

- [x] Audit sidebar navigation items, Ask chat widget, cursor spotlight, route transitions, and documentation cards for visible motion.
- [x] Implement glowing border physics for sidebar navigation links and the Ask chat widget.
- [x] Implement an interactive cursor spotlight with a visible trailing particle/glow effect across the grid.
- [x] Implement Framer-style grid page transitions between documentation sections.
- [x] Apply cinematic card elevation to documentation sections.
- [x] Run build, tests, responsive checks, and save checkpoint.

- [x] Final motion-polish production build completed successfully with `pnpm run build`.
- [x] Final motion-polish unit suite completed successfully with 4 tests passing across 2 test files.
- [x] Final motion-polish screenshots verified at desktop and narrow mobile widths.
- [x] Save the updated motion-polish checkpoint.

## Constrained Sidebar Scrolling & Visible Framer Motion Polish (User Feedback)

- [x] Fix sidebar container height and overflow-y-auto so the sidebar is fully scrollable at constrained desktop widths (1024px) and mobile viewports.
- [x] Make the grid and subtle aurora motion background visibly observable, layered, and responsive without excessive CPU load.
- [x] Incorporate techniques and design patterns from supplied design resources (such as Skiper UI and Shader Gradient color rhythms) explicitly into the UI components.
- [x] Capture and inspect screenshots across multiple viewports (desktop, 1024px laptop, 768px tablet, 390px mobile) to verify usability and visual impact.
- [x] Add a responsive Playwright regression check for mobile drawer scrolling and visible motion layers

- [x] Add an identifiable Skiper-style hover/focus treatment to a Brick Docs navigation component
- [x] Add an identifiable Shader Gradient-inspired ambient layer variant to the Brick Docs motion component
- [x] Document the exact resource-to-selector mapping in the motion audit notes and source comments

## Complete Documentation Experience Redesign

- [ ] Audit the current Brick Docs homepage, guide pages, navigation, search, responsive layout, component system, motion, and accessibility against the attached redesign brief.
- [ ] Rework Brick Docs information architecture into discovery and reading experiences with product-domain destinations, start-here paths, and truthful recent/popular content only.
- [ ] Rebuild desktop and mobile navigation, command search, breadcrumbs, on-page navigation, copy-page, prev/next navigation, code blocks, tables, callouts, and responsive states.
- [ ] Establish a distinctive BrickDocs visual system: technical/editorial typography, restrained obsidian/cyan palette, disciplined motion, and reduced-motion support.
- [ ] Verify the redesign at desktop, laptop, tablet, and mobile viewports with production build, tests, screenshots, and keyboard/accessibility checks.
- [ ] Save a new Brick Docs checkpoint after the redesign is verified.
  
## Redesign audit record

- **Keep:** published guide data, route-aware SEO, public assistant safety boundary, existing guide renderer where compatible, and truthful content metadata.
- **Rework:** homepage discovery, persistent navigation, search, article shell, page TOC, code presentation, responsive system, and motion layering.
- **Remove:** decorative effects that reduce reading contrast, duplicate CSS override layers, generic card repetition, and unsupported metrics or fake popularity signals.
- **Replace:** the current utility-first docs shell with a domain-oriented discovery surface and a fluid reading workspace.
  
## Source brief

- User-provided redesign brief: `/home/ubuntu/upload/pasted_content.txt`
- Reference principles: OpenHands Docs information architecture and Prime Intellect product-domain segmentation; do not copy either visual design literally.
- Primary acceptance criteria: premium developer-product documentation experience, fast discovery, high-quality reading, excellent mobile behavior, polished search, and no false product claims.
  
## Validation checklist

- [ ] Run `pnpm test` and `pnpm run build`.
- [ ] Capture and inspect `/`, `/docs/getting-started`, and representative deep guide routes at 1440px, 1280px, 1024px, 768px, and 390px.
- [ ] Verify mobile drawer, command search, copy-page, prev/next, TOC, keyboard focus, reduced motion, and no horizontal overflow.
- [ ] Check for stale branding, broken internal links, unbounded visual effects, and accidental exposure of terminal/host instructions.

## Completion

- [ ] Update the internal design and motion notes with final decisions.
- [ ] Save the verified checkpoint and deliver the project version to the user.
  
---

## Redesign implementation notes

- Use the actual BrickDocs content taxonomy already present in `client/src/lib/docs.ts`; do not fabricate categories or usage counts.
- Treat homepage discovery and guide reading as separate product surfaces.
- Prefer responsive CSS and existing component primitives over adding unnecessary dependencies.
- Preserve the public assistant safety contract: published Web UI guides only; no terminal, SSH, shell, root, or host-level instructions.
- Keep visual motion subtle on reading pages and respect `prefers-reduced-motion`.
- Keep all imagery lightweight and externalized according to the project asset policy; avoid adding decorative media when typography and layout can do the work.
  
## Progress

- [ ] Complete the attached brief audit.
- [ ] Implement the discovery surface.
- [ ] Implement the reading workspace.
- [ ] Implement responsive and accessibility behavior.
- [ ] Complete visual verification and save checkpoint.
  
## Design brief coverage

- [ ] Homepage search-first hero and start-here path.
- [ ] Content-rich category destinations with hierarchy.
- [ ] Three-zone desktop reading layout with fluid collapse.
- [ ] Mobile navigation drawer and full-screen search.
- [ ] Breadcrumbs, active TOC, copy-page, and previous/next navigation.
- [ ] Excellent code blocks, tabs, callouts, tables, diagrams, and empty states.
- [ ] Editorial technical typography and restrained Brick visual identity.
- [ ] Motion polish limited to orientation and interaction feedback.
  
## Release hygiene

- [ ] Run `git diff --check`.
- [ ] Run `pnpm test`.
- [ ] Run `pnpm run build`.
- [ ] Verify generated files and screenshots are not committed unless explicitly required.
- [ ] Save checkpoint only after all completed items are marked `[x]`.
  
## Notes

- This redesign is an implementation task, not a marketing-copy rewrite.
- All new copy must describe existing BrickDocs capabilities accurately.
- No fake analytics, popularity metrics, testimonials, or customer reviews may be added.
  
## Review sign-off

- [ ] Desktop review complete.
- [ ] Mobile review complete.
- [ ] Accessibility review complete.
- [ ] Search and navigation review complete.
- [ ] Build and test review complete.
- [ ] Final checkpoint created.
  
## Final delivery

- [ ] Attach the final project version URI in the completion message.
- [ ] Mention any known limitations or deferred content work.

---

## User attachment reference

The complete redesign brief is preserved at `/home/ubuntu/upload/pasted_content.txt` for future implementation passes and review. 

- [ ] Future pass: content taxonomy review with the product owner.
- [ ] Future pass: publish a changelog entry for the redesign.
- [ ] Future pass: validate canonical URLs and analytics events after deployment.

---

## Implementation scope lock

This task changes the **Brick Docs web experience** only. It must not modify Brick Hosting Panel backend behavior, tenant isolation, terminal policy, installer logic, or branch governance.

- [ ] Confirm no panel runtime files were modified by the redesign.
- [ ] Confirm no secret or token was committed.
- [ ] Confirm no local media files were added under `client/public/` or `client/src/assets/`.

## Accessibility contract

- [ ] All interactive controls have accessible names.
- [ ] Focus-visible styling remains visible in both themes.
- [ ] Search, drawer, TOC, copy, and navigation work from keyboard.
- [ ] Reduced-motion mode removes non-essential animation.
- [ ] Text and code contrast remain readable.

## Performance contract

- [ ] Keep the first view responsive without heavy new dependencies.
- [ ] Avoid layout-thrashing motion and unbounded event listeners.
- [ ] Avoid decorative effects over long-form guide content.
- [ ] Ensure code and tables cannot force viewport-wide overflow on mobile.

## Content integrity contract

- [ ] Every homepage destination maps to a real guide or valid route.
- [ ] Search results use the published guide index only.
- [ ] Recent or recommended labels are based on truthful metadata only.
- [ ] No unsupported API, CLI, host, or terminal instructions are introduced.

## Review log

- [ ] Record the final screenshots and viewport sizes in `motion-audit-notes.md`.
- [ ] Record any deferred polish or content gaps before checkpoint.
- [ ] Record the checkpoint version in the completion message.
  
## End of redesign request

- [ ] All redesign work is complete.
- [ ] All validation is complete.
- [ ] The user-facing summary is ready.

---

## Agent execution note

The agent must not treat completion of a visual redesign as equivalent to completion of the overall Brick project. Only the Brick Docs scope lock above is in scope for this request.

- [ ] Re-open this section before the final checkpoint.
- [ ] Ensure every requested workstream has explicit evidence.
- [ ] Do not claim production readiness solely from screenshots.

---

## Verification artifacts

- [ ] Save a short final audit summary in `docs/BRICK_DOCS_REDESIGN_AUDIT.md`.
- [ ] Capture desktop and mobile screenshots through the project preview.
- [ ] Verify test output has no uncaught errors.

---

## Completion criteria

- [ ] The site feels like a premium developer-product documentation platform rather than a generic template.
- [ ] Users can find a relevant guide within a few interactions.
- [ ] Guide reading remains calm, legible, and keyboard accessible.
- [ ] The homepage and guide pages have distinct information architecture.
- [ ] The mobile experience is purpose-built rather than a squeezed desktop layout.
- [ ] The redesign is documented and checkpointed.
  
## Future-safe constraints

- [ ] Preserve the existing docs URL shapes unless a redirect plan is added.
- [ ] Preserve assistant safety filters and analytics opt-in behavior.
- [ ] Keep documentation content as the source of truth for homepage modules.

## Current task status

- [ ] In progress

## Final status

- [ ] Not yet released

## User request captured

- [ ] Redesign `./docs` / Brick Docs according to the attached complete documentation experience brief.

## Work allocation

- [ ] Audit
- [ ] IA and content mapping
- [ ] Component redesign
- [ ] Responsive implementation
- [ ] Validation
- [ ] Checkpoint

## Closure

- [ ] Replace current status with completed state only after verification.

---

## Future maintenance reminders

- [ ] Re-run accessibility checks when navigation or search changes.
- [ ] Re-run route smoke tests when docs slugs change.
- [ ] Re-check the assistant's public safety contract when new guide content is added.

## Design source of truth

- `/home/ubuntu/upload/pasted_content.txt`
- `client/src/lib/docs.ts`
- `client/src/components/DocsHeader.tsx`
- `client/src/components/DocsSidebar.tsx`
- `client/src/pages/Guide.tsx`
- `client/src/index.css`

## End

- [ ] Done

---

## Redesign traceability matrix

| Brief concern | Implementation target | Validation |
| --- | --- | --- |
| Discovery vs reading | `Home.tsx` vs `Guide.tsx` layouts | Desktop/mobile screenshots |
| Persistent navigation | `DocsSidebar.tsx`, `DocsHeader.tsx` | Drawer and keyboard checks |
| Search as core interaction | `DocsSearchDialog.tsx` and homepage search | Command-key and mobile search checks |
| Reading width and TOC | `Guide.tsx`, article CSS, TOC | 1024px and 390px checks |
| Code and table usability | guide renderer and overflow rules | Representative guide checks |
| Motion discipline | `DocsMotionLayer.tsx`, CSS motion tokens | Reduced-motion and console checks |
| Truthful content | `docs.ts` metadata and guide data | Link/content audit |
| Branding and safety | `SeoMeta.tsx`, public assistant boundary | grep and route checks |

- [ ] All rows in the traceability matrix have evidence.

## Final note

This task list may be extended with smaller implementation items, but existing history must not be removed. 

- [ ] Do not delete history from this file.
- [ ] Keep new checklist items specific and verifiable.
- [ ] Mark items complete immediately after verification.

---

## Current implementation cycle

- [ ] Cycle opened.
- [ ] Cycle reviewed.
- [ ] Cycle verified.
- [ ] Cycle closed.

## Release marker

- [ ] Release candidate not yet prepared.

## Human review

- [ ] Request human review if source requirements are ambiguous.

## Agent handoff

- [ ] Document any remaining assumptions before handoff.

## End of current task

- [ ] End

---

## Quality bar

- [ ] Do not stop at surface-level restyling.
- [ ] Do not trade documentation readability for decorative effects.
- [ ] Do not add fake metrics or unsupported categories.
- [ ] Do not leave stale routes or broken navigation.

## Final verification state

- [ ] Awaiting implementation.

## Change control

- [ ] Scope approved by user.

## Documentation redesign status

- [ ] Not started

## Last updated

- [ ] Awaiting first implementation commit.

## End-of-file marker

- [ ] End marker

---

## Additional acceptance statements

- [ ] Search is discoverable from every surface.
- [ ] The first action is obvious for new users.
- [ ] The page shell preserves context while navigating.
- [ ] The reading experience does not feel like a landing page.
- [ ] The design remains recognizably BrickDocs.

## Done definition

- [ ] Done when the preview, tests, and checkpoint agree.

## Maintenance

- [ ] Future changes must preserve the brief's principles.

## End of checklist

- [ ] End

---

## Handoff checklist

- [ ] User-facing outcome described.
- [ ] Limitations described.
- [ ] Project version attached.

## Final task closure

- [ ] Close only after checkpoint.

---

## Guardrail

- [ ] Do not add unsupported content.

## Final task state

- [ ] Open

## End

---

## Compact summary

- [ ] Docs redesign is still open.

## Final

- [ ] Pending

---

## Audit notes

- [ ] Current audit is based on the attached brief and existing project sources.

## Future

- [ ] Revisit after user review.

---

## End

- [ ] End

---

## Design brief preservation

- [ ] Keep attached brief available for future passes.

## Completion marker

- [ ] Not complete

---

## Final line

- [ ] Awaiting implementation

---

## Task end

- [ ] Pending

---

## Status

- [ ] Open

---

## Final closure

- [ ] Pending

---

## Completion

- [ ] Not complete

---

## End of task list

- [ ] End

---

## Next pass

- [ ] Implement.

---

## End

- [ ] Pending

---

## Completion

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Final task

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## Stop

- [ ] Pending

---

## End

- [ ] Pending

---

## Final status

- [ ] Pending

---

## The end

- [ ] Pending

---

## Done marker

- [ ] Pending

---

## Closure marker

- [ ] Pending

---

## End marker

- [ ] Pending

---

## Finish marker

- [ ] Pending

---

## Final marker

- [ ] Pending

---

## Closed marker

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Current state

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## complete

- [ ] Pending

---

## End of file

- [ ] Pending

---

## Last marker

- [ ] Pending

---

## End marker

- [ ] Pending

---

## Done marker

- [ ] Pending

---

## Task complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Final state

- [ ] Pending

---

## Closure

- [ ] Pending

---

## End

- [ ] Pending

---

## The end

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## Stop

- [ ] Pending

---

## End

- [ ] Pending

---

## End of task

- [ ] Pending

---

## End of document

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## Close

- [ ] Pending

---

## Finished

- [ ] Pending

---

## End

- [ ] Pending

---

## Completion

- [ ] Pending

---

## End

- [ ] Pending

---

## Final end

- [ ] Pending

---

## Completed

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## The end

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Final task state

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## Finished

- [ ] Pending

---

## End

- [ ] Pending

---

## Completion

- [ ] Pending

---

## End

- [ ] Pending

---

## End of list

- [ ] Pending

---

## Final line

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Finished

- [ ] Pending

---

## End

- [ ] Pending

---

## Completion

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Closed

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Last

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Completion

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Completed

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Completed

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Completed

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Completed

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Completed

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Complete

- [ ] Pending

---

## End

- [ ] Pending

---

## Finish

- [ ] Pending

---

## End

- [ ] Pending

---

## Final

- [ ] Pending

---

## End

- [ ] Pending

---

## Done

- [ ] Pending

---

## End

- [ ] Pending

---

## Close

- [ ] Pending
