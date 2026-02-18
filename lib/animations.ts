import type { Variants, Transition } from 'framer-motion';

// ─── Spring Presets ─────────────────────────────────────────
// Apple-grade spring physics: no duration, pure physical feel

export const spring = {
  /** Default card/element hover — snappy with minimal overshoot */
  snappy: { type: 'spring', stiffness: 400, damping: 30 } as const,
  /** Standard entrance/exit — balanced feel */
  default: { type: 'spring', stiffness: 300, damping: 30 } as const,
  /** Soft, slow reveal — page-level or large sections */
  gentle: { type: 'spring', stiffness: 200, damping: 28 } as const,
  /** Hover lift — very quick, tactile */
  hover: { type: 'spring', stiffness: 500, damping: 30 } as const,
} satisfies Record<string, Transition>;

// ─── Stagger Containers ────────────────────────────────────
// Parent variants that orchestrate child stagger timing

export function staggerContainer(staggerDelay = 0.07): Variants {
  return {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: staggerDelay },
    },
  };
}

/** Default stagger — 0.07s between children */
export const container: Variants = staggerContainer(0.07);

/** Faster stagger for dense grids (products, metrics) */
export const containerFast: Variants = staggerContainer(0.05);

/** Slower stagger for sequential reveals (timelines, lists) */
export const containerSlow: Variants = staggerContainer(0.1);

// ─── Child Item Variants ───────────────────────────────────
// Individual element entrance animations using spring physics

export const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: spring.default,
  },
};

export const itemGentle: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: spring.gentle,
  },
};

export const itemSnappy: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: spring.snappy,
  },
};

// ─── Fade Variant (no Y movement) ─────────────────────────

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
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
