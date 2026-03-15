'use client';

import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

import SectionHeader from '@/components/ui/SectionHeader';
import { container, item } from '@/lib/animations';
import MarketOverviewStats from '@/components/sections/MarketOverviewStats';
import SupplyDemandChart from '@/components/charts/SupplyDemandChart';
import DCPowerChart from '@/components/charts/DCPowerChart';
import CapexChart from '@/components/charts/CapexChart';
import GenerationMix from '@/components/charts/GenerationMix';
import CoalProductionChart from '@/components/charts/CoalProductionChart';
import GridBottleneck from '@/components/sections/GridBottleneck';
import PeerComparison from '@/components/sections/PeerComparison';
import PolicyTailwinds from '@/components/sections/PolicyTailwinds';
import SectorIntelligence from '@/components/sections/SectorIntelligence';

export default function MarketContextPage() {
  return (
    <div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <SectionHeader
            overline="Market Context"
            title="Energy & AI Infrastructure Landscape"
            subtitle="Structural sector forces, public market comparables, and curated intelligence on the energy infrastructure buildout underpinning the AI compute cycle."
          />
        </motion.div>

        <motion.div variants={item} className="-mt-8 mb-8">
          <div className="flex items-center gap-1.5">
            <Clock size={11} className="text-text-tertiary/60" />
            <span className="text-[10px] text-text-tertiary/60 font-mono tabular-nums">
              Dashboard refreshed {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              {' \u00b7 '}Market data updates every 5 min during trading hours
            </span>
          </div>
        </motion.div>

        {/* ── Market Overview Stats ── */}
        <motion.div variants={item}>
          <MarketOverviewStats />
        </motion.div>

        {/* ── Global Coal Production (full width) ── */}
        <motion.div variants={item}>
          <CoalProductionChart />
        </motion.div>

        {/* ── US Power Generation vs. Projected Demand (2026–2035) ── */}
        <motion.div variants={item} className="mt-8">
          <SupplyDemandChart />
        </motion.div>

        {/* ── Side-by-side: Data Center Power + Hyperscaler CapEx ── */}
        <motion.div variants={item} className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DCPowerChart />
            <CapexChart />
          </div>
        </motion.div>

        {/* ── Side-by-side: Generation Mix + Grid Bottleneck ── */}
        <motion.div variants={item} className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GenerationMix />
            <GridBottleneck />
          </div>
        </motion.div>

        {/* ── Peer Comparison Table (full width) ── */}
        <motion.div variants={item} className="mt-4">
          <PeerComparison />
        </motion.div>
      </motion.div>

      {/* ── Policy Tailwinds ── */}
      <PolicyTailwinds />

      {/* ── Sector Intelligence (articles) ── */}
      <SectorIntelligence />
    </div>
  );
}
