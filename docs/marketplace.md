# App Marketplace Guide

Marketplace entries should be treated as typed deployment contracts rather than display cards. A valid entry describes the image, architecture, ports, volumes, environment variables, health checks, reverse-proxy expectations, persistence model, backup behavior, and upgrade notes.

## Deployment checklist

Before submitting a deployment, Brick should resolve a unique host port, an available internal service name, a non-conflicting FQDN, a compatible database and cache instance, and a reverse-proxy configuration. The backend owns conflict resolution; the frontend displays the plan and any required operator decisions.

## Health and status

A deployment is not complete when the container starts. Brick should wait for the declared health check, confirm the intended port is listening, verify the reverse proxy route, and surface logs for failures. Status should distinguish planned, pulling, starting, healthy, degraded, failed, stopping, and removed states.

## Updates and data safety

Application updates must preserve customer volumes and produce a recoverable configuration record. If the image or Compose contract changes a volume, port, or environment variable, show the migration impact before applying it. App updates should compose with SATURE when they modify host-level state.
