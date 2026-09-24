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
