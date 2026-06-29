import { useState } from 'react';
import { cn } from '@utils/cn';

interface AccordionItem {
  id: string;
  trigger: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({ items, allowMultiple = false, className }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className={cn('accordion', className)}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        return (
          <div key={item.id} className={cn('accordion__item', isOpen && 'accordion__item--open')}>
            <button
              id={`accordion-trigger-${item.id}`}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
              className="accordion__trigger"
              onClick={() => toggle(item.id)}
            >
              <span>{item.trigger}</span>
              <svg
                className={cn('accordion__icon', isOpen && 'accordion__icon--open')}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div
              id={`accordion-panel-${item.id}`}
              role="region"
              aria-labelledby={`accordion-trigger-${item.id}`}
              hidden={!isOpen}
              className="accordion__panel"
            >
              <div className="accordion__panel-inner">{item.content}</div>
            </div>
          </div>
        );
      })}

      <style>{`
        .accordion { display: flex; flex-direction: column; gap: 4px; }

        .accordion__item {
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: border-color 150ms;
        }

        .accordion__item--open { border-color: var(--color-primary-300); }

        .accordion__trigger {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          width: 100%;
          padding: 1rem 1.25rem;
          background: none;
          border: none;
          font-family: var(--font-sans);
          font-size: var(--fs-text-md);
          font-weight: 600;
          color: var(--color-text-primary);
          cursor: pointer;
          text-align: left;
          transition: background-color 150ms;
        }

        .accordion__trigger:hover { background-color: var(--color-surface-raised); }

        .accordion__trigger:focus-visible {
          outline: 2px solid var(--color-primary-500);
          outline-offset: 2px;
        }

        .accordion__icon {
          flex-shrink: 0;
          color: var(--color-text-tertiary);
          transition: transform 200ms cubic-bezier(0.25, 1, 0.5, 1);
        }

        .accordion__icon--open { transform: rotate(180deg); }

        .accordion__panel { border-top: 1px solid var(--color-border); }
        .accordion__panel-inner { padding: 1rem 1.25rem; }
      `}</style>
    </div>
  );
}
