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

- [ ] Audit existing drawer and scrim transition properties for 768px and smaller viewports.
- [ ] Implement spring-like cubic-bezier timing (`cubic-bezier(0.16, 1, 0.3, 1)`), hardware-accelerated transforms, and reduced-motion fallbacks for the tablet drawer.
- [ ] Verify 768px viewport drawer toggle with a dedicated screenshot.
- [ ] Run production build and test suite, then save the refined checkpoint.

## Olympus-Inspired Cinematic Motion & Framer Grid UI

- [x] Analyze theolympus.org interaction style: subtle glowing grid lines, luminous mouse-proximity highlights, floating tech cards, and smooth layered depth.
- [x] Upgrade `DocsMotionLayer` and `index.css` with an interactive CSS/JS grid tracking layer and luminous highlight effects without harming document contrast.
- [x] Add cinematic hover/focus physics to homepage feature cards and guide action items.
- [ ] Run build, tests, responsive checks, and save checkpoint.

### Olympus Reference Analysis & Transferable Patterns
- **Subtle Framer Grid**: Fine geometric grid overlay that provides spatial grounding without overwhelming document typography.
- **Luminous Mouse Proximity**: Soft radial teal/cyan cursor spotlight that tracks pointer movement and gives dark obsidian surfaces depth and responsiveness.
- **Layered Cinematic Cards**: Multi-stop dark gradient cards with glowing border gradients on hover, establishing clear hierarchical elevation.
