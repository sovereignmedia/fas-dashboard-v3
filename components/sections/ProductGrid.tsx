'use client';

import { motion } from 'framer-motion';

import { products } from '@/data/products';
import ProductDonutChart from '@/components/charts/ProductDonutChart';
import ProductCard from '@/components/cards/ProductCard';
import { containerFast as container, viewport } from '@/lib/animations';

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10">
      <ProductDonutChart />
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={viewport.section}
        className="xl:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>
    </div>
  );
}
