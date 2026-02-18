'use client';

interface SectionHeaderProps {
  overline?: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ overline, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-8">
      {overline && (
        <p className="text-xs uppercase tracking-[0.2em] font-medium text-[#D4A853] mb-2">
          {overline}
        </p>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-[#F0F0F5]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base leading-relaxed text-[#A0A0B0] mt-2 max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
