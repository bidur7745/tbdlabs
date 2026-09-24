import { ArrowRight, Globe, Smartphone, Cpu, Layout, Code2, Layers, ChevronRight } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { SERVICES, WORKFLOW_STAGES } from '../content/services.js';

const SERVICE_ICONS = { Globe, Smartphone, Cpu, Layout, Code2, Layers };

export default function Services({ navigate }) {
  return (
    <main id="main-content">
      {/* Hero */}
      <section style={{ paddingTop: '8.5rem', paddingBottom: '5rem', position: 'relative' }}>
        <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(0,229,255,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '680px' }}>
            <span style={{ display: 'inline-block', padding: '0.3rem 1rem', borderRadius: 9999, border: '1px solid rgba(0,229,255,0.25)', background: 'rgba(0,229,255,0.06)', color: '#00e5ff', fontSize: '0.78rem', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.06em', marginBottom: '1.5rem' }}>
              What we do
            </span>
            <h1 style={{ marginBottom: '1.25rem' }}>From idea to production — engineered to last</h1>
            <p className="lead">
              We work across six core capability domains. Every engagement is approached as a systems engineering challenge, not a ticket queue.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section" aria-labelledby="services-heading" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <SectionHeading eyebrow="Capabilities" title="Six service domains" id="services-heading" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
            {SERVICES.map((svc) => {
              const Icon = SERVICE_ICONS[svc.iconName] || Code2;
              return (
                <article key={svc.id} className="card" aria-label={svc.title} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#00e5ff' }}>
                      <Icon size={22} aria-hidden="true" />
                    </div>
                    <div>
                      <h2 style={{ fontSize: '1.15rem', fontFamily: 'Space Grotesk, sans-serif', marginBottom: '0.3rem' }}>{svc.title}</h2>
                      <p style={{ color: '#61687a', fontSize: '0.8rem', margin: 0 }}>{svc.subtitle}</p>
                    </div>
                  </div>
                  <p style={{ color: '#9aa1b2', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.5rem', flex: 1 }}>{svc.overview}</p>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <p style={{ color: '#f3f5f8', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Key deliverables</p>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {svc.deliverables.map((d) => (
                        <li key={d} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: '#9aa1b2', fontSize: '0.85rem' }}>
                          <ChevronRight size={13} aria-hidden="true" style={{ color: '#00e5ff', marginTop: '3px', flexShrink: 0 }} />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    {svc.technologies.slice(0, 5).map((tech) => (
                      <Badge key={tech} variant="neutral">{tech}</Badge>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="section" aria-labelledby="workflow-heading" style={{ backgroundColor: 'rgba(13,15,22,0.5)' }}>
        <div className="container">
          <SectionHeading eyebrow="Process" title="How we work" subtitle="Our 5-stage engineering process applied consistently across every engagement." align="center" id="workflow-heading" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', marginTop: '3rem' }}>
            {WORKFLOW_STAGES.map((stage) => (
              <div key={stage.step} className="card" style={{ textAlign: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', fontWeight: 600, color: '#00e5ff' }}>
                  {stage.step}
                </div>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', fontFamily: 'Space Grotesk, sans-serif' }}>{stage.name}</h3>
                <p style={{ color: '#9aa1b2', fontSize: '0.82rem', lineHeight: 1.65, margin: 0 }}>{stage.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-compact">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.35rem', marginBottom: '0.5rem' }}>Have a project in mind?</h3>
            <p style={{ color: '#9aa1b2', margin: 0 }}>Tell us about it and we will respond with an honest assessment.</p>
          </div>
          <a href="/contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); navigate('/contact'); }} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            Get in touch <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  );
}
