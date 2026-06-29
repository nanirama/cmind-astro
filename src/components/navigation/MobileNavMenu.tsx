import { useState } from "react";
import { personas } from "./WhoWeServeMenu";

export default function MobileNavMenu({ onSelect }: { onSelect: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-who-we-serve-menu"
        aria-label={open ? "Collapse Who we serve menu" : "Expand Who we serve menu"}
        className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-beige-100)]"
      >
        <span>Who we serve?</span>
        <img
          src={open ? "/images/svgs/caret-up.svg" : "/images/svgs/caret-down.svg"}
          alt=""
          width={12}
          height={12}
          aria-hidden="true"
        />
      </button>
      <div
        id="mobile-who-we-serve-menu"
        className={`overflow-hidden transition-all duration-200 motion-reduce:transition-none ${
          open ? "max-h-80" : "max-h-0"
        }`}
        aria-hidden={!open}
      >
        <ul className="ml-3 mt-1 space-y-0.5 border-l border-[var(--color-border)] pl-3">
          {personas.map((p) => (
            <li key={p.id}>
              <a
                href={`/who-we-serve/${p.id}`}
                onClick={onSelect}
                className="block rounded py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary-600)]"
              >
                {p.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
