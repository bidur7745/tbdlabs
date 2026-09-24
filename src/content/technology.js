/**
 * TBD Labs — Technology Directory
 * Technologies and Engineering Principles per Codex Website Development Guide:
 * "Present the stack by capability rather than as a giant logo wall.
 * Use verified technologies only and keep the content easy to edit.
 * Include frontend, backend, data, AI/ML, and cloud/devops categories,
 * plus a short engineering-principles section."
 */

export const TECH_CATEGORIES = [
  {
    id: 'frontend',
    category: 'Frontend Engineering',
    description: 'Modern, resilient client-side environments built for speed, accessibility, and smooth user interaction.',
    technologies: [
      { name: 'React', description: 'Declarative component-driven interfaces' },
      { name: 'Next.js', description: 'Server-rendered and hybrid web applications' },
      { name: 'TypeScript', description: 'Static type safety and developer maintainability' },
      { name: 'Vite', description: 'Lightning-fast modern build tooling' },
      { name: 'Tailwind CSS', description: 'Utility-first modular design systems' },
      { name: 'Vanilla CSS / Tokens', description: 'Pure CSS properties and native browser efficiency' }
    ]
  },
  {
    id: 'backend',
    category: 'Backend & APIs',
    description: 'High-throughput microservices and robust RESTful/GraphQL application layers.',
    technologies: [
      { name: 'Node.js', description: 'Event-driven, asynchronous JavaScript runtime' },
      { name: 'Express', description: 'Minimalist web server and REST routing framework' },
      { name: 'Python', description: 'General software automation and computational backend' },
      { name: 'FastAPI', description: 'High-performance async Python APIs with automatic OpenAPI schema' }
    ]
  },
  {
    id: 'data',
    category: 'Data & Storage',
    description: 'Reliable relational schema design, caching strategies, and persistent storage layers.',
    technologies: [
      { name: 'PostgreSQL', description: 'ACID-compliant relational database with rich indexing' },
      { name: 'MongoDB', description: 'Flexible document storage for unstructured payloads' },
      { name: 'Redis', description: 'In-memory key-value caching and session state management' }
    ]
  },
  {
    id: 'ai-ml',
    category: 'AI & Machine Learning',
    description: 'Practical data science pipelines, deep learning models, and intelligent language interfaces.',
    technologies: [
      { name: 'PyTorch', description: 'Deep learning research and computer vision pipelines' },
      { name: 'Hugging Face', description: 'Transformer model architectures and pre-trained weights' },
      { name: 'LLM APIs', description: 'Generative AI integrations and RAG query parsing' },
      { name: 'NumPy / Pandas', description: 'Scientific computing and structured data manipulation' }
    ]
  },
  {
    id: 'devops-cloud',
    category: 'Cloud & Infrastructure',
    description: 'Containerized deployment pipelines, edge distribution, and continuous integration workflows.',
    technologies: [
      { name: 'Docker', description: 'Reproducible containerized runtimes and service isolation' },
      { name: 'Vercel / Cloud Edge', description: 'Zero-config serverless deployments and edge caching' },
      { name: 'GitHub Actions', description: 'Automated test execution, linting, and build gates' },
      { name: 'Linux / Ubuntu', description: 'Reliable server environments and systems management' }
    ]
  }
];

export const ENGINEERING_PRINCIPLES = [
  {
    id: 'maintainability',
    title: 'Maintainability First',
    iconName: 'Wrench',
    description: 'We write readable, modular code with predictable folder hierarchies and separated concerns so future engineers can adapt the software without cognitive strain.'
  },
  {
    id: 'security',
    title: 'Security Awareness',
    iconName: 'ShieldCheck',
    description: 'We validate inputs, enforce strict access policies, sanitize data boundaries, and never commit secrets or credentials into client-accessible code.'
  },
  {
    id: 'testing',
    title: 'Comprehensive Verification',
    iconName: 'CheckCircle2',
    description: 'We verify our systems through typechecking, automated linting, unit assertions, and rigorous cross-device visual and responsive testing.'
  },
  {
    id: 'performance',
    title: 'Performance Discipline',
    iconName: 'Zap',
    description: 'We avoid shipping unnecessary client JavaScript, optimize assets, lazy-load media, and enforce low time-to-interactive budgets.'
  },
  {
    id: 'accessibility',
    title: 'Universal Accessibility',
    iconName: 'Eye',
    description: 'We build with semantic HTML, keyboard navigable flows, visible focus states, high color contrast, and respect for user reduced-motion preferences.'
  }
];
