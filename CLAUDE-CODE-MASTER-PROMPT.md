# CLAUDE CODE MASTER PROMPT — Firose Enterprises Web Platform

> **Mission**: Transform `firoseenterprises.com` into a world-class, premium-feel corporate website with revolutionary UI/UX that no competitor has achieved. Every pixel must exude luxury. Every interaction must feel alive. Every page must convert. Ship a fully working, production-grade site.

---

## 1. PROJECT IDENTITY & CONTEXT

You are working on **Firose Enterprises** — a diversified enterprise group headquartered in Chennai, India. The group operates four divisions:

| Division | Category | External URL |
|---|---|---|
| **AR Perfumes** | Premium luxury fragrances | `https://arperfumes.in` |
| **Femison** | Baby care & nutrition (gripe water, glucose) | `https://femison.in` |
| **Neat & Fresh** | Hygiene & housekeeping FMCG | `https://neatfresh.online` |
| **Future Beyond Technology (FBT)** | AI engineering, cybersecurity, enterprise automation | `https://futurebeyondtech.in` |

**Corporate contact**: `corporate@firoseenterprises.com` | `+91-9790600220`
**Primary domain**: `https://firoseenterprises.com`

---

## 2. TECHNOLOGY STACK (DO NOT CHANGE)

```
Framework:        Next.js 16 (App Router, canary) — React 19
Language:         TypeScript 5 (strict mode)
Styling:          Tailwind CSS 4 + CSS Modules (brand-scoped)
Animation:        Framer Motion 12
Icons:            Lucide React
UI Foundation:    shadcn/ui (configured, components.json present)
Utilities:        clsx + tailwind-merge (via lib/utils.ts cn() helper)
Build:            PostCSS → Tailwind → Next.js
Image formats:    AVIF, WebP (configured in next.config.js)
Remote images:    Unsplash (allowed in next.config.js remotePatterns)
```

**DO NOT** install new frameworks, CSS-in-JS libraries, or state management tools. Work within the existing stack. If you need a new shadcn/ui component, use `npx shadcn@latest add <component>`.

---

## 3. ARCHITECTURE & FILE STRUCTURE

```
fbt-client-firose-web/
├── app/
│   ├── layout.tsx                    ← Root layout (metadata, JSON-LD, header, footer)
│   ├── page.tsx                      ← Homepage
│   ├── globals.css                   ← Design tokens + global utility classes
│   ├── corporate.module.css          ← Corporate page styles
│   ├── components/
│   │   ├── CorporateHeader.tsx       ← Sticky nav, dropdown, mobile menu
│   │   ├── HeroSection.tsx           ← Full-viewport hero with word-by-word animation
│   │   ├── DivisionCard.tsx          ← Division portfolio cards
│   │   ├── BrandNavigation.tsx       ← External brand redirect with overlay
│   │   ├── CorporateLeadForm.tsx     ← Reusable contact form (mailto + WhatsApp)
│   │   ├── MeaningBehindFirose.tsx   ← FIROSE acronym pillars
│   │   ├── ExperienceEnhancer.tsx    ← Scroll progress + intersection observer
│   │   └── motion/
│   │       ├── MotionProvider.tsx     ← Global Framer Motion config + reduced-motion
│   │       ├── MotionWrapper.tsx      ← Scroll-triggered animation wrapper
│   │       └── RouteTransition.tsx    ← Page enter/exit transitions
│   ├── lib/
│   │   ├── brands.ts                 ← Brand catalog + contact data + URL builders
│   │   ├── divisions.ts              ← Division catalog + routing helpers
│   │   └── brandVisuals.ts           ← Image URLs per brand/corporate
│   ├── about/                        ← /about + /about/story
│   ├── brands/
│   │   ├── layout.tsx                ← Brands section layout with sub-nav
│   │   ├── page.tsx                  ← Division portfolio overview
│   │   ├── ar-perfumes/              ← AR Perfumes brand page + 10 components + products.ts data
│   │   ├── femison/                  ← Femison brand page + 5 components
│   │   ├── neat-fresh/               ← Neat & Fresh brand page + 5 components
│   │   └── future-beyond-technology/ ← FBT division page + 1 component
│   ├── contact/                      ← Contact page
│   ├── business-with-us/             ← B2B lead capture
│   └── manufacturing-quality/        ← Quality standards page
├── lib/
│   ├── motion.ts                     ← Animation variants (fadeInUp, scaleIn, slideIn, etc.)
│   └── utils.ts                      ← cn() class merge utility
├── public/images/                    ← Product images + logos
├── next.config.js                    ← Image optimization + legacy redirects
├── tailwind.config.ts                ← Custom corporate colors + shadows
├── tsconfig.json                     ← Path aliases (@/*)
└── components.json                   ← shadcn/ui configuration
```

### Routing Map

| Route | Purpose |
|---|---|
| `/` | Corporate homepage — hero, division cards, FBT spotlight, FIROSE standard, industries, brand nav, CTA |
| `/about` | Company overview, differentiators, leadership message, FIROSE pillars |
| `/about/story` | Timeline narrative, principles, operations showcase |
| `/brands` | Division portfolio grid |
| `/brands/ar-perfumes` | AR Perfumes — hero, product catalog, WhatsApp-integrated contact |
| `/brands/femison` | Femison — baby care products, masthead, transition banner |
| `/brands/neat-fresh` | Neat & Fresh — hygiene products, masthead, transition banner |
| `/brands/future-beyond-technology` | FBT — capability signals grid (Product Eng, Security, AI, Consulting) |
| `/contact` | Corporate contact details + per-brand contact persons |
| `/business-with-us` | B2B lead capture (distributor, bulk, private label) |
| `/manufacturing-quality` | Quality standards, SOP, compliance |

---

## 4. DESIGN SYSTEM (MANDATORY — PRESERVE EXACTLY)

### Color Tokens (from globals.css `:root`)

```css
--fe-ink: #f4edde;              /* Primary text (light cream) */
--fe-ink-soft: #b8ad96;         /* Secondary text (warm gray) */
--fe-primary: #c8a86b;          /* Firose gold */
--fe-primary-strong: #a78549;   /* Deep gold */
--fe-accent: #e1ca96;           /* Light gold accent */
--fe-line: rgba(200,168,107,0.24);  /* Border/divider */
--fe-surface: rgba(13,12,11,0.72);  /* Card background */
--fe-surface-strong: rgba(10,9,8,0.84);  /* Elevated card */
```

### Background (body)
```css
radial-gradient(90% 70% at 52% -10%, rgba(92,72,42,0.34) 0%, transparent 56%),
radial-gradient(70% 48% at 6% 0%, rgba(86,65,40,0.22) 0%, transparent 62%),
linear-gradient(180deg, #0d0b09 0%, #0a0908 52%, #090807 100%);
```

### Typography
- **Display headings**: `"Iowan Old Style", "Palatino Linotype", serif` — weight 500
- **Body**: `"Avenir Next", "Segoe UI", "Helvetica Neue", Arial, sans-serif`
- **H1**: `clamp(2.25rem, 4.8vw, 4rem)` | **H2**: `clamp(1.7rem, 3.1vw, 2.9rem)` | **H3**: `clamp(1.25rem, 2.2vw, 1.9rem)`
- **Uppercase labels**: `text-[11px] tracking-[0.2em] uppercase`

### Spacing
```
xs: 0.45rem | sm: 0.75rem | md: 1rem | lg: 1.35rem | xl: 1.85rem | 2xl: 2.5rem | 3xl: 3.3rem
```

### Border Radius
```
Soft: 14px | Card: 20px | Pill: 999px
```

### Existing Utility Classes (USE THESE — do not recreate)
- `.fe-panel` — Glassmorphism card with blur + gradient background
- `.fe-panel-strong` — Elevated glassmorphism with radial gold glow
- `.fe-badge` — Pill badge with gold border
- `.fe-link-chip` — Secondary button (border only, 44px min-height)
- `.fe-btn-primary` — Gold gradient CTA button
- `.fe-shine` — Hover shine sweep effect on cards/buttons
- `.fe-interactive-media` — Image scale on hover
- `.fe-ambient-drift` — Radial gold ambient glow background
- `.fe-main` — Content container (max-width: 1240px, responsive padding)
- `.fe-shell` — Full-height flex layout

### Animation System (lib/motion.ts — USE THESE)
```typescript
MOTION_EASE: [0.22, 1, 0.36, 1]         // Custom cubic-bezier
fadeInUp     — opacity + Y + blur(4px)
fadeIn        — opacity only
scaleIn      — scale(0.97) + blur
slideIn(dir) — directional slide (up/down/left/right)
staggerContainer — children stagger (0.08s gap, 0.05s delay)
hoverLift    — y: -4 + shadow enhancement
buttonPress  — scale: 0.97 (spring physics)
pageTransition — page enter/exit with blur
```

### Component Patterns
- `MotionWrapper` with `delay` prop for scroll-triggered animations
- `<motion.div whileTap={buttonPress} whileHover={{ y: -2 }}>` on all interactive elements
- Word-by-word animation on hero titles using custom variants
- `AnimatePresence` for dropdowns, menus, overlays
- All animations respect `useReducedMotion()` — return static fallback

---

## 5. CODING STANDARDS (ENFORCE STRICTLY)

### Principles
- **SOLID**: Single responsibility per component. Open for extension (catalog-driven data). Interface segregation (typed props).
- **KISS**: No over-engineering. Static data stays in TypeScript files. No premature abstractions.
- **DRY**: Reuse `MotionWrapper`, `cn()`, motion variants, `.fe-*` utility classes. Never duplicate animation configs.
- **YAGNI**: Don't add features not requested. No speculative abstractions.

### TypeScript Rules
- All components must have `Readonly<Props>` typing
- Export types alongside data (`export type DivisionDefinition = {...}`)
- No `any` types. Use proper generics or `unknown`.
- Strict mode is ON — respect it.
- Use `type` for object shapes, `interface` only for extension.

### Component Rules
- **Server Components by default**. Only add `'use client'` when using hooks, event handlers, or browser APIs.
- Props must be typed inline or with named types — never `Record<string, any>`.
- Every interactive element needs `aria-label`, `aria-expanded`, `aria-current` where applicable.
- Minimum `44px` touch target (`min-h-[44px]` or `min-height: var(--tap-min)`).
- All external links: `target="_self"` for same-tab navigation, `rel="noopener noreferrer"`.
- Use `Link` from `next/link` for internal routes. Use `<a>` for external URLs.

### CSS Rules
- Use Tailwind utility classes as the primary styling method.
- Use CSS Modules (`.module.css`) only for brand-scoped theming that requires complex selectors.
- Never use inline `style={{}}` unless dynamically computed.
- All custom properties go in `globals.css :root`.
- Use `clamp()` for responsive typography — never fixed breakpoint font sizes.
- Colors: use CSS variables or Tailwind theme tokens. No arbitrary hex scattered in components (except in established patterns already present).

### File Organization
- Page components in `app/<route>/page.tsx`
- Route-specific sub-components in `app/<route>/components/`
- Shared components in `app/components/`
- Data/config in `app/lib/`
- Global utilities in root `lib/`
- CSS modules co-located with their components

### Import Order (enforce consistency)
```typescript
// 1. External types
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
// 2. External modules
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
// 3. Internal shared
import { cn } from '@/lib/utils';
import { fadeInUp, staggerContainer } from '@/lib/motion';
// 4. Internal app-level
import MotionWrapper from '@/app/components/motion/MotionWrapper';
import { divisionCatalog } from '@/app/lib/divisions';
// 5. Relative imports (co-located)
import styles from './component.module.css';
```

---

## 6. UX LAWS & DESIGN PRINCIPLES (APPLY EVERYWHERE)

### Consistency Principle
- Every page follows the same visual grammar: badge → heading → description → CTAs → cards/content.
- Navigation patterns identical across desktop and mobile.
- Card styles (`.fe-panel`, `.fe-panel-strong`) used consistently. Never mix card styles arbitrarily.

### Jakob's Law
- Users spend most time on other luxury/corporate sites. Match the mental model:
  - Sticky header with hide-on-scroll
  - Full-viewport hero with overlay text
  - Card-based content sections
  - Gold/dark luxury color scheme (consistent with premium brands like Rolex, LVMH sites)

### Fitts's Law
- All buttons minimum 44px height (already enforced via `--tap-min: 44px`)
- Primary CTAs are large, gold-gradient, full-width on mobile
- Navigation items have generous padding (`px-3 py-1.5` minimum)
- Touch targets have adequate spacing (minimum `gap-2`)

### Aesthetic–Usability Effect
- Premium visual design makes users perceive better usability
- Maintain the gold-on-dark luxury aesthetic at ALL times
- Glassmorphism panels, gradient overlays, ambient glow effects
- Typography must be elegant — serif headings, clean sans-serif body
- Animations add perceived quality (but never delay interaction)

### Hick's Law
- Limit choices per section. Division cards show exactly 4 options.
- Navigation has clear hierarchy: primary links → divisions dropdown → CTA
- Forms use progressive disclosure (inquiry type optional)

### Von Restorff Effect (Isolation Effect)
- CTAs stand out via gold gradient background against dark interface
- "Featured Division" section uses `.fe-panel-strong` for visual elevation
- Contact CTA button uses distinct styling from secondary chips

---

## 7. REVOLUTIONARY UI/UX REQUIREMENTS

### A. Premium Popup Greeting (NEVER DONE BEFORE)

Create a first-visit welcome experience that feels like opening a luxury invitation:

1. **On first visit only** (track via sessionStorage), show a full-screen overlay
2. The overlay fades in with a soft gold particle/shimmer effect
3. The Firose Enterprises logo/wordmark appears with a letter-by-letter gold reveal animation
4. Below: "Welcome to Firose Enterprises" in serif, fading in word-by-word
5. A subtle tagline: "One Group. Multiple Trusted Divisions." with stagger animation
6. After 2.5 seconds OR on click/tap, the overlay elegantly splits apart (like opening curtains or a luxury box lid lifting) revealing the homepage beneath
7. Must respect `prefers-reduced-motion` — show simple fade instead
8. Must NOT block page load or harm SEO (use client component, render after hydration)
9. Store `hasSeenGreeting` in sessionStorage so it only shows once per session
10. Exit animation: the gold overlay splits diagonally with blur, revealing content beneath

**Technical implementation**: Create `app/components/WelcomeOverlay.tsx` as `'use client'` component. Use Framer Motion `AnimatePresence`. Render in `layout.tsx` after `RouteTransition`.

### B. Premium Scroll Experiences

1. **Parallax hero image**: Subtle Y-axis parallax on the hero background image (3-5% movement)
2. **Scroll-linked progress bar**: Thin gold line at top of viewport showing scroll progress (already started in ExperienceEnhancer.tsx — enhance it)
3. **Section reveals**: Every `.fe-panel` and `.fe-panel-strong` fades in with stagger when entering viewport (already working via MotionWrapper — ensure all sections use it)
4. **Floating back-to-top button**: Appears after scrolling 400px. Gold pill with smooth scroll. Framer Motion entrance/exit.

### C. Micro-Interactions (Premium Feel)

1. **Button hover shine**: Already implemented via `.fe-shine::before` — ensure ALL buttons use this
2. **Card hover lift**: Already implemented — ensure translateY(-2px) on all `.fe-panel` cards
3. **Navigation active indicator**: Animated underline via `layoutId="header-active-underline"` — already working
4. **Link hover glow**: Subtle gold text-shadow on hover for inline text links
5. **Image hover zoom**: Already in `.fe-interactive-media` — apply to all images in cards
6. **Form field focus glow**: Gold border-glow on focus (`box-shadow: 0 0 0 3px rgba(200,168,107,0.2)`)
7. **Loading states**: Skeleton shimmer (gold gradient animation) while images load
8. **Toast notifications**: After form submission, show a brief gold toast "Message prepared" instead of just changing button text

### D. Premium Page Transitions

The existing `RouteTransition.tsx` handles basic fade+blur. Enhance:
1. Cross-page transitions should have a brief gold flash/sweep
2. Brand pages should transition with the brand's accent color
3. Maintain `pageTransition` variants from `lib/motion.ts`

### E. Footer Enhancement

Current footer is functional but basic. Elevate it:
1. Add a subtle ambient gold glow at the top edge
2. Add a "Back to Top" smooth scroll link
3. Add social proof: "Trusted across India" or similar with subtle counter animation
4. Copyright section with refined spacing

---

## 8. SECURITY REQUIREMENTS

### Content Security
- **No `dangerouslySetInnerHTML`** except for JSON-LD schema (already present, acceptable)
- **No `eval()`, `Function()`, or dynamic code execution**
- **Sanitize all URLs** built from user input or query params
- External links MUST have `rel="noopener noreferrer"`
- Form submissions use `mailto:` and `wa.me` — no backend endpoints to protect, but validate URLs are properly encoded

### Environment Variables
- Only `NEXT_PUBLIC_*` vars exposed to client. Currently: `NEXT_PUBLIC_AR_BRAND_WEBSITE`
- NEVER commit `.env` files. Ensure `.gitignore` includes `.env*`
- No API keys, secrets, or tokens should be in the codebase

### Dependency Security
- Stay on current versions unless a security patch requires upgrade
- Do not add unnecessary dependencies. The bundle must stay lean.
- shadcn/ui components are copy-pasted (not a runtime dependency) — safe

### Input Handling
- Form fields must use proper `type` attributes (`email`, `tel`, `text`)
- Phone numbers in WhatsApp URLs must be properly encoded (`encodeURIComponent`)
- No user-generated content is rendered — all content is hardcoded. This is intentional.

### Headers & Meta
- JSON-LD schema is properly structured for Organization type
- OpenGraph and meta tags are present and correct
- `metadataBase` is set to production URL

---

## 9. PERFORMANCE REQUIREMENTS

### Images
- Use `next/image` with `fill` and `sizes` attribute for responsive loading
- Always specify `priority` on above-the-fold hero images
- Use `sizes="(max-width: 1023px) 100vw, 42vw"` pattern for grid images
- Formats: AVIF → WebP → fallback (configured in next.config.js)

### Bundle
- Server Components by default — minimize `'use client'` boundary
- Framer Motion is the only large client dependency — keep it
- No new heavy libraries without justification

### Animations
- All animations under 500ms for interactions, up to 800ms for page transitions
- Use `will-change: transform` sparingly and only when needed
- GPU-accelerated properties only: `transform`, `opacity`, `filter`
- Never animate `width`, `height`, `top`, `left`, `margin`, `padding`

### Accessibility Performance
- `prefers-reduced-motion: reduce` must disable ALL animations
- Already handled in MotionProvider + globals.css — maintain this pattern
- Color contrast: gold (#c8a86b) on dark (#0a0908) = sufficient. Verify body text.

---

## 10. WHAT TO BUILD / FIX / ENHANCE

### Priority 1: Critical (Must Ship)
- [ ] **WelcomeOverlay** — Premium first-visit greeting popup (see Section 7A)
- [ ] **Floating Back-to-Top button** — Gold pill, Framer Motion, appears after 400px scroll
- [ ] **Form submission toast** — Brief gold notification on form submit
- [ ] **All pages fully working** — Verify every route renders without errors
- [ ] **Mobile responsiveness audit** — Every page perfect on 375px, 768px, 1024px, 1440px

### Priority 2: Premium Feel
- [ ] **Enhanced scroll progress bar** — Thin gold line at viewport top
- [ ] **Form field focus glow** — Gold box-shadow on focus
- [ ] **Image loading skeletons** — Gold shimmer placeholders
- [ ] **Footer enhancement** — Ambient glow, back-to-top, refined spacing
- [ ] **Link hover glow** — Subtle gold text-shadow on text links

### Priority 3: Polish
- [ ] **Hero parallax** — Subtle Y-parallax on hero background
- [ ] **Page transition gold sweep** — Brief gold flash between routes
- [ ] **Counter animations** — Animate numbers on scroll into view (industries served, etc.)
- [ ] **404 page** — Custom premium "not found" page matching design system
- [ ] **Loading.tsx** — Route loading skeleton with gold shimmer

---

## 11. TESTING CHECKLIST

Before considering any task complete:

1. `npm run build` passes with zero errors
2. `npm run lint` passes with zero warnings
3. Every route (`/`, `/about`, `/about/story`, `/brands`, `/brands/ar-perfumes`, `/brands/femison`, `/brands/neat-fresh`, `/brands/future-beyond-technology`, `/contact`, `/business-with-us`, `/manufacturing-quality`) loads without console errors
4. Mobile viewport (375px) — no horizontal overflow, all text readable, all buttons tappable
5. Desktop viewport (1440px) — content centered, max-width respected, grid layouts correct
6. Reduced motion — toggle `prefers-reduced-motion: reduce` and verify no animations play
7. Keyboard navigation — Tab through all interactive elements, Escape closes menus
8. External links — All WhatsApp, email, external brand URLs work correctly
9. Form submission — mailto and WhatsApp URLs properly constructed with encoded data

---

## 12. DO NOT DO (CRITICAL CONSTRAINTS)

- **DO NOT** change the color palette or typography system
- **DO NOT** add Redux, Zustand, Jotai, or any state management library
- **DO NOT** add a CMS, database, or backend API
- **DO NOT** remove existing redirects from next.config.js
- **DO NOT** change the domain, metadata, or JSON-LD schema structure
- **DO NOT** use `localStorage` for anything except non-critical preferences
- **DO NOT** add analytics scripts, tracking pixels, or third-party scripts without explicit request
- **DO NOT** restructure the file/folder organization — extend it, don't reorganize
- **DO NOT** change division/brand data in lib files unless explicitly asked
- **DO NOT** remove the `prefers-reduced-motion` support
- **DO NOT** use `!important` in CSS (except in the existing reduced-motion media query)
- **DO NOT** create separate CSS/JS files for HTML pages — this is a Next.js App Router project

---

## 13. HOW TO WORK

1. **Read before writing**: Always read the existing file before modifying it. Understand the patterns already established.
2. **One task at a time**: Complete each task fully before moving to the next. Build → Lint → Verify.
3. **Preserve existing code**: Your changes should ADD to the codebase, not rewrite working code unless fixing a bug.
4. **Use the design system**: Every new component MUST use the existing CSS tokens, utility classes, and motion variants. No custom one-off styles.
5. **Test after every change**: Run `npm run build` after significant changes. Fix issues immediately.
6. **Commit atomic changes**: Each feature should be a clean, reviewable unit.

---

*This prompt represents the complete architecture, design system, coding standards, and vision for Firose Enterprises. Follow it precisely. Build something extraordinary.*
