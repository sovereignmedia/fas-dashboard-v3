import type { Variants, Transition } from 'framer-motion';

// ─── Easing ─────────────────────────────────────────────────
// Premium cubic-bezier curves used throughout

export const ease = {
  /** Default — smooth deceleration, Apple-style */
  default: [0.25, 0.1, 0.25, 1] as const,
  /** Emphasis — slightly more dramatic entry */
  emphasis: [0.16, 1, 0.3, 1] as const,
};

// ─── Spring Presets ─────────────────────────────────────────
// Tuned for smooth, non-bouncy motion — premium feel

export const spring = {
  /** Default card/element hover — snappy with minimal overshoot */
  snappy: { type: 'spring', stiffness: 300, damping: 35 } as const,
  /** Standard entrance/exit — smooth, no bounce */
  default: { type: 'spring', stiffness: 200, damping: 30 } as const,
  /** Soft, slow reveal — page-level or large sections */
  gentle: { type: 'spring', stiffness: 120, damping: 24 } as const,
  /** Hover lift — very quick, tactile */
  hover: { type: 'spring', stiffness: 400, damping: 30 } as const,
} satisfies Record<string, Transition>;

// ─── Stagger Containers ────────────────────────────────────
// Parent variants that orchestrate child stagger timing

export function staggerContainer(staggerDelay = 0.08): Variants {
  return {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: staggerDelay },
    },
  };
}

/** Default stagger — 0.08s between children */
export const container: Variants = staggerContainer(0.08);

/** Faster stagger for dense grids (products, metrics) */
export const containerFast: Variants = staggerContainer(0.06);

/** Slower stagger for sequential reveals (timelines, lists) */
export const containerSlow: Variants = staggerContainer(0.12);

// ─── Child Item Variants ───────────────────────────────────
// Individual element entrance animations — subtle Y movement

export const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: ease.default },
  },
};

export const itemGentle: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: ease.default },
  },
};

export const itemSnappy: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: ease.default },
  },
};

// ─── Fade Variant (no Y movement) ─────────────────────────

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.6, ease: ease.default },
  },
};

// ─── Viewport Config ───────────────────────────────────────
// Shared viewport options for whileInView triggers

export const viewport = {
  /** Standard section reveal — triggers 80px before entering */
  section: { once: true, margin: '-80px' as const },
  /** Eager — triggers as soon as element touches viewport */
  eager: { once: true, margin: '0px' as const },
} as const;
