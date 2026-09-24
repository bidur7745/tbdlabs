/**
 * TBD Labs — Insights & Editorial Hub
 * Structured article model per Codex Website Development Guide:
 * "Create an editorial area that can support SEO, thought leadership, project stories, and technical writing.
 * Articles are genuine and not placeholder lorem ipsum. Avoid fake publication dates or invented authors."
 */

export const INSIGHTS_ARTICLES = [
  {
    id: 'building-predictable-ai-systems',
    title: 'Architecting Predictable AI Systems for Real-World Workflows',
    slug: 'architecting-predictable-ai-systems',
    category: 'AI & Machine Learning',
    author: 'TBD Labs Engineering',
    readTime: '6 min read',
    publishedDate: 'Technical Brief',
    featured: true,
    excerpt: 'Why standard LLM wrappers break in production, and how deterministic guardrails, structured JSON outputs, and domain validations restore engineering confidence.',
    content: `
When transitioning artificial intelligence models from research prototypes to production software, the primary challenge is rarely model sophistication—it is predictability.

In traditional software engineering, functions produce predictable outputs for given inputs. With generative models, however, stochasticity introduces unexpected response structures, hallucinations, and latency variances. At TBD Labs, our engineering approach to intelligent systems focuses on three foundational practices:

1. **Constrained Output Schemas**: Enforcing strict type parsing (such as Pydantic or TypeScript schema validation) at the API boundary before passing model outputs downstream.
2. **Deterministic Fallbacks**: Pairing probabilistic inference with deterministic algorithmic rules to guarantee safe state transitions even during edge cases.
3. **Continuous Evaluation & Traceability**: Logging model inputs, latency histograms, and validation pass rates to establish quantifiable system health metrics.
    `
  },
  {
    id: 'resilient-offline-first-agriculture',
    title: 'Offline-First Architectures in Rural Software Environments',
    slug: 'offline-first-architectures-rural-environments',
    category: 'Systems Engineering',
    author: 'TBD Labs Team',
    readTime: '5 min read',
    publishedDate: 'Engineering Note',
    featured: false,
    excerpt: 'Key lessons learned while architecting KrishiMitra for variable network connectivity, low-bandwidth constraints, and local caching resilience.',
    content: `
Designing software for agricultural and regional environments requires unlearning desktop web development assumptions. Intermittent 2G/3G connectivity, device storage limitations, and power constraints dictate software architecture.

During our work on the KrishiMitra advisory platform, we implemented lightweight indexed storage, deferred background synchronization queues, and hyper-optimized SVG iconography to ensure critical advisory features function regardless of live cellular towers.
    `
  },
  {
    id: 'design-tokens-multi-platform',
    title: 'The Discipline of Design Tokens in Modern Product Engineering',
    slug: 'design-tokens-modern-product-engineering',
    category: 'UI/UX & Frontend',
    author: 'TBD Labs Product',
    readTime: '4 min read',
    publishedDate: 'Design System Paper',
    featured: false,
    excerpt: 'How strict design token constraints accelerate feature velocity, eliminate CSS bloat, and maintain consistent brand typography across platforms.',
    content: `
A design system is not simply a component library; it is a shared language between product designers and frontend developers. By codifying color hierarchies, typography scales, elevation depths, and spatial grids into semantic design tokens, engineering teams eliminate guesswork and prevent visual entropy.
    `
  }
];
