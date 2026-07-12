import { useState, useCallback, useEffect } from "react";
import WhoWeServeMenu, { type Persona } from "./WhoWeServeMenu";
import StrategiesMenu, { type StrategiesMenuData } from "./StrategiesMenu";
import InsightsMenu, { type InsightsMenuData } from "./InsightsMenu";
import AboutMenu, { type AboutMenuData } from "./AboutMenu";
import MobileNavMenu from "./MobileNavMenu";

export interface Link {
  label: string;
  href: string;
}

export interface HeaderData {
  logo: { src: string; alt: string; width?: number; height?: number };
  homeLabel: string;
  getStartedCta: Link;
  mobileNavLinks: Link[];
  strategiesMenu: StrategiesMenuData;
  whoWeServeMenu: { triggerLabel: string; personas: Persona[] };
  insightsMenu: InsightsMenuData;
  aboutMenu: AboutMenuData;
}

interface Props {
  header: HeaderData;
}

export default function SiteHeaderIsland({ header }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [morphedMenu, setMorphedMenu] = useState<"strategies" | "who-we-serve" | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleStrategiesMorph = useCallback((morphed: boolean) => {
    setMorphedMenu(morphed ? "strategies" : null);
    if (morphed) setMobileOpen(false);
  }, []);

  const handleWhoWeServeMorph = useCallback((morphed: boolean) => {
    setMorphedMenu(morphed ? "who-we-serve" : null);
    if (morphed) setMobileOpen(false);
  }, []);

  const handleHomeClick = useCallback(() => {
    window.dispatchEvent(new Event("reset-header-menus"));
    setMorphedMenu(null);
  }, []);

  return (
    <header
      className={`fixed left-0 z-[100] flex lg:w-full w-[100%] justify-center lg:px-4 transition-all duration-300 xl:px-[80px] ${
        isScrolled && !morphedMenu ? "top-0 lg:top-4" : "top-0 lg:top-[48px]"
      }`}
      role="banner"
    >
      <div className="w-full max-w-[1280px]">
        {/*
         * Nav pill — `relative` is the positioning context for all mega-menu
         * dropdowns. They use `absolute left-0 top-full` to span this container.
         */}
        <div
          className={`relative flex w-full items-center justify-between gap-4 px-4 transition-all duration-300 lg:px-6 ${
            isScrolled || morphedMenu
              ? "bg-[#F9F8F6] shadow-md lg:bg-white"
              : "bg-[#F9F8F6] lg:bg-white"
          } ${
            morphedMenu
              ? "h-[72px] rounded-none lg:rounded-[8px]"
              : "h-[56px] rounded-none lg:h-[80px] lg:rounded-[16px]"
          }`}
        >
          
          {/* Logo */}
          <div className={`flex items-center ${morphedMenu ? "w-[200px]" : ""}`}>
            <a
              href="/"
              className="flex flex-shrink-0 items-center"
              aria-label="Capitalmind home"
              onClick={handleHomeClick}
            >
              <img
                src={header.logo.src}
                alt={header.logo.alt}
                width={header.logo.width ?? 170}
                height={header.logo.height ?? 32}
                loading="eager"
                fetchPriority="high"
              />
            </a>
          </div>

          {/* Desktop navigation */}
          <nav
            className={`hidden items-center gap-6 lg:flex ${morphedMenu ? "flex-1 justify-center" : ""}`}
            role="navigation"
            aria-label="Main navigation"
          >
            <a
              href="/"
              onClick={handleHomeClick}
              className={`text-[16px] font-normal font-inter text-[#111111] transition-colors hover:text-[#000000] ${
                morphedMenu ? "hidden" : "block"
              }`}
            >
              {header.homeLabel}
            </a>

            <div
              className={`${
                morphedMenu === "who-we-serve"
                  ? "hidden"
                  : morphedMenu === "strategies"
                  ? "flex w-full justify-center"
                  : ""
              }`}
            >
              <StrategiesMenu data={header.strategiesMenu} onMorphChange={handleStrategiesMorph} />
            </div>

            <div
              className={`${
                morphedMenu === "strategies"
                  ? "hidden"
                  : morphedMenu === "who-we-serve"
                  ? "flex w-full justify-center"
                  : ""
              }`}
            >
              <WhoWeServeMenu
                triggerLabel={header.whoWeServeMenu.triggerLabel}
                personas={header.whoWeServeMenu.personas}
                onMorphChange={handleWhoWeServeMorph}
              />
            </div>

            <div className={morphedMenu ? "hidden" : "block"}>
              <InsightsMenu data={header.insightsMenu} />
            </div>

            <div className={morphedMenu ? "hidden" : "block"}>
              <AboutMenu data={header.aboutMenu} />
            </div>
          </nav>

          {/* Desktop CTA / morph close */}
          <div className={`hidden lg:flex justify-end ${morphedMenu ? "w-[200px]" : ""}`}>
            {morphedMenu ? (
              <button
                type="button"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  handleHomeClick();
                }}
                aria-label="Scroll to top"
                className="flex h-[48px] w-[48px] flex-shrink-0 items-center justify-center rounded-full bg-[#0E0E0E] transition-opacity hover:opacity-80"
              >
                <img
                  src="/images/svgs/caret-up.svg"
                  alt=""
                  width={14}
                  height={14}
                  aria-hidden="true"
                  className="invert"
                />
              </button>
            ) : (
              <a
                href={header.getStartedCta.href}
                className="inline-flex h-[56px] w-[137px] items-center justify-center rounded-[8px] bg-[#0E100F] font-inter text-[16px] font-normal text-white transition-opacity hover:opacity-90"
              >
                {header.getStartedCta.label}
              </a>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className={`flex h-9 w-9 items-center justify-center rounded-lg focus-visible:outline-2 focus-visible:outline-[var(--color-primary-500)] focus-visible:outline-offset-2 lg:hidden ${
              morphedMenu ? "hidden" : ""
            }`}
          >
            <span className="flex flex-col gap-1.5" aria-hidden="true">
              <span
                className={`block h-0.5 w-5 bg-[var(--color-text-primary)] transition-transform duration-200 motion-reduce:transition-none ${
                  mobileOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-[var(--color-text-primary)] transition-opacity duration-200 motion-reduce:transition-none ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-[var(--color-text-primary)] transition-transform duration-200 motion-reduce:transition-none ${
                  mobileOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        {/* Mobile slide-down menu */}
        <div
          className={`overflow-hidden transition-all duration-300 motion-reduce:transition-none lg:hidden ${
            mobileOpen && !morphedMenu ? "mt-3 max-h-[600px]" : "max-h-0"
          }`}
          aria-hidden={!mobileOpen || !!morphedMenu}
        >
          <div className="rounded-2xl border border-[var(--color-border)] bg-white p-4 shadow-[var(--shadow-sm)]">
            <nav className="flex flex-col gap-1" role="navigation" aria-label="Mobile navigation">
              {header.mobileNavLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-beige-100)] hover:text-[var(--color-text-primary)]"
                >
                  {item.label}
                </a>
              ))}
              <MobileNavMenu
                triggerLabel={header.whoWeServeMenu.triggerLabel}
                personas={header.whoWeServeMenu.personas}
                onSelect={() => setMobileOpen(false)}
              />
            </nav>
            <a
              href={header.getStartedCta.href}
              onClick={() => setMobileOpen(false)}
              className="mt-4 flex w-full items-center justify-center rounded-xl bg-[var(--color-primary-900)] px-6 py-3 text-sm font-medium text-white"
            >
              {header.getStartedCta.label}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
