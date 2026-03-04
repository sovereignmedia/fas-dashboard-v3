'use client';

import { motion } from 'framer-motion';

import SectionHeader from '@/components/ui/SectionHeader';
import { container, item } from '@/lib/animations';
import MarketOverviewStats from '@/components/sections/MarketOverviewStats';
import DCPowerChart from '@/components/charts/DCPowerChart';
import PeerComparison from '@/components/sections/PeerComparison';
import SectorIntelligence from '@/components/sections/SectorIntelligence';

export default function MarketContextPage() {
  return (
    <div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Page header */}
        <motion.div variants={item}>
          <SectionHeader
            overline="Market Context"
            title="Energy & AI Infrastructure Landscape"
            subtitle="Structural sector forces, public market comparables, and curated intelligence on the energy infrastructure buildout underpinning the AI compute cycle."
          />
        </motion.div>

        {/* Stats row — 6 key metrics */}
        <motion.div variants={item}>
          <MarketOverviewStats />
        </motion.div>

        {/* DC Power consumption trajectory chart */}
        <motion.div variants={item}>
          <DCPowerChart />
        </motion.div>
      </motion.div>

      {/* Peer comparison table */}
      <PeerComparison />

      {/* Sector intelligence news grid */}
      <SectorIntelligence />
    </div>
  );
}
