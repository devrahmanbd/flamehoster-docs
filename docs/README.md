# Brick Documentation Source

Brick is a security-first hosting panel for dedicated systems and multi-tenant application operations. This source guide records the current implementation vocabulary so the public docs can stay aligned with the repository rather than over-promising roadmap behavior.

## Read this first

The recommended operator path is **Installation → Architecture → SATURE updates → Sentinel watchdog → Security model → App marketplace**. Keep a terminal with system logs available while applying any host-level change.

## Current system map

| Boundary | Responsibility | Primary implementation area |
| --- | --- | --- |
| Brick Core | API, authentication, settings, application lifecycle, upgrades, audit routing | `core/` |
| Host Agent | Docker, Compose, databases, Nginx, files, terminals, firewall, system utilities | `agent/` |
| SATURE | State capture, preflight, transactional update sequencing, rollback decisions | `sentinel/pkg/sature/` and `core/app/service/upgrade.go` |
| Sentinel | Dependency audit, blueprint capture, watchdog/recovery entry point | `sentinel/cmd/sentinel/` and `sentinel/pkg/checker/` |
| Frontend | Operator navigation, settings, deployments, security controls, status views | `frontend/src/` |

## Public user guides

The public website publishes task-oriented guides for the Brick operator:

| Task | Guide |
| --- | --- |
| Prepare a host and create the first operator | [Install and sign in](getting-started.md) |
| Review templates, ports, persistence, and FQDNs | [Deploy an application](deploying-apps.md) |
| Configure MFA, firewalling, scanning, and telemetry | [Secure Brick](security.md) |
| Back up, update, and recover production systems | [Operate and recover](operations.md) |
| Diagnose failures without destroying evidence | [Troubleshoot Brick](troubleshooting.md) |

The public guide is intentionally written for operators. It does not publish internal source maps, security design notes, transaction implementation details, or upstream-merge procedures.

## First boot

Use a clean supported Debian or RHEL-family host. Confirm systemd, a working package manager, sufficient disk space, and the container runtime before installation. The panel should be bound to a deliberate interface and protected with a non-default entrance path, strong operator credentials, and MFA before it is exposed to the public internet.

```bash
sudo brickctl status
sudo brickctl setup --listen 0.0.0.0:20100
sudo brick-sentinel -cmd check
sudo brick-sentinel -cmd blueprint
```

The `blueprint` command writes a Brick State Manifest snapshot beneath the Sentinel data directory. Treat the resulting manifest as an operational artifact: archive it with the change record and inspect it before a kernel or package update.

## Update discipline

SATURE is designed around a pre-change state boundary. The update flow should capture package inventory and configuration information, create a filesystem-native snapshot where the host supports it, stage the update, verify health, and keep a recovery path armed. BTRFS and ZFS are the preferred snapshot backends; manifest-driven capture is the fallback on filesystems without native snapshot support.

Do not describe a successful package command as a successful system update. A valid result requires the control plane, agent, key services, network binding, and boot path to remain healthy after the change. If the health contract is not met, preserve evidence and invoke the rollback path rather than retrying blindly.

## Security operations

Brick uses layered controls rather than a single scanner. Operators should combine passkey or TOTP MFA, firewall rules, rate limits, file-integrity monitoring, malware scanning, service logs, and network telemetry. Suspicious file changes should be correlated with the actor, process, deployment, and time window before cleanup. Do not delete evidence before the incident record is complete.

## Marketplace operations

Every marketplace application should be evaluated as a deployment contract with image, port, volume, environment, health check, reverse proxy, and update requirements. Port allocation and FQDN binding must be resolved by the backend before the frontend presents a deployable plan. A UI that allows a collision is a platform defect, not an operator error.

## Repository map

Read the public website for the operator narrative, then use the repository map below when extending Brick:

| Area | What to inspect first |
| --- | --- |
| Authentication and MFA | `core/app/service/auth.go`, `core/app/api/v2/setting.go`, frontend login and settings views |
| Upgrade and rollback | `core/app/service/upgrade.go`, `sentinel/pkg/sature/transaction.go`, `sentinel/pkg/sature/manifest.go` |
| Preflight and watchdog | `sentinel/pkg/checker/checker.go`, `sentinel/cmd/sentinel/main.go` |
| Firewall | `agent/utils/firewall/`, especially the NFTables client |
| App deployment | `agent/utils/docker/`, Compose helpers, marketplace templates, reverse proxy services |
| System and network telemetry | `agent/utils/psutil/`, host monitoring services, future Prometheus/Grafana integration points |

## Documentation boundaries

The public `./docs` directory is the source for `flamehoster-docs`. Internal engineering notes are stored separately at `/home/ubuntu/brick-internal-docs` and are not part of the public repository. Keep credentials, incident evidence, unreleased design decisions, and detailed attack-surface analysis in the private set.

## Accuracy policy

Capabilities that are experimental, partially implemented, or represented in the roadmap must be labeled as such in production documentation. Brick documentation should state what the current code does, what it validates, and what remains a planned hardening task. Avoid claims of absolute reliability; describe the recovery contract and its test evidence instead.
