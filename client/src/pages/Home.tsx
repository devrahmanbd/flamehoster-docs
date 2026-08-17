import { ArrowRight, BookOpen, ChevronRight, CircleHelp, FileCheck2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import DocsAssistantDrawer from "../components/DocsAssistantDrawer";
import DocsHeader from "../components/DocsHeader";
import DocsSearchDialog from "../components/DocsSearchDialog";
import DocsSidebar from "../components/DocsSidebar";
import SeoMeta from "../components/SeoMeta";
import { editionOptions, getEditionHomeHref, getGuideHref, groupsForEdition, guidesForEdition, type DocsEdition } from "../lib/docs";

interface HomeProps { edition: DocsEdition; }

const sharedSteps = [
  ["01", "Secure your account", "Set up your account security and learn where tenant controls live.", "getting-started"],
  ["02", "Connect a website", "Point a domain, configure TLS, and verify your live website.", "ssl-tls"],
  ["03", "Manage your application", "Work with files, PHP, CMS configuration, and app deployment tools.", "php-management"],
  ["04", "Protect your data", "Create a recovery routine for databases and website data.", "backups"],
] as const;

const dedicatedSteps = [
  ["01", "Start with the platform", "Understand the dedicated workspace and its managed operational controls.", "getting-started"],
  ["02", "Deploy your workload", "Prepare an application and its service settings in the dedicated console.", "deploying-apps"],
  ["03", "Protect application data", "Review database and recovery planning before you go live.", "databases"],
  ["04", "Operate with confidence", "Use guided diagnostics and support-ready evidence when an issue appears.", "troubleshooting"],
] as const;

export default function Home({ edition }: HomeProps) {
  const [, navigate] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const groups = groupsForEdition(edition);
  const guides = guidesForEdition(edition);
  const editionMeta = editionOptions.find((item) => item.value === edition)!;
  const steps = edition === "shared" ? sharedSteps : dedicatedSteps;
  const firstGuide = guides[0];

  return (
    <div className="docs-app-shell">
      <SeoMeta title={`${editionMeta.label} documentation`} description={editionMeta.description} path={getEditionHomeHref(edition)} type="website" />
      <DocsHeader edition={edition} mobileOpen={mobileOpen} onToggleMobile={() => setMobileOpen((value) => !value)} onOpenSearch={() => setSearchOpen(true)} onEditionChange={(next) => navigate(getEditionHomeHref(next))} />
      <div className="docs-page-grid">
        <DocsSidebar edition={edition} isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        <main className="docs-main docs-home" id="main-content">
          <section className="docs-home-intro" aria-labelledby="docs-home-title">
            <p className="docs-eyebrow">BrickDocs · {editionMeta.label}</p>
            <h1 id="docs-home-title">Clear guidance for every task in your Brick panel.</h1>
            <p className="docs-home-lede">{edition === "shared" ? "Use the Brick Web UI to operate websites, data services, security settings, and recovery workflows without exposing host-level controls." : "Use the Dedicated console guides to plan, deploy, operate, and recover application workloads with deliberate control points."}</p>
            <div className="docs-home-actions">
              {firstGuide ? <Link href={getGuideHref(firstGuide.slug, edition)} className="docs-primary-link">Start with {firstGuide.title}<ArrowRight size={16} /></Link> : null}
              <button type="button" className="docs-secondary-button" onClick={() => setSearchOpen(true)}><BookOpen size={16} />Browse by task</button>
            </div>
          </section>

          <section className="docs-content-section" aria-labelledby="start-here-title">
            <div className="docs-section-heading"><div><p className="docs-eyebrow">New to Brick</p><h2 id="start-here-title">A sensible place to begin</h2></div><span>Follow the sequence or jump to a task.</span></div>
            <div className="docs-start-steps">
              {steps.map(([number, title, copy, slug]) => <Link className="docs-step" href={getGuideHref(slug, edition)} key={slug}><span className="docs-step__number">{number}</span><div><h3>{title}</h3><p>{copy}</p></div><ChevronRight size={17} aria-hidden="true" /></Link>)}
            </div>
          </section>

          <section className="docs-content-section" aria-labelledby="task-guides-title">
            <div className="docs-section-heading"><div><p className="docs-eyebrow">Task guides</p><h2 id="task-guides-title">Find the right workflow</h2></div><span>{guides.length} published guides in this edition</span></div>
            <div className="docs-domain-grid">
              {groups.map((group) => <section className="docs-domain" key={group.id}><div><h3>{group.label}</h3><p>{group.description}</p></div><ul>{group.guides.map((guide) => <li key={guide.slug}><Link href={getGuideHref(guide.slug, edition)}>{guide.title}<ArrowRight size={14} aria-hidden="true" /></Link></li>)}</ul></section>)}
            </div>
          </section>

          <section className="docs-help-band" aria-label="Documentation support options"><div><ShieldCheck size={21} aria-hidden="true" /><div><strong>Operate within your edition’s controls.</strong><span>These guides describe supported panel actions and preserve the separation between Shared-user and Dedicated workflows.</span></div></div><div><CircleHelp size={20} aria-hidden="true" /><span>Use the page search to find a specific panel task.</span></div></section>
        </main>
        <aside className="docs-home-rail" aria-label="Documentation orientation"><p>IN THIS EDITION</p><strong>{editionMeta.label}</strong><span>{editionMeta.description}</span><div><FileCheck2 size={16} /><span>Guides are organized by the job you need to complete.</span></div></aside>
      </div>
      <DocsSearchDialog open={searchOpen} edition={edition} onClose={() => setSearchOpen(false)} />
      <DocsAssistantDrawer open={assistantOpen} edition={edition} onClose={() => setAssistantOpen(false)} onOpen={() => { setMobileOpen(false); setSearchOpen(false); setAssistantOpen(true); }} />
    </div>
  );
}
