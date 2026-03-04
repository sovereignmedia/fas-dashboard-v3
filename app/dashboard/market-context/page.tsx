'use client';

import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

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

        <motion.div variants={item}>
          <MarketOverviewStats />
        </motion.div>

        <motion.div variants={item}>
          <DCPowerChart />
        </motion.div>
      </motion.div>

      <PeerComparison />
      <SectorIntelligence />
    </div>
  );
}
