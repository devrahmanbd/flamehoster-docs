# Forensic Audit Report: Brick Hosting Panel & Brick Docs

**Author:** Manus AI  
**Scope:** Line-by-line inspection of the Brick hosting panel codebase (`/home/ubuntu/brick`) and the Brick Documentation platform (`/home/ubuntu/brick-docs`), covering security boundaries, update protocols (SATURE), watchdog sentinel, installer script, case-sensitive namespace consistency, and UI architecture.

---

## 1. Executive Summary

Brick is structured as an enterprise-grade control panel built as an evolutionary fork of 1Panel, paired with a Framer/Olympus-inspired documentation platform (`Brick Docs`) [1]. While considerable architectural work has been invested into custom reliability engines (`SATURE`, `Brick Sentinel`, WAF rules, and installer hardening), our forensic, line-by-line audit reveals several critical technical debt items, residual 1Panel namespaces, case-sensitivity hazards, and operational risks that must be addressed prior to high-stakes production deployment.

---

## 2. Key Audit Findings & Severity Classification

| Finding ID | Component | Severity | Description | Confirmed File / Path |
| :--- | :--- | :--- | :--- | :--- |
| **AUD-01** | Namespace & Dependencies | **High** | Residual upstream references (e.g. `1panel-dev/base64Captcha` in `core/go.sum`) and historical script stubs (`1pctl` aliases) create upstream merge friction and brand inconsistency [2]. | `/home/ubuntu/brick/core/go.sum` |
| **AUD-02** | SATURE Update Engine | **High** | The transactional update engine (`sature/transaction.go`) relies on heuristic package manager detection (`apt-get`, `dnf`, `yum`) without cryptographically verifying upstream GPG package signatures prior to staging updates. | `/home/ubuntu/brick/sentinel/pkg/sature/transaction.go` |
| **AUD-03** | Installer File Safety | **Medium** | Earlier interactive installer iterations lacked strict path-type validation (allowing directory replacement or symlink overwrites). Although hardened in `scripts/brick-interactive-install.sh`, edge cases remain when running across divergent Linux distributions. | `/home/ubuntu/brick/scripts/brick-interactive-install.sh` |
| **AUD-04** | Authentication & Session | **Medium** | Panel JWT signing secrets and session cookies rely on environmental configuration; if default bootstrap secrets are retained during deployment, token forging is possible. | `/home/ubuntu/brick/core/` |
| **AUD-05** | Docs UI Layout & Motion | **Low** | Previous iterations suffered from constrained sidebar scrolling at 1024px/mobile and faint CSS motion. Fixed via viewport-bound drawers, independent scroll containers, and explicit Shader Gradient / Skiper-inspired motion tagging. | `/home/ubuntu/brick-docs/client/` |

---

## 3. Detailed Forensic Analysis by Subsystem

### A. Core Panel & Upstream Heritage
- **Technical Debt Overhang**: The core remains tightly coupled to 1Panel's Go architecture. While custom security wrappers (`Brick Sentinel`, rate limiting, WAF rules) have been added, upstream merges will require rigorous manual conflict resolution unless namespacing is strictly enforced via Go interfaces.
- **Dependency Pinning**: `core/go.sum` references `github.com/1panel-dev/base64Captcha`, which ties our captcha generation pipeline to upstream maintainers [2].

### B. SATURE & Sentinel Transactional Engine
- **Atomic Snapshots**: SATURE attempts BTRFS subvolume cloning or ZFS dataset rollbacks when available, falling back to manifest-driven package/config snapshots on standard EXT4 filesystems.
- **Risk**: Automated OS kernel upgrades executed via `apt-get upgrade` or `dnf upgrade` can occasionally trigger unbootable states if third-party driver modules (DKMS) fail to compile against the new kernel headers. The sentinel watchdog provides a 60-second recovery trigger, but physical out-of-band console access may still be required if GRUB fallback hooks fail.

### C. Installer & Script Robustness
- **Hardening Applied**: `scripts/brick-interactive-install.sh` and its automated regression test suite (`scripts/test-brick-interactive-install.sh`) enforce username validation, password length policies (≥ 12 chars), atomic file writes with `600` permissions, and strict absolute path checking.

---

## 4. Prioritized Remediation Roadmap

1. **Namespace Isolation**: Eliminate all remaining references to upstream vendor packages where feasible and wrap third-party dependencies in clean abstraction layers.
2. **Cryptographic Package Verification**: Integrate GPG signature verification into SATURE before executing OS package upgrades.
3. **Automated Upstream Sync Pipeline**: Establish a daily dry-run merge branch in CI to catch upstream 1Panel changes before they break production builds.

---

## 5. References

[1] Brick Hosting Panel & Documentation Platform Architecture. `/home/ubuntu/brick/` and `/home/ubuntu/brick-docs/`.  
[2] Brick Core Go Dependencies and Module Audit. `/home/ubuntu/brick/core/go.mod`, `/home/ubuntu/brick/core/go.sum`.  
[3] SATURE Transactional Update Engine Specification. `/home/ubuntu/brick/sentinel/pkg/sature/transaction.go`.  
[4] Brick Interactive Installer and Regression Harness. `/home/ubuntu/brick/scripts/brick-interactive-install.sh`, `/home/ubuntu/brick/scripts/test-brick-interactive-install.sh`.


## 6. Remediation Applied in This Change

The confirmed `base64Captcha` namespace dependency was removed from executable Brick code. `core/utils/captcha/captcha.go` now imports `github.com/mojocn/base64Captcha`; `core/go.mod` and `core/go.sum` contain only the neutral module and its verified checksums. Stale `1panel-dev` and `brick-dev` captcha checksum entries were removed. The root `package.json` no longer contains an embedded GitHub credential; its repository URL is now unauthenticated.

SATURE now performs a fail-closed signature-verification preflight before package upgrades. APT verification rejects insecure repositories and unauthenticated packages and requires update metadata to complete without errors. DNF/YUM verification requires package, repository-metadata, and local-package GPG checks. The upgrade command repeats the signature-enforcement options. Unit tests cover APT, DNF, YUM, unsupported package managers, and propagated verification failures.

The installer now has a CI-backed container harness at `scripts/test-installer-containers.sh` and `.github/workflows/installer-containers.yml`. The harness exercises dry-run validation, an isolated real installation, file permissions, idempotent password preservation, and symlink-target rejection on Debian Bookworm, Ubuntu 24.04, and Rocky Linux 9. The local sandbox used for this change does not provide Docker or Podman, so the container matrix was syntax-checked and added for execution on a container-capable CI runner; it was not falsely reported as locally executed.

The CI rebrand check no longer excludes `1Panel-dev` from its legacy-reference scan. Historical references remain in planning/audit documents and in generated vendored frontend bundles; those are not executable upstream dependencies and should be handled in a separate asset regeneration task rather than by blind string replacement.

## 7. Verification Record

| Verification | Result |
| :--- | :--- |
| `go test ./...` in `core` | Passed |
| `go mod verify` in `core` | Passed |
| `go test ./...` and `go vet ./...` in `sentinel` | Passed |
| Shell syntax checks for installer scripts | Passed |
| Git diff whitespace check | Passed |
| Credential-pattern scan | Passed; no GitHub token-like credential remains |
| Debian/Ubuntu/Rocky container execution | Not run locally; Docker/Podman unavailable; CI workflow added |
| ShellCheck | Not run; binary unavailable in the sandbox |
