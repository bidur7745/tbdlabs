import { useState } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Badge } from '../components/ui/Badge.jsx';
import { PROJECTS } from '../content/projects.js';

const FILTER_TABS = ['All', 'AI & Data Platforms', 'AI / Security & Integrity', 'Web & Enterprise Solutions'];

export default function Projects({ navigate }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <main id="main-content">
      {/* Hero */}
      <section style={{ paddingTop: '8.5rem', paddingBottom: '5rem', position: 'relative' }}>
        <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(0,229,255,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '640px' }}>
            <span style={{ display: 'inline-block', padding: '0.3rem 1rem', borderRadius: 9999, border: '1px solid rgba(0,229,255,0.25)', background: 'rgba(0,229,255,0.06)', color: '#00e5ff', fontSize: '0.78rem', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.06em', marginBottom: '1.5rem' }}>
              Selected work
            </span>
            <h1 style={{ marginBottom: '1.25rem' }}>Systems we have engineered</h1>
            <p className="lead">
              A selection of production systems and conceptual platforms built by TBD Labs. Each record includes a verified description, technology stack, and development status.
            </p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="section" aria-labelledby="projects-heading" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          {/* Filter tabs */}
          <div role="group" aria-label="Filter projects by category" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                aria-pressed={activeFilter === tab}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '9999px',
                  border: `1px solid ${activeFilter === tab ? 'rgba(0,229,255,0.4)' : 'rgba(255,255,255,0.08)'}`,
                  background: activeFilter === tab ? 'rgba(0,229,255,0.1)' : 'transparent',
                  color: activeFilter === tab ? '#00e5ff' : '#9aa1b2',
                  fontSize: '0.82rem',
                  fontFamily: 'JetBrains Mono, monospace',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} id="projects-heading">
            {filtered.map((project) => (
              <article key={project.id} className="card" aria-label={project.title} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    <Badge variant={project.statusType === 'live' ? 'live' : 'concept'}>
                      {project.statusType === 'live' ? '● ' : '◐ '}{project.status}
                    </Badge>
                    <span style={{ color: '#61687a', fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace' }}>{project.category}</span>
                  </div>
                  <h2 style={{ fontSize: '1.5rem', fontFamily: 'Space Grotesk, sans-serif', marginBottom: '0.35rem' }}>{project.title}</h2>
                  <p style={{ color: '#61687a', fontSize: '0.85rem', fontStyle: 'italic', marginBottom: '1rem' }}>{project.tagline}</p>
                  <p style={{ color: '#9aa1b2', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>{project.description}</p>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ color: '#f3f5f8', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.65rem' }}>Engineering highlights</p>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {project.highlights.map((h) => (
                        <li key={h} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: '#9aa1b2', fontSize: '0.875rem' }}>
                          <ChevronRight size={13} aria-hidden="true" style={{ color: '#00e5ff', marginTop: '3px', flexShrink: 0 }} />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="neutral">{tech}</Badge>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-compact" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.35rem', marginBottom: '0.5rem' }}>Working on something similar?</h3>
            <p style={{ color: '#9aa1b2', margin: 0 }}>Share your brief and let us discuss what is technically possible.</p>
          </div>
          <a href="/contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); navigate('/contact'); }} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            Start a conversation <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  );
}
