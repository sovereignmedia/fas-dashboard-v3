'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  accentLine?: boolean;
  hover?: boolean;
}

export default function Card({ children, className = '', accentLine = true, hover = true }: CardProps) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl
        border border-border-subtle
        backdrop-blur-sm
        ${hover ? 'hover:border-border-medium' : ''}
        transition-all duration-300
        p-6
        ${className}
      `}
      style={{ background: 'var(--card-gradient)', boxShadow: 'var(--shadow-card)' }}
    >
      {accentLine && (
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/40 to-transparent" />
      )}
      {children}
    </div>
  );
}
