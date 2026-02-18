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
        <p className="text-xs uppercase tracking-[0.2em] font-medium text-[#606075] mb-3">
          {label}
        </p>
        <p
          className="font-mono text-3xl font-bold tabular-nums mb-1"
          style={{
            color: color || '#F0F0F5',
            textShadow: color ? `0 0 20px ${color}40` : '0 0 20px rgba(212,168,83,0.3)',
          }}
        >
          {value}
        </p>
        {subtitle && (
          <p className="text-sm text-[#A0A0B0]">{subtitle}</p>
        )}
      </div>
    </Card>
  );
}
