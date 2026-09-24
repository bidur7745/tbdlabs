import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading.jsx';
import { PROJECTS } from '../content/projects.js';
import { HeroVisual } from '../components/home/HeroVisual.jsx';
import { CapabilitiesBento } from '../components/home/CapabilitiesBento.jsx';
import { ProjectMockupCard } from '../components/home/ProjectMockupCard.jsx';
import { WorkflowCircuit } from '../components/home/WorkflowCircuit.jsx';
import { TechStripVisual } from '../components/home/TechStripVisual.jsx';

function HeroSection({ navigate }) {
  return (
    <section
      aria-label="Hero"
      style={{
        paddingTop: '8rem',
        paddingBottom: '5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Ambient Radial Glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '600px',
          background: 'radial-gradient(ellipse at center, rgba(0,229,255,0.08) 0%, rgba(0,119,182,0.03) 45%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Core Value Proposition */}
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0.35rem 1rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(0,229,255,0.25)',
                  backgroundColor: 'rgba(0,229,255,0.06)',
                  color: '#00e5ff',
                  fontSize: '0.8rem',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#00e5ff',
                    display: 'inline-block',
                    boxShadow: '0 0 8px rgba(0,229,255,0.8)',
                  }}
                />
                Engineering-Grade Software Systems
              </span>
            </div>

            <h1 style={{ marginBottom: '1.25rem', lineHeight: 1.1 }}>
              Technology{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #00e5ff 0%, #00b4d8 50%, #0077b6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Beyond Dimensions
              </span>
            </h1>

            <p
              className="lead"
              style={{
                marginBottom: '2rem',
                fontSize: '1.05rem',
                lineHeight: 1.7,
                color: '#9aa1b2',
              }}
            >
              We design and engineer production-ready systems — from intelligent AI pipelines to resilient full-stack applications — built to solve hard domain problems with verified precision.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <a
                href="/contact"
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/contact');
                }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                Start a conversation <ArrowRight size={15} aria-hidden="true" />
              </a>
              <a
                href="/projects"
                className="btn btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/projects');
                }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                Explore our work <ChevronRight size={15} aria-hidden="true" />
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div
              style={{
                display: 'flex',
                gap: '1.5rem',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                paddingTop: '1.5rem',
              }}
            >
              <div>
                <div style={{ color: '#00e5ff', fontFamily: 'Space Grotesk', fontSize: '1.25rem', fontWeight: 700 }}>Full-Stack & AI</div>
                <div style={{ color: '#61687a', fontSize: '0.75rem', fontFamily: 'JetBrains Mono' }}>Integrated Systems</div>
              </div>
              <div style={{ width: 1, background: 'rgba(255,255,255,0.08)' }} />
              <div>
                <div style={{ color: '#10b981', fontFamily: 'Space Grotesk', fontSize: '1.25rem', fontWeight: 700 }}>Strict CI/CD</div>
                <div style={{ color: '#61687a', fontSize: '0.75rem', fontFamily: 'JetBrains Mono' }}>Verified Delivery</div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Tech Interactive Terminal */}
          <div>
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedProjects({ navigate }) {
  return (
    <section className="section" aria-labelledby="projects-heading" style={{ backgroundColor: 'rgba(13,15,22,0.6)' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
          <SectionHeading
            eyebrow="Selected work"
            title="Systems we've engineered"
            subtitle="Real software products and AI engines built to solve genuine domain challenges."
          />
          <a
            href="/projects"
            className="btn btn-ghost"
            onClick={(e) => {
              e.preventDefault();
              navigate('/projects');
            }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            View all projects <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>

        <div className="grid-cols-3">
          {PROJECTS.map((project) => (
            <ProjectMockupCard key={project.id} project={project} navigate={navigate} />
          ))}
        </div>
      </div>
    </section>
  );
}

function InquiryBanner({ navigate }) {
  return (
    <section className="section" aria-labelledby="cta-heading">
      <div className="container">
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(0,229,255,0.08) 0%, rgba(14,18,28,0.95) 50%, rgba(0,180,216,0.05) 100%)',
            border: '1px solid rgba(0,229,255,0.25)',
            borderRadius: '24px',
            padding: '4.5rem 3rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 50px rgba(0, 229, 255, 0.06)',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at center top, rgba(0,229,255,0.12) 0%, transparent 60%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0.35rem 0.9rem',
              borderRadius: '9999px',
              background: 'rgba(0, 229, 255, 0.1)',
              border: '1px solid rgba(0, 229, 255, 0.3)',
              color: '#00e5ff',
              fontSize: '0.78rem',
              fontFamily: 'JetBrains Mono',
              marginBottom: '1.25rem',
            }}
          >
            <Sparkles size={12} /> Ready for Deployment
          </div>

          <h2
            id="cta-heading"
            style={{
              marginBottom: '1rem',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            }}
          >
            Ready to build something beyond?
          </h2>

          <p
            style={{
              color: '#9aa1b2',
              maxWidth: '500px',
              margin: '0 auto 2.5rem',
              fontSize: '1.05rem',
              lineHeight: 1.7,
            }}
          >
            Share your project brief with our engineering team for an honest technical assessment and clear execution path.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href="/contact"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                navigate('/contact');
              }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.85rem 1.75rem' }}
            >
              Start a conversation <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home({ navigate }) {
  return (
    <main id="main-content">
      <HeroSection navigate={navigate} />
      <CapabilitiesBento navigate={navigate} />
      <FeaturedProjects navigate={navigate} />
      <WorkflowCircuit />
      <TechStripVisual />
      <InquiryBanner navigate={navigate} />
    </main>
  );
}
