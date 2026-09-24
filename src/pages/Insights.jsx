import { Clock, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { INSIGHTS_ARTICLES } from '../content/insights.js';

export default function Insights({ navigate }) {
  const featured = INSIGHTS_ARTICLES.find((a) => a.featured);
  const rest = INSIGHTS_ARTICLES.filter((a) => !a.featured);

  return (
    <main id="main-content">
      {/* Hero */}
      <section style={{ paddingTop: '8.5rem', paddingBottom: '5rem', position: 'relative' }}>
        <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(0,229,255,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '640px' }}>
            <span style={{ display: 'inline-block', padding: '0.3rem 1rem', borderRadius: 9999, border: '1px solid rgba(0,229,255,0.25)', background: 'rgba(0,229,255,0.06)', color: '#00e5ff', fontSize: '0.78rem', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.06em', marginBottom: '1.5rem' }}>
              Editorial
            </span>
            <h1 style={{ marginBottom: '1.25rem' }}>Engineering perspectives from TBD Labs</h1>
            <p className="lead">
              Technical writing, systems thinking, and honest notes from the engineering work we do — not marketing content.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featured && (
        <section className="section" aria-label="Featured article" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="container">
            <p style={{ color: '#61687a', fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              Featured
            </p>
            <article className="card" style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.05), rgba(0,180,216,0.02))', borderColor: 'rgba(0,229,255,0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                <Badge variant="accent">{featured.category}</Badge>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#61687a', fontSize: '0.78rem', fontFamily: 'JetBrains Mono, monospace' }}>
                  <Clock size={12} aria-hidden="true" /> {featured.readTime}
                </span>
                <span style={{ color: '#61687a', fontSize: '0.78rem', fontFamily: 'JetBrains Mono, monospace' }}>{featured.publishedDate}</span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontFamily: 'Space Grotesk, sans-serif', marginBottom: '0.75rem', maxWidth: '640px' }}>
                {featured.title}
              </h2>
              <p style={{ color: '#9aa1b2', lineHeight: 1.75, maxWidth: '680px', fontSize: '0.9375rem' }}>{featured.excerpt}</p>
              <p style={{ color: '#61687a', fontSize: '0.8rem', marginTop: '1.5rem', fontFamily: 'JetBrains Mono, monospace' }}>
                By {featured.author}
              </p>
            </article>
          </div>
        </section>
      )}

      {/* Article Grid */}
      <section className="section" aria-labelledby="articles-heading">
        <div className="container">
          <SectionHeading eyebrow="More articles" title="Technical writing" id="articles-heading" />
          <div className="grid-cols-2" style={{ marginTop: '2.5rem' }}>
            {rest.map((article) => (
              <article key={article.id} className="card" aria-label={article.title}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <Badge variant="neutral">{article.category}</Badge>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#61687a', fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace' }}>
                    <Clock size={11} aria-hidden="true" /> {article.readTime}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.075rem', fontFamily: 'Space Grotesk, sans-serif', marginBottom: '0.65rem', lineHeight: 1.35 }}>
                  {article.title}
                </h3>
                <p style={{ color: '#9aa1b2', fontSize: '0.875rem', lineHeight: 1.7 }}>{article.excerpt}</p>
                <p style={{ color: '#61687a', fontSize: '0.75rem', marginTop: '1.25rem', fontFamily: 'JetBrains Mono, monospace' }}>
                  {article.publishedDate} · {article.author}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-compact" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.35rem', marginBottom: '0.5rem' }}>Have a technical problem to solve?</h3>
            <p style={{ color: '#9aa1b2', margin: 0 }}>Talk to the team directly.</p>
          </div>
          <a href="/contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); navigate('/contact'); }} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            Get in touch <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  );
}
