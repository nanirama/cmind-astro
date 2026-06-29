'use client';

import { motion, type Variants, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type AnimationVariant = 'fade-up' | 'fade-in' | 'slide-in' | 'scale-in' | 'stagger-child';

interface MotionWrapperProps {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const VARIANTS: Record<AnimationVariant, Variants> = {
  'fade-up': {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-in': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  'slide-in': {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  'scale-in': {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  'stagger-child': {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  },
};

export function MotionWrapper({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.5,
  className,
  as = 'div',
}: MotionWrapperProps) {
  const prefersReducedMotion = useReducedMotion();

  const MotionComponent = motion[as as keyof typeof motion] as typeof motion.div;

  if (prefersReducedMotion) {
    const Tag = as as any;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionComponent
      className={className}
      variants={VARIANTS[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration, delay, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </MotionComponent>
  );
}

// ── Stagger container ─────────────────────────────────────────────────────────

interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function StaggerContainer({ children, staggerDelay = 0.08, className }: StaggerContainerProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden:  {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  );
}
