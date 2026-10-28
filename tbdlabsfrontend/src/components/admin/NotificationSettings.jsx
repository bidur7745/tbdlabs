import { useEffect, useState } from 'react';
import { BellRing, CircleAlert, CircleCheck, ShieldCheck } from 'lucide-react';
import { fetchSystemSettings, updateSystemSettings } from '../../services/api.js';

export default function NotificationSettings() {
  const [enabled, setEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let ignore = false;
    fetchSystemSettings().then((result) => {
      if (ignore) return;
      if (result.ok) setEnabled(Boolean(result.data.contactEmailNotificationsEnabled));
      else setError(result.error?.message || 'Could not load notification settings.');
      setLoading(false);
    }).catch(() => {
      if (!ignore) {
        setError('Could not connect to settings.');
        setLoading(false);
      }
    });
    return () => { ignore = true; };
  }, []);

  const toggle = async () => {
    setSaving(true);
    setError('');
    setNotice('');
    const next = !enabled;
    const result = await updateSystemSettings({ contactEmailNotificationsEnabled: next });
    setSaving(false);
    if (!result.ok) {
      setError(result.error?.message || 'Could not update notification settings.');
      return;
    }
    setEnabled(Boolean(result.data.contactEmailNotificationsEnabled));
    setNotice(`Staff inquiry notifications are ${next ? 'on' : 'off'}.`);
  };

  return (
    <section>
      <div className="admin-page-heading">
        <h2>Email notifications</h2>
        <p>This setting controls staff alert emails when a visitor submits a new inquiry.</p>
      </div>
      <div className="admin-panel admin-panel-body">
        {error && <div className="admin-inline-notice admin-notice-error" role="alert" style={{ marginBottom: '1rem' }}><CircleAlert size={15} />{error}</div>}
        {notice && <div className="admin-inline-notice admin-notice-success" role="status" style={{ marginBottom: '1rem' }}><CircleCheck size={15} />{notice}</div>}
        <div className="admin-settings-card">
          <div>
            <h3><BellRing size={17} style={{ verticalAlign: 'text-bottom', marginRight: '.45rem', color: 'var(--accent-primary)' }} />Staff inquiry alerts</h3>
            <p>When enabled, new inquiry alerts are sent to active staff accounts. Visitors still receive a confirmation email when staff alerts are off.</p>
            <p style={{ marginTop: '.8rem', color: 'var(--text-muted)', fontSize: '.74rem' }}><ShieldCheck size={13} style={{ verticalAlign: 'text-bottom', marginRight: '.3rem' }} />Only the superadmin account can change this setting.</p>
          </div>
          <button type="button" className="admin-switch" role="switch" aria-label="Staff inquiry email notifications" aria-checked={enabled} disabled={loading || saving} onClick={toggle} />
        </div>
        <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '.76rem' }}>{loading ? 'Loading setting…' : saving ? 'Saving…' : `Notifications are currently ${enabled ? 'enabled' : 'disabled'}.`}</p>
      </div>
    </section>
  );
}
