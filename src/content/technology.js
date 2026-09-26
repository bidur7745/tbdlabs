/**
 * TBD Labs — Technology Directory
 * This content reflects the actual engineering capabilities we work with,
 * including enterprise and business application stacks, APIs, and CMS-based solutions.
 */

import { STACK_ASSETS } from './stackAssets.js';

export const TECH_CATEGORIES = [
  {
    id: 'frontend',
    category: 'Frontend Engineering',
    description: 'Modern web experiences for business products, dashboards, portals, and conversion-focused interfaces.',
    technologies: [
      { name: 'React', assetKey: 'react', description: 'Component-driven interfaces and responsive product UI' },
      { name: 'Next.js', assetKey: 'nextjs', description: 'SEO-friendly and performance-conscious web apps' },
      { name: 'TypeScript', assetKey: 'typescript', description: 'Safer application code and maintainable architecture' },
      { name: 'Vite', assetKey: 'vite', description: 'Fast local development and modern build workflows' },
      { name: 'JavaScript', assetKey: 'nodejs', description: 'Browser logic and interactive client behaviors' }
    ]
  },
  {
    id: 'backend',
    category: 'Backend & APIs',
    description: 'Robust server-side systems, business logic layers, and API integrations built for reliability.',
    technologies: [
      { name: 'Django', assetKey: 'django', description: 'Rapid backend development with a structured MVC approach' },
      { name: 'ASP.NET Web API', assetKey: 'aspnet', description: 'Scalable enterprise APIs and service integrations' },
      { name: 'C# / .NET', assetKey: 'csharp', description: 'Strongly typed business systems and API services' },
      { name: 'Java / Spring Boot', assetKey: 'springboot', description: 'Enterprise backend services and RESTful APIs' },
      { name: 'Express.js', assetKey: 'express', description: 'Lightweight APIs and small application backends' },
      { name: 'Python', assetKey: 'python', description: 'Automation, scripting, and data-oriented application logic' },
      { name: 'FastAPI', assetKey: 'fastapi', description: 'High-performance async APIs for modern services' }
    ]
  },
  {
    id: 'data',
    category: 'Data & Storage',
    description: 'Reliable persistence layers, structured data modeling, and real-world application storage needs.',
    technologies: [
      { name: 'PostgreSQL', assetKey: 'postgresql', description: 'Relational data stores for transactional business systems' },
      { name: 'MySQL', assetKey: 'mysql', description: 'Wide adoption for web apps and internal platform data' },
      { name: 'MongoDB', assetKey: 'mongodb', description: 'Flexible document storage for dynamic application records' },
      { name: 'Redis', assetKey: 'redis', description: 'Caching, session handling, and fast response optimization' }
    ]
  },
  {
    id: 'cms-management',
    category: 'Content & Website Platforms',
    description: 'Practical and business-friendly platform work, including drag-and-drop and CMS-based solutions.',
    technologies: [
      { name: 'WordPress', assetKey: 'wordpress', description: 'Content-driven sites, blogs, and marketing platforms' },
      { name: 'Wix', assetKey: 'wix', description: 'Fast deployment for lightweight site and business presence needs' },
      { name: 'Custom CMS Integrations', assetKey: 'react', description: 'Tailored admin experiences mixed with custom business logic' }
    ]
  },
  {
    id: 'devops-cloud',
    category: 'Cloud & Deployment',
    description: 'Containerized deployment, automation, and hosting approaches that keep systems operational and maintainable.',
    technologies: [
      { name: 'Docker', assetKey: 'docker', description: 'Consistent runtime environments and service isolation' },
      { name: 'GitHub Actions', assetKey: 'githubactions', description: 'Automated verification, build checks, and CI workflows' },
      { name: 'Linux / Ubuntu', assetKey: 'linux', description: 'Stable hosting environments and system administration' },
      { name: 'Azure / Cloud Hosting', assetKey: 'dotnet', description: 'Deployment support for cloud-native web and API systems' }
    ]
  }
].map((category) => ({
  ...category,
  technologies: category.technologies.map((tech) => ({
    ...tech,
    iconUrl: STACK_ASSETS[tech.assetKey]?.iconUrl ?? STACK_ASSETS.react.iconUrl,
    docsUrl: STACK_ASSETS[tech.assetKey]?.docsUrl ?? STACK_ASSETS.react.docsUrl,
  })),
}));

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
