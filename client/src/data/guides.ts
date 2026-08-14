export interface GuideSection {
  title: string;
  body: string;
  bullets?: string[];
  code?: string;
  note?: string;
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
    title: "Navigating the Brick Web Panel",
    intro: "A first boot is complete when the host is prepared, the operator boundary is protected, and a durable state record exists for future updates.",
    read: "5 min",
    version: "v0.9 stable",
    sections: [
      {
        title: "Accessing Your Dashboard Securely",
        body: "Brick provides a clean, web-based management interface for both shared hosting accounts and dedicated instances. Navigate to your designated panel URL in any modern browser. Enter your operator credentials issued by your hosting provider. On your first login, the panel prompts you to establish a secure password and enroll in multi-factor authentication.",
        bullets: [
          "Confirm your assigned panel URL and secure credentials.",
          "Verify multi-factor authentication setup during initial login.",
          "Check your account dashboard to confirm your hosting service tier (shared or dedicated)."
        ],
        code: "Browser -> https://your-panel-domain.tld -> Enter Credentials -> Complete MFA"
      },
      {
        title: "Understanding Shared vs. Dedicated Service Tiers",
        body: "Depending on your account tier, your Brick dashboard adapts to your operational boundaries. Shared hosting accounts feature jailed directory structures and resource quotas, while dedicated instances provide isolated container environments managed entirely through the panel interface.",
        bullets: [
          "Shared hosting: Operates inside jailed user directories with strict resource quotas.",
          "Dedicated hosting: Features dedicated container environments and isolated network boundaries.",
          "No direct host terminal access is exposed to end users in either service model, ensuring strict code safety and system stability."
        ],
        code: "Web UI Dashboard -> Account Settings -> Service Tier & Resource Quotas"
      },
      {
        title: "Securing Your Operator Session",
        body: "Always log out of shared workstations when finished. The panel enforces session timeouts and IP-based rate limiting to protect your hosted data against unauthorized access."
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
        body: "Choose from over 120 maintained application templates directly from the web interface. Review the image repository, pinned version tag, exposed container ports, required environment variables, persistent volumes, and reverse proxy settings before submitting the deployment plan.",
        code: "Panel -> App Marketplace -> Select Template -> Configure Parameters -> Deploy"
      },
      {
        title: "Automatic port and domain resolution",
        body: "Never select host ports by trial and error. Brick's backend compares requested container ports against the panel entrance, system listeners, existing tenant deployments, and reserved system ranges to guarantee zero collisions automatically."
      },
      {
        title: "Verify FQDN and TLS routing",
        body: "Provide your production domain name in the application settings and let Brick generate the Nginx reverse-proxy binding and automated Let's Encrypt certificate challenge through simple web form actions."
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
        body: "Create dedicated database containers with custom resource limits, persistent storage mounts on high-speed volumes, and secure internal networking entirely through the databases dashboard. Brick automatically wires environment credentials for connected marketplace apps without exposing database ports to the public internet.",
        code: "Panel -> Databases -> New Database -> Select Engine (MySQL/PostgreSQL/Redis/Mongo) -> Set Credentials"
      },
      {
        title: "Automated backups and point-in-time recovery",
        body: "Configure retention-backed scheduled snapshots for all database engines directly from the panel. Backups are compressed, encrypted at rest, and stored in configured object storage or local backup volumes."
      },
      {
        title: "Performance tuning and monitoring",
        body: "Inspect real-time connection counts, slow query logs, buffer pool utilization, and memory usage through the built-in database dashboard without needing command-line tools."
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
        body: "Request and renew SSL certificates automatically via ACME HTTP-01 challenges directly from the domain management screen. Brick monitors certificate expiration and handles zero-downtime renewals in the background.",
        code: "Panel -> Websites / Apps -> Domains -> SSL Tab -> Request Let's Encrypt Certificate"
      },
      {
        title: "Custom and wildcard certificates",
        body: "Upload enterprise wildcard certificates (.crt / .key pairs) through the web certificate manager and bind them across multiple application subdomains with centralized renewal tracking."
      },
      {
        title: "HTTP/2, HTTP/3, and security headers",
        body: "Enforce strict transport security (HSTS), OCSP stapling, modern TLS 1.3 ciphers, and HTTP/3 QUIC protocol streaming across all reverse proxy virtual hosts using simple toggle switches in the security settings tab."
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
        body: "Navigate site directories, inspect file sizes, sort by modification date, and preview media assets instantly. The file manager supports multi-file selection, drag-and-drop uploads, and fast archive extraction (ZIP/TAR.GZ) entirely within the browser.",
        code: "Panel -> File Manager -> Browse Directories -> Upload / Extract Archives"
      },
      {
        title: "Built-in code editor",
        body: "Edit configuration files, environment variables, Nginx snippets, and theme assets using an integrated code editor with syntax highlighting for PHP, JavaScript, Python, YAML, and CSS."
      },
      {
        title: "POSIX permissions and ownership",
        body: "Quickly modify file permissions (chmod) and user/group ownership through the file context menu to prevent web-server permission errors and secure sensitive configuration files."
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
        body: "Select and assign PHP 7.4, 8.0, 8.1, 8.2, or 8.3 simultaneously via isolated PHP-FPM pools directly from your website runtime settings. The change takes effect instantly without restarting the server.",
        code: "Panel -> Website Settings -> PHP Version -> Select Runtime Version -> Save"
      },
      {
        title: "Extension manager",
        body: "Enable or disable PHP extensions (imagick, redis, gd, curl, mbstring, bcmath, pdo) with a single click in the extension manager interface."
      },
      {
        title: "Resource limits and php.ini tuning",
        body: "Customize execution time, memory limits, post max size, upload max filesize, and opcache settings globally or per website through intuitive web form inputs."
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
        body: "Deploy a production-ready WordPress instance pre-configured with Nginx FastCGI caching, Redis object cache persistence, SSL redirection, and automated database provisioning directly from the marketplace.",
        code: "Panel -> App Marketplace -> WordPress -> Enter Site Details -> Deploy"
      },
      {
        title: "Integrated site management",
        body: "Manage plugins, themes, database updates, and user resets through panel GUI actions without needing manual SSH or FTP access."
      },
      {
        title: "Staging and cloning workflows",
        body: "Create isolated staging clones of production sites for testing plugin upgrades or theme modifications before syncing changes back to live production with a single click."
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
        body: "Configure automated daily or hourly backups covering website files, database dumps, SSL certificates, and panel configuration metadata directly from the backup manager.",
        code: "Panel -> Backups -> Create Schedule -> Choose Frequency & Destination -> Save"
      },
      {
        title: "Point-in-time restoration",
        body: "Restore individual databases, specific website directories, or full host snapshots without overwriting unrelated services using the web restoration wizard."
      },
      {
        title: "Cloud storage integration",
        body: "Connect external cloud storage targets including Amazon S3, MinIO, or standard WebDAV servers to store encrypted backups off-site through simple form settings."
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
        title: "Firewall and IP access rules",
        body: "Manage firewall rules through the Security Firewall panel to block malicious IP addresses, restrict port access, and enforce geographic access policies.",
        code: "Panel -> Security -> Firewall -> Add IP Rule / Port Restriction -> Apply"
      },
      {
        title: "File-integrity monitoring and malware scanner",
        body: "Launch on-demand or scheduled malware scans across your web roots directly from the security dashboard to inspect files for known web shells and suspicious scripts."
      },
      {
        title: "Operator audit logging",
        body: "Review immutable audit logs recording every login attempt, configuration change, and deployment event directly within the panel activity viewer."
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
        title: "Viewing live container and access logs",
        body: "Access the integrated Log Viewer from any application or database management screen. Inspect real-time stdout, stderr, and Nginx access logs with keyword search and auto-refresh.",
        code: "Panel -> App / Database -> Logs Tab -> Select Stream -> Search Keywords"
      },
      {
        title: "Resolving common operational issues",
        body: "Review built-in troubleshooting wizards for common scenarios such as database connection timeouts, PHP memory exhaustion, and SSL handshake failures directly in the panel interface.",
        note: "All troubleshooting and diagnostic steps are performed securely through the web UI, protecting underlying system stability and shell jail boundaries."
      }
    ]
  }
];
