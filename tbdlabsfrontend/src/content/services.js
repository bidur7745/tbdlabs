/**
 * TBD Labs — Services Directory
 * Six approved service categories per Codex Website Development Guide:
 * Web Development, Mobile Development, AI & Machine Learning, UI/UX Design, Software Development, Digital Solutions.
 */

export const SERVICES = [
  {
    id: 'web-development',
    title: 'Web Development',
    subtitle: 'High-performance, resilient web platforms and cloud-native frontends.',
    iconName: 'Globe',
    overview: 'We build modern web applications that combine aesthetic elegance with engineering rigor. From content-heavy platforms to complex SaaS applications, our web architectures emphasize speed, search engine visibility, and effortless maintainability.',
    deliverables: [
      'Custom React / Next.js web applications',
      'High-conversion corporate websites & web portals',
      'API-driven Single Page Applications (SPAs)',
      'Headless CMS integrations and content workflows',
      'Automated CI/CD build & deployment pipelines'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Vite'],
    scenarios: 'Companies needing a high-credibility web presence, interactive customer dashboards, or responsive web platforms.'
  },
  {
    id: 'mobile-development',
    title: 'Mobile Development',
    subtitle: 'Cross-platform and native mobile experiences built for fluidity and scale.',
    iconName: 'Smartphone',
    overview: 'We craft intuitive mobile applications designed for seamless user interaction across iOS and Android ecosystems. Our focus is on low-latency state handling, offline capability, and clean native platform integrations.',
    deliverables: [
      'Cross-platform iOS and Android applications',
      'Offline-first mobile architectures with local persistence',
      'Native hardware integrations (camera, GPS, biometrics)',
      'Secure token-based authentication and biometric sign-in',
      'App store publishing and release pipeline setup'
    ],
    technologies: ['React Native', 'Flutter', 'TypeScript', 'REST / GraphQL APIs'],
    scenarios: 'Startups and businesses rolling out mobile-first customer experiences or internal operational tools.'
  },
  {
    id: 'ai-machine-learning',
    title: 'AI & Machine Learning',
    subtitle: 'Pragmatic intelligence, custom machine learning models, and LLM integrations.',
    iconName: 'Cpu',
    overview: 'We implement practical machine learning systems that automate complex tasks, parse unstructured data, and generate actionable predictions. We prioritize explainability, model efficiency, and robust production pipelines over hype.',
    deliverables: [
      'Custom machine learning models for classification and prediction',
      'Large Language Model (LLM) API integration & RAG pipelines',
      'Computer vision and image analysis models',
      'Data preprocessing, feature engineering, and model evaluation',
      'Lightweight inference APIs deployed on scalable infrastructure'
    ],
    technologies: ['Python', 'PyTorch', 'FastAPI', 'OpenAI APIs', 'Hugging Face', 'NumPy/Pandas'],
    scenarios: 'Organizations seeking to automate document workflows, build domain-specific AI assistants, or embed intelligent anomaly detection.'
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    subtitle: 'Systematic interface architecture, design systems, and rapid prototyping.',
    iconName: 'Layout',
    overview: 'Great software starts with deliberate design. We engineer digital interfaces grounded in human factors, clear visual hierarchies, and modular component systems that eliminate development ambiguity.',
    deliverables: [
      'Interactive Figma prototypes and wireframes',
      'Comprehensive design systems with tokens and reusable components',
      'User journey mapping, wireflows, and information architecture',
      'Accessibility audits and WCAG compliance reviews',
      'Developer handoff specifications and interactive design guidelines'
    ],
    technologies: ['Figma', 'Design Tokens', 'Prototyping', 'WCAG AA Standards'],
    scenarios: 'Teams launching new digital products requiring cohesive identity and intuitive interface systems.'
  },
  {
    id: 'software-development',
    title: 'Software Development',
    subtitle: 'End-to-end backend engineering, distributed services, and resilient APIs.',
    iconName: 'Code2',
    overview: 'We engineer backend architectures that power mission-critical operations. We write clean, testable code backed by relational or document databases, distributed caching, and clean event-driven patterns.',
    deliverables: [
      'RESTful and GraphQL API design and implementation',
      'Microservices architecture and service containerization',
      'Relational and NoSQL database modeling and query optimization',
      'Authentication, authorization, and role-based security layers',
      'Integration with external payment gateways, cloud storage, and messaging'
    ],
    technologies: ['Node.js', 'Express', 'Python', 'FastAPI', 'PostgreSQL', 'Docker'],
    scenarios: 'Enterprises needing reliable core backend services, custom internal tooling, or database restructuring.'
  },
  {
    id: 'digital-solutions',
    title: 'Digital Solutions',
    subtitle: 'Tailored technology systems designed around specific organizational challenges.',
    iconName: 'Layers',
    overview: 'When off-the-shelf software fails to address unique business mechanics, we architect custom end-to-end digital solutions. We combine product discovery, software engineering, and systems integration to solve targeted problems.',
    deliverables: [
      'Custom operational workflows and internal management portals',
      'Third-party software modernization and API glue layers',
      'Automated reporting and telemetry dashboards',
      'Secure customer onboarding and verification pipelines',
      'Technical advisory and engineering feasibility audits'
    ],
    technologies: ['Cloud Platforms', 'PostgreSQL', 'Modern Web Tech', 'Automation Tooling'],
    scenarios: 'Growing companies looking to replace brittle spreadsheets and disjointed tools with unified software.'
  }
];

export const WORKFLOW_STAGES = [
  {
    step: '01',
    name: 'Discover',
    summary: 'We unpack the problem space, dissect technical requirements, and define realistic architectural boundaries.'
  },
  {
    step: '02',
    name: 'Design',
    summary: 'We model data entities, map user journeys, and establish consistent interface design tokens before writing code.'
  },
  {
    step: '03',
    name: 'Build',
    summary: 'We implement modular, testable code with continuous linting, strict types, and robust component reuse.'
  },
  {
    step: '04',
    name: 'Deploy',
    summary: 'We deploy to isolated environments with automated build checks, SSL enforcement, and CDN edge distribution.'
  },
  {
    step: '05',
    name: 'Improve',
    summary: 'We monitor production behavior, evaluate user feedback, and iterate incrementally to ensure longevity.'
  }
];
