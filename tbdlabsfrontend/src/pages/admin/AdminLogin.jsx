import { useState, useEffect } from 'react';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import logoImg from '../../assets/img/logo.png';
import { loginStaff, authStorage } from '../../services/api.js';

export default function AdminLogin({ navigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (authStorage.getToken()) {
      const user = authStorage.getUser();
      navigate(user?.mustChangePassword ? '/admin/change-password' : '/admin/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Please provide both email address and password.');
      return;
    }

    setLoading(true);
    setError('');

    const res = await loginStaff({ email, password });
    setLoading(false);

    if (res.ok) {
      navigate(res.data?.user?.mustChangePassword ? '/admin/change-password' : '/admin/dashboard');
    } else {
      setError(res.error?.message || 'Login failed. Please verify your credentials.');
    }
  };

  return (
    <main id="main-content" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 1.5rem', position: 'relative' }}>
      {/* Background glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '550px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(0, 229, 255, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'rgba(14, 16, 23, 0.95)',
          border: '1px solid rgba(0, 229, 255, 0.2)',
          borderRadius: '20px',
          padding: '2.5rem',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 229, 255, 0.05)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Header with real brand logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem',
              padding: '6px',
              borderRadius: '14px',
              background: 'radial-gradient(circle, rgba(0,229,255,0.15) 0%, transparent 70%)',
            }}
          >
            <img
              src={logoImg}
              alt="TBD Labs"
              style={{ height: '48px', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 0 10px rgba(0,229,255,0.4))' }}
            />
          </div>
          <h1 style={{ fontSize: '1.45rem', fontFamily: 'Space Grotesk, sans-serif', marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
            Operations Console
          </h1>
          <p style={{ color: '#00e5ff', fontSize: '0.78rem', fontFamily: 'JetBrains Mono, monospace', margin: 0 }}>
            Technology Beyond Dimensions
          </p>
        </div>

        {error && (
          <div
            role="alert"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '0.85rem 1rem',
              borderRadius: '10px',
              background: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              color: '#ef4444',
              fontSize: '0.85rem',
              marginBottom: '1.5rem',
            }}
          >
            <AlertCircle size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group">
            <label htmlFor="admin-email" className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={14} style={{ color: '#00e5ff' }} />
              Staff or superadmin email address
            </label>
            <input
              id="admin-email"
              type="email"
              className="form-input"
              placeholder="name@tbdlabs.com.np"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="admin-password" className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Lock size={14} style={{ color: '#00e5ff' }} />
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              className="form-input"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{
              width: '100%',
              justifyContent: 'center',
              marginTop: '0.5rem',
              padding: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {loading ? (
              <>
                <span
                  aria-hidden="true"
                  style={{
                    width: 14,
                    height: 14,
                    border: '2px solid rgba(7,8,11,0.3)',
                    borderTopColor: 'var(--bg-canvas)',
                    borderRadius: '50%',
                    display: 'inline-block',
                    animation: 'spin 0.6s linear infinite',
                  }}
                />
                Authenticating...
              </>
            ) : (
              <>
                Sign in to Console <ArrowRight size={16} aria-hidden="true" />
              </>
            )}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.25rem' }}>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            style={{ color: 'var(--text-muted)', fontSize: '0.82rem', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#00e5ff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            ← Return to public website
          </a>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </main>
  );
}
