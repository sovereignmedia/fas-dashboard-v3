'use client';

import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

// Nav order matches sidebar — used to determine slide direction
const NAV_ORDER = [
  '/dashboard',
  '/dashboard/economics',
  '/dashboard/financials',
  '/dashboard/expansion',
  '/dashboard/capital',
  '/dashboard/team',
  '/dashboard/process',
  '/dashboard/risk-analysis',
  '/dashboard/due-diligence',
  '/dashboard/roadmap',
];

function getNavIndex(path: string): number {
  const idx = NAV_ORDER.indexOf(path);
  return idx >= 0 ? idx : 0;
}

const ease = [0.4, 0, 0.2, 1] as const;

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prevPathRef = useRef(pathname);

  // Determine direction: 1 = navigating down the list, -1 = navigating up
  const direction = getNavIndex(pathname) >= getNavIndex(prevPathRef.current) ? 1 : -1;
  prevPathRef.current = pathname;

  return (
    <div className="relative">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={pathname}
          initial={{
            opacity: 0,
            y: direction * 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: direction * -15,
          }}
          transition={{
            duration: 0.45,
            ease,
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
