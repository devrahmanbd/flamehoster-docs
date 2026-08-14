# Brick Knowledge Base Redesign Checklist

- [x] Audit the reference sites and establish the knowledge-base boundary: Brick docs provide guidance only and do not expose terminal access.
- [x] Make obsidian/slate the default theme with a reliable light-theme alternative, persisted preferences, focus states, and reduced-motion support.
- [x] Rebuild shared documentation chrome: route-aware header, sidebar, search dialog, mobile navigation, version selector, article outline, copy-link utility, and optional documentation helper.
- [x] Preserve and serve the public guide registry through `/docs`, `/docs/:slug`, `/docs/v0.9/:slug`, and `/docs/v1.0-beta/:slug` route shapes.
- [x] Add SEO metadata, canonical URL handling, social defaults, robots.txt, sitemap.xml, site manifest, and optional Google/Bing webmaster verification variables.
- [x] Add opt-in privacy-conscious analytics support using `VITE_ANALYTICS_ENDPOINT` and `VITE_ANALYTICS_WEBSITE_ID` without tracking when unconfigured.
- [x] Verify direct guide-route fallback, robots, sitemap, typecheck, production build, desktop visuals, and mobile visuals.
- [ ] Add a real hosted AI answer provider later if desired; the current helper only routes readers to published documentation and cannot execute host commands.

## Deployment assumptions

- Intended public host pattern: `https://docs.anything.tld`.
- Set `VITE_DOCS_SITE_URL` to the final canonical host before production build.
- Set `VITE_GOOGLE_SITE_VERIFICATION` and/or `VITE_BING_SITE_VERIFICATION` only when webmaster ownership is configured.
- Set the two analytics variables only when a privacy-compliant analytics endpoint is available.
