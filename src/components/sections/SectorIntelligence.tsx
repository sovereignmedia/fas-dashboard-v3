'use client';

import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

import { marketArticles, type MarketArticle } from '@/data/market-context';
import { container, item, viewport } from '@/lib/animations';
import { CHART_COLORS } from '@/lib/colors';
import Card from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';

// ─── Source badge color map ───────────────────────────────────────────────────

const SOURCE_COLORS: Record<string, string> = {
  Bloomberg: CHART_COLORS.green,
  Reuters: CHART_COLORS.orange,
  'Utility Dive': CHART_COLORS.blue,
  'AP News': CHART_COLORS.purple,
  EIA: CHART_COLORS.gold,
  EnkiAI: CHART_COLORS.red,
  ResearchAndMarkets: CHART_COLORS.green,
};

function getSourceColor(source: string): string {
  // Match partial names for flexibility
  const key = Object.keys(SOURCE_COLORS).find((k) =>
    source.toLowerCase().includes(k.toLowerCase())
  );
  return key ? SOURCE_COLORS[key] : CHART_COLORS.goldDim;
}

// ─── Date formatter ───────────────────────────────────────────────────────────

function formatArticleDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ─── Article Card ─────────────────────────────────────────────────────────────

function ArticleCard({ article }: { article: MarketArticle }) {
  const sourceColor = getSourceColor(article.source);

  return (
    <motion.div variants={item} className="h-full">
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
          {/* Source badge + date row */}
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

          {/* Headline */}
          <h3 className="text-sm font-semibold leading-snug text-text-primary mb-3 group-hover:text-accent-gold transition-colors duration-200">
            {article.headline}
            <ExternalLink
              size={11}
              className="inline-block ml-1.5 mb-0.5 opacity-0 group-hover:opacity-60 transition-opacity duration-200"
            />
          </h3>

          {/* Summary */}
          <p className="text-xs leading-relaxed text-text-secondary flex-1 mb-4">
            {article.summary}
          </p>

          {/* Category tag */}
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

// ─── Component ────────────────────────────────────────────────────────────────

export default function SectorIntelligence() {
  return (
    <section className="mt-12">
      <SectionHeader
        overline="Sector Intelligence"
        title="AI & Energy Demand"
        subtitle="Curated coverage tracking the structural forces reshaping grid infrastructure, power markets, and energy supply chains."
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={viewport.section}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {marketArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </motion.div>

      {/* Disclaimer */}
      <div className="mt-6 px-1">
        <p className="text-[10px] text-text-tertiary">
          Articles link to original third-party sources. Headlines and summaries are presented as reported.
          All dates reflect original publication dates.
        </p>
      </div>
    </section>
  );
}
