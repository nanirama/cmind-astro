import { useMemo, useRef, useState } from 'react';

interface Item {
  title: string;
  description: string;
  href?: string;
  linkLabel: string;
}

interface TabImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface Tab {
  label: string;
  items: Item[];
  image: TabImage;
}

interface Props {
  tabs: Tab[];
  defaultTab?: string;
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3.5 10.5L10.5 3.5M10.5 3.5H5.5M10.5 3.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PmsStrategyExplorerTabs({ tabs, defaultTab }: Props) {
  const initialIndex = useMemo(() => {
    const match = tabs.findIndex((t) => t.label === defaultTab);
    return match >= 0 ? match : 0;
  }, [tabs, defaultTab]);

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = tabs[activeIndex];

  function focusTab(index: number) {
    setActiveIndex(index);
    requestAnimationFrame(() => tabRefs.current[index]?.focus());
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const count = tabs.length;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      focusTab((activeIndex + 1) % count);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      focusTab((activeIndex - 1 + count) % count);
    } else if (event.key === 'Home') {
      event.preventDefault();
      focusTab(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      focusTab(count - 1);
    }
  }

  if (!active) return null;

  return (
    <div>
      <div
        className="flex gap-md overflow-x-auto border-b border-border [-webkit-overflow-scrolling:touch] [overscroll-behavior-inline:contain] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Strategy category"
        onKeyDown={handleKeyDown}
      >
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={tab.label}
              ref={(el) => { tabRefs.current[index] = el; }}
              type="button"
              role="tab"
              id={`pse-tab-${index}`}
              aria-selected={isActive}
              aria-controls={`pse-panel-${index}`}
              tabIndex={isActive ? 0 : -1}
              className={`-mb-px min-h-11 shrink-0 whitespace-nowrap border-b-2 bg-transparent px-2xs py-xs pb-sm font-sans text-body-sm font-medium motion-safe:transition-[color,border-color] motion-safe:duration-fast motion-safe:ease-out-quart [-webkit-tap-highlight-color:transparent] [touch-action:manipulation] hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${
                isActive ? 'border-primary-700 font-semibold text-text-primary' : 'border-transparent text-text-secondary'
              }`}
              onClick={() => setActiveIndex(index)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-xl grid grid-cols-1 items-end gap-xl md:grid-cols-2">
        <div
          id={`pse-panel-${activeIndex}`}
          role="tabpanel"
          aria-labelledby={`pse-tab-${activeIndex}`}
          tabIndex={0}
          className="flex flex-col gap-sm focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          {active.items.map((item, index) => (
            <div className="rounded-lg bg-surface-raised p-md md:px-lg" key={index}>
              <h3 className="mb-2xs font-serif text-h5 font-medium text-text-primary">{item.title}</h3>
              <p className="mb-sm text-body-base text-text-secondary">{item.description}</p>
              {item.href && (
                <a
                  href={item.href}
                  className="inline-flex min-h-11 items-center gap-3xs font-sans text-body-sm font-medium text-text-primary underline underline-offset-[3px] [-webkit-tap-highlight-color:transparent] [touch-action:manipulation] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                >
                  {item.linkLabel}
                  <ArrowIcon />
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="relative before:absolute before:inset-0 before:-z-10 before:rounded-lg before:bg-[url('/images/background-img20.png')] before:bg-cover before:bg-center before:content-['']">
          <div className="flex justify-center md:justify-end">
            <img
              src={active.image.src}
              alt={active.image.alt}
              width={active.image.width ?? 420}
              height={active.image.height ?? 460}
              loading="lazy"
              decoding="async"
              className="h-auto w-full max-w-[22rem] md:max-w-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
