/* Brick Docs design reminder: the guide reader stays obsidian, readable, task-first, and evidence-led, with cyan navigation signals and high-contrast content blocks. */
import { ArrowLeft, CheckCircle2, ChevronRight, Copy, ShieldCheck, Terminal, Wrench } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useRoute } from "wouter";

type GuideContent = {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  read: string;
  sections: Array<{ title: string; body: string; bullets?: string[]; code?: string }>;
};

const guides: GuideContent[] = [
  {
    slug: "getting-started",
    eyebrow: "USER GUIDE / START HERE",
    title: "Install Brick and sign in safely.",
    intro: "A first boot is complete when the host is prepared, the operator boundary is protected, and a state record exists for future changes.",
    read: "5 min",
    sections: [
      { title: "Prepare the host", body: "Use a clean Debian or RHEL-family host with systemd, a working package manager, a supported container runtime, stable DNS when an FQDN is required, and enough storage for images, logs, backups, and recovery artifacts.", bullets: ["Confirm root or sudo access.", "Check package manager and systemd health.", "Review existing listeners, firewall policy, and unmanaged workloads.", "Confirm the hostname and timezone before certificates or scheduled jobs."] },
      { title: "Verify the first boot", body: "After installation, confirm that the panel service and independent recovery tooling are present. Inspect the installer before execution and prefer a versioned release artifact over an unpinned development build.", code: "sudo brickctl status\nsudo systemctl status brick --no-pager\nsudo brick-sentinel -cmd check\nsudo brick-sentinel -cmd blueprint" },
      { title: "Lock down the operator boundary", body: "Create a unique operator password, change any default entrance, create a break-glass account, and enroll passkey or TOTP MFA before exposing the panel publicly. Keep the recovery material offline and test the recovery path in a maintenance window." },
    ],
  },
  {
    slug: "deploying-apps",
    eyebrow: "USER GUIDE / APPLICATIONS",
    title: "Deploy an application without guessing.",
    intro: "Brick turns an app template into a deployment contract: image, ports, persistence, environment, health, dependencies, and FQDN routing.",
    read: "8 min",
    sections: [
      { title: "Review the template", body: "Before launch, review the image source and version, exposed ports, volume mounts, required variables, secrets references, database or cache dependencies, health check, reverse-proxy metadata, and update path." },
      { title: "Let the backend resolve ports", body: "Never choose a port by trial and error. Brick must compare the requested ports against the panel, system listeners, existing deployments, reserved policy, and concurrent allocations. A conflict is a backend validation failure, not a frontend choice." },
      { title: "Verify the external path", body: "After deployment, check the service state, health signal, logs, storage mounts, FQDN, and TLS path. A local container response is not enough: test the application through the hostname that users will reach.", bullets: ["Plan generated and conflict-free.", "Resources created with the expected volumes.", "Health check passing after the startup grace period.", "Reverse proxy and TLS route return the expected application."] },
    ],
  },
  {
    slug: "security",
    eyebrow: "USER GUIDE / SECURITY",
    title: "Make the panel harder to misuse.",
    intro: "Security is a layered operating practice: identity, network policy, scanning, evidence, and monitoring reinforce one another.",
    read: "7 min",
    sections: [
      { title: "Protect identity", body: "Enable MFA for every operator, keep a separate break-glass identity, scope API tokens, and review failed-login and session events. Do not share operator accounts because audit attribution matters during an incident." },
      { title: "Reduce network exposure", body: "Use NFTables as the authoritative firewall backend. Start with deny-by-default inbound policy, restrict SSH sources, and allow application ports only when an active deployment record explains them. Record why every privileged rule exists." },
      { title: "Treat detections as evidence", body: "A suspicious file or outbound connection should open an investigation. Preserve path, hash, owner, permissions, process ancestry, deployment identity, and logs before quarantine. A heuristic finding is not proof of compromise by itself." },
    ],
  },
  {
    slug: "operations",
    eyebrow: "USER GUIDE / OPERATIONS",
    title: "Update with a way back.",
    intro: "Before a risky change, capture the state, protect customer data, validate the recovery handle, and keep the health contract visible until the observation window passes.",
    read: "9 min",
    sections: [
      { title: "Capture before change", body: "Run the Sentinel check and blueprint, store the manifest with the change record, verify snapshot support, and confirm a tested data backup. A manifest is state evidence; it is not a complete customer-data backup on a non-snapshot filesystem.", code: "sudo brick-sentinel -cmd check\nsudo brick-sentinel -cmd blueprint" },
      { title: "Understand SATURE", body: "The transaction should resolve dependencies, capture state, create a native snapshot where supported, stage changes, apply them, verify the control plane, agent, network, data, and boot path, and commit only after the health contract passes." },
      { title: "Handle failure", body: "If the health contract fails, preserve transaction logs, package output, boot evidence, and the pre-change manifest. Use the configured rollback or known-good boot path rather than rerunning the update blindly. Keep the failed change open until recovery is verified." },
    ],
  },
  {
    slug: "troubleshooting",
    eyebrow: "USER GUIDE / RECOVERY",
    title: "Diagnose without destroying evidence.",
    intro: "Observe first, change one variable at a time, and preserve the timestamped evidence that explains the failure.",
    read: "6 min",
    sections: [
      { title: "Panel is unreachable", body: "Compare local and external connectivity, confirm the listener and firewall state, inspect the reverse-proxy target, and verify that a restart did not change the configured binding. Do not open a random second port before identifying the owner of the original one." },
      { title: "Login or MFA fails", body: "Compare the browser time with host logs, preserve the failed event, and use the documented break-glass flow if rate limiting is active. After recovery, rotate the affected credential and review recent sessions." },
      { title: "An update failed", body: "Do not immediately retry. Preserve the transaction ID, health results, service logs, package output, and manifest. Determine whether the control plane, agent, customer data mounts, kernel, and boot entry remain healthy before selecting rollback or manual recovery." },
    ],
  },
];

export default function Guide() {
  const [, params] = useRoute("/docs/:slug");
  const guide = useMemo(() => guides.find((item) => item.slug === params?.slug) ?? guides[0], [params?.slug]);
  const [copied, setCopied] = useState(false);

  const copyCode = async (code: string) => {
    await navigator.clipboard?.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="docs-app guide-app">
      <header className="topbar">
        <div className="topbar__brand"><Link href="/" className="guide-back"><ArrowLeft size={15} /></Link><div className="brand-mark brand-mark--fallback">B</div><span className="brand-name">Brick<span>Docs</span></span><span className="brand-version">USER GUIDE</span></div>
        <div className="topbar__actions"><Link href="/" className="topbar-link">Back to docs <ChevronRight size={14} /></Link></div>
      </header>
      <main className="guide-layout">
        <aside className="guide-index">
          <span className="eyebrow-dot" /> <span>Public documentation</span>
          <h2>Operator guides</h2>
          <nav aria-label="User guides">
            {guides.map((item) => <Link key={item.slug} href={`/docs/${item.slug}`} className={item.slug === guide.slug ? "guide-index__link guide-index__link--active" : "guide-index__link"}>{item.title.replace(/[.!?].*$/, "")} <ChevronRight size={13} /></Link>)}
          </nav>
          <div className="guide-index__note"><ShieldCheck size={16} /><span>Public docs contain safe operator workflows. Internal design notes stay outside this repository.</span></div>
        </aside>
        <article className="guide-article">
          <div className="guide-article__meta"><span>{guide.eyebrow}</span><span>{guide.read} read</span></div>
          <h1>{guide.title}</h1>
          <p className="guide-article__intro">{guide.intro}</p>
          <div className="guide-rule" />
          {guide.sections.map((section, index) => <section className="guide-section" key={section.title}><div className="guide-section__index">0{index + 1}</div><div><h2>{section.title}</h2><p>{section.body}</p>{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}><CheckCircle2 size={14} />{bullet}</li>)}</ul>}{section.code && <div className="guide-code"><div className="guide-code__toolbar"><span><Terminal size={13} /> brick shell</span><button onClick={() => copyCode(section.code!)}><Copy size={13} />{copied ? "Copied" : "Copy"}</button></div><pre><code>{section.code}</code></pre></div>}</div></section>)}
          <div className="guide-next"><Wrench size={16} /><div><strong>Keep the change record open</strong><span>Attach the verification evidence before you close the task.</span></div></div>
        </article>
      </main>
    </div>
  );
}
