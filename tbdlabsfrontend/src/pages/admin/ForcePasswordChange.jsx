import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, KeyRound, LogOut, ShieldCheck } from 'lucide-react';
import logoImg from '../../assets/img/logo.png';
import { authStorage, changeStaffPassword, fetchCurrentUser, logoutStaff } from '../../services/api.js';
import '../../styles/admin-dashboard.css';

export default function ForcePasswordChange({ navigate }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;
    async function loadSession() {
      if (!authStorage.getToken()) {
        navigate('/admin/login');
        return;
      }
      const result = await fetchCurrentUser();
      if (ignore) return;
      if (!result.ok || !result.data?.user) {
        authStorage.clear();
        navigate('/admin/login');
        return;
      }
      if (!result.data.user.mustChangePassword) {
        navigate('/admin/dashboard');
        return;
      }
      setUser(result.data.user);
      setLoading(false);
    }
    loadSession().catch(() => {
      if (!ignore) {
        authStorage.clear();
        navigate('/admin/login');
      }
    });
    return () => { ignore = true; };
  }, [navigate]);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    if (newPassword.length < 12) {
      setError('Choose a password with at least 12 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('The new password and confirmation do not match.');
      return;
    }
    setSaving(true);
    const result = await changeStaffPassword({ currentPassword, newPassword });
    setSaving(false);
    if (!result.ok) {
      setError(result.error?.message || 'Could not change your password.');
      return;
    }
    navigate('/admin/dashboard');
  };

  const signOut = async () => {
    await logoutStaff();
    navigate('/admin/login');
  };

  if (loading || !user) return <main id="main-content" className="admin-session-loading" role="status">Verifying your account…</main>;

  return (
    <main id="main-content" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '1.25rem', background: 'var(--bg-canvas)' }}>
      <section className="admin-panel" style={{ width: 'min(100%, 470px)', padding: '2rem' }} aria-labelledby="change-password-title">
        <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '1.5rem' }}>
          <img src={logoImg} alt="" style={{ width: 42, height: 42, objectFit: 'contain' }} />
          <div><strong style={{ display: 'block', fontFamily: 'var(--font-heading)' }}>TBD Labs</strong><span style={{ color: 'var(--text-muted)', fontSize: '.75rem' }}>Staff account setup</span></div>
        </div>
        <div style={{ display: 'flex', gap: '.65rem', alignItems: 'center', marginBottom: '.5rem' }}>
          <KeyRound size={19} style={{ color: 'var(--accent-primary)' }} aria-hidden="true" />
          <h1 id="change-password-title" style={{ margin: 0, fontSize: '1.35rem' }}>Change your temporary password</h1>
        </div>
        <p style={{ margin: '0 0 1.35rem', fontSize: '.84rem' }}>Welcome, {user.name}. For account security, choose a new password before continuing to the staff dashboard.</p>

        {error && <div className="admin-inline-notice admin-notice-error" role="alert" style={{ marginBottom: '1rem' }}><AlertCircle size={16} />{error}</div>}

        <form onSubmit={submit} style={{ display: 'grid', gap: '1rem' }}>
          <div className="admin-field"><label htmlFor="current-password">Temporary password from your email</label><input id="current-password" type="password" autoComplete="current-password" required value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} /></div>
          <div className="admin-field"><label htmlFor="new-password">New password</label><input id="new-password" type="password" autoComplete="new-password" minLength={12} maxLength={72} required value={newPassword} onChange={(event) => setNewPassword(event.target.value)} /><span style={{ color: 'var(--text-muted)', fontSize: '.72rem' }}>At least 12 characters.</span></div>
          <div className="admin-field"><label htmlFor="confirm-password">Confirm new password</label><input id="confirm-password" type="password" autoComplete="new-password" minLength={12} maxLength={72} required value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} /></div>
          <button type="submit" className="admin-button admin-button-primary" disabled={saving} style={{ width: '100%', minHeight: 44 }}>{saving ? 'Updating password…' : <><CheckCircle2 size={16} />Save new password</>}</button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginTop: '1.2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '.74rem' }}><ShieldCheck size={14} style={{ verticalAlign: 'text-bottom', marginRight: '.25rem' }} />Your temporary password will stop working.</span>
          <button type="button" className="admin-button admin-button-quiet" onClick={signOut}><LogOut size={14} />Sign out</button>
        </div>
      </section>
    </main>
  );
}
