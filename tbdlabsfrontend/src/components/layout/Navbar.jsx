import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button.jsx';
import logoImg from '../../assets/img/logo.png';

const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Technology', href: '/technology' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar({ currentPath, navigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    navigate(href);
  };

  return (
    <>
      <header
        className="navbar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: scrolled ? 'rgba(7, 8, 11, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
          transition: 'all 250ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="container">
          <nav
            aria-label="Primary navigation"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '72px',
            }}
          >
            {/* Logo */}
            <a
              href="/"
              onClick={(e) => handleNav(e, '/')}
              className="nav-logo"
              aria-label="TBD Labs — Home"
              style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
            >
              <img src={logoImg} alt="TBD Labs" height="56" style={{ width: 'auto' }} />
            </a>

            {/* Desktop Nav */}
            <ul
              role="list"
              style={{ display: 'flex', listStyle: 'none', gap: '2px', alignItems: 'center' }}
              className="desktop-nav"
            >
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNav(e, link.href)}
                    style={{
                      padding: '0.4rem 0.9rem',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: currentPath === link.href ? '#00e5ff' : '#9aa1b2',
                      backgroundColor: currentPath === link.href ? 'rgba(0, 229, 255, 0.08)' : 'transparent',
                      transition: 'all 150ms ease',
                      textDecoration: 'none',
                      display: 'block',
                    }}
                    aria-current={currentPath === link.href ? 'page' : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Button
                href="/contact"
                variant="primary"
                onClick={(e) => handleNav(e, '/contact')}
                style={{ padding: '0.55rem 1.1rem', fontSize: '0.875rem' }}
              >
                Start a conversation
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              style={{
                background: 'none',
                border: 'none',
                color: '#f3f5f8',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '8px',
              }}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div
          role="dialog"
          aria-label="Navigation menu"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            backgroundColor: 'rgba(7, 8, 11, 0.97)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            padding: '100px 1.5rem 2rem',
            gap: '8px',
          }}
        >
          {[{ label: 'Home', href: '/' }, ...NAV_LINKS].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              style={{
                padding: '1rem 1.25rem',
                borderRadius: '12px',
                fontSize: '1.125rem',
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 600,
                color: currentPath === link.href ? '#00e5ff' : '#f3f5f8',
                backgroundColor: currentPath === link.href ? 'rgba(0,229,255,0.08)' : 'transparent',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                transition: 'all 150ms ease',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
