'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface CollapsibleSectionProps {
  overline?: string;
  title: string;
  subtitle?: string;
  /** Small summary shown inline with title when collapsed (e.g. "14 categories") */
  summaryBadge?: string;
  defaultExpanded?: boolean;
  children: ReactNode;
}

export default function CollapsibleSection({
  overline,
  title,
  subtitle,
  summaryBadge,
  defaultExpanded = false,
  children,
}: CollapsibleSectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const contentRef = useRef<HTMLDivElement>(null);
  const [measuredHeight, setMeasuredHeight] = useState(0);

  // Measure content height for smooth pixel-based animation (avoids height: 'auto' jitter)
  useEffect(() => {
    if (contentRef.current) {
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setMeasuredHeight(entry.contentRect.height);
        }
      });
      observer.observe(contentRef.current);
      return () => observer.disconnect();
    }
  }, [expanded]);

  return (
    <div className="mb-16">
      {/* Clickable header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left group cursor-pointer"
      >
        <div
          className="relative overflow-hidden rounded-2xl backdrop-blur-sm p-8 transition-all duration-500"
          style={{ background: 'var(--card-gradient)', boxShadow: 'var(--shadow-card)' }}
        >
          {/* Gold accent line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/20 to-transparent" />

          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              {overline && (
                <p className="text-[11px] uppercase tracking-[0.25em] font-medium text-accent-gold/70 mb-2">
                  {overline}
                </p>
              )}
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-text-primary">
                  {title}
                </h2>
                <AnimatePresence mode="wait">
                  {summaryBadge && !expanded && (
                    <motion.span
                      key="badge"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wider bg-accent-gold/10 text-accent-gold/80 border border-accent-gold/15"
                    >
                      {summaryBadge}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <AnimatePresence mode="wait">
                {subtitle && !expanded && (
                  <motion.p
                    key="subtitle"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                    className="text-sm leading-relaxed text-text-secondary/60 mt-2 max-w-3xl line-clamp-1"
                  >
                    {subtitle}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Chevron */}
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex-shrink-0 mt-2"
            >
              <ChevronDown
                size={20}
                className="text-text-tertiary group-hover:text-accent-gold/60 transition-colors duration-300"
              />
            </motion.div>
          </div>
        </div>
      </button>

      {/* Expandable content — uses measured pixel height for butter-smooth animation */}
      <motion.div
        initial={false}
        animate={{
          height: expanded ? measuredHeight : 0,
          opacity: expanded ? 1 : 0,
        }}
        transition={{
          height: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
          },
          opacity: {
            duration: expanded ? 0.5 : 0.25,
            delay: expanded ? 0.15 : 0,
            ease: [0.25, 0.1, 0.25, 1],
          },
        }}
        className="overflow-hidden"
      >
        <div ref={contentRef}>
          <div className="pt-8">
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
