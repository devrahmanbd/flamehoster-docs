# BrickDocs-to-Panel Alignment Report

**Author:** Manus AI  
**Date:** 17 August 2026  
**Scope:** Public BrickDocs content, public route behavior, and the Brick Panel governance and security evidence available in the governed panel repository.

## Executive conclusion

BrickDocs now has a **sound public documentation shell**: the Shared and Dedicated editions are URL-backed, search and navigation are edition-filtered, and unavailable guides do not silently fall through to the wrong edition. The public site also keeps host commands, source paths, binary details, and panel implementation instructions out of customer-facing material. These are meaningful alignment wins because the Shared edition must protect tenant and host boundaries rather than merely describe them.

The published content is **not yet safe to treat as a production capability catalogue**, however. The authoritative security assessment records unresolved P0/P1 Shared defects in route-level tenant context, tenant-scoped login, database scoping, and shell confinement. Several user-visible guides describe fully available controls or guarantees that have not been verified against a release-ready Shared deployment. Those claims should remain unchanged during this audit, but must be evidence-checked and narrowed before a Shared production launch.[1] [2]

> **Release communication rule:** Until the Shared P0/P1 remediation and two-tenant release validation have passed, BrickDocs must not claim that Shared file, database, shell, firewall, malware, audit, recovery, or account-recovery workflows are operational security guarantees. Documentation may describe only an enabled, tested, customer-visible control—not a planned design or an upstream capability.

## Evidence and assessment method

The assessment compared the current published guide dataset, availability metadata, route helpers, route-level unavailable state, drawer verification, and representative rendered routes with the Panel system contract, edition architecture summary, and latest security assessment. This is a documentation-to-evidence review; it does **not** assert that an untested panel feature is absent. An item labelled **unverified** has insufficient current evidence to be marketed or documented as an active customer workflow.

| Evidence source | What it establishes | Audit use |
| --- | --- | --- |
| Panel system contract | Shared is multi-tenant; Dedicated is single-tenant; every tenant resource must be authorization-checked and edition-specific behavior must be explicit. | Primary source for edition and safety boundaries.[1] |
| Edition architecture summary | Shared design includes cgroups, jail boundaries, and a caged shell; Dedicated includes app marketplace and controlled operator access. | Capability intent, not release proof.[2] |
| Security assessment | Shared has unresolved critical/high findings in tenant middleware, login scope, database ownership, and direct shell execution. | Release and claim-safety baseline.[3] |
| Published guide dataset | The public claims, public guide scope, and Shared/Dedicated availability actually rendered by BrickDocs. | Public-content inventory.[4] |
| Route and verification implementation | Edition filtering, unavailable-guide state, and drawer focus behavior. | Public behavior validation.[5] [6] |

## Verified public documentation behavior

Three representative routes were rendered and reviewed at desktop width: `/docs/shared/getting-started`, `/docs/dedicated/deploying-apps`, and `/docs/shared/databases`. The first two presented the correct edition context and navigation. The third presented a clear “guide unavailable” state rather than exposing Dedicated database content through the Shared route. The browser verification also passed for edition switching, theme persistence, keyboard search, mobile drawer initial focus, `Escape` dismissal, scrim dismissal, focus restoration, and horizontal-overflow checks.[5] [6]

| Public behavior | Result | Alignment conclusion |
| --- | --- | --- |
| Canonical Shared and Dedicated routes | Working | **Aligned.** The edition is part of the URL and controls the guide set.[5] |
| Dedicated-only application and database guides | Hidden from Shared and replaced with a clear unavailable state | **Aligned.** Prevents accidental cross-edition discovery.[4] [5] |
| Shared public-content boundary | UI-path examples only; no root, SSH, shell, host command, source, or binary instructions | **Aligned.** Matches the stated customer-documentation boundary. |
| Mobile navigation accessibility | Drawer focus moves to the close action; `Escape` and scrim close it; focus returns to the menu trigger | **Aligned and regression-tested.**[6] |
| Homepage edition selection | Header switcher is the single interactive selector; the previously duplicated below-hero card is absent | **Aligned.** This keeps first-visit discovery focused on guides. |

## Claim classification

The table below classifies material claims by their **current publication risk**, rather than by desirability. “Missing” means a real boundary or prerequisite needs documentation. “Unverified/stale” means the current evidence does not support publishing the claim as an available workflow. “Unsafe” means the claim could encourage a Shared user to expect control that conflicts with isolation or should be withheld until it is safely tenant-scoped.

| Guide or claim area | Current public claim | Classification | Evidence-based assessment and required disposition |
| --- | --- | --- | --- |
| Edition navigation | Shared and Dedicated are separate documentation editions; Dedicated-only guides are unavailable in Shared. | **Aligned** | The public content model and routes enforce this separation. Retain.[4] [5] |
| Customer documentation boundary | Workflows are completed in the Web UI and do not disclose host commands. | **Aligned** | This is compatible with the public safety contract. Retain and continue to apply it to all new guides. |
| Getting started | Shared has jailed user directories and quotas; users have no *direct host* terminal access. | **Aligned with clarification needed** | The architecture describes jail boundaries and cgroups. “Direct host terminal” is appropriately narrow, but the guide must not imply that a caged-terminal service is already released or safe while the shell P1 remains unresolved.[2] [3] |
| Shared account authentication | First sign-in prompts MFA; sessions and IP rate limiting protect hosted data. | **Unverified / release-blocked** | The Core design includes authentication and rate limiting, but the Shared security assessment found missing route-level tenant middleware and tenant-unscoped login. Replace product-assurance wording only after the Shared login and middleware release gate is green.[1] [3] |
| Shared file manager | Users can browse, edit, extract archives, change POSIX permissions, and change user/group ownership. | **Unsafe / release-blocked** | Shared file APIs were found unauthenticated or unscoped, and ownership mutation is especially sensitive in a multi-tenant environment. Do not document ownership changes for Shared. Publish a narrowly scoped file-manager guide only after every operation is tenant-authorized and path-confined.[3] |
| Shared security controls | Users can configure firewall, geographic policy, malware scans, and immutable audit logs from a Security dashboard. | **Unverified** | Core may contain supporting subsystems, but no release evidence demonstrates a safe, customer-visible Shared surface for these controls. Treat as unavailable until a UI/API contract and tenant authorization test exist.[1] [3] |
| Shared backups | Users can schedule hourly/daily backups, connect S3/WebDAV/SFTP, and safely restore selected data. | **Unverified** | The architecture establishes durable recovery goals, but no current Shared feature evidence confirms the exact exposed workflow, destination policy, restoration authorization, or quota effect. Gate publication on an end-to-end tenant-scoped restore test.[1] [2] |
| Shared PHP and CMS | Multiple PHP runtimes, extensions, staging/cloning, and one-click CMS actions are available. | **Unverified** | The guide is suitable in shape for a Web UI workflow, but exact versions, extensions, CMS catalogue, cloning behavior, and tenant controls are not substantiated by the current panel evidence. Replace promises with verified configuration choices per release. |
| Dedicated applications and databases | Dedicated users can deploy marketplace templates, select ports, configure FQDN/TLS, and provision several database engines. | **Unverified / potentially stale** | Dedicated is the intended home for marketplace and controlled infrastructure workflows, but the architecture record is intent-level and does not prove the published template count, engine list, routing guarantees, or exact UI labels. Keep edition restriction; verify each capability against a dedicated release build before marketing it.[1] [2] |
| TLS, HTTP/3, and cipher controls | Automated certificates, wildcard binding, HTTP/3, HSTS, OCSP stapling, and TLS 1.3 are exposed as simple toggles. | **Unverified / potentially stale** | These are specific implementation and UX assertions. No reviewed source evidence confirms all controls are present and tenant-safe in both editions. Replace with capability-level language only after UI and configuration tests pass. |
| Internal-product language in user guides | “Host prepared,” “operator boundary,” and “durable state record” describe customer onboarding. | **Ambiguous** | This internal reliability language does not help a user complete a task and can imply host-level responsibility. Rewrite for account owner actions without revealing implementation detail. |

## Documentation that is missing but needed before Shared launch

The missing material should describe **limits and supported customer actions**, not internal implementation. It must remain UI-only and avoid revealing host paths, jail implementation, shell commands, binary locations, source structure, debugging backdoors, or cross-tenant diagnostics.

| Priority | Missing customer-facing documentation | Minimum evidence before publication |
| --- | --- | --- |
| P0 | Shared account identity: which panel URL to use, tenant selection, MFA enrollment, supported recovery route, and support escalation when access fails. | Tenant-scoped login and password-recovery contract, plus tests proving no credential collision. |
| P0 | Shared file-management scope: permitted web roots, safe upload/archive behavior, denied locations, and permission limits. | Authentication and `tenant_id` enforcement on every file/archive API plus path-traversal and two-tenant tests. |
| P0 | Shared service availability statement: what is deliberately unavailable, including any release-blocked terminal, database, or infrastructure capability. | A versioned capability matrix approved by Shared release engineering. |
| P1 | Resource and abuse-policy guide: quotas, resource-exhaustion behavior, email/port restrictions, and how a customer requests changes. | Metering/quota UI evidence, support process, and tenant-visible error states. |
| P1 | Backup and restore decision guide: scope, retention, destination eligibility, restoration authorization, and non-destructive verification. | End-to-end tenant-owned backup and restore validation. |
| P1 | Security incident and evidence guide: audit-viewer scope, safe diagnostic artifacts, and support handoff. | Released audit/log UI with tenant filtering and retention policy. |
| P2 | Dedicated application catalogue and database guides generated from verified release metadata. | Signed release manifest or tested catalogue export; no manually maintained numeric counts. |

## Unsafe-public-content boundary

BrickDocs currently avoids command-level host disclosure. That boundary must remain firm. The following content is **prohibited** in public Shared documentation even after features are released: host filesystem paths; root, SSH, or unrestricted shell instructions; implementation commands for `jail-sh`, cgroups, CafeFS, Nginx, databases, or updates; panel binary locations; source-code links; internal metrics endpoints; tenant-identification mechanics; WAF rules; and operational runbooks intended for Brick maintainers.

Customer documentation may state a safety outcome—for example, “Brick limits file actions to your hosting space”—only when the corresponding control is verified. It must not explain how to bypass or test that boundary.

## Recommended remediation sequence

The first remediation is **not** a content expansion. Engineering must close the Shared P0 tenant isolation gaps and prove them with two-tenant tests. Until then, BrickDocs should retain the edition-aware shell but place any capability claim that depends on file, database, terminal, authentication, or recovery authorization behind a release-evidence review.[3]

| Order | Action | Owner | Completion condition |
| --- | --- | --- | --- |
| 1 | Implement and enforce Shared tenant context on every protected API group. | Shared Panel Engineering | Unauthenticated and cross-tenant requests fail closed; two-tenant E2E passes. |
| 2 | Scope login, recovery, database, file, archive, log, and audit operations by tenant identity. | Shared Panel Engineering | Repository and API tests prove owner-only access. |
| 3 | Replace direct process execution with a policy-enforced cage, allowlist, quotas, timeouts, and durable audit evidence. | Shared Platform Engineering | Adversarial shell tests pass; no direct host execution path remains. |
| 4 | Produce a release capability manifest for Shared and Dedicated. | Release Engineering | Each public guide claim maps to a tested panel route, role, edition, and release version. |
| 5 | Revise public guides against the manifest and label beta or unavailable features truthfully. | Documentation | Claim review signs off; no release-blocked workflow is presented as available. |
| 6 | Re-run BrickDocs route, content-boundary, responsive, and accessibility checks. | Documentation Engineering | Browser verification, unit tests, build, and publication review pass. |

## References

[1]: https://github.com/devrahmanbd/flamehoster/blob/main/SYSTEM.md "Brick System Contract and Edition Model"
[2]: https://github.com/devrahmanbd/flamehoster/blob/main/docs/BRICK_EDITION_ARCHITECTURE_AND_RELEASE_SUMMARY.md "Brick Edition Architecture and Release Summary"
[3]: https://github.com/devrahmanbd/flamehoster/blob/main/docs/BRICK_SECURITY_ASSESSMENT_REPORT.md "Brick Security Assessment Report"
[4]: ../client/src/data/guides.ts "BrickDocs published guide dataset"
[5]: ../client/src/lib/docs.ts "BrickDocs edition-aware route and content helpers"
[6]: ../scripts/verify-docs-product.mjs "BrickDocs browser interaction verification"
