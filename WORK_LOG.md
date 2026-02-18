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
- [x] Complete — see commit hash below
