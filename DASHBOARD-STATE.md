# Dashboard State Manifest

> Plain-English content audit of every piece of text, metric, financial figure, and strategic claim displayed on the Frontieras Investor Dashboard. This is a strategic investor-relations document — treat it like a live data room index.

**Last updated:** 2026-02-19
**Model version:** Financial Model 4.1.25.xlsx (April 2025)
**Dashboard version:** v1.0

---

## 1. Page-by-Page Content Inventory

### Overview (`/dashboard`)

**Header:** "Executive Summary" / "Frontieras North America"
**Subtitle:** "Patented clean energy technology converting coal into six high-value products. First commercial facility: Mason County, West Virginia."

**Company Description:** Two-paragraph narrative covering FASForm™ technology overview with explicit CTL differentiation ("fundamentally distinct from coal-to-liquids gasification"), "without catalysts or combustion" framing, first facility location (Mason County, WV), all major partners under executed MSAs, pre-revenue status, IPO preparation, and $20M+ Reg A+ validation from 3,700+ shareholders.

**Metric Cards (3):**
| Label | Value | Subtitle | Source |
|-------|-------|----------|--------|
| Patent-Protected Countries | 9 | Global IP Portfolio | `EXPANSION.patentCountries` → 9 |
| Reg A+ Raised | $20.0M+ | 3,700+ Shareholders | `CAPITAL.totalRaised` → $20,000,000 |
| Shareholders | 3,700+ | Proven Public Demand | `CAPITAL.shareholders` → 3,700 |

**Commercialization Roadmap:** North America Facility Pipeline chart (NACommercialization component)

**Quick Stats (2):**
| Label | Value | Source |
|-------|-------|--------|
| Total CapEx | $745.5M | `CAPEX.total` → $745,541,205 |
| Coal Throughput | 7,500 t/day | `OPERATIONS.coalThroughputTonsPerDay` → 7,500 |

**MacroTailwinds** — "Market & Macro Environment" section. 6 cards in responsive grid (1/2/3 col). Each card has category label, headline, body, and sourced data anchor. Data from `data/macro.ts`. Scroll-triggered stagger animation.

| Card | Category | Data Anchor Source |
|------|----------|--------------------|
| 1 | Energy Demand | EIA — 8.77B tons global coal consumption 2024 |
| 2 | Technology Demand | IEA — 2.7% annual electricity demand growth |
| 3 | Regulatory Climate | AP News — 31 EPA regulations rolled back |
| 4 | Industry Repositioning | IEA — 1 trillion+ tons proven reserves |
| 5 | Domestic Manufacturing | Industry research — $1.53T total addressable market |
| 6 | Competitive Dynamics | EPA — 1.2M metric tons CO₂-eq per refinery |

**Relocated to other pages (not deleted):**
- Single Facility Revenue ($1.1B), EBITDA ($837.5M), Gross Margin (87.5%) → already on Economics page (FacilityEconomics section)
- Net Margin (67.0%) → already on Financials page
- Max Facilities (143) → already on Expansion page

---

### FASForm™ (`/dashboard/process`)

**Header:** "FASForm™ Process" / "Input → Process → Output"
**Subtitle:** "Single-feedstock thermal cracking process converting Pittsburgh #8 coal into six high-value product streams — plus two internal-use gas streams enabling zero-waste closed-loop operation."

**Sections rendered:**
1. **ProcessFlow** — Visual process flow (input → outputs)
2. **MarginExplainer** — Interactive 5-step margin walkthrough: Input Cost → Product Revenue → Gross Profit (87.5%) → EBITDA (77.6%) → Why This Works. All data imported from model.ts and products.ts. Step navigation with animated transitions. Includes feedstock math, product revenue bars with running total, gross profit visual bar, EBITDA waterfall, and 5 structural defensibility reasons.
3. **CTLComparison** — FASForm™ vs. Fischer-Tropsch table
4. **MarketOpportunity** — TAM across 6 markets

**Process Input:**
- Pittsburgh #8 Coal — 2.7 million tons/yr — ~$50/ton — $135M/yr
- 10-year collared price contract for 27M tons total
- Barge-delivered via Ohio River

**Process Outputs (8 products):**
| Product | Category | Annual Production | Revenue | Status |
|---------|----------|-------------------|---------|--------|
| FASCarbon™ | Solid | 1.6M tons | $360M | 10-yr LOI — 100% |
| Diesel (ULSD) | Liquid | 4.8M barrels | $432M | 10-yr LOI — 100% |
| Naphtha | Liquid | 500K barrels | $83M | 10-yr LOI — 100% |
| Sulfuric Acid | Chemical | 225K tons | $45M | 10-yr LOI — 100% |
| Ammonium Sulfate | Chemical | 135K tons | $40M | 10-yr LOI — 100% |
| Jet Fuel / Kerosene | Liquid | TBD | $0 | Under evaluation |
| Hydrogen (FASGas™) | Gas | 8.0B scf | Internal | Internal consumption |
| Methane (FASGas™) | Gas | 4.4B scf | Internal | Internal consumption |

**FASForm™ vs. CTL Comparison (8 aspects):**
| Aspect | FASForm™ | CTL (Fischer-Tropsch) |
|--------|----------|----------------------|
| Process | Thermal cracking, no combustion | Gasification → synthesis gas |
| Products | 6 revenue streams + 2 internal-use gas streams | Primarily synthetic crude |
| Catalysts | None required | Expensive: cobalt, iron |
| Byproducts | Zero waste | Toxic byproducts |
| Emissions | No direct CO₂, 25-35% net reduction | Significant CO₂ |
| Feedstock | Any grade coal, plastics | Specific coal grades |
| Patents | Global patents (9 countries) | Public domain (1920s) |
| Economics | 87% gross margin, ~$1B revenue | High CapEx, low margins |

**Market Opportunity (6 markets):**
| Market | Current TAM | Projected TAM | CAGR | Frontieras Product |
|--------|-------------|---------------|------|-------------------|
| Hydrogen Generation | $170.1B | $317.4B | 9.3% | FASGas™ |
| Diesel (ULSD) | $935.2B | $1,269.9B | 4.4% | Ultra-Low Sulfur Diesel |
| Naphtha | $189.5B | $254.3B | 4.3% | Chemical-Grade Naphtha |
| Metallurgical Coal | $14.7B | $18.4B | 2.6% | FASCarbon™ |
| Jet Fuel | $204.3B | $214.6B | 5.0% | Jet Fuel / Kerosene |
| Sulfuric Acid | $15.0B | $20.0B | 4.2% | Sulfuric Acid |

Total Current TAM: ~$1,528.8B → Projected: ~$2,094.5B

---

### Economics (`/dashboard/economics`)

**Header:** "Facility Economics" / "Product Economics & Revenue"
**Subtitle:** "Single-facility steady-state economics across six product streams. All figures represent Year 4+ annual projections at modeled pricing."

**Sections rendered:**
1. **FacilityEconomicsSection** — Key facility-level metrics
2. **ProductGrid** — 5 revenue-generating products with pricing, volumes, margins
3. **PricingSensitivity** — Spot vs. modeled pricing comparison
4. **WaterfallChart** — Revenue waterfall visualization
5. **OpExBreakdown** — Operating expense structure

**OpEx Breakdown figures:**
| Item | % of Revenue | Annual Est. |
|------|-------------|-------------|
| CAMS Operations Management | 5% | $54M |
| Broker & Distribution Fees | 3.5% | $38M |
| Natural Gas (Supplemental) | ~1% | $11M |
| Professional Services | Fixed | $8M |
| G&A / Corporate | Fixed | $12M |

**OpEx Summary cards:** Total ~$123M, OpEx as % of Revenue ~11.4%, EBITDA Margin 77.6%

---

### Risk Mitigation (`/dashboard/risk-analysis`)

**Header:** "Risk Analysis" / "Risk Mitigation Framework"
**Subtitle:** "Institutional-grade risk assessment across 14 categories — covering technology, capital, construction, environmental, cybersecurity, and more."

**Sections rendered:**
1. **RiskAnalysis** — 14 risk categories in 3-column grid with mitigation tracker
2. **SWOTAnalysis** — 2×2 SWOT grid
3. **DiligenceQA** — 30 institutional FAQs
4. **MilestoneTracker** — 16 milestones

**Risk Categories (14):**
| Category | Severity | Mitigations |
|----------|----------|-------------|
| Real Estate & Site Readiness | Low | 3 |
| Capital & Debt Financing | **High** | 4 |
| Licensing Agreement | Medium | 3 |
| Technology Scale-Up | **High** | 3 |
| Construction & Execution | Medium | 4 |
| Environmental & Regulatory | Medium | 3 |
| Revenue & Commercialization | Medium | 3 |
| Delays & Material Shortages | Medium | 3 |
| IP Commercialization | Low | 3 |
| Key Personnel | Medium | 3 |
| Supplier & Raw Material | Low | 3 |
| Cybersecurity & IP Protection | Low | 3 |
| Commodity Price Volatility | Medium | 3 |
| Global Market Expansion | Low | 3 |

**Mitigation Tracker:** X/Y mitigations executed (computed at render time)

**SWOT Analysis:**
- **Strengths (6):** Proprietary FASForm™ process, diverse product portfolio, strategic $850M facility, 10-year feedstock contract, CAMS partnership, geographic advantage
- **Weaknesses (3):** Coal industry perception, new technology adoption resistance, capital intensity
- **Opportunities (6):** Asia-Pacific expansion, steel/met market growth, waste plastic co-feeding, favorable regulatory environment, AI/data center energy demand, coal industry resurgence
- **Threats (4):** Future environmental regulation, energy price fluctuations, renewable energy competition, negative fossil fuel perception

**Diligence FAQs:** 30 questions across 10 categories: Capitalization & Funding, Technology Validation, Commercial Contracts, Supply Chain & Construction, Operational Execution, Regulatory & Environmental, Financial Modeling, Governance & Control, Project Execution & Timeline, Capital Structure & Financing

---

### Due Diligence (`/dashboard/due-diligence`)

**Header:** "Due Diligence" / "Strategic Partners & Agreements"
**Subtitle:** "15 institutional-grade partners across operations, engineering, insurance, procurement, infrastructure, and capital markets. All MSAs executed."

**Sections rendered:**
1. **PartnerGrid** — 15 partners with category filter tabs
2. **CompetitorTable** — 8 market segments with competitors

**Partners (15):**
| Partner | Role | Category | Status |
|---------|------|----------|--------|
| CAMS | Operations & Maintenance | Operations | Executed |
| JOB EPC Co. | EPC Contractor | Engineering | Executed |
| KBC | Process Design | Engineering | Executed |
| Yokogawa | Controls & Automation | Engineering | Executed |
| Performance Contractors | Procurement & Contracting | Procurement | Executed |
| Lockton | Insurance | Insurance | Executed |
| Ariel Green | Performance Bond | Insurance | Executed |
| Market Street IR | Retail IR | Capital Markets | Executed |
| Hybrid Financial | Institutional IR | Capital Markets | Executed |
| InServ | Asset Services | Operations | Executed |
| TOPSOE | Catalyst & Licensing | Licensing | Executed |
| AEP | Power Supply | Infrastructure | Executed |
| TransCanada (TC Energy) | Natural Gas Supply | Infrastructure | Executed |
| Greylock Energy | Feedstock Supply | Procurement | Executed |
| CSX Transportation | Rail Logistics | Infrastructure | Executed |

**CAMS Featured Card:** $20B+ AUM, 82 Industry Best Practice Awards, 15+ years energy infrastructure, 11.3M tons CO₂ reduced, Bluewire cybersecurity subsidiary

**Competitor Landscape (8 segments):**
| Market | Direct Competitors | Indirect |
|--------|-------------------|----------|
| Hydrogen | Air Products ($67B), Linde ($173B), Sinopec ($82B) | Green Hydrogen (Plug Power, Bloom Energy) |
| Diesel | ExxonMobil ($455B), Chevron ($290B), BP ($115B) | Renewable Diesel (Neste, Valero) |
| Naphtha | Reliance ($210B), Shell ($220B), ExxonMobil ($455B) | BASF, Dow |
| Jet Fuel | ExxonMobil ($455B), Shell ($220B), TotalEnergies ($160B) | SAF (Neste, Gevo) |
| Met Coal | Anglo American ($48B), BHP ($130B), Teck ($18B) | Steel Recycling (Nucor, SDI) |
| Thermal Coke | Peabody ($4.5B), Arch ($2.8B), Glencore ($90B) | Renewables (NextEra, Orsted) |
| Sulfuric Acid | Amal Ltd ($7.48B) | Hydrochloric Acid (Detrex, Hawkins) |
| Fertilizer | Wesfarmers ($42.49B), Nutrien ($24.22B) | Organic (Haifa Group, IFFCO) |

---

### Team (`/dashboard/team`)

**Header:** "Team & Genesis" / "The People Behind Frontieras"
**Subtitle:** "From a 30-year industrial engineering career to a world-class advisory network — the team assembling to deliver the reindustrialization thesis."

**Sections rendered:**
1. **CompanyOverview** — Company origin narrative
2. **CompanyTimeline** — 8 milestones (2010–2026)
3. **LeadershipGrid** — 5 executives with expandable bios
4. **AdvisorGrid** — 8 advisors

**Executive Team:**
| Name | Title |
|------|-------|
| Matt McKean | Co-Founder & CEO |
| Joe Witherspoon, P.E. | Co-Founder & CTO |
| Jose Lopez | CFO |
| Andrea Moran | CCO |
| Doug Remy | VP Corporate Affairs |

**Advisors:** Market Street Capital, RF Lafferty, Texas Capital, Hybrid Financial, GEM, Baker Botts LLP, CAMS, Performance Contractors

**Timeline Milestones:**
1. 2010 — Company Founded & Patents Filed
2. 2013 — International Patent Expansion
3. 2021 — 12-Month Pilot Completed
4. 2023 — Regulation CF Campaign ($4.49M raised)
5. 2024 — CAMS Partnership ($20B+ operator)
6. 2025 — Regulation A+ Launch ($15M+ raised)
7. 2025 — Insurance Validation (Lloyd's syndicate)
8. 2026 — IPO Preparation

---

### Financials (`/dashboard/financials`)

**Header:** "Financial Model" / "Financials & Valuation"
**Subtitle:** "Interactive financial projections, valuation scenarios, and enterprise valuation modeling across multi-facility scale."

**Sections rendered:**
1. **ValuationMethodology** — 3 valuation scenarios (interactive toggle)
2. **FacilityScaler** — Multi-facility economics slider (1–5 facilities, capped for institutional credibility). Facility count state shared with ShareCalculator.
3. **ProjectionAreaChart** — 5-year revenue/EBITDA/net income projection
4. **ShareCalculator** — Enterprise valuation model showing implied price per share (EV ÷ total shares outstanding). Reframed from personal investment return calculator to institutional valuation tool. No personal share count input — shows enterprise-level metrics only. Includes forward-looking disclaimer.
5. **FinancialStatements** (CollapsibleSection, collapsed by default) — Toggle between Projected Balance Sheet and Projected Cash Flow. 5-year pro forma statements sourced from business plan pp.71-72.

**Valuation Scenarios:**
| Scenario | Multiple | Description |
|----------|----------|-------------|
| Traditional Energy | 6x | ConocoPhillips, Marathon, Valero comps |
| Clean Energy Tech | 12x | ESG positioning + carbon-negative outputs |
| Paradigm Shift | 18x | Novel tech disrupting multiple commodity markets |

**5-Year Projections (from `financials.ts`):**
| Year | Label | Revenue | EBITDA | Net Income |
|------|-------|---------|--------|------------|
| Year 1 | Construction | $0 | -$1.4M | -$65.2M |
| Year 2 | Construction / Commissioning | $0 | -$3.1M | -$118.1M |
| Year 3 | Ramp-Up (75%→100%) | $1,043.7M | $808.8M | $688.8M |
| Year 4 | Steady State | $1,079.1M | $837.5M | $722.9M |
| Year 5 | Steady State + Escalation | $1,092.6M | $849.1M | $740.4M |

**Pro Forma Balance Sheet (from `financials.ts`):**
| Year | Total Assets | Total Liabilities | Total Equity |
|------|-------------|-------------------|-------------|
| Year 1 | $756.0M | $508.3M | $247.8M |
| Year 2 | $711.0M | $581.3M | $129.7M |
| Year 3 | $1,355.2M | $536.7M | $818.5M |
| Year 4 | $2,040.8M | $499.4M | $1,541.4M |
| Year 5 | $2,743.9M | $458.6M | $2,285.2M |

**Pro Forma Cash Flow (from `financials.ts`):**
| Year | Operating CF | CapEx | Net Cash Flow | Ending Cash |
|------|-------------|-------|--------------|-------------|
| Year 1 | -$1.4M | -$745.5M | $28.1M | $23.5M |
| Year 2 | -$3.1M | -$4.7M | -$7.8M | $15.8M |
| Year 3 | $726.5M | $0 | $681.9M | $697.7M |
| Year 4 | $767.4M | $0 | $722.9M | $1,420.6M |
| Year 5 | $785.2M | $0 | $740.7M | $2,161.2M |

**Disclaimer:** "These projections are forward-looking estimates based on internal financial models. Actual results may vary. This is not investment advice."

---

### Capital (`/dashboard/capital`)

**Header:** "Capital Structure" / "Capital Roadmap & Fundraising"
**Subtitle:** "Five-phase capital strategy from bridge financing through post-IPO execution. $1.275B total capital deployment across the full lifecycle."

**Sections rendered:**
1. **CapitalTimeline** — 5-phase capital strategy
2. **RegAPerformanceSection** — Reg A+ campaign metrics
3. **UseOfProceedsSection** — Use of proceeds breakdown
4. **StrategicPartnersSection** — Strategic partners overview
5. **CapExWaterfall** — Detailed CapEx breakdown (dual-view: chart + table)

**CapEx Summary:**
- Total: $745,541,205 (computed from 46 line items in `capex.ts`)
- Categories: Engineering ($37.5M), Long-Lead Procurement ($97.5M), Construction ($295.3M), Other/Reserves ($399.2M)
- 15% line-item contingency on most items + $150M contingency reserve

**Capital Constants:**
- Bridge Round: $25,000,000
- Total Shares Outstanding: 100,000,000
- Share Price: $7.77
- Total Raised: $20,000,000
- Shareholders: 3,700

---

### Expansion (`/dashboard/expansion`)

**Header:** "Global IP Portfolio" / "Expansion Optionality"
**Subtitle:** "Patent-protected market access across 9 countries. The company's global IP portfolio secures the right to deploy FASForm™ technology as the first facility proves the commercial model."

**Strategic framing text:** Two paragraphs emphasizing optionality (not near-term plan), focus on Facility 1 execution, land-and-expand thesis.

**Sections rendered:**
1. **Strategic framing Card** — "prove the model domestically, then exercise global optionality"
2. **InteractiveGlobeV3** — 3D rotating globe with patent countries
3. **ExpansionGrid** — 4 stat pills: Patent Markets (9), Patents Granted, Addressable Sites, Global Coal (Mt). Reframed from "Total Facilities" to "Addressable Sites".
4. **CoalProductionChart** — Coal production by country
5. **PenetrationCalculator** — Moved inside CollapsibleSection (collapsed by default), labeled "Deep Dive / Market Penetration Modeling"

---

### Execution Roadmap (`/dashboard/roadmap`)

**Header:** "Project Roadmap" / "Capital Roadmap & Fundraising"
**Subtitle:** "Five-phase capital strategy from bridge financing through post-IPO execution. $1.275B total capital deployment across the full lifecycle."

**Sections rendered:**
1. **CapitalTimeline** — 5-phase capital strategy (shared with Capital page)
2. **MilestoneTracker** — 16 milestones tracked against guidance

**Milestone Tracker claim:** "100% accuracy rate on completed items — no delays, no missed targets."

---

## 2. Financial Model Mapping

**Source:** Financial Model 4.1.25.xlsx (April 2025)
**Dashboard file:** `data/model.ts`

| Model Constant | Dashboard Value | Excel Tab |
|----------------|----------------|-----------|
| Total Revenue | $1,079,142,402 | IS — Year 4 |
| Total Direct Cost | $135,000,000 | IS — Year 4 |
| Gross Profit | $944,142,402 | IS — Year 4 |
| Gross Margin | 87.5% | IS — Year 4 |
| EBITDA | $837,513,709 | IS — Year 4 |
| EBITDA Margin | 77.6% | IS — Year 4 |
| Net Income | $722,884,351 | IS — Year 4 |
| Net Margin | 67.0% | IS — Year 4 |
| Total CapEx | $745,541,205 | CapEx sheet |
| EPC Costs | $595,541,205 | CapEx sheet |
| Contingency | $150,000,000 | CapEx sheet |
| Coal Throughput | 7,500 t/day | Rev&COGs |
| Coal Cost/Ton | $50 | Rev&COGs |
| Annual Coal Cost | $135,000,000 | Rev&COGs |

---

## 3. Product Economics Summary

**5 Revenue Products (from `products.ts`, derives from `model.ts`):**

| Product | Monthly Vol | Annual Vol | Modeled Price | Spot Price | Annual Revenue |
|---------|------------|------------|---------------|------------|----------------|
| FASCarbon™ | 135,445 tons | 1,625,340 tons | $250/ton | $310/ton | ~$406M |
| Diesel (ULSD) | 398,458 bbl | 4,781,496 bbl | $91.80/bbl | $112/bbl | ~$439M |
| Naphtha | 15,930 tons | 191,160 tons | $695.64/ton | $850/ton | ~$133M |
| Sulfuric Acid | 18,644 tons | 223,728 tons | $231.54/ton | $280/ton | ~$52M |
| Ammonium Sulfate | 3,580 tons | 42,960 tons | $527.34/ton | $640/ton | ~$23M |

**Note:** All modeled prices are ~17-18% below spot. Revenue figures are computed from `monthlyVolume × modeledPrice × 12`.

---

## 4. Partnership & Agreement Status

All 15 partners have `agreementStatus: 'executed'`.

**Key partnership details:**
- CAMS: $20B+ AUM, full-scope O&M from construction through steady-state
- Greylock Energy: 10-year contract for 27M tons Pittsburgh #8 coal, collared pricing
- Ariel Green: WRAP Output Guarantee ($3.9M) — technology performance bond
- AEP: 5.6M customer utility providing power supply
- TransCanada: 93,300 km pipeline providing natural gas
- CSX: Class I railroad, 19,500 miles, 23 eastern US states
- TOPSOE: Global leader in catalysis for hydrotreating
- Baker Botts LLP: IP & patent counsel across 9 international jurisdictions

---

## 5. Risk & Compliance Inventory

**14 risk categories** with 44 total mitigations tracked.

**Severity distribution:** 4 Low, 7 Medium, 2 High, 0 Critical
- **High:** Technology Scale-Up Risk, Capital & Debt Financing Risk

**Regulatory & compliance text displayed:**
1. **Compliance Disclaimer** (from `lib/constants.ts`): "This dashboard is provided for informational purposes only and does not constitute an offer to sell or a solicitation of an offer to buy any securities..."
2. **Forward-Looking Disclaimer** (Disclaimer component, type="forwardLooking"): Displayed on Overview (sm, collapsed), Risk Mitigation (md, collapsed), Capital (md, collapsed), Roadmap (md, collapsed)
3. **Projection Disclaimer** (Disclaimer component, type="projectionDisclaimer"): Displayed on FASForm™ (md, collapsed), Economics (md, collapsed), Expansion (md, collapsed)
4. **Confidentiality Disclaimer** (Disclaimer component, type="confidentiality"): Displayed on Due Diligence (md, collapsed)
5. **Financials page inline disclaimer:** "These projections are forward-looking estimates..."
6. **ShareCalculator inline disclaimer:** "Implied share price is a theoretical valuation metric..."

**Disclaimer coverage audit:**
| Page | Has Disclaimer | Type |
|------|---------------|------|
| Overview | ✅ | forwardLooking (sm, collapsed) |
| FASForm™ | ✅ | projectionDisclaimer (md, collapsed) |
| Economics | ✅ | projectionDisclaimer (md, collapsed) |
| Risk Mitigation | ✅ | forwardLooking (md, collapsed) |
| Due Diligence | ✅ | confidentiality (md, collapsed) |
| Team | — | No projections shown |
| Financials | ✅ | Inline text disclaimer |
| Capital | ✅ | forwardLooking (md, collapsed) |
| Expansion | ✅ | projectionDisclaimer (md, collapsed) |
| Roadmap | ✅ | forwardLooking (md, collapsed) |

---

## 6. Interactive Elements

| Page | Component | Interaction |
|------|-----------|-------------|
| Overview | MetricCards | Click → navigates to relevant page |
| Economics | ProductGrid | Product detail cards |
| Economics | PricingSensitivity | Spot vs. modeled comparison |
| Economics | OpExBreakdown | Static display |
| Financials | ValuationMethodology | Click scenario cards (6x/12x/18x) or enter custom multiple |
| Financials | FacilityScaler | Slider: 1–5 facilities × selected EBITDA multiple (state shared with ShareCalculator) |
| Financials | ShareCalculator | Implied price per share — enterprise valuation ÷ total shares outstanding (no personal share count input) |
| Expansion | InteractiveGlobeV3 | 3D rotating globe, hover/click countries |
| Expansion | PenetrationCalculator | Slider: market penetration % (collapsed by default inside CollapsibleSection) |
| Capital | CapExWaterfall | Toggle: Category View ↔ Line Items table |
| Risk | RiskCard | Expand/collapse mitigation details |
| Risk | DiligenceQA | Accordion FAQs, category filter tabs |
| Team | LeadershipGrid | Click "Read Full Bio" to expand/collapse |
| Due Diligence | PartnerGrid | Category filter tabs (All, Operations, Engineering, etc.) |
| FASForm™ | MarginExplainer | 5-step interactive walkthrough: step tabs, prev/next nav, animated bars/charts per step |
| FASForm™ | CTLComparison | Side-by-side comparison table |

---

## 7. SWOT Analysis Detail

**Strengths (6):**
1. Proprietary FASForm™ — validated by 3rd-party engineering
2. Diverse product portfolio — multiple revenue streams
3. Strategic $850M Mason County facility — employment + economic impact
4. 10-year feedstock contract — 27M tons, collared pricing
5. CAMS partnership — institutional-grade O&M
6. Geographic advantage — coal reserves, Ohio River, CSX rail

**Weaknesses (3):**
1. Coal industry ESG perception risk
2. New technology market adoption resistance
3. Capital-intensive — high initial investment

**Opportunities (6):**
1. Asia-Pacific coal-dependent market expansion
2. Steel/met market growth from global infrastructure
3. Waste plastic co-feeding capability
4. Favorable regulatory environment (EPA deregulation)
5. AI/data center energy demand
6. Coal industry political/public opinion shift

**Threats (4):**
1. Future environmental regulation reimposition
2. Global energy price/demand fluctuations
3. Renewable energy technology advancement
4. Negative fossil fuel public perception

---

## 8. CapEx Breakdown

**Total: $745,541,205** (46 line items across 4 categories)

| Category | Items | Total Cost |
|----------|-------|------------|
| Engineering | 2 | ~$37.5M |
| Long-Lead Procurement | 22 | ~$97.5M |
| Construction | 14 | ~$295.3M |
| Other / Reserves | 9 | ~$399.2M |

**Largest line items:**
- Contingency Reserve: $150,000,000
- Funding Costs: $77,221,553
- Ammonium Sulfate Plant: $69,000,000
- Concrete/Earthwork: $59,663,288
- ULSD Hydrotreater: $50,000,000
- Structural Steel: $41,702,450

---

## 9. Competitive Landscape

8 market segments mapped. Key competitive positioning:
- Frontieras competes across hydrogen, diesel, naphtha, jet fuel, met coal, thermal coke, sulfuric acid, and fertilizer
- Competitors include multi-hundred-billion-dollar energy majors (ExxonMobil, Chevron, Shell)
- Differentiation: zero-waste, multi-product, no catalysts, novel IP

---

## 10. Market Opportunity Data

**Total Current TAM:** ~$1,528.8B
**Total Projected TAM:** ~$2,094.5B

Sources: Grand View Research, Globe Newswire, Straits Research, The Business Research Company, Industry Estimates

---

## 11. Team Bios

All 5 executives have `fullBio` fields enabling expandable bios in LeadershipGrid.

**Key credentials cited:**
- Matt McKean: Co-founded mortgage firm → one of 10 largest in SW US, funded $2B+, Vistage member, ASU Chemistry
- Joe Witherspoon, P.E.: FASForm™ inventor, Chevron/Marathon/Sinclair Oil, U of Utah Chemical Engineering, licensed PE
- Jose Lopez: 20+ years, PwC Houston/London/The Hague, CPA, SEC reporting/IPO experience
- Andrea Moran: 25+ years, co-founded Yield Power Group ($100M-$1B+ projects), UW-Madison Political Science
- Doug Remy: 30+ years real estate investment/corporate finance, CFO of multiple companies

---

## 12. Disclaimers & Legal Text

| Type | Pages | Content Summary |
|------|-------|----------------|
| Main Compliance | `lib/constants.ts` COMPLIANCE_DISCLAIMER | Not an offer/solicitation, forward-looking risks, confidential |
| Forward-Looking | Overview, Risk Mitigation, Capital, Roadmap | Section 27A/21E risk/uncertainty warning |
| Projection | FASForm™, Economics, Expansion | Model estimate caveat — commodity/regulatory/timeline risks |
| Confidentiality | Due Diligence | Not for redistribution |
| Financials Inline | Financials page | "Not investment advice" + Year 4 EBITDA assumption |
| ShareCalculator Inline | Financials page | "Theoretical valuation metric, not a market/offer price" |

---

## 13. Known Gaps & Pending Items

1. **Jet Fuel / Kerosene** — Added as product output but revenue = $0, production = "TBD", yield = "TBD — pending financial model integration", status = "Under evaluation"
2. ~~**Balance Sheet / Cash Flow**~~ — **RESOLVED**: Pro forma balance sheet and cash flow statements added to Financials page as collapsible FinancialStatements section with toggle between views
3. **Bio-Oil** — Referenced in ARCHITECTURE.md as existing in dashboard with `inExcelModel: false` flag but not found in current `products.ts` (may have been removed in v3)
4. ~~**Process Economics product count**~~ — **RESOLVED**: All pages now consistently say "six high-value product streams" (5 revenue + Jet Fuel under evaluation), with internal gas streams noted separately where relevant
5. ~~**Subtitle inconsistencies**~~ — **RESOLVED**: Consistent "six" language across Overview, Process, Economics, CompanyTimeline, and data/process.ts
6. **NAV_ITEMS in `lib/constants.ts`** now matches `Sidebar.tsx` (10 items, institutional narrative order)
