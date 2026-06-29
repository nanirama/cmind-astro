import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSimpleDropdown } from "./useSimpleDropdown";

// ── Data ──────────────────────────────────────────────────────────────────────

const INSIGHTS_LINKS = [
  { id: "all", label: "All Insights", href: "/insights" },
  { id: "analysis", label: "Analysis & Commentary", href: "/insights/analysis" },
  { id: "investment", label: "Investment Information", href: "/insights/investment" },
  { id: "media", label: "Videos & Podcast", href: "/insights/media" },
  { id: "aplenty", label: "Aplenty", href: "/insights/aplenty" },
  { id: "archives", label: "Archives", href: "/insights/archives" },
];

// ── Sub-components ────────────────────────────────────────────────────────────

const AllInsightsPanel = memo(function AllInsightsPanel({ onClose }: { onClose: () => void }) {
  return (
    <a
      href="/insights"
      onClick={onClose}
      className="group flex h-full flex-row gap-[24px] overflow-hidden rounded-[8px] bg-[#1C2A1E] p-[16px] transition-transform hover:scale-[1.01]"
    >
      <div className="flex h-full w-[230px] shrink-0 flex-col justify-between">
        <h3 className="font-serif text-[24px] font-normal leading-[120%] tracking-[-5%] text-[var(--color-beige-50)]">
          Keep Track of Latest Investment News
        </h3>
        <p className="font-sans text-[16px] leading-[150%] text-[var(--color-beige-50)]">
          Description
        </p>
      </div>
      <div className="relative flex-1 overflow-hidden rounded-[8px]">
        <img
          src="/images/Rectangle%205641.png"
          alt="Investment News"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
      </div>
    </a>
  );
});

const AnalysisPanel = memo(function AnalysisPanel({ onClose }: { onClose: () => void }) {
  const collections = [
    { title: "Title", bg: "bg-[#C9D6C4]", icon: "/images/svgs/Feature_!.svg" },
    { title: "Title", bg: "bg-[#DFE5C2]", icon: "/images/svgs/feature_2.svg" },
    { title: "Title", bg: "bg-[#AEAD75]", icon: "/images/svgs/feature_3.svg" },
    { title: "Title", bg: "bg-[#C6D0BC]", icon: "/images/svgs/feature_4.svg" },
  ];
  const authors = [
    { name: "Name", image: "/images/author-pic-1.png" },
    { name: "Name", image: "/images/author-pic-2.png" },
    { name: "Name", image: "/images/person-img1.png" },
    { name: "Name", image: "/images/person-img2.png" },
  ];

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-col gap-4">
        <h4 className="font-serif text-[18px] text-[var(--color-text-secondary)]">Featured Collections</h4>
        <div className="grid grid-cols-4 gap-[16px]">
          {collections.map((col, idx) => (
            <a
              key={idx}
              href="/insights/collection"
              onClick={onClose}
              className={`group relative h-[150px] overflow-hidden rounded-[8px] p-5 transition-transform hover:scale-[1.02] ${col.bg}`}
            >
              <h5 className="relative z-10 font-serif text-[18px] font-medium text-[var(--color-text-primary)]">{col.title}</h5>
              <div className="pointer-events-none absolute bottom-0 right-0 h-[80px] w-[80px] transition-transform duration-500 group-hover:scale-110">
                <img src={col.icon} alt="" className="h-full w-full object-cover" />
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="font-serif text-[18px] text-[var(--color-text-secondary)]">Authors</h4>
        <div className="grid grid-cols-4 gap-[16px]">
          {authors.map((author, idx) => (
            <a
              key={idx}
              href="/insights/author"
              onClick={onClose}
              className="flex h-[89px] items-center gap-[16px] rounded-[8px] border border-[var(--color-border-subtle)] bg-[var(--color-surface-raised)] px-[16px] shadow-sm transition-transform hover:scale-[1.02]"
            >
              <div className="relative h-[56px] w-[56px] shrink-0 overflow-hidden rounded-full">
                <img
                  src={author.image}
                  alt={author.name}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span className="font-serif text-[16px] font-medium text-[var(--color-text-primary)]">{author.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
});

const InsightsDropdown = memo(function InsightsDropdown({
  isOpen,
  onClose,
  dropdownRef,
}: {
  isOpen: boolean;
  onClose: () => void;
  dropdownRef: React.MutableRefObject<HTMLDivElement | null>;
}) {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          id="insights-dropdown"
          role="dialog"
          aria-label="Insights menu"
          aria-modal="true"
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute left-0 top-full z-[var(--z-dropdown)] mt-[24px] flex w-max origin-top-left gap-[8px]"
        >
          <div className="flex w-[1280px] shrink-0 gap-[16px] rounded-[8px] border-2 border-[#E5E5E5] bg-[var(--color-beige-200)] p-[24px] shadow-[var(--shadow-xl)]">
            {/* Left: link list */}
            <div className="flex w-[264px] shrink-0 flex-col gap-[24px] rounded-[8px] border border-[var(--color-border-subtle)] bg-[var(--color-surface-raised)] p-[16px]">
              {INSIGHTS_LINKS.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={onClose}
                    onMouseEnter={() => setActiveTab(link.id)}
                    onFocus={() => setActiveTab(link.id)}
                    className={[
                      "flex items-center justify-between rounded-[4px] px-4 py-1.5 font-sans text-[16px] font-normal leading-[150%] tracking-[-0.019em] transition-colors",
                      isActive
                        ? "bg-[var(--color-beige-200)] text-[var(--color-text-primary)]"
                        : "text-[var(--color-text-secondary)] hover:bg-[var(--color-beige-100)] hover:text-[var(--color-text-primary)]",
                    ].join(" ")}
                  >
                    {link.label}
                    {isActive && (
                      <img
                        src="/images/svgs/arrow-up-right.svg"
                        alt=""
                        width={16}
                        height={16}
                        aria-hidden="true"
                        className="rotate-45"
                      />
                    )}
                  </a>
                );
              })}
            </div>
            {/* Right: dynamic panel */}
            <div className="flex-1 overflow-hidden">
              {activeTab === "analysis" ? (
                <AnalysisPanel onClose={onClose} />
              ) : (
                <AllInsightsPanel onClose={onClose} />
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

// ── Main export ───────────────────────────────────────────────────────────────

export default function InsightsMenu() {
  const { isOpen, openDropdown, collapse, triggerRef, menuRef } = useSimpleDropdown();

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="insights-dropdown"
        onClick={isOpen ? collapse : openDropdown}
        className={[
          "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[16px] font-normal font-inter transition-colors",
          isOpen
            ? "bg-[var(--color-beige-200)] text-[#000000]"
            : "text-[#111111] hover:bg-[var(--color-beige-100)] hover:text-[#000000]",
        ].join(" ")}
      >
        Insights
        <img
          src={isOpen ? "/images/svgs/caret-up.svg" : "/images/svgs/caret-down.svg"}
          alt=""
          width={12}
          height={12}
          aria-hidden="true"
          className="transition-transform duration-200 motion-reduce:transition-none"
        />
      </button>
      <InsightsDropdown dropdownRef={menuRef} isOpen={isOpen} onClose={collapse} />
    </>
  );
}
