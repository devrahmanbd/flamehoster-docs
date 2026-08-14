# Troubleshooting Brick

Troubleshooting should reduce uncertainty without destroying evidence. Start with the smallest safe observation, record the time and affected host, then change one thing at a time. If customer traffic or credentials may be affected, switch to the incident procedure and preserve logs before remediation.

## First-response checklist

| Question | Evidence |
| --- | --- |
| Is the panel process running? | `systemctl status`, service logs, recent restart time |
| Is the host reachable? | DNS result, TCP connection, reverse-proxy response |
| Is the port bound by the expected process? | Listener inventory and deployment record |
| Did the failure begin after a change? | Audit trail, transaction ID, deployment or update history |
| Is storage healthy? | Filesystem usage, mount state, I/O errors |
| Is the container or service healthy? | Health check, logs, dependency status |

## Panel is not reachable

Confirm that the host is reachable on the expected interface and that the panel service is running. Check whether the listener changed after a restart, whether the firewall policy persisted, and whether a reverse proxy points to the current port. Do not open a second random port before you know which component owns the original binding.

If the service is running but the browser cannot connect, compare a local request with an external request. A local success and external failure usually indicates DNS, firewall, proxy, or source-range policy rather than an application crash.

## Login or MFA fails

Check the browser timestamp against authentication logs and verify that the host clock is synchronized. Preserve the failed-login event before resetting credentials. If rate limiting or lockout is active, use the documented break-glass procedure rather than repeatedly retrying. After recovery, rotate the affected credential and review recent sessions and audit events.

## Application deploy is unhealthy

Start with the generated deployment plan. Confirm the image, environment variables, volume permissions, database or cache endpoint, port, FQDN, and health check. Read the application logs before restarting. A service that repeatedly restarts may be failing on a migration or missing secret; restarts alone can hide the first useful error.

## Update failed

Do not immediately run the update again. Preserve the transaction record, package output, health results, service logs, boot logs, and the pre-change manifest. Determine whether the control plane is healthy, whether customer data mounts are present, and whether the host is still using the expected kernel and boot entry. Use the rollback path defined by the transaction state and recovery policy.

## Scan finding or suspicious outbound connection

Treat the finding as a security investigation. Record the file or process identity, hash, ownership, permissions, parent process, open connections, deployment owner, and relevant access logs. Isolate the affected service or host only when the incident procedure authorizes it and the impact is understood. Do not delete the artifact before evidence collection.

## Collect a support bundle

A useful support bundle includes the Brick release, operating-system family, service status, Sentinel check output, recent transaction identifier, relevant logs, network binding summary, and a description of the last known-good state. Redact passwords, tokens, private keys, customer content, and personal data before sharing it.

## References

[1]: https://github.com/devrahmanbd/flamehoster "Brick source repository"
[2]: https://www.freedesktop.org/wiki/Software/systemd/ "systemd documentation"
[3]: https://docs.docker.com/engine/containers/run/ "Docker container runtime documentation"
