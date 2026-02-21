'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Circle, AlertCircle } from 'lucide-react';

import Card from '@/components/ui/Card';
import { containerSlow, item, viewport } from '@/lib/animations';
import { MILESTONES, MILESTONE_STATS, type MilestoneStatus } from '@/data/milestones';
import { CHART_COLORS } from '@/lib/colors';

const statusConfig: Record<MilestoneStatus, { label: string; color: string; Icon: typeof CheckCircle2 }> = {
  completed: { label: 'Completed', color: CHART_COLORS.green, Icon: CheckCircle2 },
  'on-track': { label: 'On Track', color: CHART_COLORS.blue, Icon: Clock },
  delayed: { label: 'Delayed', color: CHART_COLORS.red, Icon: AlertCircle },
  upcoming: { label: 'Upcoming', color: '#6b7280', Icon: Circle },
};

const categoryLabels: Record<string, string> = {
  engineering: 'Engineering',
  capital: 'Capital',
  legal: 'Legal',
  partnerships: 'Partnerships',
  construction: 'Construction',
  regulatory: 'Regulatory',
};

export default function MilestoneTracker() {
  return (
    <motion.section
      variants={containerSlow}
      initial="hidden"
      whileInView="show"
      viewport={viewport.section}
    >
      {/* Stats bar */}
      <motion.div variants={item} className="mb-6">
        <Card hover={false} className="!p-4">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-xl font-bold" style={{ color: CHART_COLORS.green }}>
                {MILESTONE_STATS.totalCompleted}
              </span>
              <span className="text-xs text-text-tertiary">Completed</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-xl font-bold" style={{ color: CHART_COLORS.blue }}>
                {MILESTONE_STATS.totalOnTrack}
              </span>
              <span className="text-xs text-text-tertiary">On Track</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-xl font-bold" style={{ color: CHART_COLORS.red }}>
                {MILESTONE_STATS.totalDelayed}
              </span>
              <span className="text-xs text-text-tertiary">Delayed</span>
            </div>
            <div className="ml-auto flex items-baseline gap-2">
              <span className="text-xs text-text-tertiary">Guidance Accuracy</span>
              <span className="font-mono text-lg font-bold" style={{ color: CHART_COLORS.gold }}>
                {MILESTONE_STATS.guidanceAccuracyRate}
              </span>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border-subtle" />

        <div className="space-y-3">
          {MILESTONES.map((milestone) => {
            const { label, color, Icon } = statusConfig[milestone.status];
            return (
              <motion.div key={milestone.id} variants={item} className="relative pl-12">
                {/* Node */}
                <div
                  className="absolute left-2 top-3 w-5 h-5 rounded-full flex items-center justify-center bg-bg-primary"
                >
                  <Icon size={16} style={{ color }} />
                </div>

                <Card hover={false} className="!p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-semibold text-text-primary">{milestone.title}</h4>
                        <span
                          className="inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider"
                          style={{ color, backgroundColor: `${color}18`, border: `1px solid ${color}30` }}
                        >
                          {label}
                        </span>
                        <span className="text-[10px] text-text-tertiary/60 uppercase tracking-wider">
                          {categoryLabels[milestone.category]}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary mt-1">{milestone.description}</p>
                    </div>
                    {milestone.guidanceAccuracy && (
                      <p className="text-[10px] text-text-tertiary flex-shrink-0 mt-0.5">
                        {milestone.guidanceAccuracy}
                      </p>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
