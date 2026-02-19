'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageSquare, AlertTriangle, CheckCircle2 } from 'lucide-react';

import Card from '@/components/ui/Card';
import { container, item, viewport } from '@/lib/animations';
import {
  DILIGENCE_QUESTIONS,
  DILIGENCE_CATEGORY_LABELS,
  DILIGENCE_STATS,
  type DiligenceCategory,
  type DiligenceQuestion,
} from '@/data/diligence-qa';
import { CHART_COLORS } from '@/lib/colors';

const ALL_CATEGORIES = Object.keys(DILIGENCE_CATEGORY_LABELS) as DiligenceCategory[];

export default function DiligenceQA() {
  const [activeCategory, setActiveCategory] = useState<DiligenceCategory | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered =
    activeCategory === 'all'
      ? DILIGENCE_QUESTIONS
      : DILIGENCE_QUESTIONS.filter((q) => q.category === activeCategory);

  // Group by category for display
  const grouped = filtered.reduce<Record<string, DiligenceQuestion[]>>((acc, q) => {
    const key = q.category;
    if (!acc[key]) acc[key] = [];
    acc[key].push(q);
    return acc;
  }, {});

  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={viewport.section}
    >
      {/* Stats */}
      <motion.div variants={item} className="mb-6 flex items-center gap-6 flex-wrap">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-2xl font-bold" style={{ color: CHART_COLORS.gold }}>
            {DILIGENCE_STATS.totalQuestions}
          </span>
          <span className="text-sm text-text-tertiary">questions addressed</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-2xl font-bold" style={{ color: CHART_COLORS.blue }}>
            {DILIGENCE_STATS.categoriesCount}
          </span>
          <span className="text-sm text-text-tertiary">diligence categories</span>
        </div>
      </motion.div>

      {/* Category filter */}
      <motion.div variants={item} className="flex gap-2 flex-wrap mb-6">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
            activeCategory === 'all'
              ? 'bg-accent-gold/15 text-accent-gold border border-accent-gold/30'
              : 'text-text-tertiary hover:text-text-secondary border border-border-subtle hover:border-border-subtle/80'
          }`}
        >
          All ({DILIGENCE_STATS.totalQuestions})
        </button>
        {ALL_CATEGORIES.map((cat) => {
          const count = DILIGENCE_QUESTIONS.filter((q) => q.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-accent-gold/15 text-accent-gold border border-accent-gold/30'
                  : 'text-text-tertiary hover:text-text-secondary border border-border-subtle hover:border-border-subtle/80'
              }`}
            >
              {DILIGENCE_CATEGORY_LABELS[cat]} ({count})
            </button>
          );
        })}
      </motion.div>

      {/* Questions by category */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="space-y-8"
        >
          {Object.entries(grouped).map(([category, questions]) => (
            <div key={category}>
              <h3 className="text-sm uppercase tracking-[0.15em] font-medium text-text-tertiary mb-3">
                {DILIGENCE_CATEGORY_LABELS[category as DiligenceCategory]}
              </h3>
              <div className="space-y-3">
                {questions.map((q) => (
                  <QuestionCard
                    key={q.id}
                    question={q}
                    expanded={expandedId === q.id}
                    onToggle={() => setExpandedId(expandedId === q.id ? null : q.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}

function QuestionCard({
  question,
  expanded,
  onToggle,
}: {
  question: DiligenceQuestion;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <Card hover={false}>
      {/* Question header */}
      <button
        onClick={onToggle}
        className="w-full text-left flex items-start gap-3"
      >
        <MessageSquare
          size={16}
          className="flex-shrink-0 mt-0.5"
          style={{ color: CHART_COLORS.gold }}
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-text-primary leading-relaxed pr-6">
            {question.question}
          </p>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 mt-0.5"
        >
          <ChevronDown size={16} className="text-text-tertiary" />
        </motion.div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-border-subtle space-y-4">
              {/* Underlying concern */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary mb-1.5">
                  Underlying Concern
                </p>
                <p className="text-xs text-text-secondary leading-relaxed italic">
                  {question.concern}
                </p>
              </div>

              {/* Implications */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <AlertTriangle size={12} style={{ color: CHART_COLORS.orange }} />
                  <p className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary">
                    Implications if Unresolved
                  </p>
                </div>
                <div className="space-y-1.5 pl-[18px]">
                  {question.implications.map((imp, i) => (
                    <p key={i} className="text-xs text-text-tertiary leading-relaxed">
                      • {imp}
                    </p>
                  ))}
                </div>
              </div>

              {/* Answer */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <CheckCircle2 size={12} style={{ color: CHART_COLORS.green }} />
                  <p className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary">
                    Frontieras Response
                  </p>
                </div>
                <p className="text-sm text-text-primary leading-relaxed pl-[18px]">
                  {question.answer}
                </p>
              </div>

              {/* Supplemental answer */}
              {question.supplementalAnswer && (
                <div className="pl-[18px]">
                  <div className="rounded-lg bg-accent-gold/5 border border-accent-gold/15 px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-accent-gold/70 mb-1.5">
                      Management Commentary
                    </p>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {question.supplementalAnswer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
