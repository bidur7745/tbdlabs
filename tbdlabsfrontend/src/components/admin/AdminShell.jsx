import { useEffect, useRef, useState } from 'react';
import { ExternalLink, LogOut, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import logoImg from '../../assets/img/logo.png';
import { logoutStaff } from '../../services/api.js';
import { ThemeToggle } from '../ui/ThemeToggle.jsx';
import '../../styles/admin-dashboard.css';

export default function AdminShell({ user, title, subtitle, navigation, activeSection, onSectionChange, navigate, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarPinned, setSidebarPinned] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const sidebarTriggerRef = useRef(null);
  const initials = (user?.name || 'T').split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase();

  useEffect(() => {
    const media = window.matchMedia('(min-width: 721px)');
    const updateViewport = () => setIsDesktop(media.matches);
    updateViewport();
    media.addEventListener('change', updateViewport);
    return () => media.removeEventListener('change', updateViewport);
  }, []);

  const handleLogout = async () => {
    await logoutStaff();
    navigate('/admin/login');
  };

  return (
    <div
      className={`admin-shell${sidebarOpen ? ' sidebar-open' : ''}`}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && sidebarOpen) {
          setSidebarPinned(false);
          setSidebarOpen(false);
          sidebarTriggerRef.current?.focus();
        }
      }}
    >
      <button
        ref={sidebarTriggerRef}
        className="admin-sidebar-trigger"
        type="button"
        aria-label={sidebarPinned ? 'Unpin dashboard sidebar' : 'Pin dashboard sidebar open'}
        aria-expanded={sidebarOpen}
        aria-pressed={sidebarPinned}
        aria-controls="admin-sidebar"
        title={sidebarPinned ? 'Unpin dashboard sidebar' : 'Pin dashboard sidebar open'}
        onMouseEnter={() => setSidebarOpen(true)}
        onFocus={() => setSidebarOpen(true)}
        onClick={() => setSidebarPinned((pinned) => !pinned)}
      >
        <PanelLeftOpen size={17} aria-hidden="true" />
      </button>
      <aside
        id="admin-sidebar"
        className={`admin-sidebar${sidebarOpen ? ' is-open' : ''}`}
        aria-label="Dashboard sidebar"
        aria-hidden={!sidebarOpen && isDesktop}
        inert={!sidebarOpen && isDesktop}
        onMouseEnter={() => setSidebarOpen(true)}
        onMouseLeave={() => { if (!sidebarPinned) setSidebarOpen(false); }}
        onBlur={(event) => {
          if (!sidebarPinned && !event.currentTarget.contains(event.relatedTarget)) setSidebarOpen(false);
        }}
      >
        <a className="admin-brand" href="/" onClick={(event) => { event.preventDefault(); navigate('/'); }}>
          <img src={logoImg} alt="" />
          <span><strong>TBD Labs</strong><span>Operations</span></span>
        </a>
        <button
          className="admin-sidebar-close"
          type="button"
          aria-label="Close dashboard sidebar"
          onClick={() => { setSidebarPinned(false); setSidebarOpen(false); }}
        >
          <PanelLeftClose size={17} aria-hidden="true" />
        </button>
        <p className="admin-nav-label">Workspace</p>
        <nav className="admin-nav" aria-label="Dashboard navigation">
          {navigation.map(({ id, label, icon: Icon }) => (
            <button
              className="admin-nav-button"
              key={id}
              type="button"
              aria-current={activeSection === id ? 'page' : undefined}
              onClick={() => onSectionChange(id)}
            >
              <Icon size={17} aria-hidden="true" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-spacer" />
        <div className="admin-account">
          <span className="admin-avatar" aria-hidden="true">{initials}</span>
          <div className="admin-account-copy">
            <strong>{user?.name || 'Account'}</strong>
            <span>{user?.role === 'superadmin' ? 'Superadmin' : 'Staff'}</span>
          </div>
        </div>
        <button type="button" className="admin-logout" onClick={handleLogout}>
          <LogOut size={15} aria-hidden="true" /> Sign out
        </button>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          <div className="admin-topbar-actions">
            <ThemeToggle />
            <a className="admin-button admin-button-quiet" href="/" onClick={(event) => { event.preventDefault(); navigate('/'); }}>
              <ExternalLink size={14} aria-hidden="true" /> Website
            </a>
          </div>
        </header>
        <main id="main-content" className="admin-page">{children}</main>
      </div>
    </div>
  );
}
