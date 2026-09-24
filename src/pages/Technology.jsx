import { ArrowRight, Wrench, ShieldCheck, CheckCircle2, Zap, Eye } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading.jsx';
import { TECH_CATEGORIES, ENGINEERING_PRINCIPLES } from '../content/technology.js';

const PRINCIPLE_ICONS = { Wrench, ShieldCheck, CheckCircle2, Zap, Eye };

export default function Technology({ navigate }) {
  return (
    <main id="main-content">
      {/* Hero */}
      <section style={{ paddingTop: '8.5rem', paddingBottom: '5rem', position: 'relative' }}>
        <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(0,229,255,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '640px' }}>
            <span style={{ display: 'inline-block', padding: '0.3rem 1rem', borderRadius: 9999, border: '1px solid rgba(0,229,255,0.25)', background: 'rgba(0,229,255,0.06)', color: '#00e5ff', fontSize: '0.78rem', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.06em', marginBottom: '1.5rem' }}>
              Stack & principles
            </span>
            <h1 style={{ marginBottom: '1.25rem' }}>The tools and values behind our engineering</h1>
            <p className="lead">
              We choose technologies for their reliability, community maturity, and suitability for the problem — not their hype cycle position. Our engineering decisions are guided by clear principles.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Categories */}
      <section className="section" aria-labelledby="stack-heading" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <SectionHeading eyebrow="Engineering stack" title="Capabilities by domain" subtitle="Technologies we use in production, grouped by the role they play in our system architecture." id="stack-heading" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '3rem' }}>
            {TECH_CATEGORIES.map((cat) => (
              <div key={cat.id} className="card" aria-label={cat.category}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.15rem', fontFamily: 'Space Grotesk, sans-serif', marginBottom: '0.35rem' }}>{cat.category}</h2>
                    <p style={{ color: '#9aa1b2', fontSize: '0.875rem', margin: 0 }}>{cat.description}</p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    {cat.technologies.map((tech) => (
                      <div key={tech.name} style={{
                        display: 'flex', flexDirection: 'column', gap: '4px',
                        padding: '0.75rem', borderRadius: 10,
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}>
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', color: '#00e5ff', fontWeight: 500 }}>{tech.name}</span>
                        <span style={{ fontSize: '0.78rem', color: '#61687a', lineHeight: 1.5 }}>{tech.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Principles */}
      <section className="section" aria-labelledby="principles-heading" style={{ backgroundColor: 'rgba(13,15,22,0.5)' }}>
        <div className="container">
          <SectionHeading eyebrow="How we build" title="Engineering principles" subtitle="These five commitments guide every design decision, code review, and deployment we make." align="center" id="principles-heading" />
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

      {/* CTA */}
      <section className="section-compact" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.35rem', marginBottom: '0.5rem' }}>Need a specific technical solution?</h3>
            <p style={{ color: '#9aa1b2', margin: 0 }}>Tell us your constraints and we will tell you what is achievable.</p>
          </div>
          <a href="/contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); navigate('/contact'); }} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            Discuss your project <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  );
}
