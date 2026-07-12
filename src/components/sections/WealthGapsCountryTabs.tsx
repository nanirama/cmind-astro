import { useMemo, useRef, useState } from 'react';

interface Issue {
  title: string;
  description: string;
}

interface MapImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface Country {
  label: string;
  mapImage?: MapImage;
  issues: Issue[];
}

interface Props {
  countries: Country[];
  defaultCountry?: string;
}

export default function WealthGapsCountryTabs({ countries, defaultCountry }: Props) {
  const initialIndex = useMemo(() => {
    const match = countries.findIndex((c) => c.label === defaultCountry);
    return match >= 0 ? match : 0;
  }, [countries, defaultCountry]);

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = countries[activeIndex];

  function focusTab(index: number) {
    setActiveIndex(index);
    requestAnimationFrame(() => tabRefs.current[index]?.focus());
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const count = countries.length;
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
        className="flex overflow-x-auto pb-[var(--space-3xs)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Country"
        onKeyDown={handleKeyDown}
      >
        {countries.map((country, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={country.label}
              ref={(el) => { tabRefs.current[index] = el; }}
              type="button"
              role="tab"
              id={`wgt-tab-${index}`}
              aria-selected={isActive}
              aria-controls={`wgt-panel-${index}`}
              tabIndex={isActive ? 0 : -1}
              className={`shrink-0 whitespace-nowrap border-b-2 bg-transparent py-[var(--space-sm)] px-[var(--space-xl)] font-sans text-[length:var(--fs-body-sm)] font-medium cursor-pointer transition-[background-color,color,border-color] duration-[var(--duration-fast)] ease-[var(--ease-out-quart)] hover:border-[var(--color-primary-700)] hover:text-[color:var(--color-text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-500)] ${
                isActive
                  ? 'border-[var(--color-primary-700)] text-[#405B28]'
                  : 'border-[#dad5ca] text-[#525252]'
              }`}
              onClick={() => setActiveIndex(index)}
            >
              {country.label}
            </button>
          );
        })}
      </div>

      <div className="mt-[var(--space-xl)] grid grid-cols-1 items-center gap-[var(--space-xl)] md:grid-cols-[1fr_minmax(300px,300px)] min-[1023px]:grid-cols-[1fr_minmax(320px,430px)]">
        <div
          id={`wgt-panel-${activeIndex}`}
          role="tabpanel"
          aria-labelledby={`wgt-tab-${activeIndex}`}
          tabIndex={0}
          className="flex flex-col gap-[var(--space-sm)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-500)]"
        >
          {active.issues.map((issue, index) => (
            <div
              className="flex flex-col gap-[var(--space-2xs)] rounded-[var(--radius-lg)] bg-[var(--color-surface)] py-[var(--space-md)] px-[var(--space-lg)]"
              key={index}
            >
              <h3 className="m-0 mb-[var(--space-2xs)] font-[family-name:var(--font-serif)] text-[length:var(--fs-h3)] font-medium leading-[var(--lh-h3)] text-[color:var(--color-text-primary)]">
                {issue.title}
              </h3>
              <p className="m-0 max-w-[18rem] text-[16px] leading-[var(--lh-body-base)] text-[#525252]">
                {issue.description}
              </p>
            </div>
          ))}
        </div>

        {active.mapImage && (
          <div className="relative flex justify-center md:justify-end">
            <div
              className="pointer-events-none absolute -top-[120px] left-0 -z-10 h-[120%] w-[120%] bg-[url('/images/background-img1.png')] bg-cover bg-center opacity-60"
              aria-hidden="true"
            />
            <img
              src={active.mapImage.src}
              alt={active.mapImage.alt}
              width={active.mapImage.width ?? 350}
              height={active.mapImage.height ?? 350}
              loading="lazy"
              decoding="async"
              className="h-auto w-full max-w-[22rem] md:max-w-none"
            />
          </div>
        )}
      </div>
    </div>
  );
}