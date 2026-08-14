# Security Guide

Brick's security posture is layered. Identity controls reduce unauthorized access; the firewall and WAF reduce exposure; file-integrity and malware scanning detect suspicious changes; network monitoring provides context; audit logs preserve accountability.

## Identity

Enable MFA immediately after first login. Prefer passkeys for operators on managed devices and retain TOTP as a recovery factor. Protect the security entrance and panel binding as defense-in-depth controls, not as a replacement for MFA.

## Host and edge defense

Use NFTables as the authoritative firewall backend. Apply a default-deny posture appropriate to the host, allow only required management and application ports, and rate-limit sensitive endpoints. Any rule mutation must be authenticated, logged, and reversible.

## File and malware signals

A credible scanner should combine signatures, file metadata, suspicious permissions, obfuscated or encoded content indicators, shell/backdoor heuristics, process and connection context, and change history. Scan results should be explainable and triageable; never present a heuristic match as a confirmed compromise without evidence.

## Privacy-first telemetry

Collect operational metrics needed to protect availability and capacity, such as CPU, memory, disk, connection counts, rejected flows, service latency, and update health. Avoid third-party trackers in the operator UI. Prometheus-compatible metrics, self-hosted dashboards, and opt-in error reporting are preferable to opaque vendor telemetry.

## First security pass

After the first login, complete this sequence before connecting a production hostname:

| Step | Operator action | Evidence to keep |
| --- | --- | --- |
| 1 | Enable passkey or TOTP MFA for every operator | Enrollment record and recovery procedure |
| 2 | Create a separate break-glass account | Offline recovery secret location |
| 3 | Restrict the panel entrance and SSH sources | Firewall diff and approved source ranges |
| 4 | Review active listeners and deployed FQDNs | Listener inventory and deployment list |
| 5 | Run a baseline integrity and malware scan | Scan ID, findings, and exceptions |
| 6 | Verify audit and authentication logs | Test login, denied request, and admin action |

## Investigate suspicious files

When a scan reports a suspicious file, preserve the path, hash, owner, permissions, modification time, process ancestry, deployment identity, and relevant access logs before remediation. A heuristic match is an investigation signal, not proof of compromise. Quarantine only after the evidence is recorded and the service owner understands the impact.

Correlate the file with recent deployments, plugin or theme changes, scheduled jobs, shell history, outbound connections, and authentication events. Hidden files, encoded payloads, shell-like behavior, unexpected startup entries, and unexplained permission changes should increase priority, but they should not be treated as a verdict in isolation.

## Firewall and rate-limit discipline

Use NFTables as the authoritative firewall backend. Begin with a deny-by-default inbound policy, then allow only the panel entrance, restricted SSH, DNS where required, and ports backed by an active deployment record. Apply rate limits at login, administrative, and high-cost API boundaries. Record every mutation with the actor, reason, expected expiry, and rollback command.

Do not mix unmanaged iptables rules with Brick-owned NFTables policy without documenting precedence and persistence. A reboot test is part of firewall verification because a rule that exists only in memory is not a reliable control.

## References

[1]: https://docs.nftables.org/ "nftables documentation"
[2]: https://github.com/rfxn/linux-malware-detect "Linux Malware Detect reference"
[3]: https://www.crowdsec.net/ "CrowdSec reference"
[4]: https://prometheus.io/docs/introduction/overview/ "Prometheus documentation"
