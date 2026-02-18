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
        bg-[#12121A] border border-[#1F1F2E]
        backdrop-blur-sm
        ${hover ? 'hover:border-[#2A2A3D]' : ''}
        transition-all duration-300
        p-6
        ${className}
      `}
    >
      {accentLine && (
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4A853]/40 to-transparent" />
      )}
      {children}
    </div>
  );
}
