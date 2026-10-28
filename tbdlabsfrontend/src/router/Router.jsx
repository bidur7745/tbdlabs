import { useState, useEffect, useCallback } from 'react';

// Route → { title, description }
const ROUTES_META = {
  '/': {
    title: 'TBD Labs — Technology Beyond Dimensions',
    description: 'TBD Labs builds production-grade software systems, AI platforms, and modern web applications. Based in Nepal, engineering for the world.'
  },
  '/about': {
    title: 'About TBD Labs — Technology Beyond Dimensions',
    description: 'Learn about TBD Labs — our founding team (Bidur, David, Tumyang), mission, values, and the engineering culture that shapes our work.'
  },
  '/services': {
    title: 'Services — TBD Labs',
    description: 'Web development, mobile engineering, AI & machine learning, UI/UX design, and digital solutions engineered to production grade by TBD Labs.'
  },
  '/technology': {
    title: 'Technology — TBD Labs',
    description: 'Our engineering stack: React, Next.js, Python, FastAPI, PyTorch, PostgreSQL, Docker. Organized by capability and engineering principle.'
  },
  '/insights': {
    title: 'Insights — TBD Labs',
    description: 'Technical writing and engineering perspectives from TBD Labs: systems design, AI/ML engineering, and product development.'
  },
  '/projects': {
    title: 'Projects — TBD Labs',
    description: 'Selected engineering projects, AI platforms, and real-world systems built by TBD Labs: KrishiMitra, BhramGuard, and AutoRent.'
  },
  '/contact': {
    title: 'Contact TBD Labs — Start a Conversation',
    description: 'Start a project conversation with TBD Labs. Share your brief and we will respond with an honest assessment and next steps.'
  },
  '/admin': {
    title: 'Operations Console — TBD Labs',
    description: 'TBD Labs Internal Administration & Inquiry Management.'
  },
  '/admin/login': {
    title: 'Staff Login — TBD Labs',
    description: 'Sign in to the TBD Labs staff operations console.'
  },
  '/admin/dashboard': {
    title: 'Staff Dashboard — TBD Labs',
    description: 'TBD Labs role-based operations dashboard.'
  },
  '/admin/superadmin': {
    title: 'Superadmin Dashboard — TBD Labs',
    description: 'Review inquiries, manage staff accounts, and set email notification preferences.'
  },
  '/admin/staff-dashboard': {
    title: 'Staff Dashboard — TBD Labs',
    description: 'Review inquiries and send client replies.'
  },
  '/admin/change-password': {
    title: 'Change Your Password — TBD Labs',
    description: 'Set a new password to finish activating your TBD Labs staff account.'
  },
  '/terms': {
    title: 'Terms & Conditions — TBD Labs',
    description: 'Terms and conditions governing the use of the TBD Labs website at tbdlabs.com.np.'
  },
  '/privacy': {
    title: 'Privacy Policy — TBD Labs',
    description: 'How TBD Labs collects, uses, and protects your information when you visit tbdlabs.com.np.'
  },
};

function updateDocumentMeta(path) {
  const meta = ROUTES_META[path] || {
    title: 'TBD Labs — Technology Beyond Dimensions',
    description: 'TBD Labs builds scalable digital products.'
  };
  document.title = meta.title;

  let descTag = document.querySelector('meta[name="description"]');
  if (descTag) descTag.setAttribute('content', meta.description);
}

export function useRouter() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const navigate = useCallback((to) => {
    window.history.pushState(null, '', to);
    setCurrentPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateDocumentMeta(to);
  }, []);

  useEffect(() => {
    updateDocumentMeta(currentPath);
  }, [currentPath]);

  useEffect(() => {
    const handlePop = () => {
      const path = window.location.pathname;
      setCurrentPath(path);
      updateDocumentMeta(path);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  return { currentPath, navigate };
}
