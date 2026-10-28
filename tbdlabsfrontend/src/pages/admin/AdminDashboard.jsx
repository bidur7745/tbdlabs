import { useEffect, useState } from 'react';
import { authStorage, fetchCurrentUser } from '../../services/api.js';
import '../../styles/admin-dashboard.css';

const dashboardRoute = (role) => role === 'superadmin' ? '/admin/superadmin' : '/admin/staff-dashboard';

export default function AdminDashboard({ navigate }) {
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;
    async function redirectToRoleDashboard() {
      if (!authStorage.getToken()) {
        navigate('/admin/login');
        return;
      }
      const result = await fetchCurrentUser();
      if (ignore) return;
      if (!result.ok || !result.data?.user?.role) {
        authStorage.clear();
        navigate('/admin/login');
        return;
      }
      if (result.data.user.mustChangePassword) {
        navigate('/admin/change-password');
        return;
      }
      navigate(dashboardRoute(result.data.user.role));
    }
    redirectToRoleDashboard().catch(() => {
      if (!ignore) setError('Unable to verify your account. Please sign in again.');
    });
    return () => { ignore = true; };
  }, [navigate]);

  return <main id="main-content" className="admin-session-loading" role="status">{error || 'Opening your dashboard…'}</main>;
}
