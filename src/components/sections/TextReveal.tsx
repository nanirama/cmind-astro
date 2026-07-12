'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ElementType } from 'react';

interface TextRevealProps {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
}

export function TextReveal({ text, as: Tag = 'p', className = '', delay = 0 }: TextRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(' ');

  if (prefersReducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-top pb-[0.15em] -mb-[0.15em]">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1], delay: delay + i * 0.03 }}
          >
            {word}
            {i !== words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}