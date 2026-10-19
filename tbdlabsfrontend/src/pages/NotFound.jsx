import { ArrowRight, Home } from 'lucide-react';

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

export default function NotFound({ navigate }) {
  return (
    <main id="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '8rem 1.5rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '560px' }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '6rem', fontWeight: 700, lineHeight: 1, marginBottom: '1.5rem', background: 'linear-gradient(135deg, rgba(0,229,255,0.4), rgba(0,229,255,0.08))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          404
        </div>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Page not found</h1>
        <p style={{ color: '#9aa1b2', marginBottom: '3rem' }}>
          The page you are looking for does not exist or may have been moved.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}>
          <a href="/" className="btn btn-primary" onClick={(e) => { e.preventDefault(); navigate('/'); }} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <Home size={15} aria-hidden="true" /> Back to Home
          </a>
          <a href="/contact" className="btn btn-secondary" onClick={(e) => { e.preventDefault(); navigate('/contact'); }} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            Contact us <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
        <div>
          <p style={{ color: '#61687a', fontSize: '0.8rem', fontFamily: 'JetBrains Mono, monospace', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Quick navigation</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {QUICK_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); navigate(link.href); }}
                style={{
                  padding: '0.4rem 0.85rem', borderRadius: 9999,
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#9aa1b2', fontSize: '0.82rem', textDecoration: 'none',
                  transition: 'all 150ms ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.3)'; e.currentTarget.style.color = '#00e5ff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#9aa1b2'; }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
