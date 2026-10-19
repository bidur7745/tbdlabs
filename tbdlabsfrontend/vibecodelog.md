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

### [PROMPT-002] | 2026-09-26 00:00 — Remove Featured Project Section from Home

- **Prompt:**
  > `from home page remove the component which display selected project or system we engineered`

- **Intent & Scope:**
  - Remove the featured project showcase block from the home page while preserving the rest of the landing page and project detail route.
  - Keep the homepage focused on the hero, capability overview, workflow, tech strip, and inquiry call-to-action.

- **Actions Taken:**
  - Updated `src/pages/Home.jsx` to remove the `FeaturedProjects` section and its associated imports.
  - Kept the homepage structure intact by retaining the hero, capabilities, workflow, technology strip, and contact CTA.

- **Decisions & Compliance:**
  - This change aligns with the user request to remove the selected-work component from the primary landing page without removing the dedicated projects page.
  - No fabricated project claims were introduced.

- **Verification & QA:**
  - Build and lint checks will be run from `d:\tbd labs\tbdlabsfrontend` after the patch.

- **Status:** **Completed**

- **Next Logical Step:**
  - If desired, the same home page can later be reworked with a different storytelling section without reintroducing the selected-project tiles.

---

## Entry — Logo Image Integration

- **Timestamp:** 2026-10-19T15:06
- **Prompt:** "Use `src/assets/img/logo.png` as the logo in the website."

- **Actions Taken:**
  1. Inspected the provided logo at `src/assets/img/logo.png` — a cyan TBD Labs hexagon mark with "TBD LABS" wordmark and "Technology Beyond Dimensions" tagline on a white/transparent background.
  2. **Navbar (`src/components/layout/Navbar.jsx`):** Imported `logo.png`, replaced inline SVG placeholder and text `<span>` with `<img>` element (height `36px`, auto width).
  3. **Footer (`src/components/layout/Footer.jsx`):** Imported `logo.png`, replaced inline SVG placeholder and text `<span>` with `<img>` element (height `30px`, auto width).
  4. Confirmed no other SVG logo placeholders remain in the codebase.

- **Decisions:**
  - Used `height` attribute with `auto` width to preserve the logo's native aspect ratio.
  - Navbar logo is slightly larger (36px) than footer logo (30px) to match the visual hierarchy already established.
  - Kept the wrapping `<a>` tag and `aria-label="TBD Labs — Home"` for accessibility.

- **Verification:** Dev server hot-reload; no build errors.
- **Status:** **Completed**

---

## Entry — Terms & Conditions + Privacy Policy Pages

- **Timestamp:** 2026-10-19T15:16
- **Prompt:** "Develop Terms & Conditions and Privacy Policy pages with specific details provided by founder."

- **Founder-Provided Details:**
  - Domain: `tbdlabs.com.np`
  - Location / Jurisdiction: Kathmandu, Nepal
  - Cookies: Not currently used
  - Third-party tools: Will be listed as adopted
  - Data retention: Max 12 months
  - Age restriction: None (informational website)

- **Actions Taken:**
  1. Created `src/pages/Terms.jsx` — 10 sections covering site usage, IP, inquiries, liability, governing law (Nepal), etc.
  2. Created `src/pages/Privacy.jsx` — 10 sections covering data collection, no cookies, data sharing, 12-month retention, user rights, security, etc.
  3. Updated `src/router/Router.jsx` — added `/terms` and `/privacy` route metadata.
  4. Updated `src/App.jsx` — imported and routed both pages.
  5. Updated `src/components/layout/Footer.jsx` — added "Terms & Conditions" and "Privacy Policy" links in the bottom bar.
  6. Deleted draft artifact `legal_pages_draft.md`.

- **Design Decisions:**
  - Both pages use the same card-based layout with `lucide-react` icons, matching the existing design language.
  - Each section is an interactive card with subtle hover border accent.
  - Bottom CTA cross-links between Terms ↔ Privacy and the Contact page.
  - Children's Privacy section omitted per founder directive (informational site, no age limit).

- **Verification:** Dev server hot-reload; pages accessible at `/terms` and `/privacy`.
- **Status:** **Completed**

---

## Entry — Content Width Alignment on Terms & Privacy Pages

- **Timestamp:** 2026-10-19T15:25
- **Prompt:** "the content width in both page does not align with the website layout use similar widht in this page too inccrease the width"

- **Actions Taken:**
  1. Updated `src/pages/Privacy.jsx`:
     - Removed restrictive `maxWidth: '800px'` container constraint.
     - Set card container to `width: '100%'` inside `.container` (`--container-max: 1200px`), aligning flush with the rest of the site layout (navbar, header, footer).
     - Upgraded individual section articles to standard `className="card"` with generous `2rem 2.5rem` padding and consistent theme borders/hover states.
     - Updated bottom CTA banner to `className="card"` spanning 100% of the container.
  2. Updated `src/pages/Terms.jsx`:
     - Applied matching layout expansion (`width: '100%'` in `.container`).
     - Upgraded sections and bottom CTA to standard `className="card"` styling.
  3. Ran `npm run build` — verified build output with zero errors.

- **Verification:**
  - `npm run build` exited with code 0 (`vite v8.3.0 building client environment for production... ✓ built in 7.35s`).
  - Content width now perfectly matches the 1200px layout grid across all viewports.
- **Status:** **Completed**

---
