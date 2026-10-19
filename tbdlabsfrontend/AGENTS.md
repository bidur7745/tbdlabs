# AGENTS.md — TBD Labs Engineering & Brand Guidelines

> **Notice for all AI Agents and Developers:**  
> This file is the primary repository-level specification for the official **TBD Labs** corporate website. Adhere strictly to the brand, content, design, and engineering rules documented here.

---

## 1. Brand Identity & Positioning

- **Company Name:** TBD Labs
- **Slogan:** Technology Beyond Dimensions
- **Website Type:** Informative corporate technology website
- **Primary Goal:** Establish credibility, explain capabilities, showcase genuine selected work, and generate project enquiries.
- **Audience:** Potential clients, startups, enterprise leaders, collaborators, developers, and researchers.
- **Positioning:** Small, serious product-and-engineering company — **NOT** a generic freelance agency.

### Tone of Voice & Copy Restrictions
- **Voice:** Confident, intelligent, concise, human, and technically credible.
- **Copy Principle:** Explain what TBD Labs actually builds; avoid empty tech jargon or inflated agency hype.
- **CRITICAL RESTRICTION:** **NEVER invent clients, statistics, certifications, awards, user counts, revenue, years of experience, or case-study results.** If factual information is missing, use clearly labeled editable placeholders or omit the claim entirely.

---

## 2. Approved Page Routes

The website consists of exactly seven core routes plus a 404 handler:

| Route | Page | Purpose |
| :--- | :--- | :--- |
| `/` | **Home** | Value proposition, dual CTA, capability overview, selected work, 5-stage workflow, tech strip, inquiry hook. |
| `/about` | **About** | Origin story, mission & vision, founders (**Bidur**, **David**, **Tumyang**), core values. |
| `/services` | **Services** | 6 service categories: Web Dev, Mobile Dev, AI/ML, UI/UX, Software Dev, Digital Solutions. |
| `/projects` | **Projects** | Real systems & concept records: **KrishiMitra**, **BhramGuard**, **AutoRent**; structured data model. |
| `/technology` | **Technology** | Stack organized by capabilities (Frontend, Backend, Data, AI/ML, Cloud/DevOps) + Engineering Principles. |
| `/insights` | **Insights** | Editorial hub with extensible article schema; no fabricated authors or dates. |
| `/contact` | **Contact** | Accessible project inquiry form with validation, decoupled submission logic, and verified channels. |
| `*` | **404** | Accessible fallback page with quick route navigation. |

---

## 3. Global Design System & Accessibility

- **Color Foundation:**
  - Base: Dark neutrals (`#08090d`, `#0e1017`, `#141722`).
  - Text: High-contrast light neutrals (`#f3f4f6`, `#9ca3af`, `#6b7280`).
  - Accent: Distinctive brand accent (Electric Cyan `#00e5ff` / `#00b4d8`) used purposefully for hierarchy and interactive states.
- **Typography:**
  - Headings: `Space Grotesk`, sans-serif.
  - Body & UI: `Inter`, -apple-system, sans-serif.
  - Code & Badges: `JetBrains Mono`, monospace.
- **Layout & Rhythm:**
  - Max container width: `1200px`.
  - 12-column desktop grid, gracefully collapsing to single column on mobile.
  - Generous vertical padding (`80px–120px` section spacing).
  - Absolutely zero horizontal overflow.
- **Motion:**
  - Subtle, performant CSS transitions (`150ms–300ms`).
  - Strict compliance with `@media (prefers-reduced-motion: reduce)`.
- **Accessibility:**
  - WCAG 2.1 AA minimum contrast on all text and active interactive elements.
  - Fully keyboard navigatable with visible `:focus-visible` outlines.
  - Semantic HTML (`header`, `nav`, `main`, `section`, `article`, `footer`, `h1`–`h4`).
  - Accessible form labels, aria attributes, and descriptive error announcements.

---

## 4. Component & Code Architecture

- **Separation of Content & Presentation:**
  - Keep all data in `src/content/` (`projects.js`, `services.js`, `team.js`, `technology.js`, `insights.js`) so copy updates do not require touching component JSX.
- **Reusability:**
  - Use modular UI primitives (`Button`, `Card`, `Badge`, `SectionHeading`) rather than ad-hoc inline styling.
- **Client Routing:**
  - Client router must handle document title updates, scroll-to-top on route change, and active link state indicators.
- **Images & Icons:**
  - Use `lucide-react` consistently for all user-interface icons.
  - Keep SVG graphics optimized and accessible with proper `aria-hidden` or `aria-label`.

---

## 5. Testing & Validation Commands

Always run these commands from the `tbdlabsfrontend` directory before declaring changes complete:

```bash
# Build production bundle
npm run build

# Run ESLint validation
npm run lint

# Start local development server
npm run dev
```

---

## 6. Vibe Coding Changelog Requirement

Every interaction, prompt, or architectural addition must be documented in `vibecodelog.md` tracking prompt details, actions taken, decisions, and verification results.
