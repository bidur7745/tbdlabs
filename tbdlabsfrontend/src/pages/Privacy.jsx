import { Database, Eye, Lock, Share2, Clock, UserCheck, ShieldCheck, Globe, RefreshCw, Mail } from 'lucide-react';

const SECTIONS = [
  {
    icon: Database,
    title: '1. Information We Collect',
    content: 'When you use our contact form or reach out to us, we may collect:',
    list: [
      'Your name',
      'Email address',
      'Organization or company name (if provided)',
      'Project description or message content',
      'Any other information you choose to include in your inquiry',
    ],
    extra: 'When you visit the Site, we may automatically collect limited technical data such as browser type and version, operating system, pages visited and time spent, referring URL, and IP address (anonymized where possible).',
  },
  {
    icon: Lock,
    title: '2. Cookies',
    content: 'This Site does not currently use cookies. If this changes in the future, this policy will be updated accordingly with clear notice.',
  },
  {
    icon: Eye,
    title: '3. How We Use Your Information',
    content: 'We use the information we collect to:',
    list: [
      'Respond to inquiries — process and reply to project inquiries submitted through the contact form.',
      'Improve the Site — understand how visitors interact with the Site to improve content, performance, and user experience.',
      'Maintain security — detect and prevent unauthorized access or misuse of the Site.',
    ],
    extra: 'We will never send unsolicited marketing emails without your explicit consent, sell, rent, or trade your personal information to third parties, or build advertising profiles or engage in behavioral tracking.',
  },
  {
    icon: Share2,
    title: '4. Data Sharing',
    content: 'We do not sell your personal information. We may share data only in the following limited circumstances:',
    list: [
      'Service providers — trusted third-party tools that help us operate the Site (e.g., hosting, email delivery). These providers are bound by their own privacy obligations and process data only on our behalf. Specific third-party tools will be listed here as they are adopted.',
      'Legal obligations — if required to comply with applicable law, regulation, legal process, or enforceable government request.',
      'Business transfers — in the unlikely event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction, with notice provided.',
    ],
  },
  {
    icon: Clock,
    title: '5. Data Retention',
    content: null,
    list: [
      'Inquiry data (name, email, message) is retained only as long as necessary to respond to and follow up on your inquiry, after which it is deleted or anonymized.',
      'Analytics data, if collected, is aggregated and anonymized. No personally identifiable information is retained beyond 12 months.',
    ],
  },
  {
    icon: UserCheck,
    title: '6. Your Rights',
    content: 'Depending on your jurisdiction, you may have the right to:',
    list: [
      'Access the personal data we hold about you.',
      'Correct inaccurate or incomplete information.',
      'Delete your personal data from our systems.',
      'Object to or restrict certain processing of your data.',
    ],
    extra: 'To exercise any of these rights, contact us through our contact page. We will respond within a reasonable timeframe.',
  },
  {
    icon: ShieldCheck,
    title: '7. Data Security',
    content: 'We implement reasonable technical and organizational measures to protect your information against unauthorized access, alteration, or destruction. These include:',
    list: [
      'HTTPS encryption across the entire Site.',
      'Secure, access-controlled infrastructure for data handling.',
      'Regular review of our data practices.',
    ],
    extra: 'No method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.',
  },
  {
    icon: Globe,
    title: '8. International Visitors',
    content: 'This Site is operated from Nepal. If you access the Site from outside Nepal, your information may be transferred to and processed in Nepal. By using the Site, you consent to this transfer.',
  },
  {
    icon: RefreshCw,
    title: '9. Changes to This Policy',
    content: 'We may update this Privacy Policy from time to time. Changes will be reflected on this page with an updated "Last updated" date. We encourage you to review this page periodically.',
  },
  {
    icon: Mail,
    title: '10. Contact',
    content: 'For questions, concerns, or requests regarding this Privacy Policy, reach us through our contact page or at tbdlabs.com.np/contact.',
  },
];

export default function Privacy({ navigate }) {
  return (
    <main id="main-content">
      {/* Hero */}
      <section style={{ paddingTop: '8.5rem', paddingBottom: '4rem', position: 'relative' }}>
        <div aria-hidden="true" style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '400px',
          background: 'radial-gradient(ellipse, rgba(0,229,255,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '960px' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '0.3rem 1rem', borderRadius: 9999,
              border: '1px solid rgba(0,229,255,0.25)', background: 'rgba(0,229,255,0.06)',
              color: '#00e5ff', fontSize: '0.78rem', fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.06em', marginBottom: '1.5rem',
            }}>
              Legal
            </span>
            <h1 style={{ marginBottom: '1.25rem' }}>Privacy Policy</h1>
            <p className="lead">
              TBD Labs respects your privacy. This Privacy Policy explains what information we collect through our website at tbdlabs.com.np, how we use it, and your choices regarding that information.
            </p>
            <p style={{ color: '#6b7280', fontSize: '0.85rem', marginTop: '1rem', fontFamily: 'JetBrains Mono, monospace' }}>
              Last updated: October 2026
            </p>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section style={{ paddingBottom: '6rem' }}>
        <div className="container">
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {SECTIONS.map((section) => {
              const Icon = section.icon;
              return (
                <article
                  key={section.title}
                  className="card"
                  style={{
                    padding: '2rem 2.5rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '10px',
                      background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <Icon size={16} style={{ color: '#00e5ff' }} aria-hidden="true" />
                    </div>
                    <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.15rem', fontWeight: 600, margin: 0 }}>
                      {section.title}
                    </h3>
                  </div>
                  {section.content && (
                    <p style={{ color: '#9ca3af', fontSize: '0.925rem', lineHeight: 1.75, margin: 0 }}>
                      {section.content}
                    </p>
                  )}
                  {section.list && (
                    <ul style={{
                      marginTop: '0.75rem', marginBottom: 0, paddingLeft: '1.25rem',
                      display: 'flex', flexDirection: 'column', gap: '0.5rem',
                    }}>
                      {section.list.map((item, i) => (
                        <li key={i} style={{ color: '#9ca3af', fontSize: '0.9rem', lineHeight: 1.7 }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.extra && (
                    <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: 1.7, marginTop: '0.75rem', marginBottom: 0 }}>
                      {section.extra}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ paddingBottom: '5rem' }}>
        <div className="container">
          <div
            className="card"
            style={{
              padding: '2rem 2.5rem',
              border: '1px solid rgba(0,229,255,0.2)',
              background: 'linear-gradient(135deg, rgba(0,229,255,0.05), rgba(0,180,216,0.02))',
            }}
          >
            <p style={{ color: '#9ca3af', fontSize: '0.925rem', lineHeight: 1.75, margin: 0 }}>
              For questions about this policy, visit our{' '}
              <a
                href="/contact"
                onClick={(e) => { e.preventDefault(); navigate('/contact'); }}
                style={{ color: '#00e5ff', textDecoration: 'none' }}
              >
                contact page
              </a>{' '}
              or review our{' '}
              <a
                href="/terms"
                onClick={(e) => { e.preventDefault(); navigate('/terms'); }}
                style={{ color: '#00e5ff', textDecoration: 'none' }}
              >
                Terms & Conditions
              </a>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
