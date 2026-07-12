import { useState } from 'react';

interface ItemImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface Item {
  title: string;
  description: string;
  image: ItemImage;
}

interface Props {
  items: Item[];
  defaultOpenIndex?: number;
  badgeLabel?: string;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={`shrink-0 transition-transform duration-300 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] ${
        open ? 'rotate-180' : 'rotate-0'
      }`}
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AccordionImage({ image, className }: { image: ItemImage; className: string }) {
  return (
    <img
      src={image.src}
      alt={image.alt}
      width={image.width ?? 680}
      height={image.height ?? 560}
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
}

export default function WealthGapsAccordion({ items, defaultOpenIndex = 0, badgeLabel }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const [activeIndex, setActiveIndex] = useState(defaultOpenIndex);
  const activeItem = items[activeIndex];

  return (
    <div className="grid grid-cols-1 items-start gap-[var(--space-2xl)] md:grid-cols-[minmax(320px,480px)_1fr] md:gap-[var(--space-3xl)]">
      <div className="flex flex-col pl-6">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const triggerId = `wga-trigger-${index}`;
          const panelId = `wga-panel-${index}`;

          return (
            <div
              key={index}
              className={`-ml-[var(--space-md)] border-l-2 pl-[var(--space-md)] transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out-quart)] last:border-b last:border-b-[var(--color-border)] ${
                isOpen ? 'border-l-[var(--color-gray-900)]' : 'border-l-transparent'
              }`}
            >
              <h3 className="m-0">
                <button
                  type="button"
                  id={triggerId}
                  className={`flex w-full cursor-pointer items-center justify-between gap-[var(--space-md)] border-none bg-none py-[var(--space-md)] px-[var(--space-2xs)] text-left font-sans text-[length:var(--fs-h5)] leading-[var(--lh-h5)] font-medium transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out-quart)] hover:text-[color:var(--color-text-primary)] focus-visible:rounded-[var(--radius-sm)] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--color-primary-500)] ${
                    isOpen
                      ? 'text-[color:var(--color-text-primary)]'
                      : 'text-[color:var(--color-text-secondary)]'
                  }`}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => {
                    setOpenIndex(isOpen ? null : index);
                    setActiveIndex(index);
                  }}
                >
                  <span className="font-[family-name:var(--font-serif)] leading-[var(--lh-body-base)] text-[#525252]">
                    {item.title}
                  </span>
                  <ChevronIcon open={isOpen} />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                className={`grid overflow-hidden transition-[grid-template-rows] duration-[var(--duration-slow)] ease-[var(--ease-in-out-quart)] ${
                  isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="min-h-0 overflow-hidden">
                  <p className="m-0 max-w-[48ch] px-[var(--space-2xs)] pb-[var(--space-md)] text-[length:var(--fs-body-base)] leading-[var(--lh-body-base)] text-[#525252]">
                    {item.description}
                  </p>
                  <AccordionImage
                    image={item.image}
                    className="mb-[var(--space-md)] block h-auto w-full rounded-[var(--radius-lg)] px-[var(--space-2xs)] md:hidden"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {activeItem?.image && (
        <div className="relative hidden md:block">
          <AccordionImage
            key={activeIndex}
            image={activeItem.image}
            className="motion-safe:animate-fade-in mx-auto block h-auto w-full max-w-none"
          />
          {badgeLabel && (
            <span className="absolute top-[28%] right-[8%] inline-flex items-center gap-[var(--space-3xs)] rounded-full bg-[var(--color-surface)] py-[var(--space-3xs)] px-[var(--space-sm)] font-sans text-[length:var(--fs-body-sm)] font-medium text-[color:var(--color-text-primary)] shadow-[var(--shadow-md)]">
              <svg
                className="shrink-0 text-[#C4432B]"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 3.5L5 7L8 3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {badgeLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
