'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { DISCLAIMERS } from '@/data/compliance';

interface DisclaimerProps {
  type: keyof typeof DISCLAIMERS;
  size?: 'sm' | 'md';
  collapsed?: boolean;
}

export default function Disclaimer({ type, size = 'sm', collapsed = false }: DisclaimerProps) {
  const [expanded, setExpanded] = useState(!collapsed);
  const text = DISCLAIMERS[type];

  if (size === 'md') {
    return (
      <div className="rounded-xl border border-border-subtle bg-bg-tertiary/30 p-5">
        {collapsed && !expanded ? (
          <button
            onClick={() => setExpanded(true)}
            className="flex items-center gap-2 text-xs text-text-tertiary hover:text-text-secondary transition-colors"
          >
            <span className="line-clamp-1">{text}</span>
            <ChevronDown size={14} className="flex-shrink-0" />
          </button>
        ) : (
          <p className="text-xs leading-relaxed text-text-tertiary">{text}</p>
        )}
      </div>
    );
  }

  // sm — fine-print footer
  if (collapsed && !expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className="text-[10px] text-text-tertiary/60 hover:text-text-tertiary transition-colors flex items-center gap-1"
      >
        Read full disclaimer
        <ChevronDown size={10} />
      </button>
    );
  }

  return (
    <p className="text-[10px] leading-relaxed text-text-tertiary/60">{text}</p>
  );
}
