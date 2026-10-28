import { useEffect, useState } from 'react';
import { authStorage, fetchCurrentUser } from '../../services/api.js';

const dashboardForRole = (role) => role === 'superadmin' ? '/admin/superadmin' : '/admin/staff-dashboard';

export function useAdminSession(navigate, expectedRole) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    async function verify() {
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
      const currentUser = result.data.user;
      if (currentUser.mustChangePassword) {
        navigate('/admin/change-password');
        return;
      }
      if (currentUser.role !== expectedRole) {
        navigate(dashboardForRole(currentUser.role));
        return;
      }
      setUser(currentUser);
      setLoading(false);
    }
    verify().catch(() => {
      if (!ignore) {
        authStorage.clear();
        navigate('/admin/login');
      }
    });
    return () => { ignore = true; };
  }, [navigate, expectedRole]);

  return { user, loading };
}
