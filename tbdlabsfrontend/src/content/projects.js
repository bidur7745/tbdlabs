/**
 * TBD Labs — Projects Directory
 * Ground truth from Codex Website Development Guide:
 * "Featured projects: KrishiMitra, BhramGuard, AutoRent where appropriate and factually accurate.
 * No fabricated client outcomes, user counts, revenue, awards, or performance figures."
 */

export const PROJECTS = [
  {
    id: 'krishimitra',
    title: 'KrishiMitra',
    tagline: 'Intelligent Agricultural Information & Advisory Platform',
    category: 'AI & Data Platforms',
    status: 'Active Deployment',
    statusType: 'live',
    summary: 'An intelligent digital agriculture assistant engineered to provide real-time crop health monitoring, localized advisory insights, and market data for agricultural practitioners.',
    description: 'KrishiMitra bridges the gap between raw agricultural data and actionable farm-level decisions. Developed with resilient offline-first support and multilingual interfaces, the platform processes sensor feeds and advisory databases to deliver timely disease detection alerts, soil nutrition guidance, and weather forecasting.',
    technologies: ['React', 'Python', 'FastAPI', 'PyTorch', 'PostgreSQL', 'Tailwind CSS'],
    highlights: [
      'Localized crop disease diagnosis through visual identification models',
      'Real-time weather telemetry and customized advisory notification queue',
      'Optimized lightweight client interface for low-bandwidth mobile environments'
    ],
    demoUrl: null,
    githubUrl: null,
  },
  {
    id: 'bhramguard',
    title: 'BhramGuard',
    tagline: 'Automated Misinformation & Deepfake Verification Engine',
    category: 'AI / Security & Integrity',
    status: 'In Active Development',
    statusType: 'progress',
    summary: 'An advanced content integrity and anomaly detection framework designed to detect manipulated media, suspicious synthetics, and viral digital falsehoods.',
    description: 'BhramGuard implements a multi-modal analysis pipeline combining computer vision artifacts detection, frequency-domain forensic checks, and language model validation to score content authenticity and flag synthetic alterations.',
    technologies: ['Python', 'PyTorch', 'FastAPI', 'React', 'Docker', 'Redis'],
    highlights: [
      'Frequency domain artifact inspection for generated media detection',
      'Contextual linguistic consistency parsing using LLM APIs',
      'Real-time credibility score computation with explainable decision vectors'
    ],
    demoUrl: null,
    githubUrl: null,
  },
  {
    id: 'autorent',
    title: 'AutoRent',
    tagline: 'Modern Fleet Logistics & Automated Vehicle Rental System',
    category: 'Web & Enterprise Solutions',
    status: 'Production Solution',
    statusType: 'live',
    summary: 'A unified vehicle rental management platform streamlining fleet tracking, customer booking workflows, security deposit validations, and automated billing.',
    description: 'AutoRent eliminates operational friction in vehicle leasing and rentals by centralizing vehicle availability, dispatch scheduling, customer KYC validation, and payment settlement into an intuitive dashboard.',
    technologies: ['TypeScript', 'Next.js / React', 'Node.js', 'PostgreSQL', 'Stripe API'],
    highlights: [
      'Automated real-time inventory allocation and conflict-free booking scheduler',
      'Role-based access controls for branch managers, fleet operators, and customers',
      'Seamless digital agreement signing and security deposit escrow flows'
    ],
    demoUrl: null,
    githubUrl: null,
  },
];
