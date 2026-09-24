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
  '/projects': {
    title: 'Projects — TBD Labs',
    description: 'Explore selected systems and platforms built by TBD Labs: KrishiMitra, BhramGuard, AutoRent, and more.'
  },
  '/technology': {
    title: 'Technology — TBD Labs',
    description: 'Our engineering stack: React, Next.js, Python, FastAPI, PyTorch, PostgreSQL, Docker. Organized by capability and engineering principle.'
  },
  '/insights': {
    title: 'Insights — TBD Labs',
    description: 'Technical writing and engineering perspectives from TBD Labs: systems design, AI/ML engineering, and product development.'
  },
  '/contact': {
    title: 'Contact TBD Labs — Start a Conversation',
    description: 'Start a project conversation with TBD Labs. Share your brief and we will respond with an honest assessment and next steps.'
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
