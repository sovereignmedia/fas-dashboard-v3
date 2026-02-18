'use client';

import { motion } from 'framer-motion';
import { Product } from '@/data/products';
import { formatCurrency, formatNumber } from '@/lib/formatters';

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div variants={item}>
      <div className="relative overflow-hidden rounded-2xl bg-bg-secondary border border-border-subtle hover:border-border-medium transition-all duration-300 p-5 h-full">
        {/* Color-coded left border */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px]"
          style={{ backgroundColor: product.color }}
        />
        <p className="text-sm font-semibold text-text-primary mb-3 pl-2">
          {product.displayName}
        </p>
        <div className="space-y-2 pl-2">
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-text-tertiary">Volume</span>
            <span className="text-xs font-mono tabular-nums text-text-secondary">
              {formatNumber(product.annualVolume)} {product.volumeUnit}
            </span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-text-tertiary">Price</span>
            <span className="text-xs font-mono tabular-nums text-text-secondary">
              {formatCurrency(product.modeledPrice)}{' '}
              <span className="text-text-tertiary">{product.priceUnit}</span>
            </span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-text-tertiary">Revenue</span>
            <span className="text-sm font-mono tabular-nums font-semibold text-text-primary">
              {formatCurrency(product.annualRevenue, true)}
            </span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-text-tertiary">Market Size</span>
            <span className="text-xs font-mono tabular-nums text-text-secondary">
              {product.globalMarketSize}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
