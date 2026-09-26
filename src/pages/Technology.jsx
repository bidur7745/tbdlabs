import { ArrowRight, Wrench, ShieldCheck, CheckCircle2, Zap, Eye } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading.jsx';
import { TECH_CATEGORIES, ENGINEERING_PRINCIPLES } from '../content/technology.js';

const PRINCIPLE_ICONS = { Wrench, ShieldCheck, CheckCircle2, Zap, Eye };

export default function Technology({ navigate }) {
  return (
    <main id="main-content">
      <section style={{ paddingTop: '8.5rem', paddingBottom: '5rem', position: 'relative' }}>
        <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(0,229,255,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '680px' }}>
            <span style={{ display: 'inline-block', padding: '0.3rem 1rem', borderRadius: 9999, border: '1px solid rgba(0,229,255,0.25)', background: 'rgba(0,229,255,0.06)', color: '#00e5ff', fontSize: '0.78rem', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.06em', marginBottom: '1.5rem' }}>
              Stack & principles
            </span>
            <h1 style={{ marginBottom: '1.25rem' }}>The technologies we build with</h1>
            <p className="lead">
              We work across modern web stacks, enterprise API platforms, database-driven systems, and low-code business solutions — choosing tools that fit the product, the team, and the operational reality.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="stack-heading" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Engineering stack"
            title="Capabilities by domain"
            subtitle="Technologies we use to build web products, enterprise services, automation workflows, and deployment-ready systems."
            id="stack-heading"
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '3rem' }}>
            {TECH_CATEGORIES.map((cat) => (
              <div key={cat.id} className="card" aria-label={cat.category}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.15rem', fontFamily: 'Space Grotesk, sans-serif', marginBottom: '0.35rem' }}>{cat.category}</h2>
                    <p style={{ color: '#9aa1b2', fontSize: '0.875rem', margin: 0 }}>{cat.description}</p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    {cat.technologies.map((tech) => (
                      <a
                        key={tech.name}
                        href={tech.docsUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                          padding: '0.9rem 0.9rem 0.8rem',
                          borderRadius: 12,
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(255,255,255,0.06)',
                          textDecoration: 'none',
                          transition: 'all 150ms ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(0,229,255,0.35)';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img
                            src={tech.iconUrl}
                            alt={tech.name}
                            style={{ width: 22, height: 22, objectFit: 'contain', display: 'block', filter: 'brightness(1.05)' }}
                          />
                          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', color: '#00e5ff', fontWeight: 500 }}>{tech.name}</span>
                        </div>
                        <span style={{ fontSize: '0.78rem', color: '#61687a', lineHeight: 1.5 }}>{tech.description}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="principles-heading" style={{ backgroundColor: 'rgba(13,15,22,0.5)' }}>
        <div className="container">
          <SectionHeading
            eyebrow="How we build"
            title="Engineering principles"
            subtitle="These commitments shape how we design, implement, and maintain software under real operating conditions."
            align="center"
            id="principles-heading"
          />
          <div className="grid-cols-3" style={{ marginTop: '3rem' }}>
            {ENGINEERING_PRINCIPLES.map((principle) => {
              const Icon = PRINCIPLE_ICONS[principle.iconName] || Zap;
              return (
                <div key={principle.id} className="card">
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: '#00e5ff' }}>
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <h3 style={{ fontSize: '1.05rem', marginBottom: '0.65rem', fontFamily: 'Space Grotesk, sans-serif' }}>{principle.title}</h3>
                  <p style={{ color: '#9aa1b2', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>{principle.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-compact" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.35rem', marginBottom: '0.5rem' }}>Need a specific technical solution?</h3>
            <p style={{ color: '#9aa1b2', margin: 0 }}>Let’s map the right stack to your business and operational goals.</p>
          </div>
          <a href="/contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); navigate('/contact'); }} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            Discuss your project <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  );
}
