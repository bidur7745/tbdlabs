import { TECH_ICONS } from '../../assets/icon.js';

const STACK_ITEMS = [
  { name: 'React', category: 'Frontend', icon: TECH_ICONS.react },
  { name: 'Next.js', category: 'Full-Stack', icon: TECH_ICONS.nextjs },
  { name: 'TypeScript', category: 'Type Safety', icon: TECH_ICONS.typescript },
  { name: 'Python', category: 'AI & Backend', icon: TECH_ICONS.python },
  { name: 'FastAPI', category: 'High-Speed API', icon: TECH_ICONS.fastapi },
  { name: 'PyTorch', category: 'Deep Learning', icon: TECH_ICONS.pytorch },
  { name: 'PostgreSQL', category: 'Database', icon: TECH_ICONS.postgresql },
  { name: 'Docker', category: 'Containerization', icon: TECH_ICONS.docker },
  { name: 'Redis', category: 'In-Memory Cache', icon: TECH_ICONS.redis },
  { name: 'Node.js', category: 'Runtime', icon: TECH_ICONS.nodejs },
  { name: '.NET', category: 'Enterprise Backend', icon: TECH_ICONS.dotnet },
  { name: 'MySQL', category: 'Relational DB', icon: TECH_ICONS.mysql },
];

export function TechStripVisual() {
  // Duplicate array for seamless infinite scroll
  const marqueeItems = [...STACK_ITEMS, ...STACK_ITEMS];

  return (
    <section
      aria-label="Core Technology Stack"
      style={{
        padding: '3.5rem 0',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        position: 'relative',
        overflow: 'hidden',
        background: 'rgba(8, 9, 13, 0.6)',
      }}
    >
      <div className="container" style={{ marginBottom: '1.75rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00e5ff', display: 'inline-block', boxShadow: '0 0 8px rgba(0,229,255,0.8)' }} />
          <p
            style={{
              color: '#61687a',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontFamily: 'JetBrains Mono, monospace',
              margin: 0,
            }}
          >
            Verified Core Engineering Stack
          </p>
        </div>
      </div>

      {/* Marquee Wrapper with side fade gradients */}
      <div
        className="marquee-container"
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        }}
      >
        <div className="marquee-track">
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="marquee-item"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '0.65rem 1.25rem',
                borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backgroundColor: 'rgba(14, 17, 24, 0.75)',
                color: '#f3f5f8',
                fontSize: '0.875rem',
                fontFamily: 'JetBrains Mono, monospace',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'all 200ms ease',
                cursor: 'default',
              }}
            >
              <img
                src={item.icon}
                alt=""
                aria-hidden="true"
                style={{
                  width: '20px',
                  height: '20px',
                  objectFit: 'contain',
                  filter: item.name === 'Next.js' || item.name === 'PyTorch' ? 'brightness(1.2)' : 'none',
                }}
              />
              <span style={{ fontWeight: 600, color: '#f3f5f8' }}>{item.name}</span>
              <span style={{ color: '#61687a', fontSize: '0.72rem' }}>· {item.category}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .marquee-track {
          display: flex;
          gap: 16px;
          width: max-content;
          animation: marqueeScroll 28s linear infinite;
        }

        .marquee-container:hover .marquee-track {
          animation-play-state: paused;
        }

        .marquee-item:hover {
          border-color: rgba(0, 229, 255, 0.45) !important;
          background-color: rgba(0, 229, 255, 0.08) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0, 229, 255, 0.15);
        }

        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
            overflow-x: auto;
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
