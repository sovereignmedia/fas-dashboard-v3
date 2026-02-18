'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring, motion } from 'framer-motion';

interface AnimatedValueProps {
  /** Target numeric value (will be parsed from formatted string if needed) */
  value: number;
  /** Format function to display the number (e.g. formatCurrency) */
  format?: (n: number) => string;
  /** Duration feel — higher stiffness = faster snap */
  stiffness?: number;
  /** Damping — higher = less bounce */
  damping?: number;
  /** Number of decimal places */
  decimals?: number;
  /** CSS class for the number element */
  className?: string;
  /** Inline style */
  style?: React.CSSProperties;
}

export default function AnimatedValue({
  value,
  format,
  stiffness = 100,
  damping = 30,
  decimals = 0,
  className = '',
  style,
}: AnimatedValueProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness, damping });

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        const rounded = decimals > 0
          ? latest.toFixed(decimals)
          : Math.round(latest).toString();
        ref.current.textContent = format ? format(latest) : rounded;
      }
    });
    return unsubscribe;
  }, [springValue, format, decimals]);

  return (
    <motion.span
      ref={ref}
      className={className}
      style={style}
    >
      {format ? format(0) : '0'}
    </motion.span>
  );
}
