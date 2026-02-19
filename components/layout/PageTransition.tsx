'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease }}
    >
      {children}
    </motion.div>
  );
}
