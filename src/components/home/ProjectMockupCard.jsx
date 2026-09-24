import { Badge } from '../ui/Badge.jsx';
import { Activity, ShieldCheck, Car, ChevronRight } from 'lucide-react';

export function ProjectMockupCard({ project, navigate }) {
  const isKrishi = project.id === 'krishimitra';
  const isBhram = project.id === 'bhramguard';
  const isAutoRent = project.id === 'autorent';

  return (
    <article
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(14, 17, 24, 0.85)',
        cursor: 'pointer',
      }}
      onClick={() => navigate('/projects')}
    >
      {/* Visual Simulated Window Header */}
      <div
        style={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'linear-gradient(180deg, rgba(20, 24, 34, 0.9) 0%, rgba(12, 14, 20, 0.95) 100%)',
          padding: '1.25rem',
          position: 'relative',
        }}
      >
        {/* Window controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
          </div>
          <Badge variant={project.statusType === 'live' ? 'live' : 'concept'}>
            {project.statusType === 'live' ? '● Live System' : '◐ In Development'}
          </Badge>
        </div>

        {/* Dynamic Graphic Header according to project */}
        {isKrishi && (
          <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '10px', padding: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ color: '#10b981', fontSize: '0.75rem', fontFamily: 'JetBrains Mono', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Activity size={12} /> Crop Health Telemetry
              </span>
              <span style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: 600, fontFamily: 'JetBrains Mono' }}>98.4% Normal</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', fontSize: '0.7rem', color: '#9aa1b2', fontFamily: 'JetBrains Mono' }}>
              <span>Soil: 68%</span>
              <span>•</span>
              <span>NDVI: 0.84</span>
              <span>•</span>
              <span>Advisory: Active</span>
            </div>
          </div>
        )}

        {isBhram && (
          <div style={{ background: 'rgba(168, 85, 247, 0.05)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '10px', padding: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ color: '#c084fc', fontSize: '0.75rem', fontFamily: 'JetBrains Mono', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={12} /> Forensic Waveform Radar
              </span>
              <span style={{ color: '#c084fc', fontSize: '0.75rem', fontWeight: 600, fontFamily: 'JetBrains Mono' }}>94.6% Verified</span>
            </div>
            <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '16px', padding: '2px 0' }}>
              {[40, 70, 30, 90, 60, 80, 50, 95, 45, 60, 85, 30, 75, 90, 50].map((h, i) => (
                <span key={i} style={{ flex: 1, height: `${h}%`, background: i % 2 === 0 ? '#c084fc' : '#00e5ff', borderRadius: '1px' }} />
              ))}
            </div>
          </div>
        )}

        {isAutoRent && (
          <div style={{ background: 'rgba(0, 229, 255, 0.05)', border: '1px solid rgba(0, 229, 255, 0.2)', borderRadius: '10px', padding: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ color: '#00e5ff', fontSize: '0.75rem', fontFamily: 'JetBrains Mono', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Car size={12} /> Fleet Allocation Matrix
              </span>
              <span style={{ color: '#00e5ff', fontSize: '0.75rem', fontWeight: 600, fontFamily: 'JetBrains Mono' }}>Escrow Secured</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', fontSize: '0.7rem', color: '#9aa1b2', fontFamily: 'JetBrains Mono' }}>
              <span>Dispatch: Synced</span>
              <span>•</span>
              <span>KYC: Automated</span>
            </div>
          </div>
        )}
      </div>

      {/* Card Content Area */}
      <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <span style={{ color: '#61687a', fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem', display: 'block' }}>
            {project.category}
          </span>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontFamily: 'Space Grotesk, sans-serif', color: '#f3f5f8' }}>
            {project.title}
          </h3>
          <p style={{ color: '#9aa1b2', fontSize: '0.875rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>
            {project.summary}
          </p>
        </div>

        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.25rem' }}>
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="neutral">{tech}</Badge>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#00e5ff', fontSize: '0.82rem', fontFamily: 'JetBrains Mono, monospace' }}>
            <span>Inspect architecture</span>
            <ChevronRight size={14} />
          </div>
        </div>
      </div>
    </article>
  );
}
