import { useRouter } from './router/Router.jsx';
import { Navbar } from './components/layout/Navbar.jsx';
import { Footer } from './components/layout/Footer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Technology from './pages/Technology.jsx';
import Insights from './pages/Insights.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';
import './styles/global.css';

function renderPage(path, navigate) {
  switch (path) {
    case '/':          return <Home navigate={navigate} />;
    case '/about':     return <About navigate={navigate} />;
    case '/services':  return <Services navigate={navigate} />;
    case '/technology': return <Technology navigate={navigate} />;
    case '/insights':  return <Insights navigate={navigate} />;
    case '/contact':   return <Contact navigate={navigate} />;
    default:           return <NotFound navigate={navigate} />;
  }
}

export default function App() {
  const { currentPath, navigate } = useRouter();

  return (
    <>
      <a href="#main-content" className="skip-to-content">Skip to main content</a>
      <Navbar currentPath={currentPath} navigate={navigate} />
      {renderPage(currentPath, navigate)}
      <Footer navigate={navigate} />
    </>
  );
}
