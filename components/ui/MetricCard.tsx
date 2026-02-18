'use client';

import Card from './Card';

interface MetricCardProps {
  label: string;
  value: string;
  subtitle?: string;
  color?: string;
  onClick?: () => void;
}

export default function MetricCard({ label, value, subtitle, color, onClick }: MetricCardProps) {
  return (
    <Card
      className={`${onClick ? 'cursor-pointer hover:scale-[1.02]' : ''}`}
      hover={!!onClick}
    >
      <div onClick={onClick}>
        <p className="text-xs uppercase tracking-[0.2em] font-medium text-text-tertiary mb-3">
          {label}
        </p>
        <p
          className="font-mono text-3xl font-bold tabular-nums mb-1"
          style={{
            color: color || 'var(--text-primary)',
            textShadow: color ? `0 0 20px ${color}40` : '0 0 20px var(--glow-gold)',
          }}
        >
          {value}
        </p>
        {subtitle && (
          <p className="text-sm text-text-secondary">{subtitle}</p>
        )}
      </div>
    </Card>
  );
}
