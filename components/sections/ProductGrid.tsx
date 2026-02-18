'use client';

import { motion } from 'framer-motion';

import { products } from '@/data/products';
import ProductDonutChart from '@/components/charts/ProductDonutChart';
import ProductCard from '@/components/cards/ProductCard';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-10">
      <ProductDonutChart />
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="xl:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>
    </div>
  );
}
