'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  accentLine?: boolean;
  hover?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Card({ children, className = '', accentLine = true, hover = true }: CardProps) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl
        backdrop-blur-sm
        transition-all duration-300
        p-8
        ${className}
      `}
      style={{ background: 'var(--card-gradient)', boxShadow: 'var(--shadow-card)' }}
    >
      {accentLine && (
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/20 to-transparent" />
      )}
      {children}
    </div>
  );
}
