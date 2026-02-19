# Frontieras Investor Dashboard

## First Priority

Read and follow `ARCHITECTURE.md` before writing any code. It is the single authority on file organization, naming conventions, component patterns, color theming, data layer rules, financial model mapping, animation system, and deployment workflow.

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion
- Deployed via Vercel (auto-deploys on push to `main`)

## Commands

- `npm run build` — full production build (includes type check + lint)
- `npx tsc --noEmit` — type check only
- ESLint "next/core-web-vitals" config warning is expected and non-blocking

## Deploy

`git push origin main` → GitHub → Vercel webhook → production

---

## Dashboard State Manifest (`DASHBOARD-STATE.md`)

A plain-English content audit of every piece of text, metric, financial figure, and strategic claim displayed on the dashboard. This is a strategic investor-relations document — treat it like a live data room index.

### When to update it

Update `DASHBOARD-STATE.md` whenever you:
- Change any financial figure, metric, or displayed number
- Add, remove, or modify a section header, subtitle, or disclaimer
- Add or remove a product, partner, risk category, team member, or competitor
- Change interactive elements (add/remove filters, toggles, calculators)
- Modify SWOT items, diligence Q&A, or milestone content

Do NOT update it for:
- Pure styling/CSS changes
- Animation tweaks
- Refactoring that doesn't change displayed content
- Build/config changes

### How to update it

- Update only the sections affected by your changes
- Keep the same structure and table format
- Update the `Last updated` date and version at the top
- If adding a new page, add a complete section following the existing format
- If removing content, also check Section 13 (Known Gaps) to see if it should be noted

### Full generation instructions

If `DASHBOARD-STATE.md` needs to be regenerated from scratch, scan in this order:

1. **Page-by-page content inventory** — Every page header, subtitle, section component, metric card, and summary stat
2. **Financial model mapping** — Every constant from `data/model.ts` and where it appears
3. **Product economics summary** — All 5 revenue products with volumes, prices, revenues
4. **Partnership & agreement status** — All partners with roles, categories, status
5. **Risk & compliance inventory** — All 14 risk categories, severity, mitigation counts, disclaimers
6. **Interactive elements** — Every slider, toggle, filter, calculator, accordion
7. **SWOT analysis detail** — All items verbatim
8. **CapEx breakdown** — Categories, totals, largest line items
9. **Competitive landscape** — All 8 market segments with competitors
10. **Market opportunity data** — TAM figures, projections, sources
11. **Team bios** — Credentials, career highlights, education
12. **Disclaimers & legal text** — Every disclaimer type and where it appears
13. **Known gaps & pending items** — Missing data, inconsistencies, TBD items

### Content rules for the manifest

- Quote exact text from headers and subtitles
- Include exact financial figures (not rounded) with their source constant
- Flag any inconsistencies between pages (e.g., "six products" vs. "eight product streams")
- Note regulatory-sensitive language (disclaimers, forward-looking statements)
- Track interactive element state (what toggles exist, what they control)
