import webImg from '../assets/img/web.jpg';
import aiImg from '../assets/img/ai.jpg';
import mobileImg from '../assets/img/mobile.jpg';
import uiuxImg from '../assets/img/uiux.jpg';
import cloudImg from '../assets/img/cloud.jpg';

export const CAPABILITIES = [
  {
    id: 'web',
    eyebrow: 'Engineering · Web',
    title: 'Web & Full-Stack',
    title2: 'Systems',
    description:
      'High-performance web applications on reactive architectures, server-rendered pipelines, and type-safe APIs.',
    image: webImg,
    href: '/services',
  },
  {
    id: 'ai',
    eyebrow: 'Engineering · Intelligence',
    title: 'Applied AI',
    title2: '& Machine Learning',
    description:
      'Practical neural workflows, computer vision, and LLM pipelines built for production — not demos.',
    image: aiImg,
    href: '/services',
  },
  {
    id: 'mobile',
    eyebrow: 'Engineering · Mobile',
    title: 'Mobile',
    title2: 'Development',
    description:
      'Native-feel iOS and Android experiences with offline-first architecture and fluid gesture design.',
    image: mobileImg,
    href: '/services',
  },
  {
    id: 'design',
    eyebrow: 'Product · Interface',
    title: 'UI/UX &',
    title2: 'Design Systems',
    description:
      'Atomic tokens, accessible palettes, and interaction design aligned with WCAG 2.1 AA.',
    image: uiuxImg,
    href: '/services',
  },
  {
    id: 'cloud',
    eyebrow: 'Engineering · Infrastructure',
    title: 'Cloud &',
    title2: 'Resilient Data',
    description:
      'PostgreSQL schemas, Redis caching, container orchestration, and disciplined multi-environment delivery.',
    image: cloudImg,
    href: '/services',
  },
];
