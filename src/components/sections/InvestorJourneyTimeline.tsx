import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface Milestone {
  year: string;
  title: string;
  quote: string;
}

interface Props {
  milestones: Milestone[];
}

export default function InvestorJourneyTimeline({ milestones }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const markerTop = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={containerRef} className="relative">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[5px] top-[10px] bottom-[10px] w-px bg-border-strong sm:left-[7px]"
      />

      {!prefersReducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[5px] top-[10px] bottom-[10px] sm:left-[7px]"
        >
          <motion.span
            className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-none bg-gold-500"
            style={{ top: markerTop }}
          />
        </div>
      )}

      <ol className="relative flex flex-col gap-10 lg:gap-20">
        {milestones.map((milestone, index) => (
          <li key={index} className="grid grid-cols-[auto_1fr] items-start gap-x-md lg:gap-x-24">
            <div className="relative z-10 flex items-center gap-xs pt-1">
              <span
                aria-hidden="true"
                className="block h-3.5 w-3.5 flex-shrink-0 rounded-full bg-gold-500 shadow-[0_0_0_6px_rgba(231,171,74,0.25)]"
              />
              <span className="whitespace-nowrap text-body-sm text-text-tertiary">{milestone.year}</span>
            </div>
            <motion.div
              initial={prefersReducedMotion ? undefined : { opacity: 0.35 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="min-w-0 pb-1"
            >
              <h3 className="mb-xs font-serif text-h5 font-medium text-text-primary">{milestone.title}</h3>
              <p className="max-w-[52ch] text-body-base text-text-secondary">&ldquo;{milestone.quote}&rdquo;</p>
            </motion.div>
          </li>
        ))}
      </ol>
    </div>
  );
}