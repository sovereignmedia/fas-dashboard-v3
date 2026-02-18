'use client';

import { useState, useEffect } from 'react';
import { useSpring, useTransform } from 'framer-motion';
import { calculateMultiFacility } from '@/data/financials';
import { formatCurrency } from '@/lib/formatters';
import Card from '@/components/ui/Card';

function AnimatedNumber({ value, format = 'currency' }: { value: number; format?: 'currency' | 'number' }) {
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (v) =>
    format === 'currency' ? formatCurrency(v, true) : v.toFixed(0)
  );
  const [displayValue, setDisplayValue] = useState(format === 'currency' ? formatCurrency(value, true) : String(value));

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  useEffect(() => {
    const unsub = display.on('change', (v) => setDisplayValue(v));
    return unsub;
  }, [display]);

  return <span>{displayValue}</span>;
}

interface FacilityScalerProps {
  ebitdaMultiple: number;
}

export default function FacilityScaler({ ebitdaMultiple }: FacilityScalerProps) {
  const [facilities, setFacilities] = useState(1);
  const metrics = calculateMultiFacility(facilities, ebitdaMultiple);

  return (
    <Card className="p-8">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] font-medium text-accent-gold mb-2">
          Facility Scaler
        </p>
        <h3 className="text-2xl font-semibold text-text-primary">
          Scale the Vision
        </h3>
        <p className="text-sm text-text-secondary mt-1">
          Drag to model multi-facility economics
        </p>
      </div>

      {/* Slider */}
      <div className="mb-10">
        <div className="flex justify-between items-baseline mb-3">
          <span className="text-sm text-text-tertiary">Facilities</span>
          <span className="font-mono text-4xl font-bold text-accent-gold glow-gold tabular-nums">
            {facilities}
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={64}
          value={facilities}
          onChange={(e) => setFacilities(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-text-tertiary mt-1">
          <span>1 Facility</span>
          <span>64 Facilities</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <ScalerMetric
          label="Annual Revenue"
          value={metrics.revenue}
          color="#4A9EFF"
        />
        <ScalerMetric
          label="Annual EBITDA"
          value={metrics.ebitda}
          color="#00D4AA"
        />
        <ScalerMetric
          label="Enterprise Value"
          value={metrics.enterpriseValue}
          color="#D4A853"
          glow
        />
        <ScalerMetric
          label="Total CapEx"
          value={metrics.capex}
          color="#8B5CF6"
        />
      </div>

      {/* Math breakdown */}
      <div className="mt-6 pt-6 border-t border-border-subtle">
        <p className="text-sm text-text-tertiary font-mono">
          {facilities} {facilities === 1 ? 'facility' : 'facilities'} × $838M EBITDA × {ebitdaMultiple}x ={' '}
          <span className="text-accent-gold">{formatCurrency(metrics.enterpriseValue, true)} EV</span>
        </p>
      </div>
    </Card>
  );
}

function ScalerMetric({ label, value, color, glow }: { label: string; value: number; color: string; glow?: boolean }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.2em] font-medium text-text-tertiary mb-2">{label}</p>
      <p
        className="font-mono text-2xl lg:text-3xl font-bold tabular-nums"
        style={{
          color,
          textShadow: glow ? `0 0 20px ${color}40` : undefined,
        }}
      >
        <AnimatedNumber value={value} />
      </p>
    </div>
  );
}
