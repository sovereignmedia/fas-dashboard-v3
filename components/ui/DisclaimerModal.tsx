'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ease } from '@/lib/animations';

export default function DisclaimerModal() {
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <AnimatePresence>
      {!acknowledged && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: ease.default }}
        >
          {/* Backdrop — blurred overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            className="relative z-10 mx-4 max-w-lg w-full rounded-xl border border-border-primary bg-bg-secondary p-8 shadow-2xl"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.5, ease: ease.default, delay: 0.1 }}
          >
            <h2 className="text-xl font-semibold text-accent-gold mb-4 tracking-tight">
              Confidential &mdash; Pre-Release Platform
            </h2>

            <div className="space-y-4 text-sm leading-relaxed text-text-secondary">
              <p>
                This investor intelligence dashboard is a conceptual beta version of
                Frontieras&apos; forthcoming Institutional Investor Intelligence Suite.
                The projections, operational metrics, and strategic data presented herein
                are provided for conceptual purposes, and have not been independently
                audited, reviewed, or verified by any third party. This platform is still
                in its prototype phase, and requires significant further development.
              </p>
              <p>
                All information is provided on an &ldquo;as-is&rdquo; basis and is derived
                from internal estimates, management assumptions, and forward-looking
                projections that are subject to material revision. This platform does not
                constitute an offer to sell or a solicitation of an offer to buy any
                securities.
              </p>
              <p>
                By proceeding, you acknowledge that you understand the preliminary and
                unaudited nature of the information contained within this platform.
              </p>
            </div>

            <button
              onClick={() => setAcknowledged(true)}
              className="mt-6 w-full rounded-lg bg-accent-gold py-3 text-sm font-semibold text-bg-primary transition-colors hover:bg-accent-gold/90 focus:outline-none focus:ring-2 focus:ring-accent-gold/50"
            >
              I Understand &amp; Acknowledge
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
