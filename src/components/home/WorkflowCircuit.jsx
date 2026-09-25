import workflowImage from '../../assets/img/5principles.png';

export function WorkflowCircuit() {
  return (
    <section
      className="section"
      aria-labelledby="workflow-heading"
      style={{
        background: 'rgba(11, 14, 21, 0.5)',
        paddingTop: '2rem',
        paddingBottom: '1rem',
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', width: '100%' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '0.35rem 0.9rem',
              borderRadius: '9999px',
              border: '1px solid rgba(0,229,255,0.25)',
              background: 'rgba(0,229,255,0.06)',
              color: '#00e5ff',
              fontSize: '0.78rem',
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.06em',
              marginBottom: '1rem',
            }}
          >
            Repeatable Delivery
          </div>

          <h2 id="workflow-heading" style={{ marginBottom: '1rem' }}>
            Five-stage engineering pipeline
          </h2>
          <p style={{ color: '#9aa1b2', fontSize: '1rem', lineHeight: 1.7, maxWidth: '640px', margin: '0 auto 2rem' }}>
            Every project follows an engineering-first lifecycle designed to eliminate ambiguity and deliver resilient software.
          </p>

          <img
            src={workflowImage}
            alt="Five-stage engineering pipeline"
            style={{
              display: 'block',
              width: '100%',
              maxWidth: '1500px',
              height: 'auto',
              margin: '0 auto',
              filter: 'drop-shadow(0 0 24px rgba(0, 229, 255, 0.08))',
            }}
          />
        </div>
      </div>
    </section>
  );
}
