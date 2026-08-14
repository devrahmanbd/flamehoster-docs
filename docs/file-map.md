# Brick File Map

This file is a compact file-by-file reading map for maintainers. It prioritizes the modules that define operator-visible behavior and safety boundaries.

## Core service layer

`core/app/service/upgrade.go` is the main upgrade orchestration surface. It coordinates version comparison, backup and update workflow calls, and the final panel restart. Changes here should be reviewed with the SATURE transaction contract because a restart is a state boundary, not merely a process action.

`core/app/service/auth.go` owns login-adjacent behavior and WebAuthn configuration. It reads the configured product display name for passkey relying-party metadata, resolves origins and relying-party IDs, and validates the security entrance. Any change to origin handling must be tested with both browser login and passkey registration.

`core/app/service/setting.go` is the mutation surface for system settings. It triggers panel restarts when binding, port, or security settings change. Treat the restart behavior as an operator-visible transaction and preserve the before/after values in logs.

`core/app/api/v2/setting.go` and `core/app/api/v2/upgrade.go` expose authenticated HTTP handlers. Their annotations and DTO shapes are part of the integration contract; update frontend interfaces and audit messages together.

## Agent utility layer

The agent packages deliberately isolate host operations. Docker and Compose helpers manage application lifecycle. Nginx helpers handle reverse-proxy configuration. Database clients wrap MySQL, PostgreSQL, and Redis operations. File utilities provide archives, path filtering, inventory, and optional content-search functions. Firewall clients own rule changes and should be treated as privileged, audited operations.

`agent/utils/common/port_manager.go` is the right place to enforce conflict-free allocation. The frontend may display a proposed port, but backend validation must remain authoritative and race-aware.

## Sentinel and SATURE

`sentinel/pkg/sature/manifest.go` defines the state model captured before a change. It records package and configuration evidence used by later validation and recovery decisions.

`sentinel/pkg/sature/transaction.go` defines the transaction boundary and filesystem strategy. Native BTRFS or ZFS snapshots should be preferred when available; fallback behavior must be explicit and observable.

`sentinel/pkg/checker/checker.go` owns preflight checks for essential host capabilities and free disk. Optional dependencies should be represented as optional in the policy, not silently treated as healthy.

`sentinel/cmd/sentinel/main.go` exposes the operator commands for checking the host, capturing the blueprint, and entering SATURE flows. Keep this binary dependency-light so it remains usable when the main panel or container runtime is unavailable.

## Frontend

The Vue frontend is the operator surface for authentication, system settings, deployment, logs, security, and monitoring. When changing classes, route names, or DTO properties, search the entire `frontend/src` tree and update test selectors and translation keys together. A successful compile is necessary but not sufficient; use browser smoke tests for login, navigation, settings updates, deployment planning, and rollback visibility.
