'use client';

import { useState, useMemo } from 'react';
import { ExternalLink, ArrowDownUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { marketArticles, type MarketArticle } from '@/data/market-context';
import { container, item, viewport } from '@/lib/animations';
import { CHART_COLORS } from '@/lib/colors';
import Card from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';

const CATEGORIES = [
  { key: 'ALL', label: 'All', color: CHART_COLORS.gold },
  { key: 'AI POWER DEMAND', label: 'AI Power', color: CHART_COLORS.blue },
  { key: 'GRID & INFRASTRUCTURE', label: 'Grid', color: CHART_COLORS.orange },
  { key: 'NUCLEAR & BASELOAD', label: 'Nuclear', color: CHART_COLORS.green },
  { key: 'POLICY & REGULATION', label: 'Policy', color: CHART_COLORS.purple },
  { key: 'ENERGY MARKETS', label: 'Markets', color: CHART_COLORS.gold },
  { key: 'INDUSTRIAL DEMAND', label: 'Industrial', color: CHART_COLORS.red },
] as const;

const SOURCE_COLORS: Record<string, string> = {
  Bloomberg: CHART_COLORS.green,
  Reuters: CHART_COLORS.orange,
  'Utility Dive': CHART_COLORS.blue,
  'AP News': CHART_COLORS.purple,
  EIA: CHART_COLORS.gold,
  EnkiAI: CHART_COLORS.red,
  ResearchAndMarkets: CHART_COLORS.green,
  'Financial Times': CHART_COLORS.gold,
  WSJ: CHART_COLORS.blue,
  Forbes: CHART_COLORS.green,
  Axios: CHART_COLORS.orange,
  Politico: CHART_COLORS.red,
  'Seeking Alpha': CHART_COLORS.orange,
  'Goldman Sachs': CHART_COLORS.blue,
  'Morgan Stanley': CHART_COLORS.blue,
  IEA: CHART_COLORS.green,
};

function getSourceColor(source: string): string {
  const key = Object.keys(SOURCE_COLORS).find((k) =>
    source.toLowerCase().includes(k.toLowerCase())
  );
  return key ? SOURCE_COLORS[key] : CHART_COLORS.goldDim;
}

function formatArticleDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function FilterChip({
  label,
  color,
  isActive,
  count,
  onClick,
}: {
  label: string;
  color: string;
  isActive: boolean;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] font-semibold rounded-full px-3 py-1.5 transition-all duration-200 border ${
        isActive
          ? 'border-transparent'
          : 'border-border-subtle/60 text-text-tertiary hover:text-text-secondary hover:border-border-subtle'
      }`}
      style={
        isActive
          ? { color, backgroundColor: `${color}18`, borderColor: `${color}30` }
          : undefined
      }
    >
      {label}
      <span
        className={`text-[9px] font-mono ${isActive ? '' : 'text-text-tertiary/60'}`}
        style={isActive ? { color: `${color}99` } : undefined}
      >
        {count}
      </span>
    </button>
  );
}

function ArticleCard({ article }: { article: MarketArticle }) {
  const sourceColor = getSourceColor(article.source);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className="h-full"
    >
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full group"
      >
        <Card
          hover={false}
          accentLine
          className="!p-6 h-full flex flex-col transition-colors duration-200 group-hover:border-accent-gold/20"
        >
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-[10px] uppercase tracking-[0.15em] font-semibold rounded px-2 py-0.5"
              style={{ color: sourceColor, backgroundColor: `${sourceColor}15` }}
            >
              {article.source}
            </span>
            <span className="text-[10px] text-text-tertiary">
              {formatArticleDate(article.date)}
            </span>
          </div>

          <h3 className="text-sm font-semibold leading-snug text-text-primary mb-3 group-hover:text-accent-gold transition-colors duration-200">
            {article.headline}
            <ExternalLink
              size={11}
              className="inline-block ml-1.5 mb-0.5 opacity-0 group-hover:opacity-60 transition-opacity duration-200"
            />
          </h3>

          <p className="text-xs leading-relaxed text-text-secondary flex-1 mb-4">
            {article.summary}
          </p>

          <div className="mt-auto">
            <span className="text-[9px] uppercase tracking-[0.25em] font-semibold text-accent-gold/60">
              {article.category}
            </span>
          </div>
        </Card>
      </a>
    </motion.div>
  );
}

export default function SectorIntelligence() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [sortNewest, setSortNewest] = useState(true);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: marketArticles.length };
    for (const article of marketArticles) {
      counts[article.category] = (counts[article.category] || 0) + 1;
    }
    return counts;
  }, []);

  const filteredArticles = useMemo(() => {
    const articles = activeCategory === 'ALL'
      ? [...marketArticles]
      : marketArticles.filter((a) => a.category === activeCategory);

    articles.sort((a, b) => {
      const diff = new Date(b.date).getTime() - new Date(a.date).getTime();
      return sortNewest ? diff : -diff;
    });

    return articles;
  }, [activeCategory, sortNewest]);

  return (
    <section className="mt-12">
      <SectionHeader
        overline="Sector Intelligence"
        title="AI & Energy Demand"
        subtitle="Curated coverage tracking the structural forces reshaping grid infrastructure, power markets, and energy supply chains."
      />

      <div className="flex flex-wrap items-center gap-2 mb-6">
        {CATEGORIES.map((cat) => (
          <FilterChip
            key={cat.key}
            label={cat.label}
            color={cat.color}
            isActive={activeCategory === cat.key}
            count={categoryCounts[cat.key] || 0}
            onClick={() => setActiveCategory(cat.key)}
          />
        ))}

        <div className="ml-auto">
          <button
            onClick={() => setSortNewest((v) => !v)}
            className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] font-semibold text-text-tertiary hover:text-text-secondary transition-colors"
          >
            <ArrowDownUp size={11} />
            {sortNewest ? 'Newest first' : 'Oldest first'}
          </button>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-sm text-text-tertiary">No articles in this category yet.</p>
        </div>
      )}

      <div className="mt-6 px-1">
        <p className="text-[10px] text-text-tertiary">
          Articles link to original third-party sources. Headlines and summaries are presented as reported.
          All dates reflect original publication dates.
        </p>
      </div>
    </section>
  );
}
