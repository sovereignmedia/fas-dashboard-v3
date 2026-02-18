'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';

import { products, facilityEconomics, Product } from '@/data/products';
import { formatCurrency } from '@/lib/formatters';
import Card from '@/components/ui/Card';

function getSliderBounds(product: Product) {
  const base = product.modeledPrice;
  return { min: Math.round(base * 0.5), max: Math.round(base * 2.0), step: base >= 100 ? 1 : 0.5 };
}

export default function PricingSensitivity() {
  const defaultPrices: Record<string, number> = {};
  products.forEach((p) => { defaultPrices[p.id] = p.modeledPrice; });

  const [adjustedPrices, setAdjustedPrices] = useState<Record<string, number>>(defaultPrices);

  const handlePriceChange = (id: string, price: number) => {
    setAdjustedPrices((prev) => ({ ...prev, [id]: price }));
  };

  const resetPrices = () => setAdjustedPrices({ ...defaultPrices });

  const isModified = useMemo(() => products.some((p) => adjustedPrices[p.id] !== p.modeledPrice), [adjustedPrices]);

  const adjustedProducts = useMemo(() => {
    return products.map((p) => {
      const adjPrice = adjustedPrices[p.id] ?? p.modeledPrice;
      const adjRevenue = p.annualVolume * adjPrice;
      const delta = adjRevenue - p.annualRevenue;
      return { ...p, adjPrice, adjRevenue, delta };
    });
  }, [adjustedPrices]);

  const totalAdjustedRevenue = useMemo(() => adjustedProducts.reduce((sum, p) => sum + p.adjRevenue, 0), [adjustedProducts]);
  const totalRevenueDelta = totalAdjustedRevenue - facilityEconomics.totalRevenue;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }} className="mb-10">
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] font-medium text-accent-gold mb-1">Pricing Sensitivity</p>
            <p className="text-sm text-text-secondary">Adjust product pricing to model revenue impact</p>
          </div>
          <button
            onClick={resetPrices}
            disabled={!isModified}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
              isModified
                ? 'bg-bg-hover text-text-primary hover:bg-bg-tertiary border border-border-medium'
                : 'bg-bg-secondary text-text-tertiary border border-border-subtle cursor-not-allowed'
            }`}
          >
            <RotateCcw size={14} />
            Reset All
          </button>
        </div>

        {/* Summary row */}
        {isModified && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-6 px-4 py-3 rounded-xl bg-bg-primary border border-border-subtle">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-text-tertiary">Adjusted Total Revenue</span>
                <p className="text-xl font-mono tabular-nums font-semibold text-text-primary">{formatCurrency(totalAdjustedRevenue, true)}</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-text-tertiary">Delta from Base Case</span>
                <p className={`text-xl font-mono tabular-nums font-semibold ${totalRevenueDelta >= 0 ? 'text-data-green' : 'text-data-red'}`}>
                  {totalRevenueDelta >= 0 ? '+' : ''}{formatCurrency(totalRevenueDelta, true)}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Product sliders */}
        <div className="space-y-5">
          {adjustedProducts.map((product) => {
            const bounds = getSliderBounds(product);
            const priceDiff = product.adjPrice - product.modeledPrice;
            const pctChange = ((product.adjPrice - product.modeledPrice) / product.modeledPrice) * 100;
            const isChanged = Math.abs(priceDiff) > 0.01;

            return (
              <div key={product.id} className="grid grid-cols-1 lg:grid-cols-[200px_1fr_180px_140px] gap-4 items-center py-3 border-b border-border-subtle last:border-0">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: product.color }} />
                  <span className="text-sm font-medium text-text-primary truncate">{product.displayName}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-text-tertiary w-14 text-right">{formatCurrency(bounds.min)}</span>
                  <div className="relative flex-1">
                    <input
                      type="range"
                      min={bounds.min}
                      max={bounds.max}
                      step={bounds.step}
                      value={product.adjPrice}
                      onChange={(e) => handlePriceChange(product.id, parseFloat(e.target.value))}
                      className="w-full h-1.5 rounded-full appearance-none cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-accent-gold
                        [&::-webkit-slider-thumb]:bg-bg-primary [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(212,168,83,0.3)] [&::-webkit-slider-thumb]:cursor-pointer
                        [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full
                        [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-accent-gold [&::-moz-range-thumb]:bg-bg-primary [&::-moz-range-thumb]:cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, ${product.color} 0%, ${product.color} ${((product.adjPrice - bounds.min) / (bounds.max - bounds.min)) * 100}%, var(--border-subtle) ${((product.adjPrice - bounds.min) / (bounds.max - bounds.min)) * 100}%, var(--border-subtle) 100%)`,
                      }}
                    />
                  </div>
                  <span className="text-xs font-mono text-text-tertiary w-14">{formatCurrency(bounds.max)}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono tabular-nums font-semibold text-text-primary">{formatCurrency(product.adjPrice)}</p>
                  {isChanged && (
                    <p className={`text-xs font-mono tabular-nums ${priceDiff >= 0 ? 'text-data-green' : 'text-data-red'}`}>
                      {priceDiff >= 0 ? '+' : ''}{pctChange.toFixed(1)}%
                    </p>
                  )}
                </div>
                <div className="text-right">
                  {isChanged ? (
                    <p className={`text-sm font-mono tabular-nums font-semibold ${product.delta >= 0 ? 'text-data-green' : 'text-data-red'}`}>
                      {product.delta >= 0 ? '+' : ''}{formatCurrency(product.delta, true)}
                    </p>
                  ) : (
                    <p className="text-sm font-mono tabular-nums text-text-tertiary">{formatCurrency(product.annualRevenue, true)}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
