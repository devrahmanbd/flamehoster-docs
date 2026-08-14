/* Brick Docs design reminder: the header is a quiet utility bar; release context lives with navigation and Ask is the primary help action. */
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { Link } from "wouter";
import { useTheme } from "../contexts/ThemeContext";

interface DocsHeaderProps {
  isGuide?: boolean;
  mobileOpen: boolean;
  onToggleMobile: () => void;
  onOpenSearch: () => void;
}

export default function DocsHeader({ isGuide = false, mobileOpen, onToggleMobile, onOpenSearch }: DocsHeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="kb-topbar">
      <div className="kb-topbar__inner">
        <div className="kb-brand-cluster">
          <button
            className="kb-mobile-toggle"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            onClick={onToggleMobile}
          >
            {mobileOpen ? <X size={18} strokeWidth={1.8} /> : <Menu size={18} strokeWidth={1.8} />}
          </button>
          {isGuide && <Link href="/docs" className="kb-wordmark-back" aria-label="Back to Brick Docs"><span>←</span></Link>}
          <Link href="/" className="kb-wordmark" aria-label="Brick Docs home">
            <span className="kb-wordmark__mark" aria-hidden="true"><i /><i /><i /></span>
            <span className="kb-wordmark__name">Brick</span>
            <span className="kb-wordmark__kind">Docs</span>
          </Link>
          <span className="kb-topbar-divider" aria-hidden="true" />
          <span className="kb-topbar-context">Knowledge base</span>
        </div>

        <div className="kb-topbar__actions">
          <button className="kb-search-trigger" onClick={onOpenSearch} aria-label="Search Brick documentation">
            <Search size={15} strokeWidth={1.8} /><span>Search documentation</span><kbd>⌘ K</kbd>
          </button>
          <button className="kb-icon-link kb-theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}>
            {theme === "light" ? <Moon size={17} strokeWidth={1.8} /> : <Sun size={17} strokeWidth={1.8} />}
          </button>
        </div>
      </div>
    </header>
  );
}
