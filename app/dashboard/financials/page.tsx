'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import { FACILITY } from '@/data/model';
import { formatCurrency } from '@/lib/formatters';
import SectionHeader from '@/components/ui/SectionHeader';
import ValuationMethodology from '@/components/sections/ValuationMethodology';
import FacilityScaler from '@/components/charts/FacilityScaler';
import ProjectionAreaChart from '@/components/charts/ProjectionAreaChart';
import ShareCalculator from '@/components/sections/ShareCalculator';
import FinancialStatements from '@/components/sections/FinancialStatements';
import CollapsibleSection from '@/components/ui/CollapsibleSection';
import { containerSlow as container, item } from '@/lib/animations';

export default function FinancialsPage() {
  const [selectedMultiple, setSelectedMultiple] = useState(12);
  const [customMultiple, setCustomMultiple] = useState('');
  const [facilityCount, setFacilityCount] = useState(1);

  const handleScenarioSelect = (multiple: number) => {
    setSelectedMultiple(multiple);
    setCustomMultiple('');
  };

  const handleCustomMultipleChange = (value: string) => {
    setCustomMultiple(value);
    const parsed = parseFloat(value);
    if (!isNaN(parsed) && parsed > 0 && parsed <= 100) {
      setSelectedMultiple(parsed);
    }
  };

  return (
    <div>
      <SectionHeader
        overline="Financial Model"
        title="Financials & Valuation"
        subtitle="Interactive financial projections, valuation scenarios, and enterprise valuation modeling across multi-facility scale."
      />

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-10">
        <ValuationMethodology
          selectedMultiple={selectedMultiple}
          customMultiple={customMultiple}
          onSelectMultiple={handleScenarioSelect}
          onCustomMultipleChange={handleCustomMultipleChange}
        />

        <motion.div variants={item}>
          <FacilityScaler
            ebitdaMultiple={selectedMultiple}
            facilities={facilityCount}
            onFacilitiesChange={setFacilityCount}
          />
        </motion.div>

        <ProjectionAreaChart />
        <ShareCalculator selectedMultiple={selectedMultiple} facilityCount={facilityCount} />

        {/* Pro Forma Financial Statements */}
        <motion.div variants={item}>
          <CollapsibleSection
            overline="Deep Dive"
            title="Pro Forma Financial Statements"
            subtitle="Projected balance sheet and cash flow statements — Years 1 through 5"
            summaryBadge="5-Year Projections"
          >
            <FinancialStatements />
          </CollapsibleSection>
        </motion.div>

        {/* Disclaimer */}
        <motion.div variants={item}>
          <div className="text-center py-6">
            <p className="text-xs text-text-tertiary leading-relaxed max-w-2xl mx-auto">
              These projections are forward-looking estimates based on internal financial models.
              Actual results may vary. This is not investment advice. Past performance does not
              guarantee future results. All figures assume steady-state Year 4 single-facility EBITDA
              of {formatCurrency(FACILITY.ebitda, true)} with linear multi-facility scaling.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
