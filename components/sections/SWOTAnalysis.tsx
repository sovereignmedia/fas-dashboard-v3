'use client';

import { motion } from 'framer-motion';
import { container, item, viewport } from '@/lib/animations';
import { SWOT } from '@/data/swot';

const quadrants = [
  { key: 'strengths' as const, label: 'Strengths', color: '#00cc88', icon: '▲' },
  { key: 'weaknesses' as const, label: 'Weaknesses', color: '#e84040', icon: '▼' },
  { key: 'opportunities' as const, label: 'Opportunities', color: '#4088e8', icon: '◆' },
  { key: 'threats' as const, label: 'Threats', color: '#e88a30', icon: '◈' },
] as const;

export default function SWOTAnalysis() {
  return (
    <section>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={viewport.section}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {quadrants.map((q) => (
          <motion.div key={q.key} variants={item}>
            <div
              className="relative overflow-hidden rounded-2xl backdrop-blur-sm p-8 h-full"
              style={{ background: 'var(--card-gradient)', boxShadow: 'var(--shadow-card)' }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: `linear-gradient(to right, transparent, ${q.color}40, transparent)` }}
              />

              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold"
                  style={{ background: `${q.color}18`, color: q.color }}
                >
                  {q.icon}
                </span>
                <h3 className="text-lg font-semibold text-text-primary">{q.label}</h3>
                <span
                  className="ml-auto inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider"
                  style={{ background: `${q.color}18`, color: q.color }}
                >
                  {SWOT[q.key].length}
                </span>
              </div>

              {/* Items */}
              <ul className="space-y-3">
                {SWOT[q.key].map((entry, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: q.color }}
                    />
                    <span className="text-sm leading-relaxed text-text-secondary">{entry.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
