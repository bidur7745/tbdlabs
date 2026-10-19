import { FileText, Shield, Globe, Scale, MessageSquare, AlertTriangle, RefreshCw, Mail } from 'lucide-react';

const SECTIONS = [
  {
    icon: Globe,
    title: '1. About TBD Labs',
    content: 'TBD Labs ("we," "us," or "our") is a product-and-engineering company based in Kathmandu, Nepal. We design and build production-grade software systems, intelligent platforms, and digital solutions. This Site serves as an informational resource about our capabilities, engineering approach, and selected work.',
  },
  {
    icon: FileText,
    title: '2. Use of the Site',
    content: 'You may use this Site for lawful purposes only.',
    list: [
      'Do not attempt to gain unauthorized access to any part of the Site, its servers, or connected systems.',
      'Do not use the Site to transmit harmful, offensive, or unlawful content.',
      'Do not reproduce, duplicate, or exploit any portion of the Site for commercial purposes without our express written permission.',
      'Do not use automated tools (scrapers, bots) to extract data from the Site beyond what is permitted by our robots.txt file.',
    ],
  },
  {
    icon: Shield,
    title: '3. Intellectual Property',
    content: 'All content on this Site — including text, graphics, logos, icons, images, code snippets, and design elements — is the property of TBD Labs or its respective content creators and is protected by applicable intellectual property laws.',
    list: [
      'The TBD Labs name, logo, and "Technology Beyond Dimensions" tagline are proprietary marks of TBD Labs.',
      'You may not use, reproduce, or distribute our branding or content without prior written consent.',
    ],
  },
  {
    icon: MessageSquare,
    title: '4. Project Inquiries & Communications',
    content: 'The Site includes a contact form for project inquiries. By submitting an inquiry:',
    list: [
      'You confirm that the information you provide is accurate and submitted in good faith.',
      'You understand that submitting an inquiry does not create a contractual obligation on either party.',
      'We will respond to inquiries at our discretion. Any project engagement will be governed by a separate agreement negotiated directly between you and TBD Labs.',
    ],
  },
  {
    icon: AlertTriangle,
    title: '5. Accuracy of Information',
    content: 'We make reasonable efforts to ensure the information on this Site is accurate and current. However:',
    list: [
      'We do not guarantee that all content is error-free or complete.',
      'Service descriptions, technology references, and project records reflect our capabilities at the time of writing and may be updated periodically.',
      'Nothing on this Site constitutes a warranty, guarantee, or binding offer of services.',
    ],
  },
  {
    icon: Globe,
    title: '6. Third-Party Links',
    content: 'The Site may contain links to third-party websites, tools, or resources. These links are provided for convenience only. TBD Labs does not endorse, control, or assume responsibility for the content, privacy practices, or availability of external sites.',
  },
  {
    icon: Scale,
    title: '7. Limitation of Liability',
    content: 'To the fullest extent permitted by law:',
    list: [
      'TBD Labs shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of or inability to use the Site.',
      'The Site is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied.',
    ],
  },
  {
    icon: Scale,
    title: '8. Governing Law',
    content: 'These Terms are governed by the laws of Nepal. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in Kathmandu, Nepal.',
  },
  {
    icon: RefreshCw,
    title: '9. Changes to These Terms',
    content: 'We may update these Terms from time to time. Changes will be posted on this page with an updated "Last updated" date. Continued use of the Site after changes are posted constitutes acceptance of the revised Terms.',
  },
  {
    icon: Mail,
    title: '10. Contact',
    content: 'If you have questions about these Terms, reach us through our contact page or at tbdlabs.com.np/contact.',
  },
];

export default function Terms({ navigate }) {
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
            <h1 style={{ marginBottom: '1.25rem' }}>Terms & Conditions</h1>
            <p className="lead">
              These Terms & Conditions govern your use of the TBD Labs website located at tbdlabs.com.np. By accessing or using the Site, you agree to be bound by these Terms.
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
                  <p style={{ color: '#9ca3af', fontSize: '0.925rem', lineHeight: 1.75, margin: 0 }}>
                    {section.content}
                  </p>
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
              For questions about these terms, visit our{' '}
              <a
                href="/contact"
                onClick={(e) => { e.preventDefault(); navigate('/contact'); }}
                style={{ color: '#00e5ff', textDecoration: 'none' }}
              >
                contact page
              </a>{' '}
              or review our{' '}
              <a
                href="/privacy"
                onClick={(e) => { e.preventDefault(); navigate('/privacy'); }}
                style={{ color: '#00e5ff', textDecoration: 'none' }}
              >
                Privacy Policy
              </a>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
