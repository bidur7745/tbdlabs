# TBD Labs — Vibe Coding Development Log (`vibecodelog.md`)

> **Project:** TBD Labs Official Corporate Website  
> **Brand Slogan:** *Technology Beyond Dimensions*  
> **Active Directory:** `d:\tbd labs\tbdlabsfrontend`  
> **Source Specification:** `TBD Labs — Codex Website Development Guide.pdf`  
> **Log Maintainer:** AI Engineering Agent (Antigravity) & Founding Team  

---

## 1. Project Overview & Ground Truth

### 1.1 Brand Identity & Positioning
- **Company Name:** TBD Labs
- **Slogan:** Technology Beyond Dimensions
- **Website Type:** Informative corporate technology website
- **Brand Persona:** Confident, intelligent, concise, human, and technically credible product-and-engineering company.
- **Copywriting Standard:** Direct explanation of real capabilities; **STRICTLY NO** inflated agency buzzwords, fabricated client statistics, unverified awards, or fake testimonials.

### 1.2 Approved 7-Page Architecture
1. **Home (`/`)**: Value proposition, dual CTA, capability snapshot, selected featured work, 5-stage workflow (`Discover → Design → Build → Deploy → Improve`), technology strip, project enquiry CTA.
2. **About (`/about`)**: Company origin story, mission & vision, verified founders (**Bidur**, **David**, **Tumyang**), core values.
3. **Services (`/services`)**: 6 core service categories (Web Development, Mobile Development, AI & Machine Learning, UI/UX Design, Software Development, Digital Solutions) with deliverables, use cases, and enquiry hook.
4. **Projects (`/projects`)**: Scalable showcase of real systems and conceptual prototypes (**KrishiMitra**, **BhramGuard**, **AutoRent**), structured metadata model, zero fake outcomes.
5. **Technology (`/technology`)**: Engineering stack grouped by capability (Frontend, Backend, Data, AI/ML, Cloud/DevOps) paired with engineering principles (maintainability, security awareness, testing, performance, accessibility).
6. **Insights (`/insights`)**: Editorial hub for technical articles and project narratives with extensible content schema, avoiding fake publication timestamps or dummy authors.
7. **Contact (`/contact`)**: Production-ready enquiry form with field validation, clear loading/success/error feedback, accessible focus states, and decoupled submission endpoint.

### 1.3 Verified Team & Project Records
- **Founders:** Bidur, David, Tumyang (only verified roles and honest bios).
- **Featured Projects:**
  - *KrishiMitra*
  - *BhramGuard*
  - *AutoRent*

### 1.4 Visual Direction & Design Tokens
- **Theme:** Modern engineering / AI startup dark aesthetic.
- **Base Surface:** Dark neutral foundations (`#090a0f`, `#11131a`, `#171923`).
- **Typography:** Crisp editorial display font + clean, highly legible monospace/sans body (e.g., Inter, Space Grotesk, JetBrains Mono).
- **Brand Accent:** Distinctive, cohesive tech accent (e.g., Electric Cyan / Cyan-Teal / Cobalt glow), applied with restraint.
- **Motion:** Subtle reveals, responsive micro-interactions, full respect for `prefers-reduced-motion`.
- **Negative Constraints:** No generic stock photography of people shaking hands, no excessive blurred glassmorphism that hurts readability, no horizontal overflow.

---

## 2. Vibe Coding Protocol & Logging Standard

To ensure consistency, accountability, and traceability across the entire vibe-coding journey, **every user prompt and development cycle MUST be appended to this log** using the following standard template:

```markdown
### [PROMPT-XXX] | YYYY-MM-DD HH:MM — <Short Title>
- **Prompt:** `<exact user prompt or core request>`
- **Intent & Scope:** Summary of what needed to be accomplished.
- **Actions Taken:**
  - Detailed file-by-file changes (created, modified, deleted).
  - Architecture and UI choices implemented.
- **Decisions & Compliance:** Alignment with the Codex Guide (content safety, typography, tokens).
- **Verification & QA:**
  - Build status (`npm run build`).
  - Lint / formatting checks.
  - Responsive / accessibility checks.
- **Status:** [Completed | In Progress | Blocked]
- **Next Logical Step:** Suggested prompt or task for the next iteration.
```

---

## 3. Master Implementation Sequence

| Phase | Milestone | Scope & Deliverables | Status |
| :--- | :--- | :--- | :--- |
| **01** | **Inspection & Protocol Setup** | Ingest Codex PDF Guide, inspect Vite React project, establish `vibecodelog.md`. | **COMPLETED** |
| **02** | **Project Rules & Design Foundation** | Create `AGENTS.md`, setup CSS tokens, typography, dark neutral palette, icon library, layout containers. | *Next* |
| **03** | **Shared Layout & Routing** | Implement client router (7 routes), persistent responsive Navbar with mobile drawer, accessible Footer, CTA buttons. | *Pending* |
| **04** | **Home Page (`/`)** | Hero with dual CTA, capability cards, featured project highlights, 5-step workflow, tech strip, inquiry banner. | *Pending* |
| **05** | **About Page (`/about`) & Services (`/services`)** | Mission/vision, verified founder cards (Bidur, David, Tumyang), 6 service domain breakdowns with deliverables. | *Pending* |
| **06** | **Projects Page (`/projects`) & Technology (`/technology`)** | Structured data cards (KrishiMitra, BhramGuard, AutoRent), tech capability matrix, engineering principles. | *Pending* |
| **07** | **Insights (`/insights`) & Contact (`/contact`)** | Editorial hub with extensible article schema; accessible contact form with state validation and configurable API hook. | *Pending* |
| **08** | **SEO, Metadata & Accessibility Polish** | Per-page meta tags, OpenGraph, sitemap/robots, WCAG AA contrast, keyboard navigation, reduced-motion queries. | *Pending* |
| **09** | **Full QA, Build & Performance Audit** | Lint, zero dead links, mobile/tablet/desktop visual QA, bundle optimization, clean console. | *Pending* |
| **10** | **Launch Readiness & Handover** | Verification against Launch Checklist (Section 14 of Codex Guide), final git milestone. | *Pending* |

---

## 4. Prompt Changelog

---

### [PROMPT-001] | 2026-09-23 21:35 — Codex Guide Ingestion & Vibe Coding Log Initialization

- **Prompt:**
  > `@[d:\tbd labs\TBD Labs — Codex Website Development Guide.pdf] @[d:\tbd labs\tbdlabsfrontend]`  
  > `read this and made new file vibecodelogmd`  
  > `in this log is mantain for each prompt`  
  > `read this understand`

- **Intent & Scope:**
  - Read and analyze the entire 16-page `TBD Labs — Codex Website Development Guide.pdf`.
  - Inspect the newly scaffolded frontend codebase in `d:\tbd labs\tbdlabsfrontend`.
  - Establish `vibecodelog.md` to permanently record each prompt, decision, architectural change, and verification checkpoint throughout the development lifecycle.
  - Internalize all design rules, content safety constraints, routing specs, and the suggested 10-step sequence.

- **Actions Taken:**
  1. **Document Inspection:**
     - Extracted and reviewed all 16 pages of the Codex Rapid Development Guide covering Brand Identity, Visual Direction, Repository Setup, Global Design System, individual page requirements (`/`, `/about`, `/services`, `/projects`, `/technology`, `/insights`, `/contact`), Cross-page engineering requirements, Codex prompts, and Launch checklist.
  2. **Codebase Inspection:**
     - Inspected `d:\tbd labs\tbdlabsfrontend`:
       - Stack: Vite v8.3.0, React 19.2.8, React-DOM 19.2.8.
       - ESLint configured (`eslint.config.js`).
       - Tested existing build script (`npm run build`) — compiles cleanly with zero errors in 832ms.
  3. **Vibe Code Log Creation:**
     - Created `vibecodelog.md` containing the project ground truth, design tokens summary, verified entities, logging SOP, and Phase roadmap.

- **Key Takeaways & Core Guardrails:**
  - **No fabricated claims:** Under no circumstances should fake client logos, inflated stats, fake awards, or fictional years of experience be generated.
  - **Founders:** Bidur, David, and Tumyang are the confirmed founders.
  - **Existing Projects:** KrishiMitra, BhramGuard, and AutoRent.
  - **Aesthetics:** Engineering-grade dark theme, single accent color, spacious 12-column layout, restrained micro-interactions, no bloated glassmorphism.

- **Verification & QA:**
  - `npm run build` executed in `d:\tbd labs\tbdlabsfrontend` — Exit code `0` (Success).
  - Initial directory structure mapped and validated.

- **Status:** **COMPLETED**

- **Next Recommended Step (PROMPT-002):**
  - Create `AGENTS.md` and establish the global design system (CSS variables, dark color palette, typography, button/card primitives) and client routing structure for the 7 pages.

---

## Prompt: Domain Confirmed — tbdlabs.com.np

- **Date / Time:** 2026-09-23T21:58 (+05:45)
- **Prompt Summary:** User confirmed the official production domain is `tbdlabs.com.np`.

### Actions Taken

| File | Change |
|---|---|
| `public/sitemap.xml` | All 7 `<loc>` URLs updated from `https://tbdlabs.tech/` → `https://tbdlabs.com.np/` |
| `public/robots.txt` | Sitemap reference updated from `tbdlabs.tech` → `tbdlabs.com.np` |
| `index.html` | Added `og:url` meta tag pointing to `https://tbdlabs.com.np/` |
| `src/pages/Contact.jsx` | Email updated from `[contact@tbdlabs.tech]` (placeholder) → `contact@tbdlabs.com.np` (live) |

### Decisions
- `tbdlabs.tech` was the placeholder domain used during initial scaffolding; now replaced with the confirmed production domain across all SEO-relevant files.
- Email hint/placeholder brackets removed — email is now treated as a live, real address.

### [PROMPT-AUDIT] | 2026-09-24 18:52 — Full Project Guideline & Quality Alignment Audit
- **Prompt:** Project alignment check against the Codex Website Development Guide and prompt requirements for Home, About, Services, Technology, Insights, and Contact pages.
- **Intent & Scope:** Verify that all 7 routes, content files, UI primitives, typography, accessibility constraints, and anti-hallucination rules strictly adhere to specifications.
- **Actions Taken:**
  - Audited all 7 page components: `Home.jsx`, `About.jsx`, `Services.jsx`, `Projects.jsx`, `Technology.jsx`, `Insights.jsx`, `Contact.jsx`, and `NotFound.jsx`.
  - Audited all 5 content data files in `src/content/`: `projects.js`, `services.js`, `team.js`, `technology.js`, `insights.js`.
  - Audited layout components (`Navbar.jsx`, `Footer.jsx`) and primitives (`Button.jsx`, `Card.jsx`, `Badge.jsx`, `SectionHeading.jsx`).
  - Resolved all 19 ESLint warnings/errors (unused React imports, setState in effect, unused component variables).
  - Validated strict adherence to brand guidelines: zero fake statistics, verified founders (Bidur, David, Tumyang), verified projects (KrishiMitra, BhramGuard, AutoRent), verified 6 service categories, and verified production domain (`tbdlabs.com.np`).
- **Verification & QA:**
  - `npm run lint`: **0 errors, 0 warnings (100% clean)**.
  - `npm run build`: **0 errors (Build successful in ~4.2s)**.
### [PROMPT-003] | 2026-09-24 19:42 — Home Page Visual Architecture Overhaul
- **Prompt:** Transform text-heavy Home page into a dynamic, visually rich engineering-first interface.
- **Intent & Scope:** Upgrade Home page (`/`) with interactive glassmorphic simulation terminals, an asymmetric Bento Grid for capabilities, realistic simulated app window headers for featured projects, an interactive 5-stage circuit pipeline, and categorized tech capsule badges.
- **Actions Taken:**
  - Created [`src/components/home/HeroVisual.jsx`](file:///d:/tbd%20labs/tbdlabsfrontend/src/components/home/HeroVisual.jsx): Interactive split-hero terminal with live streaming API payloads, automated CI/CD pipeline steps, and real-time telemetry metrics.
  - Created [`src/components/home/CapabilitiesBento.jsx`](file:///d:/tbd%20labs/tbdlabsfrontend/src/components/home/CapabilitiesBento.jsx): Asymmetric Bento Grid layout featuring visual simulated component frames, AI precision index bar, and design token palette previews.
  - Created [`src/components/home/ProjectMockupCard.jsx`](file:///d:/tbd%20labs/tbdlabsfrontend/src/components/home/ProjectMockupCard.jsx): High-tech dark mode window headers with simulated sensor graphs for KrishiMitra, forensic waveform radar for BhramGuard, and fleet allocation matrix for AutoRent.
  - Created [`src/components/home/WorkflowCircuit.jsx`](file:///d:/tbd%20labs/tbdlabsfrontend/src/components/home/WorkflowCircuit.jsx): Interactive 5-stage delivery pipeline with interactive artifact previews (Architecture Brief, Design Tokens, Git Diff, Container Log, Telemetry Report).
  - Created [`src/components/home/TechStripVisual.jsx`](file:///d:/tbd%20labs/tbdlabsfrontend/src/components/home/TechStripVisual.jsx): High-density technology capsules with category badges and glowing micro-interactions.
  - Updated [`src/pages/Home.jsx`](file:///d:/tbd%20labs/tbdlabsfrontend/src/pages/Home.jsx): Assembled all visual components into a cohesive, high-impact landing page.
- **Verification & QA:**
  - `npm run lint`: **0 errors, 0 warnings (100% clean)**.
  - `npm run build`: **0 errors (Build successful in ~5.0s)**.
- **Status:** **COMPLETED**

---

### [PROMPT-004] | 2026-09-24 20:00 — Project Understanding Review
- **Prompt:** `see the projecty and understand about it`
- **Intent & Scope:** Read the workspace, architecture, content model, and current implementation so future work can be grounded in what actually exists.
- **Actions Taken:**
  - Reviewed `AGENTS.md`, `tbdlabsfrontend/package.json`, `App.jsx`, `router/Router.jsx`, all page components, content modules, layout/UI primitives, and recent Home visual components.
  - Confirmed this is a Vite + React 19 corporate site for TBD Labs with a custom client router (no React Router), copy in `src/content/`, and production domain `tbdlabs.com.np`.
- **Decisions & Compliance:** No code changes. Content stays factual: founders Bidur, David, Tumyang; projects KrishiMitra, BhramGuard, AutoRent; no invented stats.
- **Verification & QA:** Read-only inspection; build/lint not re-run.
- **Status:** **COMPLETED**
- **Next Logical Step:** Continue page polish, wire Contact form to a real endpoint, or proceed with remaining QA/launch items from the Codex sequence.

---

### [PROMPT-006] | 2026-09-24 20:33 — Capabilities stacked carousel implementation
- **Prompt:** Use the 5 images in `tbdlabsfrontend/src/assets/img` and complete the CapabilitiesBento component in the FeatureCarousel visual pattern.
- **Intent & Scope:** Replace the text bento with a TBD-native stacked image carousel (no GSAP/Tailwind/react-router), using existing brand tokens and the five provided photos.
- **Actions Taken:**
  - Renamed unlabeled `Gemini_Generated_Image_apsgwiapsgwiapsg.jpg` → `cloud.jpg`.
  - Added `src/content/capabilities.js` mapping: web, ai, mobile, uiux, cloud.
  - Added `src/styles/capabilities-carousel.css`.
  - Rewrote `src/components/home/CapabilitiesBento.jsx`: expanding active panel, stacked thumbnails, autoplay (paused on hover/focus), prev/next, keyboard arrows, mobile snap row, reduced-motion (no autoplay).
- **Verification & QA:**
  - `npm run lint`: **0 errors**.
  - `npm run build`: **success**.
  - Browser E2E not available in this session (no browser tools).
- **Status:** **COMPLETED**
- **Next Logical Step:** Compress the ~2MB JPEGs to WebP; optional visual QA in the running dev server.

---


