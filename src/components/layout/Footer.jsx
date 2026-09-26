import { GitBranch, ExternalLink, Share2, Mail, ArrowRight } from 'lucide-react';

const FOOTER_LINKS = {
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Technology', href: '/technology' },
    { label: 'Insights', href: '/insights' },
    { label: 'Contact', href: '/contact' },
  ],
  Services: [
    { label: 'Web Development', href: '/services' },
    { label: 'Mobile Development', href: '/services' },
    { label: 'AI & Machine Learning', href: '/services' },
    { label: 'UI/UX Design', href: '/services' },
    { label: 'Software Development', href: '/services' },
    { label: 'Digital Solutions', href: '/services' },
  ],
};

export function Footer({ navigate }) {
  const handleNav = (e, href) => {
    e.preventDefault();
    navigate(href);
  };

  return (
    <footer
      style={{
        backgroundColor: '#07080b',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        marginTop: 'auto',
      }}
    >
      {/* Top inquiry strip */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '3rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.375rem', marginBottom: '0.5rem' }}>
                Have a project in mind?
              </h3>
              <p style={{ color: '#61687a', fontSize: '0.9rem', margin: 0 }}>
                Let&apos;s discuss what we can build together.
              </p>
            </div>
            <a
              href="/contact"
              onClick={(e) => handleNav(e, '/contact')}
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              Start a conversation <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div style={{ padding: '4rem 0 2.5rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
            {/* Brand column */}
            <div style={{ gridColumn: 'span 1' }}>
              <a
                href="/"
                onClick={(e) => handleNav(e, '/')}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '1rem' }}
              >
                <svg width="28" height="28" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                  <rect width="64" height="64" rx="12" fill="#08090d" />
                  <rect x="0.75" y="0.75" width="62.5" height="62.5" rx="11.25" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
                  <path d="M16 20H48V28H36V46H28V28H16V20Z" fill="#00e5ff" />
                </svg>
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#f3f5f8' }}>
                  TBD <span style={{ color: '#00e5ff' }}>Labs</span>
                </span>
              </a>
              <p style={{ color: '#61687a', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Technology Beyond Dimensions. Building production-grade software, intelligent systems, and scalable digital solutions.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                {[
                  { Icon: GitBranch, label: 'GitHub', href: '#' },
                  { Icon: ExternalLink, label: 'LinkedIn', href: '#' },
                  { Icon: Share2, label: 'X / Twitter', href: '#' },
                  { Icon: Mail, label: 'Email', href: '/contact' },
                ].map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    onClick={href === '/contact' ? (e) => handleNav(e, '/contact') : undefined}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#61687a',
                      transition: 'all 150ms ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)'; e.currentTarget.style.color = '#00e5ff'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#61687a'; }}
                  >
                    <Icon size={15} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([group, links]) => (
              <div key={group}>
                <h4 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#f3f5f8', marginBottom: '1rem' }}>
                  {group}
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={(e) => handleNav(e, link.href)}
                        style={{ color: '#61687a', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 150ms ease' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#9aa1b2'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = '#61687a'; }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '1.25rem 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <p style={{ color: '#61687a', fontSize: '0.8rem', margin: 0 }}>
            © {new Date().getFullYear()} TBD Labs. All rights reserved.
          </p>
          <p style={{ color: '#61687a', fontSize: '0.8rem', margin: 0, fontFamily: 'JetBrains Mono, monospace' }}>
            Technology Beyond Dimensions
          </p>
        </div>
      </div>
    </footer>
  );
}
