# TAM Section Build Spec — Institutional Dashboard

## Overview

Build a new "Total Addressable Market" page at `/dashboard/tam` with the data already wired in at `data/tam.ts`. This is the most important section for institutional investors — it answers "how big is the opportunity?" which is currently the #1 blocker to institutional capital (per Hybrid Financial debrief, March 2026).

All data is imported from `data/tam.ts`. Do NOT hardcode any numbers in components or page files. Follow ARCHITECTURE.md rules strictly — page file max 150 lines, components max 250 lines.

## Sidebar

Add a new sidebar entry between "Expansion Optionality" and "Risk Analysis":
- Label: "Total Addressable Market"
- Route: `/dashboard/tam`

## Page Structure (`app/dashboard/tam/page.tsx`)

```
SectionHeader (overline: "Market Opportunity", title: "Total Addressable Market")
Section 1: Headline Metrics (4 stat cards)
Section 2: Four-Tier TAM (visual breakdown with price scenario toggle)
Section 3: Value Uplift (coal value vs FASForm value)
Section 4: Country Economics Table (CollapsibleSection)
Section 5: Valuation Bridge (penetration → EV) (CollapsibleSection)
Section 6: Facility Context (progress bar: 16 of 3,107)
Disclaimer
```

## Section 1: Headline Metrics

4 MetricCards: $2.1T (Annual Addressable Value), 3.5x (Average Value Uplift), 3,107 (Facilities Supportable), 0.5% (10-Year Plan Coverage). Source: `HEADLINES`, `VALUE_UPLIFT`, `FACILITY_CONTEXT`.

## Section 2: Four-Tier TAM

Component: `components/sections/TamTiers.tsx`. Show 4 tiers stepping up in scope. Toggle between Base ($90/bbl diesel), Elevated ($100 Brent), High ($150 Brent). Show ±15% sensitivity band. Tiers 2 & 4 need disclaimer: "Theoretical maximum. Not a revenue forecast." Source: `TAM_TIERS`, `TAM_SENSITIVITY`.

## Section 3: Value Uplift

Component: `components/sections/ValueUplift.tsx`. Show $603B (coal value) → $2.1T (FASForm value) = $1.5T found value. Below: country bars showing coalPrice vs adjRevenuePerTon, sorted by valueUplift descending. Germany shows EBITDA-negative honestly. Source: `COUNTRY_YIELD_PROFILES`, `VALUE_UPLIFT`.

## Section 4: Country Economics Table

Component: `components/sections/CountryEconomicsTable.tsx`. CollapsibleSection "Deep Dive". Columns: Country, Coal Type, Yield Factor (%), Rev/Ton ($), EBITDA/Ton ($), Margin (%), Value Uplift (Xx), Annual Revenue ($B), Facilities. Sorted by annual revenue desc. Color code yield: green >90%, yellow 50-90%, red <50%. Source: `COUNTRY_YIELD_PROFILES`.

## Section 5: Valuation Bridge

Component: `components/sections/ValuationBridge.tsx`. CollapsibleSection "Deep Dive". Table: Penetration → Facilities → Revenue → EBITDA → EV at 12x/18x/25x. Callout: "A $5B IPO requires ~7.2x steady-state EBITDA — conservative vs comparable energy infrastructure." Source: `VALUATION_BRIDGE`.

## Section 6: Facility Context

Component: `components/sections/FacilityContext.tsx`. Progress bar or donut: 16 planned / 3,107 supportable = 0.51%. Stat cards: 194:1 ratio, $14.6B revenue at 16 facilities, 99.5% unaddressed. Source: `FACILITY_CONTEXT`.

## Design Notes

- Follow DESIGN-SYSTEM.md and ARCHITECTURE.md
- Use existing color tokens, Card, MetricCard, CollapsibleSection, SectionHeader, Disclaimer
- Charts: Recharts. Animations: Framer Motion
- Disclaimer at bottom: `type="projectionDisclaimer"`
- Base case = $90/barrel diesel (never "$65 oil")
- Reserves data = end-2020 (note visibly)
- Germany EBITDA-negative — show honestly
