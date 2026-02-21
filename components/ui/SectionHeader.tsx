'use client';

interface SectionHeaderProps {
  overline?: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ overline, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-12">
      {overline && (
        <p className="text-[11px] uppercase tracking-[0.25em] font-medium text-accent-gold/70 mb-2">
          {overline}
        </p>
      )}
      <h2 className="text-4xl font-light tracking-tight text-text-primary">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg leading-relaxed text-text-secondary/80 mt-3 max-w-3xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
