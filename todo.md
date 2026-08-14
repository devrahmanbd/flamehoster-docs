# Brick Docs Overhaul Checklist

- [x] **Phase 1**: Audit routing, sidebar navigation, and layout failures.
- [x] **Phase 2**: Implement robust client-side routing, sidebar state persistence, and full public guide collection (Databases, SSL/TLS, File Manager, Backups, PHP Version Management, WordPress & CMS).
- [x] **Phase 3**: Build real searchable indexing across all guide sections and stable/beta version switcher.
- [x] **Phase 4**: Redesign the visual system toward a cleaner reference-inspired docs experience with high contrast, quiet surfaces, clear type hierarchy, and a three-column article reader.
- [x] **Phase 5**: Verify build, test stable and beta routes, validate responsive layouts, and capture representative screenshots.

## Public route contract

- `/` and `/docs` are public documentation landing pages.
- `/docs/:slug` is a short stable-guide URL.
- `/docs/v0.9/:slug` is the explicit stable version URL.
- `/docs/v1.0-beta/:slug` is the explicit beta version URL.
- Search indexes the shared guide registry rather than a single page.

## Content boundary

Public operator guidance lives in `./docs` and is published through the `flamehoster-docs` repository. Maintainer-only architecture and release notes remain outside the public repository at `/home/ubuntu/brick-internal-docs`.
