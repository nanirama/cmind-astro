import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSimpleDropdown } from "./useSimpleDropdown";

// ── Types ─────────────────────────────────────────────────────────────────────

interface AboutColumn {
  title: string;
  href: string;
  sections: { label: string; href: string }[];
}

export interface AboutMenuData {
  triggerLabel: string;
  columns: AboutColumn[];
}

// ── Sub-component ─────────────────────────────────────────────────────────────

const AboutDropdown = memo(function AboutDropdown({
  isOpen,
  onClose,
  dropdownRef,
  columns,
}: {
  isOpen: boolean;
  onClose: () => void;
  dropdownRef: React.MutableRefObject<HTMLDivElement | null>;
  columns: AboutColumn[];
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          id="about-dropdown"
          role="dialog"
          aria-label="About menu"
          aria-modal="true"
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute left-0 top-full z-[var(--z-dropdown)] mt-[24px] flex w-[1280px] origin-top-left"
        >
          <div className="w-full rounded-[8px] border-2 border-[#E5E5E5] bg-[var(--color-beige-200)] p-[24px] shadow-[var(--shadow-xl)]">
            <div className="grid grid-cols-3 gap-[16px]">
              {columns.map((column, idx) => (
                <div
                  key={idx}
                  className="flex h-[243px] flex-col rounded-[8px] border border-[var(--color-border-subtle)] bg-[var(--color-surface-raised)] p-[24px]"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-[16px] text-[var(--color-text-primary)]">
                      {column.title}
                    </h4>
                    <a
                      href={column.href}
                      onClick={onClose}
                      aria-label={`View all ${column.title}`}
                      className="flex h-[24px] w-[24px] items-center justify-center bg-[var(--color-text-primary)] transition-transform hover:scale-[1.05]"
                    >
                      <img
                        src="/images/svgs/arrow-up-right.svg"
                        alt=""
                        width={14}
                        height={14}
                        aria-hidden="true"
                        className="invert"
                      />
                    </a>
                  </div>
                  <ul className="mt-auto flex flex-col">
                    {column.sections.map((sec, i) => (
                      <li
                        key={i}
                        className={`flex h-[40px] items-center ${
                          i !== column.sections.length - 1
                            ? "border-b border-[var(--color-border-subtle)]"
                            : ""
                        }`}
                      >
                        <a
                          href={sec.href}
                          onClick={onClose}
                          className="flex h-full w-full items-center font-sans text-[14px] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
                        >
                          {sec.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

// ── Main export ───────────────────────────────────────────────────────────────

export default function AboutMenu({ data }: { data: AboutMenuData }) {
  const { isOpen, openDropdown, collapse, triggerRef, menuRef } = useSimpleDropdown();

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="about-dropdown"
        onClick={isOpen ? collapse : openDropdown}
        className={[
          "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[16px] font-normal font-inter transition-colors",
          isOpen
            ? "bg-[var(--color-beige-200)] text-[#000000]"
            : "text-[#111111] hover:bg-[var(--color-beige-100)] hover:text-[#000000]",
        ].join(" ")}
      >
        {data.triggerLabel}
        <img
          src={isOpen ? "/images/svgs/caret-up.svg" : "/images/svgs/caret-down.svg"}
          alt=""
          width={12}
          height={12}
          aria-hidden="true"
          className="transition-transform duration-200 motion-reduce:transition-none"
        />
      </button>
      <AboutDropdown dropdownRef={menuRef} isOpen={isOpen} onClose={collapse} columns={data.columns} />
    </>
  );
}
