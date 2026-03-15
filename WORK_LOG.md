# FAS Dashboard V3 — Work Log

## 2026-02-18 — V2 Dark Mode Color System Migration

**Branch:** `claude/frontieras-dashboard-mvp-MQ4PI`
**Checkpoint (pre-work):** `1ab4320` — "feat: Add light/dark mode toggle with CSS variable design token system"

### Objective
Replace the V3 neutral-black color system with V2's deep navy blue palette across the entire dashboard. Dark mode should match the V2 dashboard's visual identity exactly. Light mode toggle remains functional with its own palette.

### Changes Made

| # | File(s) | What Changed |
|---|---------|-------------|
| 1 | `app/globals.css` | Replaced all CSS variable values. Dark mode: V2 navy backgrounds (#060a14, #111a2e, #131d30), rgba white borders, card gradients, V2 layered shadow system, scrollbar/slider vars. Light mode: updated palette (#F5F5F7, #FFFFFF, rgba black borders). Added --card-gradient, --card-gradient-alt, --shadow-card-sm/lg, --shadow-tooltip, --shadow-modal. Recharts tooltip now scoped to .dark/.light with V2 gradient style. |
| 2 | `tailwind.config.ts` | Accent colors now static hex: gold #D4A853, gold-muted, gold-hover, green #00cc88, green-dim #065f46. Data viz colors updated to V2: blue #4088e8, green #00cc88, purple #c084fc, orange #e88a30, red #e84040. Added blue-dim, gold-dim. Removed bg.elevated, text.muted, text.mid tokens. |
| 3 | `components/ui/Card.tsx` | Cards use V2 gradient backgrounds via `var(--card-gradient)` instead of flat bg-bg-secondary. |
| 4 | `app/dashboard/layout.tsx` | Atmospheric glow updated to V2 green rgba(0,204,136,0.06) + gold rgba(212,168,82,0.03). |
| 5 | `data/products.ts` | Product colors mapped to V2: FASCarbon→#00cc88, Diesel→#d4a852, Naphtha→#4088e8, Sulfuric Acid→#e88a30, Ammonium Sulfate→#c084fc, Bio-Oil→#e84040. |
| 6 | `data/countries.ts` | Country colors updated to V2 palette. |
| 7 | `data/financials.ts` | Valuation scenario colors updated to V2: Traditional→#4088e8, Cleantech→#00cc88, Paradigm→#d4a852. |
| 8 | `app/dashboard/page.tsx` | Overview metric colors updated to V2 palette. |
| 9 | `app/dashboard/financials/page.tsx` | Chart gradients, stroke/dot colors → V2. Replaced bg-bg-elevated→bg-bg-tertiary, text-text-muted→text-text-tertiary, data-cyan→data-green. |
| 10 | `app/dashboard/economics/page.tsx` | Waterfall fills, key metric colors, donut tooltip → V2. Same token renames as financials. |
| 11 | `app/dashboard/capital/page.tsx` | Use of proceeds colors, Reg A+ metric colors, ROAS gradient → V2. Replaced text-text-mid→text-text-secondary, var(--accent-gold)→#D4A853. |
| 12 | `app/dashboard/expansion/page.tsx` | Country card colors, patent status indicator, CalcRow colors → V2. Replaced #10B981→#00cc88 (V2 uses main green). |
| 13 | `components/charts/FacilityScaler.tsx` | ScalerMetric colors updated to V2: Revenue→#4088e8, EBITDA→#00cc88, EV→#d4a852, CapEx→#c084fc. |

### Decisions
- Dark mode is the default (`:root, .dark` both set dark values)
- Accent colors (gold, green) and data viz colors are static hex in Tailwind config — they don't change between themes
- V2's rgba border approach adopted over V3's solid hex borders (more flexible, better glassmorphism)
- Card gradients use CSS variables so they swap between dark/light automatically
- Removed --accent-gold, --accent-gold-muted, --accent-gold-hover CSS variables (now static in Tailwind config). Inline `var(--accent-gold)` references replaced with hex.
- V2 uses #00cc88 (main green) much more than #065f46 (greenDim), so most green references point to main green

### Verification
- `npm run build` — zero errors, all 10 pages compile
- No remaining V3 hex values (#4A9EFF, #00D4AA, etc.) in any source files
- No remaining references to removed tokens (bg-elevated, text-muted, text-mid, data-cyan)
- No remaining `var(--accent-gold)` in inline styles

### Commit
- `bac9d80` — "complete: V2 dark mode color system — replace neutral blacks with navy blues, V2 data viz palette, card gradients, rgba borders"

---

## 2026-02-18 — Architecture Overhaul: Component Extraction

**Branch:** `claude/frontieras-dashboard-mvp-MQ4PI`
**Checkpoint (pre-work):** `bac9d80`

### Objective
Decompose 5 fat page files into focused, reusable components per the new ARCHITECTURE.md standards (page files max 150 lines, no hardcoded hex in components).

### New Files Created

| File | Purpose |
|------|---------|
| `ARCHITECTURE.md` | Development standards doc (page max 150 lines, component organization, color rules) |
| `lib/colors.ts` | Single source of truth for chart hex colors (CHART_COLORS, PRODUCT_COLORS) |
| **Expansion** | |
| `data/expansion.ts` | Constants extracted from expansion page |
| `components/cards/CountryCard.tsx` | Individual country card with flag, stats, progress bar |
| `components/cards/CountryDetailPanel.tsx` | Expanded detail panel with AnimatePresence |
| `components/sections/ExpansionGrid.tsx` | War room grid layout with StatPill sub-components |
| `components/charts/CoalProductionChart.tsx` | Horizontal bar chart with tooltip |
| `components/sections/PenetrationCalculator.tsx` | Slider + derived metrics calculator |
| **Economics** | |
| `components/cards/ProductCard.tsx` | Product card with color-coded left border |
| `components/charts/ProductDonutChart.tsx` | PieChart with custom tooltip and legend |
| `components/charts/WaterfallChart.tsx` | Revenue to EBITDA waterfall |
| `components/sections/PricingSensitivity.tsx` | Self-contained pricing slider tool |
| `components/sections/FacilityEconomics.tsx` | Key metrics cards row |
| `components/sections/ProductGrid.tsx` | Composes donut + product cards |
| **Financials** | |
| `components/sections/ValuationMethodology.tsx` | Scenario cards + custom multiple input |
| `components/charts/ProjectionAreaChart.tsx` | 5-year P&L area chart with CHART_COLORS |
| `components/sections/ShareCalculator.tsx` | Share value calculator with own state |
| **Capital** | |
| `components/sections/CapitalTimeline.tsx` | Roadmap with expandable phase details |
| `components/sections/RegAPerformance.tsx` | Reg A+ metrics + Reg CF comparison |
| `components/sections/UseOfProceeds.tsx` | $25M bridge allocation chart |
| `components/sections/StrategicPartners.tsx` | Key relationships grid |
| **Team** | |
| `components/ui/InitialsAvatar.tsx` | Shared initials avatar component |
| `components/sections/CompanyTimeline.tsx` | Company overview + interactive timeline |
| `components/sections/LeadershipGrid.tsx` | Executive team grid |
| `components/sections/AdvisorGrid.tsx` | Advisory partners grid |

### Page Line Counts (Before → After)

| Page | Before | After |
|------|--------|-------|
| `expansion/page.tsx` | 624 | 42 |
| `economics/page.tsx` | 596 | 24 |
| `financials/page.tsx` | 536 | 77 |
| `capital/page.tsx` | 554 | 24 |
| `team/page.tsx` | 338 | 24 |
| **Total** | **2,648** | **191** |

### Data Files Updated
- `data/capital.ts` — Added `useOfProceeds` and `strategicPartners` arrays (moved from page)

### Hardcoded Colors Fixed
- `components/charts/FacilityScaler.tsx` — 4 hex colors → CHART_COLORS imports
- `components/sections/RegAPerformance.tsx` — 4 hex colors → CHART_COLORS imports
- `components/sections/CapitalTimeline.tsx` — 2 hex colors → CHART_COLORS imports
- `app/dashboard/page.tsx` — 6 hex colors → CHART_COLORS imports
- Zero hardcoded hex remaining in components/ and app/dashboard/

### Verification
- `npm run build` — zero errors after each page extraction (5 builds)
- Final build — zero errors, all 10 pages compile
- `grep` scan confirms zero `#[0-9a-fA-F]{6}` in components/ or app/dashboard/

### Decisions
- PricingSensitivity owns its own state (not lifted to page) since no sibling needs it
- ShareCalculator owns shareCount/shareFacilities state; only selectedMultiple comes from page
- CapitalTimeline owns expandedPhase state locally
- strategicPartners data uses iconKey strings mapped to components via iconMap in StrategicPartners.tsx
- CompanyOverview exported as named export from CompanyTimeline.tsx (co-located)

---

## 2026-02-18 — D3 Interactive Globe

**Branch:** `claude/frontieras-dashboard-mvp-MQ4PI`
**Checkpoint (pre-work):** `85bb561`

### Objective
Port the V2 D3 interactive globe into V3's expansion module. The globe uses V2's exact 9 countries, V2's exact data values, V2's MicroSquare font, and V2's exact rendering pipeline. Globe data is self-contained (does NOT depend on data/countries.ts).

### New Files Created

| File | Purpose |
|------|---------|
| `lib/globe-utils.ts` | Pure geometry helpers: markerRadius, isInBounds, pointInPolygon, pointInFeature, isVisible |
| `data/globe.ts` | V2 verbatim globe data: 9 patent territories, coordinates, country stats, GeoJSON URL |
| `components/charts/InteractiveGlobe.tsx` | Main globe component: D3 orthographic projection, canvas rendering, auto-rotation, drag, hover |
| `components/charts/GlobeTooltip.tsx` | Glassmorphic tooltip with country data grid and context narrative |

### Files Modified

| File | What Changed |
|------|-------------|
| `app/globals.css` | Added MicroSquare @font-face declaration |
| `app/dashboard/expansion/page.tsx` | Added InteractiveGlobe inside a Card above the ExpansionGrid |
| `package.json` | Added d3, @types/d3 dependencies |

### Dependencies Added
- `d3` — D3.js for geographic projections and canvas rendering
- `@types/d3` — TypeScript definitions

### Globe Features
1. Auto-rotates starting with Americas in view (0.08 deg/frame)
2. 9 patent countries: US, China, India, Indonesia, Australia, Russia, South Africa, Germany, Canada
3. Green markers with bloom glow on front-side, dimmed on back-side
4. MicroSquare font on canvas text labels (falls back to sans-serif if font unavailable)
5. Drag to rotate (0.4 deg/px, vertical clamped to ±90°)
6. Pauses rotation on hover/drag, resumes after 1.5s
7. Hit-tests patent country polygons on hover
8. V2's exact glassmorphic tooltip with all data fields and context narrative
9. Dot-matrix land fill with highlighted dots for hovered patent country
10. HiDPI canvas support (devicePixelRatio scaling)

### Build Fixes
- `context` null check: reassigned to `const context = ctx` to satisfy TS closure narrowing
- `Set` iteration: converted `for...of PATENT_ISO_CODES` to `Array.from()` for TS target compat
- Unused import: removed `GLOBE_SIZE` from GlobeTooltip (uses `globeSize` prop instead)

### Verification
- `npm run build` — zero errors, all pages compile
- Expansion page JS: 11.5kB → 32.6kB (D3 bundle included)

---

## 2026-02-18 — Apple-Level Design Elevation

**Branch:** `claude/frontieras-dashboard-mvp-MQ4PI` (later renamed to `main`)
**Checkpoint (pre-work):** `0c2f264` (saved as `backup/pre-apple-elevation`)

### Objective
Elevate the entire dashboard aesthetic to Apple-level design quality: shared animation library, scroll-triggered reveals, page transitions, hover lift effects, increased spacing, spring physics, and refined typography.

### New Files Created

| File | Purpose |
|------|---------|
| `lib/animations.ts` | Shared Framer Motion library: spring presets, stagger containers, item variants, viewport configs |
| `components/layout/PageTransition.tsx` | AnimatePresence page transition wrapper (fade+slide) |
| `components/ui/AnimatedValue.tsx` | Spring-based count-up component using useSpring/useInView |

### Files Modified

| File | What Changed |
|------|-------------|
| `components/ui/SectionHeader.tsx` | `text-4xl font-light tracking-tight`, gold overline `text-[11px]`, `mb-12` |
| `components/ui/MetricCard.tsx` | Added Framer Motion hover lift (`y: -2`) with `spring.hover` |
| `components/ui/Card.tsx` | Removed borders, shadow-only depth, `p-8`, fixed ESLint unused hover prop |
| `components/layout/Topbar.tsx` | `h-20`, `text-xl font-light`, "Confidential" pill badge, shadow bottom edge |
| `components/layout/Sidebar.tsx` | `bg-white/[0.04]` active state, `h-5` gold indicator |
| `app/dashboard/layout.tsx` | Added PageTransition wrapper |
| `app/globals.css` | Inter wght 200, `--shadow-card-hover`, scoped CSS transitions |
| 10 section components | All import from `@/lib/animations`, use `whileInView="show"` with `viewport.section`, increased grid gaps |
| `app/dashboard/page.tsx` | Imports `container, item`, gap-8, mt-12, mt-16 |
| `app/dashboard/financials/page.tsx` | Imports `containerSlow, item`, space-y-10 |
| `app/dashboard/expansion/page.tsx` | Uses shared animation variants |

### Build Fixes
- `PageTransition.tsx`: `ease: [0.25, 0.1, 0.25, 1]` not assignable to `Easing` — fixed with `as const`
- `Card.tsx`: ESLint `'hover' is assigned but never used` — fixed with `// eslint-disable-next-line`

### Commit
- `19eeef7` — "Apple-level design elevation: shared animations, scroll reveals, page transitions, hover lift, spacing refinement"

---

## 2026-02-18 — Remove V2 Globe + Widen NA Map

**Branch:** `claude/frontieras-dashboard-mvp-MQ4PI`

### Objective
Remove the redundant V2 globe from the expansion page (keep V3 cinematic hover/zoom only). Widen the North America commercialization roadmap to match other map elements.

### Changes

| File | What Changed |
|------|-------------|
| `app/dashboard/expansion/page.tsx` | Removed InteractiveGlobeV2 Card + import, removed V3 debug label |
| `data/na-map.ts` | `NA_MAP_SIZE` changed from `800×560` to `960×640` |
| `hooks/useNAMapInteraction.ts` | `baseScale` changed from `680` to `816` (proportional) |

### Commit
- `f5a97bf` — "Remove V2 globe from expansion page, widen NA commercialization map"

---

## 2026-02-18 — Logo Replacement + Branch Rename + Deployment Pipeline

**Branch:** `main` (renamed from `claude/frontieras-dashboard-mvp-MQ4PI`)

### Objective
Replace placeholder logo with actual Frontieras brand image across the app. Rename branch to `main` for production cleanliness. Fix Vercel production branch to auto-deploy from `main`.

### Changes

| File | What Changed |
|------|-------------|
| `public/logo-frontieras.png` | NEW — Official Frontieras NA logo (transparent PNG, white text, red/blue circle mark) |
| `components/layout/Sidebar.tsx` | Replaced gold-gradient square + text with `<img>` logo, `h-10`, centered |
| `components/layout/PasswordGate.tsx` | Replaced gold placeholder with logo image (`h-16`), added "Confidential" / "Enter password to continue" labels, green outline button, updated disclaimer copy |
| `ARCHITECTURE.md` | Added Deployment Pipeline, Animation System, and Static Assets documentation |

### Branch Rename Steps
1. `git branch -m claude/frontieras-dashboard-mvp-MQ4PI main`
2. `git push origin main`
3. `gh api repos/sovereignmedia/fas-dashboard-v3 -X PATCH -f default_branch=main`
4. `git push origin --delete claude/frontieras-dashboard-mvp-MQ4PI`
5. `git branch -u origin/main main`
6. Vercel: disconnected + reconnected GitHub integration with `productionBranch: main`

### Commits
- `b1a733f` — "Replace placeholder sidebar logo with actual Frontieras logo image"
- `62f2ad2` — "Enlarge & center sidebar logo, add logo to login page"
- `c45a086` — "Trigger production deploy on main branch"

---

## 2026-03-15 — Global Coal Production Chart (Market Context)

**Branch:** `main`
**Checkpoint (pre-work):** `abfac11` — "data: update market context articles — weekly curation 2026-03-08"

### Objective
Add a full-width Global Coal Production chart to the Market Context tab, showing 75 years of historical data (1950–2024) with dual-unit display (TWh + metric tons). The chart reinforces the sector thesis by visualizing persistent global coal demand — relevant for institutional investors evaluating the coal-to-products sector.

### New Files Created

| File | Purpose |
|------|---------|
| `data/coal-production.ts` | 75-year global coal production dataset (1950–2024). TWh from Our World in Data / Energy Institute Statistical Review 2025. Mt calibrated against IEA Coal 2025 (ratio: 5.77 TWh/Mt for global). Exports `coalProductionData`, `coalStats`, and `CoalProductionDataPoint` type. |
| `components/charts/CoalProductionChart.tsx` | Recharts AreaChart component — replaces the previous horizontal bar chart at this path. Green (#00cc88) area fill with gradient, custom tooltip showing both TWh and Mt on hover, KPI row (2024 production, % change since 1950, % change since 2000), monospace axis labels, source attribution footer. Uses Card wrapper and CHART_COLORS from `lib/colors.ts`. |

### Files Modified

| File | What Changed |
|------|-------------|
| `app/dashboard/market-context/page.tsx` | Added `CoalProductionChart` import and placed full-width between Generation Mix / Grid Bottleneck row and Peer Comparison table. Wrapped in `motion.div` with `item` variant for scroll animation. |
| `app/dashboard/expansion/page.tsx` | Removed `selectedCountry={null}` prop from `<CoalProductionChart />` — the new component takes no props. |

### Data Details
- **Source:** Our World in Data API (indicator 1077529, entity 355 = World)
- **Range:** 1950–2024, 75 data points
- **TWh values:** Raw from dataset (energy content of coal produced)
- **Mt values:** Derived using IEA-calibrated conversion ratio (5.77 TWh/Mt for global average)
- **Key stats:** 2024 = 50,618 TWh / 8,773 Mt, +347% since 1950, +88.8% since 2000

### Chart Features
1. Green (#00cc88) AreaChart with gradient fill (matching dashboard design system)
2. Custom tooltip showing both TWh and Mt on hover (no unit toggle)
3. KPI row: 2024 Production (TWh + Mt), % change since 1950, % change since 2000
4. Monospace axis labels with gold-dim color, Y-axis formatted as "Xk" for thousands
5. X-axis ticks at decade intervals (1950, 1960, ..., 2020, 2024)
6. Source attribution: "Our World in Data · EI Statistical Review 2025 · IEA"
7. Card wrapper with `hover={false}`, consistent with other Market Context charts

### Build Fixes
- `expansion/page.tsx`: Removed `selectedCountry={null}` prop — new CoalProductionChart replaced the old expansion-page bar chart (which accepted that prop) at the same file path. The new component takes no props.

### Decisions
- Chart placed on Market Context tab (not just Expansion) to support the sector thesis for institutional investors
- Global data only — US tab removed per user preference
- Both units (TWh + Mt) shown on hover instead of a toggle — cleaner UX
- Mt conversion uses IEA-calibrated ratio rather than raw conversion to align with official reports
- Overwrote the previous `CoalProductionChart.tsx` (expansion-page horizontal bar chart) — the new component serves a different purpose

### Verification
- `npm run build` — zero errors, all pages compile
- Standalone preview deployed and iterated 3× before dashboard integration

### Commits
- `19f314f` — "feat: add Global Coal Production chart to Market Context tab"
- `[this commit]` — "fix: remove stale selectedCountry prop from expansion page + update docs"
