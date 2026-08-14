export interface GuideSection {
  title: string;
  body: string;
  bullets?: string[];
  code?: string;
}

export interface GuideArticle {
  slug: string;
  category: string;
  eyebrow: string;
  title: string;
  intro: string;
  read: string;
  version: string;
  sections: GuideSection[];
}

export const allGuides: GuideArticle[] = [
  {
    slug: "getting-started",
    category: "Start Here",
    eyebrow: "GETTING STARTED",
    title: "Install Brick and sign in safely",
    intro: "A first boot is complete when the host is prepared, the operator boundary is protected, and a durable state record exists for future updates.",
    read: "5 min",
    version: "v0.9 stable",
    sections: [
      {
        title: "Prepare the host environment",
        body: "Brick is engineered for dedicated or virtual Linux hosts running Debian or RHEL-family distributions. Before executing the installation script, confirm that systemd is active, a supported package manager is available, and storage headroom is sufficient for application containers and logs.",
        bullets: [
          "Confirm root or sudo privileges on the target host.",
          "Verify systemd service supervision is running without degradation.",
          "Ensure Docker and Compose runtimes are installed or ready for automated deployment."
        ],
        code: "sudo -v\nsystemctl is-system-running\ndocker version"
      },
      {
        title: "Run the installation and verify",
        body: "Execute the official installation bundle to provision the Brick control plane, host agent, and out-of-band sentinel watchdog. Once installed, use brickctl and brick-sentinel to confirm operational health.",
        bullets: [
          "Check core service status through systemd and brickctl.",
          "Run the Sentinel dependency check to audit host prerequisites.",
          "Capture the initial Brick State Manifest (BSM) blueprint."
        ],
        code: "sudo brickctl status\nsudo systemctl status brick --no-pager\nsudo brick-sentinel -cmd check\nsudo brick-sentinel -cmd blueprint"
      },
      {
        title: "Secure the first boot and MFA",
        body: "Open the panel on your configured listen port and complete the initial operator account creation. Choose a high-entropy password generated specifically for this installation and enroll passkey or TOTP multi-factor authentication immediately before exposing the hostname to public traffic."
      }
    ]
  },
  {
    slug: "deploying-apps",
    category: "Applications",
    eyebrow: "APP MARKETPLACE",
    title: "Deploy containerized applications without guessing",
    intro: "Brick turns an application template into an atomic deployment contract covering image provenance, port allocation, volume persistence, environment injection, health checks, and FQDN routing.",
    read: "8 min",
    version: "v0.9 stable",
    sections: [
      {
        title: "Evaluate marketplace templates",
        body: "Choose from over 120 maintained application templates. Review the image repository, pinned digest or version tag, exposed container ports, required environment variables, persistent volumes, and reverse proxy settings before submitting the deployment plan."
      },
      {
        title: "Backend port conflict resolution",
        body: "Never select host ports by trial and error. Brick's backend compares requested container ports against the panel entrance, system listeners, existing tenant deployments, and reserved system ranges to guarantee zero collisions."
      },
      {
        title: "Verify FQDN and TLS routing",
        body: "Provide your production domain name and let Brick generate the Nginx reverse-proxy binding and automated Let's Encrypt certificate challenge. Test the external HTTPS endpoint rather than relying solely on local container health."
    }
    ]
  },
  {
    slug: "databases",
    category: "Data & Storage",
    eyebrow: "DATABASES & CACHE",
    title: "Provision and manage high-performance databases",
    intro: "Manage MySQL, PostgreSQL, Redis, and MongoDB instances with isolated container networks, automated backups, persistence verification, and secure credential rotation.",
    read: "6 min",
    version: "v0.9 stable",
    sections: [
      {
        title: "Provisioning isolated database instances",
        body: "Create dedicated database containers with custom resource limits, persistent storage mounts on high-speed volumes, and secure internal networking. Brick automatically wires environment credentials for connected marketplace apps without exposing database ports to the public internet.",
        code: "brickctl db create --engine postgres --version 16 --name production_db\nbrickctl db grant --database production_db --user app_user --privileges all"
      },
      {
        title: "Automated backups and point-in-time recovery",
        body: "Configure retention-backed scheduled snapshots for all database engines. Backups are compressed, encrypted at rest, and stored in configured object storage or local backup volumes with automated restoration drill support."
      },
      {
        title: "Performance tuning and monitoring",
        body: "Inspect real-time connection counts, slow query logs, buffer pool utilization, and memory usage through the built-in database dashboard. Apply optimized configuration templates with a single click."
      }
    ]
  },
  {
    slug: "ssl-tls",
    category: "Security & Network",
    eyebrow: "SECURITY & SSL",
    title: "Configure SSL/TLS certificates and domain routing",
    intro: "Secure every tenant hostname with automated Let's Encrypt certificates, custom wildcard certificates, HTTP/3 support, and enterprise cipher suites.",
    read: "6 min",
    version: "v0.9 stable",
    sections: [
      {
        title: "Automated Let's Encrypt certificates",
        body: "Request and renew SSL certificates automatically via ACME HTTP-01 or DNS-01 challenges. Brick monitors certificate expiration and handles zero-downtime renewals in the background.",
        code: "brickctl ssl request --domain example.com --email admin@example.com --auto-renew"
      },
      {
        title: "Custom and wildcard certificates",
        body: "Upload enterprise wildcard certificates (.crt / .key pairs or PKCS#12 bundles) and bind them across multiple application subdomains with centralized renewal tracking."
      },
      {
        title: "HTTP/2, HTTP/3, and security headers",
        body: "Enforce strict transport security (HSTS), OCSP stapling, modern TLS 1.3 ciphers, and HTTP/3 QUIC protocol streaming across all reverse proxy virtual hosts."
      }
    ]
  },
  {
    slug: "file-manager",
    category: "Data & Storage",
    eyebrow: "FILE MANAGEMENT",
    title: "Manage files, permissions, and web roots",
    intro: "Browse, edit, upload, compress, and secure application files directly within the Brick interface using a high-performance web file manager with syntax highlighting and permission controls.",
    read: "5 min",
    version: "v0.9 stable",
    sections: [
      {
        title: "High-performance web file browser",
        body: "Navigate site directories, inspect file sizes, sort by modification date, and preview media assets instantly. The file manager supports multi-file selection, drag-and-drop uploads, and fast archive extraction (ZIP/TAR.GZ)."
      },
      {
        title: "Built-in code editor",
        body: "Edit configuration files, environment variables, Nginx snippets, and theme assets using an integrated code editor with syntax highlighting for PHP, JavaScript, Python, YAML, and CSS."
      },
      {
        title: "POSIX permissions and ownership",
        body: "Quickly modify file permissions (chmod 644/755) and user/group ownership (chown) to prevent web-server permission errors and secure sensitive configuration files."
      }
    ]
  },
  {
    slug: "php-management",
    category: "Applications",
    eyebrow: "PHP RUNTIMES",
    title: "Manage multi-version PHP runtimes and extensions",
    intro: "Run multiple PHP versions (PHP 7.4 through PHP 8.3) concurrently on the same host, configure opcache, manage PHP extensions, and switch runtime environments per website.",
    read: "7 min",
    version: "v0.9 stable",
    sections: [
      {
        title: "Multi-version PHP architecture",
        body: "Install and run PHP 7.4, 8.0, 8.1, 8.2, and 8.3 simultaneously via isolated PHP-FPM pools. Assign specific PHP runtimes to individual website directories or virtual hosts without host conflict."
      },
      {
        title: "Extension manager",
        body: "Enable or disable PHP extensions (imagick, redis, gd, curl, mbstring, bcmath, pdo) with a single click and automatic FPM service reloading."
      },
      {
        title: "Resource limits and php.ini tuning",
        body: "Customize execution time, memory limits, post max size, upload max filesize, and opcache settings globally or per website through an intuitive settings panel."
    }
    ]
  },
  {
    slug: "wordpress-cms",
    category: "Applications",
    eyebrow: "WORDPRESS & CMS",
    title: "Deploy WordPress and enterprise CMS platforms",
    intro: "Launch optimized WordPress, Ghost, Strapi, and Drupal sites with pre-configured Nginx caching, Redis object cache, automated staging, and WP-CLI integration.",
    read: "8 min",
    version: "v0.9 stable",
    sections: [
      {
        title: "Optimized WordPress one-click deployment",
        body: "Deploy a production-ready WordPress instance pre-configured with Nginx FastCGI caching, Redis object cache persistence, SSL redirection, and automated database provisioning."
      },
      {
        title: "Integrated WP-CLI and management",
        body: "Manage plugins, themes, database updates, and user resets directly through an embedded terminal or GUI actions without needing manual SSH or FTP access."
      },
      {
        title: "Staging and cloning workflows",
        body: "Create isolated staging clones of production sites for testing plugin upgrades or theme modifications before syncing changes back to live production."
      }
    ]
  },
  {
    slug: "backups",
    category: "Operations",
    eyebrow: "BACKUPS & RECOVERY",
    title: "Back up and restore websites, databases, and host state",
    intro: "Protect production workloads with automated scheduled backups, object storage integration (S3, WebDAV, SFTP), and point-in-time restoration testing.",
    read: "6 min",
    version: "v0.9 stable",
    sections: [
      {
        title: "Comprehensive backup scheduling",
        body: "Configure automated daily or hourly backups covering website files, database dumps, SSL certificates, and panel configuration metadata. Store backups locally or sync to remote S3 buckets."
      },
      {
        title: "Point-in-time restoration",
        body: "Restore individual databases, specific website directories, or full host snapshots without overwriting unrelated services. Brick verifies archive integrity before initiating restoration."
      },
      {
        title: "SATURE preflight and recovery integration",
        body: "Combine backup snapshots with SATURE transactional updates and Sentinel out-of-band watchdog verification to guarantee a reliable rollback path for kernel and system changes."
      }
    ]
  },
  {
    slug: "security",
    category: "Security & Network",
    eyebrow: "SECURITY STACK",
    title: "Harden Brick with MFA, firewalling, and malware detection",
    intro: "Protect your infrastructure with NFTables network rules, multi-factor authentication, file-integrity monitoring, and multi-vector malware scanning.",
    read: "7 min",
    version: "v0.9 stable",
    sections: [
      {
        title: "NFTables firewall and rate limiting",
        body: "Manage modern NFTables firewall rules through an intuitive interface. Enforce default-deny inbound policies, restrict administrative SSH access, and apply robust rate limits at authentication endpoints."
      },
      {
        title: "File-integrity monitoring and malware scanner",
        body: "Schedule automated scans to detect unauthorized file modifications, suspicious web shells, obfuscated PHP scripts, and backdoor connections across application web roots."
      },
      {
        title: "Operator audit logging",
        body: "Track every administrative action, login attempt, configuration change, and deployment event in a tamper-evident audit trail with actor correlation and timestamps."
      }
    ]
  },
  {
    slug: "troubleshooting",
    category: "Operations",
    eyebrow: "DIAGNOSTICS",
    title: "Diagnose failures and collect evidence safely",
    intro: "Resolve common operational issues with structured diagnostic steps, log aggregation, and safe evidence preservation before applying remediation.",
    read: "6 min",
    version: "v0.9 stable",
    sections: [
      {
        title: "Panel connectivity and service status",
        body: "Verify systemd service health, listener port bindings, firewall rule state, and reverse-proxy routing when the control plane becomes unreachable.",
        code: "systemctl status brick\nnetstat -tulnp | grep brick\nsudo brickctl status"
      },
      {
        title: "Investigating authentication and MFA lockouts",
        body: "Inspect authentication logs and host clock synchronization when login or MFA fails. Use the documented break-glass recovery procedure when rate limiting blocks an administrator."
      },
      {
        title: "Preserving diagnostic evidence",
        body: "Collect service logs, transaction outputs, Sentinel check results, and pre-change state manifests before retrying a failed deployment or update."
      }
    ]
  }
];
