# Brick Docs Internal Maintainer Guide

This internal document provides maintainers and developers with architectural specifications, content authoring standards, search indexing rules, SEO/analytics configuration, testing protocols, and future development roadmaps for **Brick Docs**. It complements the public user guides located in the `./docs` directory by detailing the internal mechanics of the React/tRPC frontend and Express backend services [1].

---

## 1. Architecture & Repository Structure

Brick Docs is built on a full-stack TypeScript template combining React 19, Tailwind CSS 4, Framer/Olympus-inspired motion layers, Express, and tRPC 11 [2]. The codebase separates public user documentation from private maintainer infrastructure and automated verification scripts.

| Directory / File | Purpose |
| :--- | :--- |
| `client/src/pages/` | Primary routing views, including the knowledge-base index (`Home.tsx`) and guide reader (`GuideDetail.tsx`). |
| `client/src/components/` | Reusable UI components, navigation sidebar, search dialog, motion layers, and the AI assistant drawer. |
| `client/src/data/guides.ts` | Structured catalog of public documentation guides, categories, slugs, metadata, and markdown contents. |
| `docs/` | Public Markdown guides rendered by the Web UI, covering deployment, file management, security, and operations [3]. |
| `server/docsAssistant.ts` | Server-side tRPC router backing the embedded documentation assistant with rate limiting and citation filters. |
| `scripts/` | Responsive Playwright test harnesses (`check-docs-responsive.mjs`) and automation utilities. |

---

## 2. Content Authoring & Adding New Guides

Public user guides are maintained in two places: the Markdown files under `docs/` and the structured metadata registry in `client/src/data/guides.ts`. To add a new guide, maintainers must follow a structured integration sequence to ensure search indexing and sidebar navigation remain synchronized.

### Step 1: Create the Markdown Document
Create a new Markdown file inside the `./docs` directory (e.g., `docs/advanced-networking.md`). The document must adhere to the web-UI-only safety model: it must describe configuration through the Brick Web UI rather than raw host terminal access [4].

```markdown
# Advanced Networking and Port Management

Configure custom reverse proxy routing, port allocation ranges, and firewall policies safely through the Brick Web UI.

## Overview
Brick isolates all network bindings through managed reverse proxy rules and automated conflict detection.
```

### Step 2: Register the Guide in `guides.ts`
Open `client/src/data/guides.ts` and add an entry for the new guide under the appropriate category array.

```typescript
{
  id: "advanced-networking",
  slug: "advanced-networking",
  title: "Advanced Networking and Port Management",
  category: "Network & Security",
  description: "Configure custom reverse proxy routing and port allocation ranges through the Brick Web UI.",
  content: `...`, // Or import the markdown content
  version: "stable",
  lastUpdated: "2026-08-15"
}
```

---

## 3. SEO, Open Graph, and Analytics Integration

Brick Docs enforces route-aware metadata generation to support search engine crawlers, social preview cards, and webmaster verification without compromising visitor privacy.

### Meta Tag Management
The `SeoMeta` component (`client/src/components/SeoMeta.tsx`) dynamically updates document titles, canonical link tags, Open Graph properties (`og:title`, `og:description`, `og:url`), and Twitter card summaries whenever a user navigates between guide categories or viewports [5].

### Analytics & Webmaster Hooks
Analytics hooks are configured via environment variables and injected conditionally in `client/index.html` and `server/index.ts`. Maintainers can integrate Umami, Plausible, or custom webmaster verification codes by supplying the corresponding environment variables through `webdev_request_secrets` [6].

---

## 4. Search Indexing and AI Assistant Boundaries

The documentation platform includes two discovery mechanisms: instant keyboard-driven search (`Ctrl+K` command palette) and the embedded AI assistant drawer (`DocsAssistantDrawer.tsx`).

### Search Indexing
The search dialog indexes guide titles, categories, and full text descriptions from `client/src/data/guides.ts`. Results are filtered instantly in client memory with keyboard navigation support.

### AI Assistant Governance
The backend assistant (`server/docsAssistant.ts`) operates under strict safety constraints:
1. **No Terminal Execution**: The assistant is explicitly prohibited from generating raw Linux shell commands, root privilege escalations, or SSH access instructions.
2. **Guide Grounding**: Responses are anchored exclusively to verified Brick documentation text and include citation references.
3. **Rate Limiting**: Per-session rate limits prevent prompt exhaustion and abuse.

---

## 5. Testing & Quality Assurance

Maintainers must run the test suite and verify responsive behavior before merging changes to production.

### Unit & Integration Tests
Execute Vitest specifications using the package manager [7]:
```bash
pnpm test
```

### Responsive Playwright Harness
To verify that the mobile navigation drawer, independent sidebar scrolling, and motion layers render correctly across desktop (1280px), laptop (1024px), tablet (768px), and mobile (390px) viewports, run the responsive test script [8]:
```bash
node scripts/check-docs-responsive.mjs
```

---

## 6. Future Development Roadmap

The future development roadmap for Brick Docs focuses on offline resilience, collaborative annotations, and multi-language localization.

| Phase | Milestone | Focus Areas |
| :--- | :--- | :--- |
| **Phase A** | Offline Export Bundle | One-click export of the entire knowledge base into a standalone, searchable static HTML/Markdown archive. |
| **Phase B** | Interactive UI Simulators | Embedded sandbox widgets allowing users to test WAF rules and database backups directly inside documentation pages. |
| **Phase C** | Localization Engine | Community-driven translation pipelines for multilingual documentation support (Spanish, French, German, and Mandarin). |

---

## References

1. [Brick Full-Stack WebDev Guide](/home/ubuntu/skills/webdev-readme-fullstack/SKILL.md) [9]
2. [Brick Docs Repository Architecture (`package.json`)](/home/ubuntu/brick-docs/package.json) [10]
3. [Public Documentation Index (`docs/README.md`)](/home/ubuntu/brick-docs/docs/README.md) [11]
4. [Brick Business Strategy & Code Safety Model](/home/ubuntu/brick-docs/todo.md) [12]
5. [SEO & Open Graph Implementation (`SeoMeta.tsx`)](/home/ubuntu/brick-docs/client/src/components/SeoMeta.tsx) [13]
6. [Web Development Secrets Management Guidance](/home/ubuntu/skills/webdev-request-secrets/SKILL.md) [14]
7. [Vitest Configuration (`vitest.config.ts`)](/home/ubuntu/brick-docs/vitest.config.ts) [15]
8. [Responsive Playwright Harness (`check-docs-responsive.mjs`)](/home/ubuntu/brick-docs/scripts/check-docs-responsive.mjs) [16]
