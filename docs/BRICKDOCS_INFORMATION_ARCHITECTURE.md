# BrickDocs Information Architecture

**Status:** Approved design target for the current documentation-product rebuild.

## 1. Route contract

BrickDocs retains its established public guide URLs and adds an explicit `edition` query parameter. This avoids duplicate route trees while making the selected documentation mode meaningful, bookmarkable, and testable.

| Surface | Route | State | Purpose |
| --- | --- | --- | --- |
| Documentation home | `/` | `?edition=shared` or `?edition=dedicated` | Orient a customer, explain the selected edition, offer one primary starting path, and expose real categories. |
| Short documentation home | `/docs` | Same query handling | Redirect or render the same index state as `/`. |
| Current guide | `/docs/:version/:slug` | `?edition=shared` or `?edition=dedicated` | Read one published document in a stable reader shell. |
| Legacy guide route | `/docs/:slug` | Same query handling | Redirect to the currently supported guide route. |
| Unknown route | `/*` | N/A | Provide a helpful 404 with search and a return to the selected edition home. |

The `edition` parameter is restricted to `shared` and `dedicated`; any missing or invalid value resolves safely to `shared`. The application updates this parameter with browser-history support whenever the user selects a new edition.

## 2. Current published inventory

The current data set contains ten public guides. These are the only content units that can be promoted in navigation, search, home modules, related content, or previous/next navigation until new content is authored.

| Category | Guide | Slug | Current public audience | Recommended related guides |
| --- | --- | --- | --- | --- |
| Start Here | Navigating the Brick Web Panel | `getting-started` | Shared and Dedicated | Deploying apps, security, troubleshooting |
| Applications | Deploy containerized applications without guessing | `deploying-apps` | Dedicated only until a Shared-safe variant is authored | SSL/TLS, databases, backups |
| Data & Storage | Provision and manage high-performance databases | `databases` | Dedicated only until product scope is confirmed | backups, troubleshooting |
| Security & Network | Configure SSL/TLS certificates and domain routing | `ssl-tls` | Shared and Dedicated | security, WordPress, troubleshooting |
| Data & Storage | Manage files, permissions, and web roots | `file-manager` | Shared and Dedicated | PHP management, backups, security |
| Applications | Manage multi-version PHP runtimes and extensions | `php-management` | Shared and Dedicated | file manager, WordPress, troubleshooting |
| Applications | Deploy WordPress and enterprise CMS platforms | `wordpress-cms` | Shared and Dedicated | PHP management, databases, SSL/TLS |
| Operations | Back up and restore websites, databases, and host state | `backups` | Shared and Dedicated, with scoped wording | databases, file manager, troubleshooting |
| Security & Network | Harden Brick with MFA, firewalling, and malware detection | `security` | Shared and Dedicated, with role-aware wording | SSL/TLS, getting started, troubleshooting |
| Operations | Diagnose failures and collect evidence safely | `troubleshooting` | Shared and Dedicated | backups, security, getting started |

## 3. Selected-edition navigation

### Shared edition

Shared documentation must focus on customer outcomes inside the Web UI. It must not imply unrestricted server management, direct host control, source access, or a terminal contract that the panel does not make available.

| Navigation group | Guides initially available |
| --- | --- |
| Start here | Navigating the Brick Web Panel |
| Websites & applications | PHP management; WordPress and CMS platforms |
| Files & data | File manager; backups |
| Domains & security | SSL/TLS; security |
| Help | Troubleshooting |

### Dedicated edition

Dedicated documentation expands the published reference surface only where the underlying product can truthfully support it. It begins with the available guides and can add Dedicated-specific pages as the product documentation is authored.

| Navigation group | Guides initially available |
| --- | --- |
| Start here | Navigating the Brick Web Panel; deploying apps |
| Applications | Deploying apps; PHP management; WordPress and CMS platforms |
| Data & storage | Databases; file manager; backups |
| Domains & security | SSL/TLS; security |
| Operations | Troubleshooting |

## 4. Reader relationships

Every reader page has the following relationships, derived from the selected edition and the ordered navigation tree:

1. **Breadcrumb:** `Brick Docs → Selected edition → Category → Current guide`.
2. **On this page:** current guide sections with stable anchors.
3. **Related guides:** up to three truthful cross-links from the table above.
4. **Previous/next:** adjacent eligible guides in the selected-edition navigation order.
5. **Edition context:** a concise label in the reader header, not a duplicate content switcher.

## 5. Content metadata contract

Each `GuideArticle` will be expanded to carry the metadata needed for an actual documentation system.

```ts
type DocsEdition = "shared" | "dedicated";
type DocsStatus = "published" | "beta";

interface GuideArticle {
  slug: string;
  category: string;
  title: string;
  intro: string;
  read: string;
  version: string;
  editions: DocsEdition[];
  status: DocsStatus;
  updatedAt: string;
  relatedSlugs: string[];
  sections: GuideSection[];
}
```

The current content does not expose internal owner information or operational lifecycle metadata, because that information does not help a customer complete a task.

## 6. Theme contract

The application supports `system`, `light`, and `dark` modes. The selected preference persists locally and is applied before normal rendering as far as the host application allows. A visible theme menu makes the three-state selection clear; it does not merely flip an icon.

## 7. Search contract

Search is constrained to guides available in the selected edition and current truthful version. It searches guide title, category, introduction, headings, body, bullets, and code examples. Results show a category, title, excerpt, and keyboard selection state. Search supports keyboard open, focus, navigation, selection, close, empty, and error states.

## 8. Validation matrix

| Contract | Test evidence required |
| --- | --- |
| Edition selection | URL changes, selection persists after refresh, navigation/search results update, browser Back/Forward restores state. |
| Route safety | Invalid version, slug, and edition states render safe content or a helpful 404. |
| Reader relationships | Breadcrumb, active sidebar item, TOC, related guides, and previous/next all match selected edition. |
| Theme | System/light/dark modes apply to every surface and persist without a flash or invisible content. |
| Shared boundary | Shared search, navigation, cards, and page text never expose Dedicated-only content or host-level guidance. |
