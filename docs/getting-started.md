# Install and sign in

This guide covers a first Brick installation on a dedicated Linux host. The goal is not only to make the panel answer on a port, but to leave you with a known operator account, a protected entrance, and an initial state record that can be used before the first production change.

## Before you begin

Use a clean Debian or RHEL-family host with systemd, a supported package manager, a working DNS record if you plan to use an FQDN, and enough free storage for the panel, application images, logs, backups, and recovery artifacts. Do not install Brick on a host that already contains unmanaged firewall rules or unknown container workloads until you have recorded the existing state.

| Check | Why it matters | Verification |
| --- | --- | --- |
| Root or sudo access | Installation and host services require privileged operations | `sudo -v` |
| Package manager | The agent may need host dependencies | `command -v apt-get || command -v dnf` |
| systemd | Service supervision and boot recovery depend on it | `systemctl is-system-running` |
| Container runtime | Marketplace workloads use container images and Compose contracts | `docker version` |
| Storage headroom | Images, volumes, logs, and snapshots consume disk | `df -h` |
| Stable hostname | Certificates and reverse proxy routing need a predictable name | `hostname --fqdn` |

## Install the panel

Follow the installation command supplied by the release you have selected. Prefer a versioned release artifact over an unpinned development build. Before executing an installer, inspect the command and confirm the download source, install paths, service names, and requested privileges.

After installation, verify that the control plane and the watchdog are present:

```bash
sudo brickctl status
sudo systemctl status brick --no-pager
sudo brick-sentinel -cmd check
```

The exact service unit names can vary by release packaging. If a command is not available, check the installed package contents and the release notes rather than substituting a legacy command name.

## Complete first boot

Open the panel on the configured listen address. The first-boot flow should guide you to create the initial operator. Use a unique password generated for this installation and do not reuse an administrator password from another service.

Immediately after signing in, complete the following sequence:

1. Confirm the host identity, operating-system family, timezone, and available storage.
2. Change the panel entrance from any default or publicly predictable path.
3. Create a second break-glass operator and store its recovery material offline.
4. Enroll MFA using a passkey or TOTP before exposing the panel to the public internet.
5. Review the active firewall policy and allow only the panel, SSH, DNS, and application ports that you can explain.
6. Run the Sentinel check and capture the initial Brick State Manifest.

```bash
sudo brick-sentinel -cmd check
sudo brick-sentinel -cmd blueprint
```

## Verify the installation

A successful first boot means more than a page loading. Confirm that the login flow works in a private browser session, that a second MFA challenge is required, that the panel remains reachable after a service restart, and that the state manifest is stored in the expected Sentinel data directory.

If login fails, preserve the browser timestamp, panel service logs, reverse-proxy logs, and authentication error record before changing credentials or restarting repeatedly. Evidence collected before remediation is more useful than a clean log after a series of blind retries.

## Next step

Continue with [Deploy an application](deploying-apps.md) for the safest marketplace workflow, or read [Secure Brick](security.md) before connecting the panel to an untrusted network.

## References

[1]: https://github.com/devrahmanbd/flamehoster "Brick source repository"
[2]: https://www.freedesktop.org/wiki/Software/systemd/ "systemd documentation"
