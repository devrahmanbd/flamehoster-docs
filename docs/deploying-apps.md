# Deploy an application

Brick treats an application deployment as a contract between an image, a network plan, persistent storage, environment configuration, health checks, and a reverse-proxy route. The UI should help you review that contract before it creates resources. If any field is unresolved, stop and fix the deployment plan rather than editing ports or paths manually after launch.

## Choose a template

Open the App Marketplace and select a maintained template. Review the image source, version or digest policy, exposed ports, required environment variables, volumes, database dependencies, cache dependencies, health check, and supported upgrade path.

| Deployment field | Operator question |
| --- | --- |
| Image | Is the image from a source you trust, and is the version pinned? |
| Ports | Which container ports are required, and which host ports are available? |
| Persistence | Which directories must survive a container replacement? |
| Environment | Which secrets, URLs, and storage settings are required? |
| Health check | What signal proves the service is actually ready? |
| FQDN | Which hostname should the reverse proxy route to this instance? |
| Dependencies | Does the service need a dedicated database, cache, queue, or object store? |

## Let Brick resolve the network plan

Do not choose a host port by guessing. Brick should check the panel's own port, existing listeners, other applications, reserved system ports, and the requested protocol before it presents an installable plan. If the port is already allocated, the backend must reject the plan or select a safe alternative.

For a public service, provide the desired FQDN and let Brick generate the reverse-proxy binding from the deployment record. Verify that the FQDN points to the correct host before requesting a certificate. A DNS record that reaches the wrong server can make a healthy deployment look broken and can expose an unintended service.

## Attach storage deliberately

Classify each volume before deployment:

| Storage type | Use it for | Recovery note |
| --- | --- | --- |
| Application data | Databases, uploads, indexes, and user content | Include it in the backup policy and restoration test |
| Configuration | Secrets, runtime configuration, and generated keys | Protect permissions and avoid copying into public logs |
| Cache | Rebuildable caches and temporary artifacts | Usually exclude from full backup unless recovery requires it |
| Logs | Audit, access, and diagnostic evidence | Retain according to the incident and compliance policy |

Never assume that a container image contains customer data. Verify the mount plan and test a replacement deployment before trusting the application with production traffic.

## Deploy and verify

Review the generated plan, then deploy. After launch, check the container state, health check, logs, reverse-proxy response, TLS certificate, and persistence mount. Test the application through its intended FQDN rather than only through a local port.

```text
1. Plan generated: image, ports, volumes, environment, FQDN, dependencies
2. Conflict check: no collision with Brick, system services, or another tenant
3. Resources created: network, storage, service, proxy binding
4. Health confirmed: readiness signal is passing
5. External path tested: FQDN, TLS, and application login respond correctly
```

If a deployment is unhealthy, capture logs and the generated plan first. Avoid repeatedly restarting a service that may be failing because of a bad migration, missing secret, or incompatible volume format.

## Updating an app

Prefer the marketplace update action when it exists, because it can preserve the deployment record and run the template's health checks. Before an update that changes persistent data or a database image, confirm that a backup exists and that the application has a documented downgrade or restore path.

## Next step

Read [Secure Brick](security.md) to protect the panel and deployed services, then use [Operate and recover](operations.md) for backup and update discipline.

## References

[1]: https://docs.docker.com/compose/ "Docker Compose documentation"
[2]: https://github.com/devrahmanbd/flamehoster "Brick source repository"
