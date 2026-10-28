import { useState } from 'react';
import { Inbox } from 'lucide-react';
import AdminShell from '../../components/admin/AdminShell.jsx';
import InquiryWorkspace from '../../components/admin/InquiryWorkspace.jsx';
import { useAdminSession } from './useAdminSession.js';

const navigation = [{ id: 'inbox', label: 'Inquiry inbox', icon: Inbox }];

export default function StaffDashboard({ navigate }) {
  const { user, loading } = useAdminSession(navigate, 'staff');
  const [section, setSection] = useState('inbox');
  if (loading || !user) return <main id="main-content" className="admin-session-loading" role="status">Loading staff dashboard…</main>;

  return (
    <AdminShell
      user={user}
      title="Staff dashboard"
      subtitle="Review assigned inquiries and send client replies."
      navigation={navigation}
      activeSection={section}
      onSectionChange={setSection}
      navigate={navigate}
    >
      {section === 'inbox' && <InquiryWorkspace user={user} canHandleInquiries />}
    </AdminShell>
  );
}
