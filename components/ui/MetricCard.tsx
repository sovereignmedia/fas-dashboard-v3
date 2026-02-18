'use client';

import { motion } from 'framer-motion';
import Card from './Card';
import { spring } from '@/lib/animations';

interface MetricCardProps {
  label: string;
  value: string;
  subtitle?: string;
  color?: string;
  onClick?: () => void;
}

export default function MetricCard({ label, value, subtitle, color, onClick }: MetricCardProps) {
  return (
    <motion.div
      whileHover={onClick ? { y: -2 } : undefined}
      transition={spring.hover}
      className={onClick ? 'cursor-pointer' : ''}
    >
      <Card hover={false}>
        <div onClick={onClick}>
          <p className="text-xs uppercase tracking-[0.2em] font-medium text-text-tertiary mb-3">
            {label}
          </p>
          <p
            className="font-mono text-4xl font-extralight tabular-nums mb-1"
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
    </motion.div>
  );
}
