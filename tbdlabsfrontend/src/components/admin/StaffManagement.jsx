import { useCallback, useEffect, useState } from 'react';
import { CircleAlert, CircleCheck, Plus, RefreshCw, ShieldCheck, UserRoundCheck, UserRoundX } from 'lucide-react';
import { createStaffMember, fetchStaffList, toggleStaffActiveStatus } from '../../services/api.js';

function formatDate(value) {
  if (!value) return '—';
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(value));
}

export default function StaffManagement() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const loadStaff = useCallback(async () => {
    setLoading(true);
    const result = await fetchStaffList();
    setLoading(false);
    if (result.ok) setStaff(result.data || []);
    else setError(result.error?.message || 'Could not load staff accounts.');
  }, []);

  useEffect(() => {
    let ignore = false;
    fetchStaffList().then((result) => {
      if (ignore) return;
      if (result.ok) setStaff(result.data || []);
      else setError(result.error?.message || 'Could not load staff accounts.');
      setLoading(false);
    }).catch(() => {
      if (!ignore) {
        setError('Could not connect to staff accounts.');
        setLoading(false);
      }
    });
    return () => { ignore = true; };
  }, []);

  const updateField = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const createStaff = async (event) => {
    event.preventDefault();
    setError('');
    setNotice(null);
    if (form.password.length < 12) {
      setError('Use a temporary password with at least 12 characters.');
      return;
    }
    setSubmitting(true);
    const result = await createStaffMember(form);
    setSubmitting(false);
    if (!result.ok) {
      setError(result.error?.message || 'Could not create the staff account.');
      return;
    }
    setNotice(`Staff account created for ${result.data?.name || form.name}. Sign-in details were emailed; they must change the temporary password on first sign-in.`);
    setForm({ name: '', email: '', password: '' });
    setShowForm(false);
    loadStaff();
  };

  const toggleStatus = async (member) => {
    setError('');
    setNotice(null);
    const result = await toggleStaffActiveStatus(member.id, !member.isActive);
    if (!result.ok) {
      setError(result.error?.message || 'Could not update the staff account.');
      return;
    }
    setNotice(`${member.name} is now ${member.isActive ? 'inactive' : 'active'}.`);
    loadStaff();
  };

  return (
    <section>
      <div className="admin-page-heading">
        <h2>Staff management</h2>
        <p>Create staff accounts and manage access. Staff accounts handle inquiry claims and client replies.</p>
      </div>
      <div className="admin-panel">
        <div className="admin-panel-heading">
          <h3>Staff accounts <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({staff.length})</span></h3>
          <div style={{ display: 'flex', gap: '.5rem' }}>
            <button type="button" className="admin-button admin-button-quiet admin-icon-button" aria-label="Refresh staff list" onClick={loadStaff}><RefreshCw size={15} /></button>
            <button type="button" className="admin-button admin-button-primary" onClick={() => { setError(''); setShowForm((value) => !value); }}><Plus size={15} />Add staff</button>
          </div>
        </div>

        {showForm && (
          <form className="admin-staff-form" onSubmit={createStaff}>
            <div className="admin-field"><label htmlFor="staff-name">Full name</label><input id="staff-name" name="name" required minLength={2} maxLength={120} value={form.name} onChange={updateField} autoComplete="name" /></div>
            <div className="admin-field"><label htmlFor="staff-email">Email</label><input id="staff-email" name="email" type="email" required maxLength={255} value={form.email} onChange={updateField} autoComplete="email" /></div>
            <div className="admin-field"><label htmlFor="staff-password">Temporary password emailed to staff</label><input id="staff-password" name="password" type="password" required minLength={12} maxLength={72} value={form.password} onChange={updateField} autoComplete="new-password" /></div>
            <button type="submit" className="admin-button admin-button-primary" disabled={submitting}>{submitting ? 'Creating…' : 'Create account'}</button>
          </form>
        )}

        {error && <div className="admin-inline-notice admin-notice-error" role="alert" style={{ margin: '1rem' }}><CircleAlert size={15} />{error}</div>}
        {notice && <div className="admin-inline-notice admin-notice-success" role="status" style={{ margin: '1rem' }}><CircleCheck size={15} />{notice}</div>}

        {loading ? <div className="admin-loading">Loading staff accounts…</div> : staff.length === 0 ? (
          <div className="admin-empty"><div><ShieldCheck size={24} /><p>No staff accounts have been created yet.</p></div></div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Name</th><th>Email</th><th>Created</th><th>Status</th><th><span className="visually-hidden">Actions</span></th></tr></thead>
              <tbody>{staff.map((member) => (
                <tr key={member.id}>
                  <td><strong>{member.name}</strong></td>
                  <td>{member.email}</td>
                  <td>{formatDate(member.createdAt)}</td>
                  <td><span className={`admin-status ${member.isActive ? 'admin-status-replied' : 'admin-status-archived'}`}>{member.isActive ? 'Active' : 'Inactive'}</span></td>
                  <td><button type="button" className={`admin-button ${member.isActive ? 'admin-button-danger' : ''}`} onClick={() => toggleStatus(member)}>{member.isActive ? <><UserRoundX size={14} />Deactivate</> : <><UserRoundCheck size={14} />Activate</>}</button></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
