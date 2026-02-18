# ARCHITECTURE.md — V3 Dashboard Development Standards

**Read this file at the start of every session. These rules govern how all code is written, organized, and maintained.**

---

## Core Principle

Page files are COMPOSITIONS, not implementations. Pages assemble components — they don't build UI from scratch. Any piece of UI that has its own logic, state, or visual identity should be its own component file.

---

## File Size Rules

| File Type | Max Lines | What To Do If Over |
|---|---|---|
| Page files (app/dashboard/*/page.tsx) | 150 lines | Extract sections into components |
| Components (components/**/*.tsx) | 250 lines | Split into sub-components |
| Data files (data/*.ts) | 200 lines | Split by domain |
| Utility files (lib/*.ts) | 100 lines | Split by function category |

If a page file exceeds 150 lines, stop and extract before continuing. This is the #1 rule for scalability.

---

## Component Organization

```
components/
  charts/     — Data visualization (Recharts wrappers, D3, custom charts)
  cards/      — Card-level compositions (metric displays, product cards, country cards)
  sections/   — Page-level sections (group of cards + header + layout)
  layout/     — App shell (sidebar, topbar, auth)
  providers/  — Context providers (theme, auth, etc.)
  ui/         — Atomic UI primitives (buttons, badges, tooltips, dividers)
```

### When to create a new component:

1. It's used more than once → Always extract
2. It has its own state (useState, useMemo) → Always extract
3. It's a visual "block" with its own card/border/shadow → Extract
4. It's a chart or data visualization → Always extract into components/charts/
5. The page file would exceed 150 lines without it → Extract

### Naming conventions:

- PascalCase for component files: CountryCard.tsx, RevenueChart.tsx
- Component name matches filename exactly
- Props interface named {ComponentName}Props

---

## Page File Pattern

Every page should follow this structure and NOTHING MORE:

```tsx
'use client';

import { useState } from 'react';
// Component imports
// Data imports

export default function PageName() {
  // Minimal state (tab selection, filters — NOT business logic)

  return (
    <div className="space-y-8">
      <SectionHeader ... />
      <SomeSection ... />
      <AnotherSection ... />
    </div>
  );
}
```

Pages should NOT contain:
- Chart configurations or Recharts imports
- Complex useMemo calculations
- Inline card layouts with hardcoded styles
- Tooltip components
- Animation variant definitions
- Constants that belong in data files

---

## Color and Theming Rules

### NEVER use hardcoded hex in component or page files

```tsx
// WRONG
<div className="bg-[#111a2e] text-[#f0f0f0] border-[#2A2A3D]">

// CORRECT
<div className="bg-bg-secondary text-text-primary border-border-medium">
```

All colors must come from Tailwind tokens defined in tailwind.config.ts. If you need a new color, add it to the config.

### Chart colors

For Recharts/D3 where you need raw hex values, import from the central config:

```tsx
import { CHART_COLORS } from '@/lib/colors';
```

---

## Data Layer Rules

- All static data lives in data/*.ts
- All computed/derived data uses custom hooks in lib/hooks/
- No business logic in page files
- No magic numbers in components — define constants in data files

---

## Responsive Design Rules

All new components must be mobile-friendly from the start:
- Use Tailwind responsive prefixes: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Cards stack vertically on mobile
- Charts use ResponsiveContainer (already in use)
- Text sizes scale down on mobile: text-2xl md:text-3xl lg:text-4xl
- Padding reduces on mobile: p-4 md:p-6 lg:p-8
- Sidebar collapses on small screens

---

## Adding New Features — Checklist

1. Checkpoint first — git add -A && git commit -m "checkpoint: pre-[feature]"
2. Create component files — Never inline new UI into page files
3. Use Tailwind tokens — No hardcoded hex values
4. Import constants from data layer — No magic numbers
5. Keep pages under 150 lines — Extract if over
6. Update WORK_LOG.md — Document what was added
7. Checkpoint after — git add -A && git commit -m "complete: [feature]" && git push

---

## Refactoring Existing Pages

When you touch an existing page for any reason:
1. If it's over 150 lines, extract at least one section into a component
2. Replace any hardcoded hex colors with Tailwind tokens
3. Move any inline constants to the data layer
4. Don't refactor things you're not touching — stay focused

---

## Import Order Convention

```tsx
// 1. React
import { useState, useMemo } from 'react';

// 2. Next.js
import { useRouter } from 'next/navigation';

// 3. External libraries
import { motion } from 'framer-motion';
import { BarChart, Bar } from 'recharts';

// 4. Components
import SectionHeader from '@/components/ui/SectionHeader';
import MetricCard from '@/components/cards/MetricCard';

// 5. Data and utilities
import { countries } from '@/data/countries';
import { formatCurrency } from '@/lib/formatters';
import { CHART_COLORS } from '@/lib/colors';
```
