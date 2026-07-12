import { useState, useCallback, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Persona {
  id: string;
  title: string;
  links: string[];
  image: string;
  description: string;
}

type MenuState = "closed" | "dropdown" | "morph";

// ── Hook ──────────────────────────────────────────────────────────────────────

function useWhoWeServeMenuState(scrollThreshold = 80) {
  const [menuState, setMenuState] = useState<MenuState>("closed");
  const [activePersonaId, setActivePersonaId] = useState("");
  const [hoveredPersonaId, setHoveredPersonaId] = useState("");
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
    const shouldMorph = !!activePersonaId && !userCollapsed;
    const newState = shouldMorph ? "morph" : "closed";
    if (menuState === newState) return;
    const timer = setTimeout(() => setMenuState(newState), 0);
    return () => clearTimeout(timer);
  }, [activePersonaId, userCollapsed, menuState]);

  useEffect(() => {
    if (menuState !== "dropdown") return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!menuRef.current?.contains(target) && !triggerRef.current?.contains(target)) {
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
      setActivePersonaId("");
      setMenuState("closed");
    };
    window.addEventListener("reset-header-menus", handleReset);
    return () => window.removeEventListener("reset-header-menus", handleReset);
  }, []);

  const openDropdown = useCallback(() => setMenuState("dropdown"), []);
  const collapse = useCallback(() => {
    setUserCollapsed(true);
    setActivePersonaId("");
    setMenuState("closed");
  }, []);
  const selectPersona = useCallback((id: string) => {
    setActivePersonaId(id);
    setHoveredPersonaId(id);
    setMenuState("morph");
  }, []);
  const setHoveredPersona = useCallback((id: string) => setHoveredPersonaId(id), []);

  return {
    menuState,
    activePersonaId,
    hoveredPersonaId,
    openDropdown,
    collapse,
    selectPersona,
    setHoveredPersona,
    triggerRef,
    menuRef,
  };
}

// ── Sub-components ────────────────────────────────────────────────────────────

const WhoWeServeFeaturedPanel = memo(function WhoWeServeFeaturedPanel({
  persona,
}: {
  persona: Persona;
}) {
  return (
    <div className="flex h-full min-h-[502px] w-[296px] flex-col justify-between gap-[24px] overflow-hidden rounded-[8px] bg-[#1C2A1E] p-[16px] transition-transform hover:scale-[1.01]">
      <h3 className="shrink-0 font-serif text-[24px] font-normal leading-[120%] tracking-[-5%] text-[var(--color-beige-50)]">
        {persona.title}
      </h3>
      <div className="relative flex flex-1 w-full items-center justify-center">
        <img
          src={persona.image}
          alt={persona.title}
          className="absolute inset-0 h-full w-full object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>
      <p className="shrink-0 text-[16px] leading-[150%] font-sans text-[var(--color-beige-50)]">
        {persona.description}
      </p>
    </div>
  );
});

interface PersonaCardProps {
  persona: Persona;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onSelect: () => void;
}

const WhoWeServePersonaCard = memo(function WhoWeServePersonaCard({
  persona,
  isActive: _isActive,
  onMouseEnter,
  onMouseLeave,
  onSelect,
}: PersonaCardProps) {
  return (
    <div
      className="group flex h-full w-full flex-col justify-between rounded-[8px] bg-[var(--color-surface-raised)] p-[16px] shadow-sm border border-[var(--color-border-subtle)] transition-transform hover:scale-[1.01]"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex items-start justify-between">
        <h4 className="font-serif text-[16px] font-medium leading-[120%] tracking-[-5%] text-[var(--color-text-primary)]">
          {persona.title}
        </h4>
        <button
          onClick={onSelect}
          aria-label={`Explore ${persona.title}`}
          className="flex h-[24px] w-[24px] shrink-0 items-center justify-center bg-[var(--color-text-primary)] transition-colors group-hover:bg-black"
        >
          <img src="/images/svgs/arrow-up-right.svg" alt="" width={12} height={12} aria-hidden="true" className="invert" />
        </button>
      </div>
      <ul className="mt-8 space-y-0">
        {persona.links.map((link, idx) => (
          <li key={link}>
            <a
              href={`/who-we-serve/${persona.id}`}
              onClick={(e) => { e.preventDefault(); onSelect(); }}
              className={`block py-2 text-[14px] font-sans text-[var(--color-text-secondary)] hover:text-[var(--color-primary-600)] ${
                idx < persona.links.length - 1 ? "border-b border-[var(--color-border-subtle)]" : "pb-0"
              }`}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
});

interface WhoWeServeDropdownProps {
  personas: Persona[];
  hoveredPersonaId: string;
  onPersonaHover: (id: string) => void;
  onPersonaLeave: () => void;
  onPersonaSelect: (id: string) => void;
  isOpen: boolean;
  dropdownRef: React.MutableRefObject<HTMLDivElement | null>;
}

const WhoWeServeDropdown = memo(function WhoWeServeDropdown({
  personas,
  hoveredPersonaId,
  onPersonaHover,
  onPersonaLeave,
  onPersonaSelect,
  isOpen,
  dropdownRef,
}: WhoWeServeDropdownProps) {
  const featuredPersona = personas.find((p) => p.id === hoveredPersonaId) ?? personas[0];
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen || !innerRef.current) return;
    const focusable = innerRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const onTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onTab);
    return () => document.removeEventListener("keydown", onTab);
  }, [isOpen]);

  const setRef = (node: HTMLDivElement | null) => {
    innerRef.current = node;
    dropdownRef.current = node;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={setRef}
          id="who-we-serve-dropdown"
          role="dialog"
          aria-label="Who we serve — choose a persona"
          aria-modal="true"
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute left-0 top-full z-[var(--z-dropdown)] mt-[24px] flex w-max origin-top-left gap-[8px]"
        >
          <div className="flex w-[1280px] shrink-0 gap-[24px] rounded-[8px] border-2 border-[#E5E5E5] bg-[var(--color-beige-200)] p-[24px] shadow-[var(--shadow-xl)]">
            <div className="w-[296px] shrink-0">
              <WhoWeServeFeaturedPanel persona={featuredPersona!} />
            </div>
            <div className="grid flex-1 grid-cols-3 gap-x-[24px] gap-y-[24px]">
              {personas.map((persona) => (
                <WhoWeServePersonaCard
                  key={persona.id}
                  persona={persona}
                  isActive={persona.id === hoveredPersonaId}
                  onMouseEnter={() => onPersonaHover(persona.id)}
                  onMouseLeave={onPersonaLeave}
                  onSelect={() => onPersonaSelect(persona.id)}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

const WhoWeServeMorphBar = memo(function WhoWeServeMorphBar({
  personas,
  activePersonaId,
  onPersonaSelect,
}: {
  personas: Persona[];
  activePersonaId: string;
  onPersonaSelect: (id: string) => void;
}) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      aria-label="Persona navigation"
      className="flex h-full w-full items-center justify-center"
    >
      <div role="tablist" className="flex items-center gap-8">
        {personas.map((persona) => {
          const isActive = persona.id === activePersonaId;
          return (
            <button
              key={persona.id}
              role="tab"
              aria-selected={isActive}
              aria-current={isActive ? "page" : undefined}
              onClick={() => onPersonaSelect(persona.id)}
              className={[
                "transition-colors",
                isActive
                  ? "inline-flex h-[48px] items-center justify-center rounded-[8px] bg-[#F4F3EB] px-5 text-[16px] font-medium font-inter text-[#111111]"
                  : "text-[16px] font-medium font-inter text-[#6F6F6F] hover:text-[#111111]",
              ].join(" ")}
            >
              {persona.title}
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
});

// ── Main export ───────────────────────────────────────────────────────────────

export default function WhoWeServeMenu({
  triggerLabel,
  personas,
  onMorphChange,
}: {
  triggerLabel: string;
  personas: Persona[];
  onMorphChange: (isMorphed: boolean) => void;
}) {
  const {
    menuState,
    activePersonaId,
    hoveredPersonaId,
    openDropdown,
    collapse,
    selectPersona,
    setHoveredPersona,
    triggerRef,
    menuRef,
  } = useWhoWeServeMenuState();

  const isMorphed = menuState === "morph";
  const isOpen = menuState === "dropdown";
  const featuredPersona = personas.find((p) => p.id === hoveredPersonaId) ?? personas[0];

  useEffect(() => {
    onMorphChange(isMorphed);
  }, [isMorphed, onMorphChange]);

  if (isMorphed) {
    return (
      <WhoWeServeMorphBar
        personas={personas}
        activePersonaId={activePersonaId}
        onPersonaSelect={selectPersona}
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
        aria-controls="who-we-serve-dropdown"
        onClick={isOpen ? collapse : openDropdown}
        className={[
          "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[16px] font-normal font-inter transition-colors",
          isOpen
            ? "bg-[var(--color-beige-200)] text-[#000000]"
            : "text-[#111111] hover:bg-[var(--color-beige-100)] hover:text-[#000000]",
        ].join(" ")}
      >
        {triggerLabel}
        <img
          src={isOpen ? "/images/svgs/caret-up.svg" : "/images/svgs/caret-down.svg"}
          alt=""
          width={12}
          height={12}
          aria-hidden="true"
          className="transition-transform duration-200 motion-reduce:transition-none"
        />
      </button>
      <WhoWeServeDropdown
        dropdownRef={menuRef}
        personas={personas}
        hoveredPersonaId={hoveredPersonaId || (featuredPersona?.id ?? "")}
        onPersonaHover={setHoveredPersona}
        onPersonaLeave={() => setHoveredPersona(activePersonaId || personas[0]?.id || "")}
        onPersonaSelect={selectPersona}
        isOpen={isOpen}
      />
    </>
  );
}
