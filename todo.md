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
