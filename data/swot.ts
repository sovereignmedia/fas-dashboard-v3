// data/swot.ts

export interface SWOTItem {
  text: string;
}

export interface SWOTData {
  strengths: SWOTItem[];
  weaknesses: SWOTItem[];
  opportunities: SWOTItem[];
  threats: SWOTItem[];
}

export const SWOT: SWOTData = {
  strengths: [
    { text: 'Proprietary FASForm™ process efficiently extracts energy from coal, reducing emissions and producing zero waste. Validated by 3rd-party engineering.' },
    { text: 'Diverse product portfolio — energy products and industrial chemicals across multiple revenue streams, enhancing market resilience.' },
    { text: 'Strategic $850M facility in Mason County, WV — significant employment creation and regional economic impact.' },
    { text: '10-year feedstock contract for 27M tons of Pittsburgh #8 coal with collared pricing ensures supply chain stability.' },
    { text: 'CAMS partnership provides institutional-grade operational support from construction through steady-state O&M, safety, and compliance.' },
    { text: 'Geographic advantage — abundant coal reserves, proximity to industrial hubs, Ohio River access, CSX rail, minimizing logistics costs.' },
  ],
  weaknesses: [
    { text: 'Operating in the coal industry may attract criticism from environmental groups and ESG-focused investors.' },
    { text: 'Introducing new technology in traditional industries can face resistance, potentially affecting market penetration and adoption rates.' },
    { text: 'Capital-intensive operations require high initial investment for facility construction and technology deployment, impacting financial flexibility.' },
  ],
  opportunities: [
    { text: 'Expansion into Asia-Pacific markets that continue to rely on coal for energy, offering alternatives without costly infrastructure changes.' },
    { text: 'Steel and metallurgy market growth — global infrastructure development driving demand for high-grade metallurgical coke.' },
    { text: 'Technological adaptation — co-feeding waste plastics and other carbonaceous materials, broadening market potential beyond coal.' },
    { text: 'Favorable regulatory environment — EPA deregulation efforts supporting domestic energy production and economic growth.' },
    { text: 'Rising energy demand from AI and data center sectors presents new markets for Frontieras\u2019 products.' },
    { text: 'Coal industry resurgence — shifts in political and public opinion creating a more favorable outlook on coal as a viable energy source.' },
  ],
  threats: [
    { text: 'Future administrations could reimpose strict environmental regulations despite current deregulatory trends.' },
    { text: 'Fluctuations in global energy prices and demand can affect profitability and market stability.' },
    { text: 'Advancements in renewable energy technologies may reduce long-term demand for coal-based energy products.' },
    { text: 'Negative public perception of fossil fuels could lead to reduced investor interest and consumer acceptance.' },
  ],
};
