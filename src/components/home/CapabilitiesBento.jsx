import { Globe, Smartphone, Cpu, Layout, Layers, ArrowUpRight, Sparkles } from 'lucide-react';

export function CapabilitiesBento({ navigate }) {

  return (
    <section className="section" aria-labelledby="capabilities-heading">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '0.3rem 0.9rem', borderRadius: '9999px',
            border: '1px solid rgba(0,229,255,0.25)', background: 'rgba(0,229,255,0.06)',
            color: '#00e5ff', fontSize: '0.78rem', fontFamily: 'JetBrains Mono, monospace',
            letterSpacing: '0.06em', marginBottom: '1rem',
          }}>
            <Sparkles size={12} /> Engineering Disciplines
          </span>
          <h2 id="capabilities-heading" style={{ marginBottom: '1rem' }}>
            Built for modern digital scale
          </h2>
          <p style={{ color: '#9aa1b2', fontSize: '1rem', lineHeight: 1.7 }}>
            We combine systems programming discipline with modern UI engineering to deliver resilient, production-ready platforms.
          </p>
        </div>

        {/* Bento Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '1.5rem',
          }}
        >
          {/* Card 1: Web Systems (Spans 7 cols) */}
          <div
            onClick={() => navigate('/services')}
            style={{
              gridColumn: 'span 12',
              borderRadius: '20px',
              padding: '2rem',
              background: 'linear-gradient(135deg, rgba(14, 18, 28, 0.9) 0%, rgba(9, 11, 17, 0.95) 100%)',
              border: '1px solid rgba(0, 229, 255, 0.2)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '320px',
              transition: 'all 250ms ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.45)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.2)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00e5ff' }}>
                  <Globe size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontFamily: 'Space Grotesk, sans-serif', color: '#fff', margin: 0 }}>Web & Full-Stack Systems</h3>
                  <span style={{ color: '#61687a', fontSize: '0.8rem', fontFamily: 'JetBrains Mono, monospace' }}>React · Next.js · TypeScript · FastAPI</span>
                </div>
              </div>
              <ArrowUpRight size={18} color="#00e5ff" />
            </div>

            <p style={{ color: '#9aa1b2', fontSize: '0.9rem', lineHeight: 1.65, maxWidth: '540px', marginBottom: '1.5rem' }}>
              High-performance web applications built on reactive component architectures, server-rendered edge pipelines, and type-safe backend APIs.
            </p>

            {/* Visual Simulated Component Frame */}
            <div
              style={{
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(0,0,0,0.4)',
                padding: '1rem',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.78rem',
              }}
            >
              <div style={{ display: 'flex', gap: '10px', marginBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.5rem' }}>
                <span style={{ color: '#00e5ff' }}>✓ Edge CDN Ready</span>
                <span style={{ color: '#10b981' }}>✓ 100% Type-Safe</span>
                <span style={{ color: '#ffbd2e' }}>✓ Zero Cumulative Layout Shift</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#61687a' }}>
                <span>Build output: static/chunks/app-core.js</span>
                <span style={{ color: '#10b981' }}>Optimized gzip: 24.2 kB</span>
              </div>
            </div>
          </div>

          {/* Card 2: AI & Machine Learning (Spans 5 cols) */}
          <div
            onClick={() => navigate('/services')}
            style={{
              gridColumn: 'span 12',
              borderRadius: '20px',
              padding: '2rem',
              background: 'linear-gradient(135deg, rgba(20, 16, 32, 0.9) 0%, rgba(9, 10, 16, 0.95) 100%)',
              border: '1px solid rgba(168, 85, 247, 0.25)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '320px',
              transition: 'all 250ms ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.25)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(168, 85, 247, 0.12)', border: '1px solid rgba(168, 85, 247, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c084fc' }}>
                  <Cpu size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontFamily: 'Space Grotesk, sans-serif', color: '#fff', margin: 0 }}>Applied AI & ML</h3>
                  <span style={{ color: '#61687a', fontSize: '0.8rem', fontFamily: 'JetBrains Mono, monospace' }}>PyTorch · Inference · LLM Pipelines</span>
                </div>
              </div>
              <ArrowUpRight size={18} color="#c084fc" />
            </div>

            <p style={{ color: '#9aa1b2', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
              Deterministic neural workflows, computer vision forensic filters, and LLM reasoning pipelines built for high precision.
            </p>

            {/* Visual Confidence Gauge */}
            <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '0.85rem', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace', marginBottom: '6px' }}>
                <span style={{ color: '#c084fc' }}>Model Precision Index</span>
                <span style={{ color: '#fff' }}>98.7%</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '98.7%', height: '100%', background: 'linear-gradient(90deg, #a855f7, #00e5ff)', borderRadius: '3px' }} />
              </div>
            </div>
          </div>

          {/* Card 3: Mobile Engineering (Spans 4 cols) */}
          <div
            onClick={() => navigate('/services')}
            style={{
              gridColumn: 'span 12',
              borderRadius: '20px',
              padding: '1.75rem',
              background: 'rgba(14, 17, 24, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '260px',
              transition: 'all 250ms ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <Smartphone size={20} color="#00e5ff" />
              <h3 style={{ fontSize: '1.1rem', fontFamily: 'Space Grotesk, sans-serif', color: '#fff', margin: 0 }}>Mobile Development</h3>
            </div>
            <p style={{ color: '#9aa1b2', fontSize: '0.85rem', lineHeight: 1.6, margin: '0 0 1rem' }}>
              Native performance and offline-first mobile apps for Android and iOS with fluid touch gestures.
            </p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.72rem', color: '#00e5ff', background: 'rgba(0,229,255,0.08)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontFamily: 'JetBrains Mono' }}>React Native</span>
              <span style={{ fontSize: '0.72rem', color: '#9aa1b2', background: 'rgba(255,255,255,0.04)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontFamily: 'JetBrains Mono' }}>Offline Sync</span>
            </div>
          </div>

          {/* Card 4: UI/UX & Design Systems (Spans 4 cols) */}
          <div
            onClick={() => navigate('/services')}
            style={{
              gridColumn: 'span 12',
              borderRadius: '20px',
              padding: '1.75rem',
              background: 'rgba(14, 17, 24, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '260px',
              transition: 'all 250ms ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <Layout size={20} color="#00e5ff" />
              <h3 style={{ fontSize: '1.1rem', fontFamily: 'Space Grotesk, sans-serif', color: '#fff', margin: 0 }}>UI/UX & Design Systems</h3>
            </div>
            <p style={{ color: '#9aa1b2', fontSize: '0.85rem', lineHeight: 1.6, margin: '0 0 1rem' }}>
              Atomic tokens, accessible color palettes, and interaction design aligned with WCAG 2.1 AA.
            </p>
            {/* Visual Token Palette Preview */}
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ width: 22, height: 22, borderRadius: 6, background: '#08090d', border: '1px solid rgba(255,255,255,0.2)' }} title="Canvas" />
              <div style={{ width: 22, height: 22, borderRadius: 6, background: '#141722', border: '1px solid rgba(255,255,255,0.2)' }} title="Card Surface" />
              <div style={{ width: 22, height: 22, borderRadius: 6, background: '#00e5ff' }} title="Electric Cyan" />
              <div style={{ width: 22, height: 22, borderRadius: 6, background: '#0077b6' }} title="Deep Cobalt" />
            </div>
          </div>

          {/* Card 5: Cloud & Backend Architecture (Spans 4 cols) */}
          <div
            onClick={() => navigate('/services')}
            style={{
              gridColumn: 'span 12',
              borderRadius: '20px',
              padding: '1.75rem',
              background: 'rgba(14, 17, 24, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '260px',
              transition: 'all 250ms ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <Layers size={20} color="#00e5ff" />
              <h3 style={{ fontSize: '1.1rem', fontFamily: 'Space Grotesk, sans-serif', color: '#fff', margin: 0 }}>Cloud & Resilient DBs</h3>
            </div>
            <p style={{ color: '#9aa1b2', fontSize: '0.85rem', lineHeight: 1.6, margin: '0 0 1rem' }}>
              PostgreSQL relational schemas, Redis caching, Docker container orchestration, and multi-region deployment.
            </p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.72rem', color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontFamily: 'JetBrains Mono' }}>Docker</span>
              <span style={{ fontSize: '0.72rem', color: '#00e5ff', background: 'rgba(0,229,255,0.08)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontFamily: 'JetBrains Mono' }}>PostgreSQL</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .section .container > div:nth-child(2) > div:nth-child(1) { grid-column: span 7 !important; }
          .section .container > div:nth-child(2) > div:nth-child(2) { grid-column: span 5 !important; }
          .section .container > div:nth-child(2) > div:nth-child(3) { grid-column: span 4 !important; }
          .section .container > div:nth-child(2) > div:nth-child(4) { grid-column: span 4 !important; }
          .section .container > div:nth-child(2) > div:nth-child(5) { grid-column: span 4 !important; }
        }
      `}</style>
    </section>
  );
}
