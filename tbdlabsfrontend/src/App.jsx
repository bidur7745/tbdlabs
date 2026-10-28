import { useRouter } from './router/Router.jsx';
import { Navbar } from './components/layout/Navbar.jsx';
import { Footer } from './components/layout/Footer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Projects from './pages/Projects.jsx';
import Technology from './pages/Technology.jsx';
import Insights from './pages/Insights.jsx';
import Contact from './pages/Contact.jsx';
import Terms from './pages/Terms.jsx';
import Privacy from './pages/Privacy.jsx';
import NotFound from './pages/NotFound.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import SuperadminDashboard from './pages/admin/SuperadminDashboard.jsx';
import StaffDashboard from './pages/admin/StaffDashboard.jsx';
import ForcePasswordChange from './pages/admin/ForcePasswordChange.jsx';
import './styles/global.css';

function renderPage(path, navigate) {
  switch (path) {
    case '/':                  return <Home navigate={navigate} />;
    case '/about':             return <About navigate={navigate} />;
    case '/services':          return <Services navigate={navigate} />;
    case '/projects':          return <Projects navigate={navigate} />;
    case '/technology':        return <Technology navigate={navigate} />;
    case '/insights':          return <Insights navigate={navigate} />;
    case '/contact':           return <Contact navigate={navigate} />;
    case '/admin':
    case '/admin/login':       return <AdminLogin navigate={navigate} />;
    case '/admin/dashboard':   return <AdminDashboard navigate={navigate} />;
    case '/admin/superadmin':  return <SuperadminDashboard navigate={navigate} />;
    case '/admin/staff-dashboard': return <StaffDashboard navigate={navigate} />;
    case '/admin/change-password': return <ForcePasswordChange navigate={navigate} />;
    case '/terms':             return <Terms navigate={navigate} />;
    case '/privacy':           return <Privacy navigate={navigate} />;
    default:                   return <NotFound navigate={navigate} />;
  }
}

export default function App() {
  const { currentPath, navigate } = useRouter();
  const isAdminRoute = currentPath.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <>
        <a href="#main-content" className="skip-to-content">Skip to main content</a>
        {renderPage(currentPath, navigate)}
      </>
    );
  }

  return (
    <>
      <a href="#main-content" className="skip-to-content">Skip to main content</a>
      <Navbar currentPath={currentPath} navigate={navigate} />
      {renderPage(currentPath, navigate)}
      <Footer navigate={navigate} />
    </>
  );
}
