# Frontieras Investor Dashboard

## First Priority

Read and follow `ARCHITECTURE.md` before writing any code. It is the single authority on file organization, naming conventions, component patterns, color theming, data layer rules, financial model mapping, animation system, and deployment workflow.

---

## Strategic Context Sources (Frontieras Second Brain)

This dashboard does not exist in isolation. It is one deliverable within a larger IPO marketing engagement managed by Chase Paisley. Meeting intelligence, stakeholder context, strategic decisions, and a change backlog all live in the **Frontieras Second Brain** — a separate repo on Chase's machine.

**Before starting work, check the dashboard backlog for pending items that should inform your session.**

### How to Access

The Second Brain lives at a sibling path in iCloud:

```
~/Library/Mobile Documents/com~apple~CloudDocs/[3.5] Frontieras Second Brain/
```

### Key Files to Consult

| Second Brain File | What It Contains | When to Read |
|---|---|---|
| `01-projects/ipo-marketing-prep/dashboard-backlog.md` | **Change backlog** — prioritized list of dashboard modifications requested across meetings. Check status field: `pending` items are your work queue. | **Every session.** This is your primary intake for new work. |
| `00-company/overview.md` | Company knowledge base — history, technology, products, strategy, key facts | When adding or updating any content about Frontieras (product descriptions, market claims, partner names, financial figures) |
| `00-company/people.md` | People & relationship intelligence — team bios, stakeholder dynamics, who advocated for what | When adding team bios, updating leadership content, or understanding who requested a change and why |
| `03-meetings/` | Meeting summaries with decisions and action items | When you need strategic reasoning behind a backlog item — the meeting summary explains the "why" |
| `decisions.jsonl` | Append-only decision log with reasoning and alternatives | When a change touches something that was previously decided — check here before contradicting a prior decision |
| `00-company/glossary.md` | Acronyms, nicknames, internal shorthand | When you encounter unfamiliar terms in backlog items or meeting references |
| `06-research/institutional-pitch-deck-extraction.md` | Comprehensive extraction of the 61-page institutional pitch deck — financials, projections, competitive positioning, executive bios, market sizing | **Primary data source** for dashboard content. But read the MNPI rules below before using any of it. |

### MNPI Compliance Rules (NON-NEGOTIABLE)

This dashboard is **pre-NDA and public-facing**. It is shown to prospective investors BEFORE they sign a non-disclosure agreement. This means it CANNOT contain Material Non-Public Information (MNPI).

**NEVER include on this dashboard:**
- Specific valuation figures or enterprise value estimates
- Cap table data, ownership percentages, or share counts
- Detailed financial projections beyond what's in public filings or press releases
- Internal strategic plans not yet announced
- Specific terms of pending deals, LOIs, or negotiations
- Any data marked "confidential" in the pitch deck extraction

**Safe to include:**
- General market sizing and industry data (publicly available)
- Published engineering partnerships and named partners
- Product descriptions and technology overview (patent is public)
- Team bios and credentials
- General project timeline and milestones (publicly announced)
- Aggregated financial metrics that don't reveal specific valuation

**When in doubt:** Check with Chase before adding sensitive data. It's better to leave a gap than to put MNPI on a public-facing dashboard.

### Backlog Workflow

When you complete a backlog item:
1. Do the work in this project
2. Update `DASHBOARD-STATE.md` per the rules above
3. Update `[Second Brain]/01-projects/ipo-marketing-prep/dashboard-backlog.md` — change the item's status from `pending` to `implemented` and add a note about what was done
4. Log the change in this project's work log as usual

This keeps both projects in sync without duplicating intelligence.

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
