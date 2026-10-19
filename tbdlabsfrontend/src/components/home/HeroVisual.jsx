import { useState, useEffect } from 'react';
import { Terminal, Activity, CheckCircle2, Play, Cpu, Database, Shield } from 'lucide-react';

const API_STREAMS = [
  {
    type: 'request',
    route: 'POST /v2/ai/inference/analyze',
    body: '{\n  "source": "sensor_feed_zone_3",\n  "modalities": ["visual", "spectral"],\n  "offline_sync": true\n}',
  },
  {
    type: 'response',
    status: '200 OK · 18ms',
    payload: '{\n  "system_state": "OPTIMAL",\n  "confidence": 0.984,\n  "anomaly_flag": false,\n  "next_action": "DISPATCH_TELEMETRY"\n}',
  }
];

const BUILD_LOGS = [
  { step: '01', title: 'Architecture Schema Validation', status: 'Passed', time: '4ms' },
  { step: '02', title: 'Compile PyTorch Optimization Graph', status: 'Optimal', time: '12ms' },
  { step: '03', title: 'PostgreSQL Migration & Index Check', status: 'Verified', time: '8ms' },
  { step: '04', title: 'Container Build & Edge Distribution', status: 'Deployed', time: '21ms' },
];

export function HeroVisual() {
  const [activeTab, setActiveTab] = useState('stream'); // stream | pipeline | metrics
  const [streamIndex, setStreamIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStreamIndex((prev) => (prev + 1) % API_STREAMS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '16px',
        border: '1px solid rgba(0, 229, 255, 0.22)',
        background: 'linear-gradient(180deg, rgba(14, 17, 24, 0.95) 0%, rgba(8, 9, 13, 0.98) 100%)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 40px rgba(0, 229, 255, 0.08)',
        overflow: 'hidden',
        fontFamily: 'JetBrains Mono, monospace',
      }}
    >
      {/* Window Title Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 1rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(255, 255, 255, 0.02)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
          <span style={{ color: '#61687a', fontSize: '0.75rem', marginLeft: '8px' }}>tbd-core-runtime :: v2.4.0</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00e5ff', display: 'inline-block', boxShadow: '0 0 6px #00e5ff' }} />
          <span style={{ color: '#00e5ff', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Live Cluster</span>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          background: 'rgba(0, 0, 0, 0.2)',
          padding: '0.25rem 0.5rem 0',
          gap: '4px',
        }}
      >
        {[
          { id: 'stream', label: 'api.stream()', icon: Terminal },
          { id: 'pipeline', label: 'build.pipeline', icon: Activity },
          { id: 'metrics', label: 'system.telemetry', icon: Cpu },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0.45rem 0.85rem',
              fontSize: '0.75rem',
              fontFamily: 'inherit',
              border: 'none',
              borderRadius: '8px 8px 0 0',
              cursor: 'pointer',
              background: activeTab === id ? 'rgba(0, 229, 255, 0.1)' : 'transparent',
              color: activeTab === id ? '#00e5ff' : '#61687a',
              borderBottom: activeTab === id ? '2px solid #00e5ff' : '2px solid transparent',
              transition: 'all 150ms ease',
            }}
          >
            <Icon size={12} aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content Area */}
      <div style={{ padding: '1.25rem', minHeight: '260px' }}>
        {activeTab === 'stream' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#9aa1b2', fontSize: '0.75rem' }}>// Real-time API Payload Stream</span>
              <span style={{ background: 'rgba(0, 229, 255, 0.1)', color: '#00e5ff', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem' }}>
                latency: 18ms
              </span>
            </div>
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '8px',
                padding: '1rem',
                border: '1px solid rgba(255, 255, 255, 0.04)',
                fontSize: '0.8rem',
                lineHeight: 1.6,
                color: '#e2e8f0',
              }}
            >
              <div style={{ color: '#00e5ff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Play size={10} fill="#00e5ff" /> {API_STREAMS[streamIndex].route || API_STREAMS[streamIndex].status}
              </div>
              <pre style={{ color: '#94a3b8', margin: 0, overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
                {API_STREAMS[streamIndex].body || API_STREAMS[streamIndex].payload}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'pipeline' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ color: '#9aa1b2', fontSize: '0.75rem', marginBottom: '0.25rem' }}>// CI/CD Automated Verification Pipeline</div>
            {BUILD_LOGS.map((log) => (
              <div
                key={log.step}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.6rem 0.85rem',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={14} color="#10b981" />
                  <span style={{ color: '#f3f5f8', fontSize: '0.78rem' }}>{log.title}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#10b981', fontSize: '0.7rem' }}>{log.status}</span>
                  <span style={{ color: '#61687a', fontSize: '0.7rem' }}>{log.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'metrics' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {[
              { label: 'Uptime SLA', val: '99.98%', icon: Shield, note: 'zero unplanned outages' },
              { label: 'Avg API Latency', val: '24ms', icon: Activity, note: 'edge-cached endpoints' },
              { label: 'DB Read Replica', val: 'Synced', icon: Database, note: 'PostgreSQL primary-replica' },
              { label: 'Model Throughput', val: '450 req/s', icon: Cpu, note: 'compiled inference engine' },
            ].map(({ label, val, icon: Icon, note }) => (
              <div
                key={label}
                style={{
                  padding: '0.85rem',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#61687a', fontSize: '0.72rem', marginBottom: '4px' }}>
                  <Icon size={12} color="#00e5ff" /> {label}
                </div>
                <div style={{ color: '#00e5ff', fontSize: '1.15rem', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif' }}>{val}</div>
                <div style={{ color: '#61687a', fontSize: '0.68rem', marginTop: '2px' }}>{note}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Terminal Footer Strip */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5rem 1rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          background: 'rgba(0, 0, 0, 0.3)',
          fontSize: '0.72rem',
          color: '#61687a',
        }}
      >
        <span>Environment: Production · Multi-Region</span>
        <span style={{ color: '#10b981' }}>● All systems operational</span>
      </div>
    </div>
  );
}
