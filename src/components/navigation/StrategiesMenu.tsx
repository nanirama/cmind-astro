import { useState, useCallback, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────────────────

type MenuState = "closed" | "dropdown" | "morph";

interface StrategyCard {
  id: string;
  title: string;
  href: string;
  alignCenter: boolean;
  subLabels: string[];
}

export interface StrategiesMenuData {
  triggerLabel: string;
  pmsCard: { title: string; href: string; description: string; icon: string };
  strategyCards: StrategyCard[];
  mutualFundsCard: { title: string; href: string; description: string; image: string };
  morphPmsLabel: string;
}

// ── Hook ──────────────────────────────────────────────────────────────────────

function useStrategiesMenuState(scrollThreshold = 80) {
  const [menuState, setMenuState] = useState<MenuState>("closed");
  const [activeStrategyId, setActiveStrategyId] = useState("");
  const [hasScrolled, setHasScrolled] = useState(false);
  const [userCollapsed, setUserCollapsed] = useState(false);

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > scrollThreshold;
      setHasScrolled(scrolled);
      if (!scrolled) setUserCollapsed(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold]);

  useEffect(() => {
    if (menuState === "dropdown") return;
    const shouldMorph = !!activeStrategyId && !userCollapsed;
    const newState = shouldMorph ? "morph" : "closed";
    if (menuState === newState) return;
    const timer = setTimeout(() => setMenuState(newState), 0);
    return () => clearTimeout(timer);
  }, [activeStrategyId, userCollapsed, menuState]);

  useEffect(() => {
    if (menuState !== "dropdown") return;
    const handleClick = (e: MouseEvent) => {
      if (
        !menuRef.current?.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) {
        setMenuState(hasScrolled ? "morph" : "closed");
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuState, hasScrolled]);

  useEffect(() => {
    if (menuState !== "dropdown") return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuState(hasScrolled ? "morph" : "closed");
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuState, hasScrolled]);

  useEffect(() => {
    const handleReset = () => {
      setUserCollapsed(false);
      setActiveStrategyId("");
      setMenuState("closed");
    };
    window.addEventListener("reset-header-menus", handleReset);
    return () => window.removeEventListener("reset-header-menus", handleReset);
  }, []);

  const openDropdown = useCallback(() => setMenuState("dropdown"), []);
  const collapse = useCallback(() => {
    setUserCollapsed(true);
    setActiveStrategyId("");
    setMenuState("closed");
  }, []);
  const selectStrategy = useCallback((id: string) => {
    setActiveStrategyId(id);
    setMenuState("morph");
  }, []);

  return {
    menuState,
    activeStrategyId,
    openDropdown,
    collapse,
    selectStrategy,
    triggerRef,
    menuRef,
  };
}

// ── Sub-components ────────────────────────────────────────────────────────────

const StrategiesDropdown = memo(function StrategiesDropdown({
  id,
  isOpen,
  onStrategySelect,
  dropdownRef,
  data,
}: {
  id: string;
  isOpen: boolean;
  onStrategySelect: (id: string) => void;
  dropdownRef: React.MutableRefObject<HTMLDivElement | null>;
  data: StrategiesMenuData;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          id={id}
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute left-0 top-full z-[var(--z-dropdown)] mt-[24px] flex w-max origin-top-left gap-[8px]"
        >
          {/* Left + Middle: beige container */}
          <div className="flex h-[539px] w-[952px] shrink-0 gap-[24px] rounded-[8px] border-2 border-[#E5E5E5] bg-[var(--color-beige-200)] p-[24px] shadow-[var(--shadow-xl)]">
            {/* Left: PMS Strategies */}
            <a
              href={data.pmsCard.href}
              onClick={(e) => { e.preventDefault(); onStrategySelect("pms"); }}
              className="group relative flex h-[491px] w-[285px] shrink-0 flex-col justify-between overflow-hidden rounded-[8px] bg-[var(--color-primary-800)] p-[16px] text-[var(--color-beige-50)] transition-transform hover:scale-[1.01]"
            >
              <div className="z-10 flex items-start justify-between">
                <h3 className="font-serif text-[24px] font-normal leading-[120%] tracking-[-5%] text-[var(--color-beige-50)]">
                  {data.pmsCard.title}
                </h3>
                <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center bg-white transition-colors group-hover:bg-gray-100" aria-hidden="true">
                  <img src="/images/svgs/arrow-up-right.svg" alt="" width={12} height={12} aria-hidden="true" />
                </span>
              </div>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <img src={data.pmsCard.icon} alt="" width={240} height={240} aria-hidden="true" className="h-auto w-[85%] object-contain" />
              </div>
              <p className="z-10 font-sans text-[16px] leading-[150%] text-[var(--color-beige-50)]">
                {data.pmsCard.description}
              </p>
            </a>

            {/* Middle: 2×2 grid */}
            <div className="grid w-[594px] shrink-0 grid-cols-2 gap-x-[24px] gap-y-[16px]">
              {data.strategyCards.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); onStrategySelect(item.id); }}
                  className="group flex h-[237.5px] w-[285px] shrink-0 flex-col justify-between rounded-[8px] border border-[var(--color-border-subtle)] bg-[var(--color-surface-raised)] p-[16px] shadow-sm transition-transform hover:scale-[1.01]"
                >
                  <div className={`flex ${item.alignCenter ? "mt-[16px] items-center" : "items-start"} justify-between`}>
                    <h4 className="font-serif text-[16px] font-medium leading-[120%] tracking-[-5%] text-[var(--color-text-primary)]">
                      {item.title}
                    </h4>
                    <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center bg-[var(--color-text-primary)] transition-colors group-hover:bg-black" aria-hidden="true">
                      <img src="/images/svgs/arrow-up-right.svg" alt="" width={12} height={12} aria-hidden="true" className="invert" />
                    </span>
                  </div>
                  <div className="mt-8 space-y-3">
                    {item.subLabels.map((label, idx) => (
                      <div
                        key={idx}
                        className={idx === 0 ? "border-b border-[var(--color-border-subtle)] pb-2 text-[14px] font-sans text-[var(--color-text-secondary)]" : "text-[14px] font-sans text-[var(--color-text-secondary)]"}
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Capitalmind Mutual Funds */}
          <a
            href={data.mutualFundsCard.href}
            onClick={(e) => { e.preventDefault(); onStrategySelect("mutual-funds"); }}
            className="group relative flex h-[539px] w-[320px] shrink-0 flex-col justify-between overflow-hidden rounded-[8px] bg-[#1C102A] p-[16px] text-white shadow-[var(--shadow-lg)] transition-transform hover:scale-[1.01]"
          >
            <div className="z-10 flex items-start justify-between">
              <h3 className="font-serif text-[24px] font-normal leading-[120%] tracking-[-5%] text-[var(--color-beige-50)]">
                {data.mutualFundsCard.title}
              </h3>
              <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center bg-white transition-colors group-hover:bg-gray-100" aria-hidden="true">
                <img src="/images/svgs/arrow-up-right.svg" alt="" width={12} height={12} aria-hidden="true" />
              </span>
            </div>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <img src={data.mutualFundsCard.image} alt="" width={260} height={180} aria-hidden="true" className="h-auto w-[85%] object-contain" />
            </div>
            <p className="z-10 font-sans text-[16px] leading-[150%] text-[var(--color-beige-50)]">
              {data.mutualFundsCard.description}
            </p>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

const StrategiesMorphBar = memo(function StrategiesMorphBar({
  activeStrategyId,
  onStrategySelect,
  morphPmsLabel,
  morphLinks,
}: {
  activeStrategyId: string;
  onStrategySelect: (id: string) => void;
  morphPmsLabel: string;
  morphLinks: { id: string; label: string }[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="flex h-full w-full items-center justify-center gap-4"
    >
      <div className="flex items-center gap-8">
        <a
          href="/strategies/pms"
          onClick={(e) => { e.preventDefault(); onStrategySelect("pms"); }}
          className="inline-flex h-[48px] w-[155px] items-center justify-center rounded-[8px] bg-[#102519] text-[16px] font-medium font-inter text-white transition-opacity hover:opacity-90"
        >
          {morphPmsLabel}
        </a>
        <div className="flex items-center gap-8">
          {morphLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => onStrategySelect(link.id)}
              className={[
                "text-[16px] font-medium font-inter transition-colors",
                activeStrategyId === link.id
                  ? "text-[#008F49]"
                  : "text-[#6F6F6F] hover:text-[#111111]",
              ].join(" ")}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
});

// ── Main export ───────────────────────────────────────────────────────────────

export default function StrategiesMenu({
  data,
  onMorphChange,
}: {
  data: StrategiesMenuData;
  onMorphChange: (isMorphed: boolean) => void;
}) {
  const {
    menuState,
    activeStrategyId,
    openDropdown,
    collapse,
    selectStrategy,
    triggerRef,
    menuRef,
  } = useStrategiesMenuState();

  const isMorphed = menuState === "morph";
  const isOpen = menuState === "dropdown";
  const morphLinks = data.strategyCards.map((card) => ({ id: card.id, label: card.title }));

  useEffect(() => {
    onMorphChange(isMorphed);
  }, [isMorphed, onMorphChange]);

  if (isMorphed) {
    return (
      <StrategiesMorphBar
        activeStrategyId={activeStrategyId}
        onStrategySelect={selectStrategy}
        morphPmsLabel={data.morphPmsLabel}
        morphLinks={morphLinks}
      />
    );
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="strategies-menu-dropdown"
        onClick={isOpen ? collapse : openDropdown}
        className={[
          "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[16px] font-normal font-inter transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-primary-500)] focus-visible:outline-offset-2",
          isOpen
            ? "bg-[var(--color-beige-200)] text-[#000000]"
            : "text-[#111111] hover:bg-[var(--color-beige-100)] hover:text-[#000000]",
        ].join(" ")}
      >
        {data.triggerLabel}
        <img
          src={isOpen ? "/images/svgs/caret-up.svg" : "/images/svgs/caret-down.svg"}
          alt=""
          width={14}
          height={14}
          aria-hidden="true"
          className="transition-transform duration-200 motion-reduce:transition-none"
        />
      </button>
      <StrategiesDropdown
        dropdownRef={menuRef}
        id="strategies-menu-dropdown"
        onStrategySelect={selectStrategy}
        isOpen={isOpen}
        data={data}
      />
    </>
  );
}
