import { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';

const SERVICE_OPTIONS = [
  'Web Development',
  'Mobile Development',
  'AI & Machine Learning',
  'UI/UX Design',
  'Software Development',
  'Digital Solutions',
  'Not sure yet / General inquiry',
];

const initialForm = {
  name: '', email: '', organization: '',
  service: '', budget: '', message: '',
};

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Full name is required.';
  if (!form.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!form.service) errors.service = 'Please select a service category.';
  if (!form.message.trim()) errors.message = 'A message is required.';
  else if (form.message.trim().length < 30) errors.message = 'Please provide a bit more detail (at least 30 characters).';
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, ...validate({ ...form, [name]: value }) }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, ...validate(form) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(Object.keys(form).map((k) => [k, true]));
    setTouched(allTouched);
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setStatus('loading');
    // Decoupled submission hook — connect to your endpoint or form service here.
    await new Promise((r) => setTimeout(r, 1200));
    setStatus('success');
    setForm(initialForm);
    setTouched({});
  };

  return (
    <main id="main-content">
      {/* Hero */}
      <section style={{ paddingTop: '8.5rem', paddingBottom: '5rem', position: 'relative' }}>
        <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(0,229,255,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '580px' }}>
            <span style={{ display: 'inline-block', padding: '0.3rem 1rem', borderRadius: 9999, border: '1px solid rgba(0,229,255,0.25)', background: 'rgba(0,229,255,0.06)', color: '#00e5ff', fontSize: '0.78rem', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.06em', marginBottom: '1.5rem' }}>
              Get in touch
            </span>
            <h1 style={{ marginBottom: '1.25rem' }}>Start a conversation with TBD Labs</h1>
            <p className="lead">
              Tell us about your project. We will review every submission and respond with an honest technical assessment.
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="section" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>

            {/* Form */}
            <div style={{ flex: 2, minWidth: 0, maxWidth: '680px' }}>
              {status === 'success' ? (
                <div style={{ padding: '3rem', textAlign: 'center', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '16px' }}>
                  <CheckCircle size={44} aria-hidden="true" style={{ color: '#10b981', marginBottom: '1rem' }} />
                  <h2 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>Message received</h2>
                  <p style={{ color: '#9aa1b2' }}>Thank you for reaching out. We will review your brief and get back to you as soon as possible.</p>
                  <button className="btn btn-secondary" style={{ marginTop: '2rem' }} onClick={() => setStatus('idle')}>
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Project inquiry form"
                  style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}
                >
                  <div className="grid-cols-2" style={{ gap: '1.25rem' }}>
                    {/* Name */}
                    <div className="form-group">
                      <label htmlFor="contact-name" className="form-label">
                        Full name <span aria-hidden="true" style={{ color: '#00e5ff' }}>*</span>
                      </label>
                      <input
                        id="contact-name" name="name" type="text"
                        className="form-input"
                        placeholder="Your name"
                        value={form.name} onChange={handleChange} onBlur={handleBlur}
                        aria-required="true"
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        aria-invalid={!!errors.name}
                      />
                      {touched.name && errors.name && (
                        <span id="name-error" className="form-error-msg" role="alert">{errors.name}</span>
                      )}
                    </div>
                    {/* Email */}
                    <div className="form-group">
                      <label htmlFor="contact-email" className="form-label">
                        Email address <span aria-hidden="true" style={{ color: '#00e5ff' }}>*</span>
                      </label>
                      <input
                        id="contact-email" name="email" type="email"
                        className="form-input"
                        placeholder="you@example.com"
                        value={form.email} onChange={handleChange} onBlur={handleBlur}
                        aria-required="true"
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        aria-invalid={!!errors.email}
                      />
                      {touched.email && errors.email && (
                        <span id="email-error" className="form-error-msg" role="alert">{errors.email}</span>
                      )}
                    </div>
                  </div>

                  {/* Organization */}
                  <div className="form-group">
                    <label htmlFor="contact-org" className="form-label">Organization <span style={{ color: '#61687a', fontWeight: 400 }}>(optional)</span></label>
                    <input id="contact-org" name="organization" type="text" className="form-input" placeholder="Company or project name" value={form.organization} onChange={handleChange} />
                  </div>

                  {/* Service */}
                  <div className="form-group">
                    <label htmlFor="contact-service" className="form-label">
                      Service category <span aria-hidden="true" style={{ color: '#00e5ff' }}>*</span>
                    </label>
                    <select
                      id="contact-service" name="service"
                      className="form-select"
                      value={form.service} onChange={handleChange} onBlur={handleBlur}
                      aria-required="true"
                      aria-describedby={errors.service ? 'service-error' : undefined}
                      aria-invalid={!!errors.service}
                    >
                      <option value="">Select a service...</option>
                      {SERVICE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    {touched.service && errors.service && (
                      <span id="service-error" className="form-error-msg" role="alert">{errors.service}</span>
                    )}
                  </div>

                  {/* Budget */}
                  <div className="form-group">
                    <label htmlFor="contact-budget" className="form-label">Project scope / budget range <span style={{ color: '#61687a', fontWeight: 400 }}>(optional)</span></label>
                    <select id="contact-budget" name="budget" className="form-select" value={form.budget} onChange={handleChange}>
                      <option value="">Prefer not to say</option>
                      <option value="small">Small project (&lt; $2,000)</option>
                      <option value="medium">Medium project ($2,000 – $10,000)</option>
                      <option value="large">Large project ($10,000 – $50,000)</option>
                      <option value="enterprise">Enterprise / ongoing engagement</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="form-group">
                    <label htmlFor="contact-message" className="form-label">
                      Project brief <span aria-hidden="true" style={{ color: '#00e5ff' }}>*</span>
                    </label>
                    <textarea
                      id="contact-message" name="message"
                      className="form-textarea"
                      placeholder="Describe the problem you are trying to solve, the context, and what a successful outcome looks like..."
                      value={form.message} onChange={handleChange} onBlur={handleBlur}
                      aria-required="true"
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      aria-invalid={!!errors.message}
                    />
                    {touched.message && errors.message && (
                      <span id="message-error" className="form-error-msg" role="alert">{errors.message}</span>
                    )}
                  </div>

                  {status === 'error' && (
                    <div role="alert" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', fontSize: '0.875rem', marginBottom: '1rem' }}>
                      <AlertCircle size={16} aria-hidden="true" /> Submission failed. Please try again or email us directly.
                    </div>
                  )}

                  <button
                    id="submit-contact-form"
                    type="submit"
                    className="btn btn-primary"
                    disabled={status === 'loading'}
                    style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '0.75rem' }}
                  >
                    {status === 'loading' ? (
                      <>
                        <span aria-hidden="true" style={{ width: 14, height: 14, border: '2px solid rgba(7,8,11,0.3)', borderTopColor: '#07080b', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.6s linear infinite' }} />
                        Sending...
                      </>
                    ) : (
                      <><Send size={15} aria-hidden="true" /> Send message</>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact details */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2 style={{ fontSize: '1.25rem', fontFamily: 'Space Grotesk, sans-serif', marginBottom: '2rem' }}>Direct contact</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  { Icon: Mail, label: 'Email', value: 'contact@tbdlabs.com.np', hint: null },
                  { Icon: MapPin, label: 'Location', value: 'Nepal', hint: null },
                ].map(({ Icon, label, value, hint }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#00e5ff' }}>
                      <Icon size={18} aria-hidden="true" />
                    </div>
                    <div>
                      <p style={{ color: '#61687a', fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>{label}</p>
                      <p style={{ color: hint ? '#61687a' : '#f3f5f8', fontSize: '0.9rem', fontStyle: hint ? 'italic' : 'normal', margin: 0 }}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '3rem', padding: '1.5rem', borderRadius: '14px', background: 'rgba(0,229,255,0.04)', border: '1px solid rgba(0,229,255,0.12)' }}>
                <h3 style={{ fontSize: '0.95rem', fontFamily: 'Space Grotesk, sans-serif', marginBottom: '0.75rem' }}>What to expect</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    'We read every submission personally',
                    'Honest assessment, no sales pressure',
                    'We say no if it is not the right fit',
                    'Response time: within a few business days'
                  ].map((item) => (
                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: '#9aa1b2', fontSize: '0.85rem' }}>
                      <span style={{ color: '#00e5ff', marginTop: '1px', flexShrink: 0 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </main>
  );
}
