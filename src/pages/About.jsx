import { ArrowRight, Target, Eye, Heart } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading.jsx';
import { TEAM_MEMBERS } from '../content/team.js';

const CORE_VALUES = [
  { icon: Target, title: 'Engineering Integrity', description: 'We write honest code that reflects the actual complexity of the problem — no shortcuts that create technical debt, no fabricated benchmarks.' },
  { icon: Eye, title: 'Transparent Collaboration', description: 'We communicate blockers early, share real progress, and treat our collaborators as intelligent adults capable of handling genuine feedback.' },
  { icon: Heart, title: 'Purposeful Building', description: 'We only commit to work we believe in technically. If a solution is fragile, we say so — then propose what would actually hold up in production.' },
];

export default function About({ navigate }) {
  return (
    <main id="main-content">
      {/* Hero */}
      <section style={{ paddingTop: '8.5rem', paddingBottom: '5rem', position: 'relative' }}>
        <div aria-hidden="true" style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '400px',
          background: 'radial-gradient(ellipse, rgba(0,229,255,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '760px' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '0.3rem 1rem', borderRadius: 9999,
              border: '1px solid rgba(0,229,255,0.25)', background: 'rgba(0,229,255,0.06)',
              color: '#00e5ff', fontSize: '0.78rem', fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.06em', marginBottom: '1.5rem',
            }}>
              About TBD Labs
            </span>
            <h1 style={{ marginBottom: '1.5rem' }}>
              Built on the belief that{' '}
              <span style={{
                background: 'linear-gradient(135deg, #00e5ff, #0077b6)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                engineering quality is non-negotiable
              </span>
            </h1>
            <p className="lead">
              TBD Labs was founded by engineers who were frustrated with software that looked impressive in demos but broke under real-world conditions. We exist to close the gap between what gets promised and what gets delivered.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section" aria-labelledby="mission-heading" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <div className="grid-cols-2" style={{ gap: '2rem' }}>
            <div className="card">
              <span style={{ color: '#00e5ff', fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem', display: 'block' }}>Our Mission</span>
              <h2 id="mission-heading" style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'Space Grotesk, sans-serif' }}>
                Make sophisticated engineering accessible to organizations that need it most.
              </h2>
              <p style={{ color: '#9aa1b2', lineHeight: 1.75 }}>
                We bring production-grade engineering practices — clean architecture, rigorous testing, thoughtful API design — to startups, social ventures, and growth-stage companies who cannot yet afford a full in-house team but cannot afford to build on a fragile foundation.
              </p>
            </div>
            <div className="card">
              <span style={{ color: '#00e5ff', fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem', display: 'block' }}>Our Vision</span>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'Space Grotesk, sans-serif' }}>
                Technology that continues to work long after the contract ends.
              </h2>
              <p style={{ color: '#9aa1b2', lineHeight: 1.75 }}>
                We measure success by whether the systems we build are still running, scaling, and evolving years later. Software that requires constant firefighting is not finished software. We build for longevity, not for demos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founding Team */}
      <section className="section" aria-labelledby="team-heading" style={{ backgroundColor: 'rgba(13,15,22,0.5)' }}>
        <div className="container">
          <SectionHeading
            eyebrow="The team"
            title="Founding members"
            subtitle="TBD Labs is founded and operated by three engineers with a shared conviction: that the best software is built with discipline, clarity, and genuine domain understanding."
            id="team-heading"
          />
          <div className="grid-cols-3" style={{ marginTop: '3rem' }}>
            {TEAM_MEMBERS.map((member) => (
              <article key={member.id} className="card" style={{ textAlign: 'center' }} aria-label={member.name}>
                <div style={{
                  width: 80, height: 80, borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,180,216,0.05))',
                  border: '2px solid rgba(0,229,255,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.75rem', fontWeight: 700,
                  color: '#00e5ff',
                }}>
                  {member.initials}
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.35rem' }}>{member.name}</h3>
                <p style={{ color: '#00e5ff', fontSize: '0.8rem', fontFamily: 'JetBrains Mono, monospace', marginBottom: '0.35rem' }}>{member.role}</p>
                <p style={{ color: '#61687a', fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace', marginBottom: '1.25rem' }}>{member.focus}</p>
                <p style={{ color: '#9aa1b2', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>{member.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section" aria-labelledby="values-heading">
        <div className="container">
          <SectionHeading
            eyebrow="What we stand for"
            title="Core values"
            id="values-heading"
          />
          <div className="grid-cols-3" style={{ marginTop: '2.5rem' }}>
            {CORE_VALUES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="card">
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1.25rem', color: '#00e5ff',
                }}>
                  <Icon size={20} aria-hidden="true" />
                </div>
                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.65rem', fontFamily: 'Space Grotesk, sans-serif' }}>{title}</h3>
                <p style={{ color: '#9aa1b2', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-compact" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.35rem', marginBottom: '0.5rem' }}>Want to work with us?</h3>
            <p style={{ color: '#9aa1b2', margin: 0 }}>We take a limited number of engagements per quarter.</p>
          </div>
          <a href="/contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); navigate('/contact'); }} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            Start a conversation <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  );
}
