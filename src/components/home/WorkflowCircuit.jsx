import { useState } from 'react';
import { Search, PenTool, Code, Rocket, TrendingUp, CheckCircle, Terminal } from 'lucide-react';

const STAGES = [
  {
    step: '01',
    name: 'Discover',
    tagline: 'Technical feasibility & domain architecture',
    summary: 'We evaluate constraints, security boundaries, and data pipelines before writing code.',
    icon: Search,
    artifactType: 'Architecture Brief',
    artifactContent: '{\n  "scope": "Multi-Modal AI Pipeline",\n  "offline_support": true,\n  "latency_budget": "< 200ms",\n  "db_strategy": "Relational + TimeSeries"\n}',
  },
  {
    step: '02',
    name: 'Design',
    tagline: 'Design systems & interface specifications',
    summary: 'Accessible, scalable UI frameworks built on strict design tokens and user flow graphs.',
    icon: PenTool,
    artifactType: 'Design Tokens Spec',
    artifactContent: ':root {\n  --accent-cyan: #00e5ff;\n  --surface-dark: #08090d;\n  --radius-lg: 16px;\n  --font-mono: "JetBrains Mono";\n}',
  },
  {
    step: '03',
    name: 'Build',
    tagline: 'Modular, type-safe full-stack engineering',
    summary: 'Clean component logic, robust API boundaries, and comprehensive unit/integration test suites.',
    icon: Code,
    artifactType: 'Git Commit Diff',
    artifactContent: '+ export async function executeInference(feed: SensorInput) {\n+   const validated = Schema.parse(feed);\n+   return await model.forward(validated);\n+ }',
  },
  {
    step: '04',
    name: 'Deploy',
    tagline: 'Containerized CI/CD & edge infrastructure',
    summary: 'Zero-downtime rolling releases with multi-region distribution and real-time monitoring.',
    icon: Rocket,
    artifactType: 'Container Push Log',
    artifactContent: '$ docker build -t tbdlabs/runtime:v2.4 .\n=> exporting layers [100%]\n=> writing image sha256:9f8a2c [done]\n=> edge deployment healthy (200 OK)',
  },
  {
    step: '05',
    name: 'Improve',
    tagline: 'Continuous telemetry & model tuning',
    summary: 'Real-world load observation, latency optimization, and iterative software refinements.',
    icon: TrendingUp,
    artifactType: 'Live Telemetry Report',
    artifactContent: '{\n  "error_rate": "0.00%",\n  "p99_latency": "38ms",\n  "cache_hit_ratio": "94.2%",\n  "health": "STABLE"\n}',
  },
];

export function WorkflowCircuit() {
  const [activeStep, setActiveStep] = useState(0);
  const currentStage = STAGES[activeStep];

  return (
    <section className="section" aria-labelledby="workflow-heading" style={{ background: 'rgba(11, 14, 21, 0.5)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '0.3rem 0.9rem', borderRadius: '9999px',
            border: '1px solid rgba(0,229,255,0.25)', background: 'rgba(0,229,255,0.06)',
            color: '#00e5ff', fontSize: '0.78rem', fontFamily: 'JetBrains Mono, monospace',
            letterSpacing: '0.06em', marginBottom: '1rem',
          }}>
            Repeatable Delivery
          </span>
          <h2 id="workflow-heading" style={{ marginBottom: '1rem' }}>
            Five-stage engineering pipeline
          </h2>
          <p style={{ color: '#9aa1b2', fontSize: '1rem', lineHeight: 1.7 }}>
            Every project follows an engineering-first lifecycle designed to eliminate ambiguity and deliver resilient software.
          </p>
        </div>

        {/* Step Navigation Ribbon */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '12px',
            marginBottom: '2rem',
          }}
        >
          {STAGES.map((s, index) => {
            const Icon = s.icon;
            const isSelected = activeStep === index;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(index)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '1rem 1.25rem',
                  borderRadius: '14px',
                  border: isSelected ? '1px solid #00e5ff' : '1px solid rgba(255, 255, 255, 0.08)',
                  background: isSelected ? 'rgba(0, 229, 255, 0.08)' : 'rgba(14, 17, 24, 0.7)',
                  color: isSelected ? '#00e5ff' : '#9aa1b2',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 200ms ease',
                }}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: isSelected ? '#00e5ff' : 'rgba(255,255,255,0.05)',
                  color: isSelected ? '#08090d' : '#00e5ff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: isSelected ? '#00e5ff' : '#f3f5f8', fontFamily: 'Space Grotesk' }}>
                    {s.name}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#61687a', fontFamily: 'JetBrains Mono' }}>
                    Phase {s.step}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Interactive Visual Showcase */}
        <div
          style={{
            borderRadius: '20px',
            border: '1px solid rgba(0, 229, 255, 0.25)',
            background: 'linear-gradient(135deg, rgba(14, 18, 28, 0.95) 0%, rgba(8, 9, 13, 0.98) 100%)',
            padding: '2.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
          }}
        >
          <div>
            <span style={{
              color: '#00e5ff',
              fontSize: '0.78rem',
              fontFamily: 'JetBrains Mono',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              display: 'inline-block',
              marginBottom: '0.75rem',
            }}>
              Stage {currentStage.step} :: {currentStage.name}
            </span>
            <h3 style={{ fontSize: '1.75rem', fontFamily: 'Space Grotesk', marginBottom: '1rem', color: '#f3f5f8' }}>
              {currentStage.tagline}
            </h3>
            <p style={{ color: '#9aa1b2', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              {currentStage.summary}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '0.85rem', fontFamily: 'JetBrains Mono' }}>
              <CheckCircle size={15} /> Production-grade verification gating
            </div>
          </div>

          {/* Interactive Artifact Preview Frame */}
          <div
            style={{
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(0, 0, 0, 0.5)',
              overflow: 'hidden',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.6rem 1rem',
              background: 'rgba(255, 255, 255, 0.03)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            }}>
              <span style={{ fontSize: '0.75rem', color: '#61687a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Terminal size={12} color="#00e5ff" /> {currentStage.artifactType}
              </span>
              <span style={{ fontSize: '0.7rem', color: '#10b981' }}>validated</span>
            </div>
            <pre style={{
              padding: '1.25rem',
              color: '#38bdf8',
              fontSize: '0.8rem',
              lineHeight: 1.6,
              margin: 0,
              overflowX: 'auto',
              whiteSpace: 'pre-wrap',
            }}>
              {currentStage.artifactContent}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
