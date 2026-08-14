# Operations Guide

## Safe change sequence

1. Record the change intent, target host, operator, and expected health signals.
2. Run `brick-sentinel -cmd check` and resolve mandatory failures.
3. Capture `brick-sentinel -cmd blueprint` and store the manifest with the change record.
4. Confirm filesystem snapshot support and available recovery storage.
5. Apply the update through Brick rather than by-passing the transaction layer.
6. Verify the panel, agent, container runtime, reverse proxy, ports, and customer-facing health checks.
7. Close the change only after the observation window passes without regressions.

## Failure handling

A failed command is evidence, not a rollback decision by itself. Use the health contract and the transaction record to decide whether the system remained safe. If the control plane is unreachable after an update, Sentinel is the out-of-band recovery surface. Do not remove the pre-change snapshot until the observation window and backup retention policy both permit it.

## Smoke test matrix

| Flow | Expected evidence |
| --- | --- |
| Fresh install | Installer completes, `brickctl status` is healthy, login page loads, and first operator can finish MFA setup |
| Login | Valid credentials create a session, invalid credentials are rate limited, and audit logs contain actor and result |
| Marketplace deploy | Port and FQDN plan is conflict-free, health check passes, reverse proxy binds, and logs are visible |
| Upgrade | Preflight passes, manifest is saved, transaction is visible, health checks run after restart, and rollback remains available |
| Kernel failure simulation | Sentinel detects the failed health contract and invokes the configured recovery path without deleting customer data |

## Protect customer data first

Before updating Brick, the host kernel, a package set, a database, or a stateful marketplace application, confirm that the backup includes the data and configuration that matter to the service owner.

| Backup set | Include |
| --- | --- |
| Customer data | Database files, uploads, object storage metadata, and application-managed content |
| Brick state | Deployment records, FQDN and proxy configuration, secrets references, and panel settings |
| Host state | Package inventory, service units, firewall policy, mount layout, and relevant system configuration |
| Evidence | Audit logs, update logs, health results, and the pre-change state manifest |

A backup is not a recovery plan until a restore has been tested on an isolated target. Record the restore date, source snapshot, duration, missing dependencies, and any manual steps.

## Understand the SATURE boundary

SATURE should treat an update as a transaction: resolve the target and dependency plan, capture the Brick State Manifest and relevant logs, create a filesystem-native snapshot when the host supports BTRFS or ZFS, stage changes, verify the health contract, and commit only after the control plane, agent, network binding, data mounts, and boot path remain healthy. If the contract fails, preserve evidence and invoke the rollback path.

On filesystems without native snapshots, the manifest and package inventory are a fallback record, not a copy of customer data. Protect customer data with a separate tested backup.

## Kernel and boot changes

Kernel updates require more caution than ordinary panel updates. Confirm that the new kernel is installed alongside a known-good entry, that the bootloader configuration is readable, and that the Sentinel recovery path is armed before rebooting. Do not remove the previous working kernel until the new boot has been observed and the recovery window has expired.

If the host fails to return after a kernel change, use the out-of-band or console path to select the known-good boot entry. Preserve boot logs, the state manifest, package transaction output, and Sentinel evidence before attempting another update.

## Post-change verification

After every update, validate the same operator journey that matters in production: sign in, load the dashboard, inspect host and application status, reach a test FQDN, read service logs, and confirm that the firewall and scheduled tasks remain active. Only then close the change record.

## References

[1]: https://btrfs.readthedocs.io/en/latest/Scrub.html "BTRFS documentation"
[2]: https://openzfs.github.io/openzfs-docs/ "OpenZFS documentation"
[3]: https://www.gnu.org/software/grub/manual/grub/grub.html "GNU GRUB manual"
[4]: https://github.com/devrahmanbd/flamehoster "Brick source repository"
