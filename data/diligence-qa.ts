// data/diligence-qa.ts

export type DiligenceCategory =
  | 'capitalization'
  | 'technology'
  | 'commercial'
  | 'supply-chain'
  | 'operations'
  | 'regulatory'
  | 'financial'
  | 'governance'
  | 'execution'
  | 'capital-structure';

export interface DiligenceQuestion {
  id: string;
  category: DiligenceCategory;
  question: string;
  concern: string;
  implications: string[];
  answer: string;
  supplementalAnswer?: string;
}

export const DILIGENCE_CATEGORY_LABELS: Record<DiligenceCategory, string> = {
  capitalization: 'Capitalization & Funding',
  technology: 'Technology Validation',
  commercial: 'Commercial Contracts',
  'supply-chain': 'Supply Chain & Construction',
  operations: 'Operational Execution',
  regulatory: 'Regulatory & Environmental',
  financial: 'Financial Modeling',
  governance: 'Governance & Control',
  execution: 'Project Execution & Timeline',
  'capital-structure': 'Capital Structure & Financing',
};

export const DILIGENCE_QUESTIONS: DiligenceQuestion[] = [
  // ── Capitalization & Funding Risk ──────────────────────────
  {
    id: 'cap-1',
    category: 'capitalization',
    question: 'What is the current progress toward securing the $25M bridge capital for FEL-3?',
    concern: 'If the $25M bridge capital for FEL-3 is not secured in full, what is the back-up plan?',
    implications: [
      'Without the $25M, FEL-3 may stall, delaying full project financing and breaking momentum with EPC and offtake partners.',
      'Delays in FEL-3 could erode confidence among potential lenders and jeopardize offtake momentum.',
      'Failure to secure bridge funds could lead to layoffs or vendor disengagement, halting progress.',
    ],
    answer: 'Frontieras is currently raising $25M in bridge capital to complete FEL-3. Of this, $7.67M has already been raised and deployed for legal, engineering, site acquisition, and permitting. The balance is targeted to finalize land acquisition, detailed engineering, and provide working capital buffer before pursuing the full $850M raise.',
    supplementalAnswer: 'Project FID and the execution phase occurs at the end of FEL3. Project timeline will be determined by this round of financing. Pre-NTP (notice to proceed) funding and completion.',
  },
  {
    id: 'cap-2',
    category: 'capitalization',
    question: 'Has Frontieras received interest or term sheets from any alternative capital providers?',
    concern: 'Has the company explored alternative capital sources to de-risk dependency on full project finance?',
    implications: [
      'Lack of alternatives increases dependency on a single raise event, raising risk of timeline failure.',
      'A single-source strategy may dissuade institutional capital that requires syndication flexibility.',
      'Limited sourcing flexibility may result in failed rounds or conditional commitments.',
    ],
    answer: 'Frontieras has established strategic relationships with Market Street Capital and Pickwick Capital Partners to manage equity and debt placement. While the documents don\'t detail signed term sheets for alternates, the plan includes tapping family offices, RIA networks, and institutional debt providers through these partnerships.',
  },
  {
    id: 'cap-3',
    category: 'capitalization',
    question: 'What is the current investor appetite for the proposed 15% equity / 85% debt structure?',
    concern: 'Is the assumed 15% equity / 85% debt stack overly aggressive for a first-time project?',
    implications: [
      'Over-leverage may deter lenders or increase cost of debt, delaying closing or impairing returns.',
      'Equity-light structure may limit strategic alignment with investors who want greater participation.',
      'Equity underrepresentation could impair IPO narrative or create misalignment at exit.',
    ],
    answer: 'The company has modeled a 15% equity / 85% debt capital stack ($125M equity, $725M debt).',
    supplementalAnswer: 'The project finance market typically recognizes 70/30 debt/equity. This is largely because most projects cannot "carry" more leverage. This project/technology could carry 100% leverage given the high margins. Insurance coverages and guarantees will be more important than the equity/debt ratio. The company can if necessary utilize 3rd party equipment lease/finance as well to supplement the senior project debt.',
  },
  {
    id: 'cap-4',
    category: 'capitalization',
    question: 'What contingency plans exist to handle unexpected project cost overruns beyond $150M?',
    concern: 'What mechanisms are in place to cover cost overruns beyond the $150M contingency reserve?',
    implications: [
      'Unexpected overruns may lead to mid-project liquidity crunch or need for emergency capital.',
      'If contingency proves inadequate, Frontieras may need bridge capital under distressed terms.',
      'Emergency capital raises under pressure may involve unfavorable dilution or pricing concessions.',
    ],
    answer: 'The $150M contingency reserve, plus layered risk mitigation including third-party EPC management, long-lead procurement planning, and output performance insurance, serve as buffers. EPC oversight is supported by Performance Contractors and CAMS.',
    supplementalAnswer: 'Post FEL-3, the hard budget will be established as well as the construction contracts, either fixed cost or time/materials. Insurance will be in place in the case of non-performance.',
  },

  // ── Technology Validation ──────────────────────────────────
  {
    id: 'tech-1',
    category: 'technology',
    question: 'What scale and duration was the FASForm™ technology operated at in the most recent test?',
    concern: 'Has the FASForm™ process ever operated continuously at commercial scale?',
    implications: [
      'Unproven scalability introduces major technical risk; could lead to operational failures or loss of offtake contracts.',
      'Operational failure at scale could void offtake contracts and trigger insurance or covenant violations.',
      'Scale-up challenges may erode first-mover advantage or trigger reputational damage.',
    ],
    answer: 'The FASForm™ pilot operated for over 12 months at a Texas demonstration unit. While not full-scale (7,500 TPD), the pilot validated the process under ASTM protocols and third-party engineering review by JOB EPC.',
    supplementalAnswer: 'The FASForm process and plant design does not manufacture any new types of equipment or materials and utilizes existing equipment that is all in-service in the refining and material handling industries.',
  },
  {
    id: 'tech-2',
    category: 'technology',
    question: 'Who validated the pilot unit results and what level of third-party review has been completed?',
    concern: 'What firm validated the pilot test data and have results been audited by a lender-approved engineer?',
    implications: [
      'Without audited validation, investors and lenders may question yield claims or delay credit approvals.',
      'Lack of independent validation may prevent underwriter approvals or investment committee sign-offs.',
      'If third-party data is not accepted by rating agencies, project financing could collapse.',
    ],
    answer: 'Validation was conducted by JOB Industrial Services and verified by independent ASTM-compliant lab analyses. These results were used to support the insurance and lender engagement documentation.',
  },
  {
    id: 'tech-3',
    category: 'technology',
    question: 'What is the current status of the Lloyd\'s of London performance bond coverage terms?',
    concern: 'Is the process insured as proven technology, or are there carve-outs in the performance bond?',
    implications: [
      'If the bond excludes tech failure coverage, project risk is largely unmitigated for early investors and lenders.',
      'Bond limitations could prevent payout in the event of technology non-performance.',
      'Gaps in insurance protection reduce investor downside coverage and raise sponsor risk profile.',
    ],
    answer: 'The Lloyd\'s of London output bond, placed via Ariel Re, covers $100M in debt service for the first three years. This is considered a third-party validation of performance risk, although some exclusions may apply at underwriting level not disclosed in the deck.',
    supplementalAnswer: 'Recommend leaning upon the Engineering Technology Validation reports which validates the technology and compares/contrasts the commercial scale design.',
  },

  // ── Commercial Contracts ───────────────────────────────────
  {
    id: 'comm-1',
    category: 'commercial',
    question: 'Can Frontieras share signed copies or detailed terms of all executed offtake agreements?',
    concern: 'Are the 10-year offtake agreements binding? What are the penalty or opt-out clauses?',
    implications: [
      'Non-binding contracts or loose terms may result in price renegotiation, lost buyers, or cash flow gaps.',
      'Weak contract enforceability could lead to volume shortfalls or reduced take-or-pay protections.',
      'Lack of enforceable volume terms may break debt covenants tied to cash flow thresholds.',
    ],
    answer: 'Frontieras has received multi-year LOIs for its products. These are commodities that place directly into the industrial markets, they are not new products. It is customary to execute either off-take or commodity brokerage agreements as the project is ready to establish dates/volumes for delivery.',
    supplementalAnswer: 'The company has significant interest from both direct off-takers and commodities brokerage firms. Several have provided corpus LOIs. Product specs have been provided.',
  },
  {
    id: 'comm-2',
    category: 'commercial',
    question: 'How are product prices structured across the 10-year offtake contracts?',
    concern: 'Are pricing mechanisms indexed or fixed? How will volatility in diesel or sulfuric acid affect revenues?',
    implications: [
      'Lack of price certainty could erode margin assumptions and impair debt service capacity.',
      'Revenue unpredictability may hinder cash flow modeling, harming debt coverage and ratings.',
      'Volatile revenue streams limit ability to lock in fixed-rate debt or stable covenants.',
    ],
    answer: 'Pricing for diesel, naphtha, and sulfuric acid is based on wholesale commodity indexes and includes escalators. FASCarbon™ is locked at $250/ton for steel use. Annual increases of 2% are projected for most products, except FASCarbon™.',
    supplementalAnswer: 'The Frontieras proforma uses a NYMEX 5 year curve for its diesel product (heating oil). Since 2022 this number at $2.14 has averaged well below the average price. If necessary the company will use short term hedges to support project finance, while it builds a sinking fund.',
  },
  {
    id: 'comm-3',
    category: 'commercial',
    question: 'How many offtake counterparties are committed, and what percentage of volume does each cover?',
    concern: 'Is there product concentration risk with only a few offtake counterparties?',
    implications: [
      'Concentration risk heightens exposure to any default or renegotiation by a top offtaker.',
      'Counterparty default could leave the plant with stranded inventory and no revenue.',
      'Revenue disruption from counterparty weakness could impact CAMS operations or staff retention.',
    ],
    answer: 'The offtake base is diversified by product but may be concentrated by buyer. LOIs span multiple industrial buyers across fuels, agriculture, and steel, though exact counterparty names are not provided publicly.',
  },

  // ── Supply Chain & Construction ────────────────────────────
  {
    id: 'supply-1',
    category: 'supply-chain',
    question: 'Has long-lead equipment been ordered, and if not, what is the expected delivery timeline?',
    concern: 'What exposure does the company have to delivery delays for long-lead equipment?',
    implications: [
      'Procurement delays could push COD past the timeline, eroding IRR and causing cost escalation.',
      'Late arrivals on long-lead equipment can cascade into idle labor and liquidated damages.',
      'Unsecured components may increase construction costs or defer commissioning indefinitely.',
    ],
    answer: 'FEL-3 progress suggests that procurement planning for long-lead items (compressors, heaters, vessels) has been initiated but is pending full $25M raise. Several MSAs with vendors like Yokogawa, Topsoe, and JOB EPC are already executed.',
    supplementalAnswer: 'Long-lead equipment will be defined in FEL 3 and procured at the beginning of the execution phase to meet construction timelines.',
  },
  {
    id: 'supply-2',
    category: 'supply-chain',
    question: 'What responsibilities and liabilities are included in Performance Contractors\' construction agreement?',
    concern: 'Is Performance Contractors assuming any construction or schedule delay penalties?',
    implications: [
      'If Performance Contractors bears no risk, the company absorbs all penalties and schedule risks.',
      'No construction accountability may lead to timeline slips without recourse.',
      'The project could fall behind competitors if schedule slippage cascades.',
    ],
    answer: 'Performance Contractors, Inc. is under MSA to execute construction but the documents don\'t specify their financial liability in case of delay. Construction duration is estimated at 20 months with a 24-month full commissioning window.',
    supplementalAnswer: 'Builders completion insurance will be in place to provide project support, in addition "builders delay" insurance will be in place. Frontieras has not completed contractor selection, will open bid to Performance and selected other bidders, guarantees and balance sheets to provide project stability will be considered.',
  },
  {
    id: 'supply-3',
    category: 'supply-chain',
    question: 'Have EPC contracts been reviewed for liquidated damages and force majeure provisions?',
    concern: 'Are there EPC LDs or force majeure clauses for delays or inflation?',
    implications: [
      'Weak LDs or ambiguous force majeure terms could leave Frontieras exposed to open-ended liabilities.',
      'If force majeure is poorly defined, project could be exposed to financial risk from external events.',
      'Exposure to cost inflation with no recourse could destroy IRR assumptions.',
    ],
    answer: 'Contracts include global EPC oversight and FEL-2 scope validated by JOB EPC. Force majeure terms are not detailed, but risk sharing is mitigated by a $150M contingency and use of well-established firms.',
  },

  // ── Operational Execution ──────────────────────────────────
  {
    id: 'ops-1',
    category: 'operations',
    question: 'What relevant projects has CAMS operated with similar technological complexity or feedstock?',
    concern: 'Has CAMS operated a similar facility before? What\'s their experience with coal reformation tech?',
    implications: [
      'If CAMS lacks domain-specific experience, operational ramp-up and reliability could suffer.',
      'Limited technical background in coal reforming may lead to extended learning curve post-COD.',
      'Weak operational ramp-up may delay cash generation and reduce investor confidence.',
    ],
    answer: 'CAMS, with $20B in AUM across 350+ industrial facilities, is contracted for O&M. While not confirmed to have operated a coal-reformation unit, they have broad energy infrastructure and thermal operations expertise.',
    supplementalAnswer: 'CAMS has direct experience in coal fired power plant operation and coal handling. In addition they are competent in the coking field.',
  },
  {
    id: 'ops-2',
    category: 'operations',
    question: 'Has a labor recruitment and training program been developed for the Mason County facility?',
    concern: 'What\'s the labor strategy for 200+ hires in a rural region like Mason County?',
    implications: [
      'Labor shortages could delay commissioning, drive up wages, or impact operational readiness.',
      'Local hiring gaps could attract regulatory scrutiny or limit job creation promises made to WV officials.',
      'Labor strain may reduce plant reliability or force higher turnover and training costs.',
    ],
    answer: 'Frontieras plans to create 200+ high-paying jobs in WV. Staffing will be supported by CAMS and local hiring. Full details on workforce development plans are not included, but regional benefits are emphasized.',
    supplementalAnswer: 'CAMS has direct responsibility under contract to supply employees and staff the facility. They currently perform the O&M on a coal power plant directly across the river from the site and have broad reach into the region.',
  },
  {
    id: 'ops-3',
    category: 'operations',
    question: 'What outreach or communication has been conducted with local WV stakeholders or officials?',
    concern: 'Is there a community engagement plan to manage environmental pushback or NIMBY risks?',
    implications: [
      'Community resistance could cause permitting delays or political pushback during execution.',
      'Without stakeholder engagement, Frontieras risks political or reputational opposition at the local level.',
      'Negative press or political attention could escalate into legal or permitting obstacles.',
    ],
    answer: 'The company emphasizes strong regional support and economic benefits to WV. No public opposition is noted, but no specific community outreach plans are disclosed in the pitch materials.',
    supplementalAnswer: 'Frontieras has received broad support from the WV Governor, State and US Congressional members in West Virginia. NGOs are not very active in WV and coal, industry and manufacturing are elevated to high levels of importance.',
  },

  // ── Regulatory & Environmental ─────────────────────────────
  {
    id: 'reg-1',
    category: 'regulatory',
    question: 'What permits are currently in hand, and what stage are remaining applications in?',
    concern: 'Are all permits (air, water, chemical) secured? If not, what\'s the regulatory feedback timeline?',
    implications: [
      'Permitting delays would halt construction and prevent project financing from closing.',
      'Permit denials or delays would stall the project indefinitely and hurt sponsor credibility.',
      'Unpermitted construction or environmental violation risks triggering shutdown orders.',
    ],
    answer: 'FEL-3 scope includes permitting, but status of air/water/discharge permits is not fully detailed. The project is located in an industrial zone with prior energy infrastructure.',
    supplementalAnswer: 'A full permitting strategy is in place. This will commence during FEL-3. The planned construction timeline accounts for permitting, most of which is state administered and happens within weeks of application.',
  },
  {
    id: 'reg-2',
    category: 'regulatory',
    question: 'What contingency planning exists in the event of future environmental regulatory shifts?',
    concern: 'How would EPA compliance be maintained under future environmental policy reversals?',
    implications: [
      'Policy reversals post-election could introduce fines or force retrofits, impacting returns.',
      'Future administrations may impose retrofit requirements or rescind operating permits.',
      'Retroactive environmental policy changes could impose new emissions thresholds or taxes.',
    ],
    answer: 'The company states compliance with EPA deregulation trends and risk mitigation via zero-waste process. However, exposure to future regulations remains a consideration for long-term investors.',
    supplementalAnswer: 'EPA compliance will be easily addressed and achieved. CAMS commits contractually to perform/report.',
  },
  {
    id: 'reg-3',
    category: 'regulatory',
    question: 'What sustainability certifications or ESG audits has the company completed or scheduled?',
    concern: 'What is the ESG strategy to offset reputational risks from using coal as feedstock?',
    implications: [
      'Poor ESG narrative could deter institutional capital or lead to future PR or divestment pressure.',
      'Weak ESG practices could be flagged in third-party ratings and impact future IPO performance.',
      'Negative ESG narratives could reduce analyst coverage post-IPO or limit index inclusion.',
    ],
    answer: 'Frontieras promotes its zero-waste process, CO₂ reductions (25–35%), and lack of combustion as ESG-positive. No third-party ESG rating or certification is mentioned yet.',
    supplementalAnswer: 'ESG is rapidly being unwound. Under the Trump administration the SEC has removed environmental compliance and ESG reporting as a requirement.',
  },

  // ── Financial Modeling & Forecasts ─────────────────────────
  {
    id: 'fin-1',
    category: 'financial',
    question: 'What is the planned ramp-up curve post-commissioning and what downtime is assumed in year 1?',
    concern: 'Are projections assuming 100% uptime? What\'s the break-even utilization rate?',
    implications: [
      'Overly optimistic models could mislead investors and require major mid-course corrections.',
      'Revenue drop from unplanned downtime could impair debt service and erode equity value.',
      'Unplanned outages could trigger technical default or need for emergency debt restructuring.',
    ],
    answer: 'Ramp-up assumptions include 75% utilization in month 1, then 100% from month 2. This is expected by nameplate and supported by continuous feedstock logistics and 24/7 automation.',
    supplementalAnswer: 'A routine maintenance schedule has been accounted for. Break even will be determined by the final debt terms, but the current proforma would be slightly less than 25% run rate.',
  },
  {
    id: 'fin-2',
    category: 'financial',
    question: 'What assumptions underlie the opex, maintenance capex, and DSCR projections?',
    concern: 'Are assumptions for maintenance capex and debt service conservative enough?',
    implications: [
      'If maintenance or DSCR inputs are weak, financial stress could emerge within first 12 months of ops.',
      'Underestimating opex or capex leads to false IRR assumptions and may spook follow-on investors.',
      'Overly aggressive inputs risk undermining confidence in all future financial disclosures.',
    ],
    answer: 'Opex drivers like CAMS (5% of revenue), brokers/logistics (3.5%), and natural gas (1%) are detailed. Payroll and taxes are also modeled clearly, suggesting strong transparency.',
    supplementalAnswer: 'They represent a small percentage of cost structure, during FEL3 final confirmation of contracts will be received.',
  },
  {
    id: 'fin-3',
    category: 'financial',
    question: 'How were price inputs validated for each product in the model, and are any under firm contract?',
    concern: 'Are gross margins (88%) reliant on aggressive pricing assumptions?',
    implications: [
      'Overstated margins create unrealistic IRR targets, leading to disappointment or capital gaps.',
      'Lower than expected pricing would create valuation gaps vs. projected returns.',
      'Missed gross margin targets may impair dividend plans or exit valuation.',
    ],
    answer: 'Gross margins at 88% are based on high yield from low-cost feedstock and premium-priced outputs. Offtake pricing appears to back this assumption, but commodity volatility remains a risk.',
    supplementalAnswer: 'Cost structures do NOT use aggressive price structures, the prices use moderate curved pricing assumptions vs. spot.',
  },

  // ── Governance & Control ───────────────────────────────────
  {
    id: 'gov-1',
    category: 'governance',
    question: 'What investor governance rights exist today? Are there board seats or supermajority protections?',
    concern: 'What board or investor rights exist? Do minority protections limit investor influence?',
    implications: [
      'Without board or investor rights, governance may tilt too heavily toward insiders.',
      'Lack of governance rights weakens investor oversight and could hinder course corrections.',
      'Governance imbalance may prevent timely pivots if project challenges emerge.',
    ],
    answer: 'No details on board structure or investor rights are included, though Frontieras has partnered with Market Street Capital for institutional readiness. Management holds key leadership roles.',
  },
  {
    id: 'gov-2',
    category: 'governance',
    question: 'What is the post-raise cap table and what dilution scenarios have been modeled for future rounds?',
    concern: 'What is the dilution risk if capital needs exceed current projections?',
    implications: [
      'Dilution risk could lower future investor appetite or force down round pricing.',
      'Unexpected dilution could create cap table complexity and lower Series B participation.',
      'Future equity rounds may require down-round repricing or liquidation preference resets.',
    ],
    answer: 'The documents acknowledge future capital needs and highlight dilution risk, particularly if new equity rounds are priced differently. No cap table breakdown is shown.',
  },
  {
    id: 'gov-3',
    category: 'governance',
    question: 'Can Frontieras provide documentation proving clear separation of IP ownership from FAS?',
    concern: 'Is IP ownership fully insulated from FAS, and could a licensing dispute impair operations?',
    implications: [
      'IP uncertainty could cause license revocation, project shutdown, or M&A friction.',
      'IP disputes may lead to injunctions or prevent licensing to future sites or partners.',
      'Unsettled IP control could impact valuation, licensing, or M&A viability.',
    ],
    answer: 'The IP is licensed from parent company FAS with long-standing patent protection (9 countries, 139 disclosures). Clear operational rights are granted to Frontieras via license agreement, but details should be reviewed legally.',
  },

  // ── Project Execution & Timeline ───────────────────────────
  {
    id: 'exec-1',
    category: 'execution',
    question: 'What is the precise timeline to complete FEL-3 and achieve financial close?',
    concern: 'Is the FEL-3 timeline clearly defined and achievable, or are there potential delays from permitting, regulatory review, or funding dependencies?',
    implications: [
      'If FEL-3 timelines slip, project financing may be delayed, eroding confidence among equity and debt participants.',
      'Regulatory delays could push out permitting timelines, risking loss of fixed-price vendor bids.',
      'Lack of schedule clarity may impair investor decision-making or disrupt debt syndication.',
    ],
    answer: 'FEL-3 is targeted for completion within 180-270 days. Permitting has advanced significantly with Mason County and Army Corps coordination underway. Financial close is staged post-FEL-3 with early debt syndicate engagement already initiated.',
  },
  {
    id: 'exec-2',
    category: 'execution',
    question: 'Can you provide a detailed Gantt chart for the construction phase, including critical path risks?',
    concern: 'Has the project team mapped the construction schedule in sufficient detail to mitigate critical path and resource allocation risks?',
    implications: [
      'Without a validated Gantt chart, construction may face coordination failures and missed milestones.',
      'Contractors may be misaligned on sequencing or milestone accountability.',
      'Critical materials or crews may become unavailable due to poor lead time forecasting.',
    ],
    answer: 'The project Gantt chart, managed by JOB EPC and reviewed with Yokogawa and CAMS, defines all major engineering, procurement, and construction milestones. Critical path elements include site grading, vessel installation, and commissioning integration.',
  },
  {
    id: 'exec-3',
    category: 'execution',
    question: 'Has any of the long-lead equipment already been procured or is procurement contingent on full financing?',
    concern: 'Is procurement of long-lead items appropriately timed to avoid construction delays or pricing volatility?',
    implications: [
      'Delays in equipment procurement could create idle time, increase costs, or compromise commissioning schedules.',
      'Equipment pricing could escalate, leading to working capital strain or value engineering compromises.',
      'Commissioning may be delayed, which affects cash flow start and loan repayment triggers.',
    ],
    answer: 'Procurement timelines are mapped within FEL-3. While final ordering is contingent on financial close, vendor quotes and technical specs are secured. Long-lead items include reformer vessels and hydrotreater modules.',
  },
  {
    id: 'exec-4',
    category: 'execution',
    question: 'Who has reviewed and validated your construction budget? How does the $150M contingency compare to typical EPC norms?',
    concern: 'Has the construction budget been independently validated, and does the contingency reflect real-world project complexity?',
    implications: [
      'An under-validated budget or insufficient contingency may result in cost overruns or midstream capital raises.',
      'Unexpected scope creep without contingency could harm IRR and violate lender covenants.',
      'Unplanned budget escalations may result in forced dilution or equity clawbacks.',
    ],
    answer: 'The $150M contingency is based on benchmarking from prior EPC builds of similar scale. JOB EPC has provided a third-party review and validated labor, materials, and escalation buffers. It represents ~18% of total EPC costs — consistent with industry norms.',
  },

  // ── Capital Structure & Financing ──────────────────────────
  {
    id: 'capstr-1',
    category: 'capital-structure',
    question: 'How are you managing interest rate risk and capital stack sequencing in today\'s debt markets?',
    concern: 'Is the capital structure flexible and insulated from volatility in interest rates and investor sentiment shifts?',
    implications: [
      'Failure to hedge interest rate exposure or stage capital intelligently may degrade overall project returns.',
      'Debt market tightening may require repricing or bridge capital under unfavorable terms.',
      'Front-end capital may not align with construction drawdowns, requiring premature equity calls.',
    ],
    answer: 'Frontieras is working with advisors to evaluate rate hedging instruments and optimize capital stack deployment across pre-close bridge, senior debt, and tax equity tranches. Interest rate risk is partially offset by milestone-based draw schedules.',
    supplementalAnswer: 'Given the expected CFADS (Cash Flow Available for Debt Service) the first project is less sensitive to the cost of capital as compared to many other projects.',
  },
  {
    id: 'capstr-2',
    category: 'capital-structure',
    question: 'What is the exit timeline and expected return profile for equity investors at IPO or monetization events?',
    concern: 'Are return expectations and exit paths clearly defined to meet institutional investor thresholds?',
    implications: [
      'Unclear exit strategies could reduce investor appetite or require secondary sales at a discount.',
      'Inadequate communication of ROI targets may lead to LP disengagement or fundraising gaps.',
      'Exit misalignment could prevent participation from long-term hold investors or crossover funds.',
    ],
    answer: 'Equity investors are expected to realize returns through a Q1 2026 IPO, or earlier strategic monetization. Modeled IRRs exceed 30%+ gross, with defined cash flow ramp, debt service coverage, and potential exit liquidity within 36 months.',
  },
];

export const DILIGENCE_STATS = {
  totalQuestions: 30,
  categoriesCount: 10,
  questionsWithSupplemental: 20,
};
