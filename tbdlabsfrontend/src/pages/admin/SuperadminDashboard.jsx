import { useState } from 'react';
import { Inbox, Settings2, UsersRound } from 'lucide-react';
import AdminShell from '../../components/admin/AdminShell.jsx';
import InquiryWorkspace from '../../components/admin/InquiryWorkspace.jsx';
import NotificationSettings from '../../components/admin/NotificationSettings.jsx';
import StaffManagement from '../../components/admin/StaffManagement.jsx';
import { useAdminSession } from './useAdminSession.js';

const navigation = [
  { id: 'inbox', label: 'Inquiry overview', icon: Inbox },
  { id: 'staff', label: 'Staff management', icon: UsersRound },
  { id: 'settings', label: 'Email notifications', icon: Settings2 },
];

export default function SuperadminDashboard({ navigate }) {
  const { user, loading } = useAdminSession(navigate, 'superadmin');
  const [section, setSection] = useState('inbox');
  if (loading || !user) return <main id="main-content" className="admin-session-loading" role="status">Loading superadmin dashboard…</main>;

  return (
    <AdminShell
      user={user}
      title="Superadmin dashboard"
      subtitle="Read inquiries, manage staff access, and control staff email alerts."
      navigation={navigation}
      activeSection={section}
      onSectionChange={setSection}
      navigate={navigate}
    >
      {section === 'inbox' && <InquiryWorkspace user={user} canHandleInquiries={false} />}
      {section === 'staff' && <StaffManagement />}
      {section === 'settings' && <NotificationSettings />}
    </AdminShell>
  );
}
