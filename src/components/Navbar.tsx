import { ArrowRight, Check, Globe2, Menu, X } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useLanguage, type Language } from '../i18n/LanguageContext';

const links = [
  { key: 'home', path: '/' },
  { key: 'about', path: '/about' },
  { key: 'projects', path: '/projects' },
  { key: 'education', path: '/education' },
  { key: 'contact', path: '/contact' },
] as const;

const languageOptions: Array<{ code: Language; label: string }> = [
  { code: 'en', label: 'EN' },
  { code: 'tr', label: 'TR' },
];

function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLanguageMenuOpen) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsLanguageMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLanguageMenuOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white transition duration-200 ease-out hover:border-neon-blue hover:bg-white/10"
        aria-label={`${t.nav.languageLabel}: ${t.nav.languageOptions[language]}`}
        aria-haspopup="menu"
        aria-expanded={isLanguageMenuOpen}
        onClick={() => setIsLanguageMenuOpen((current) => !current)}
      >
        <Globe2 size={20} aria-hidden="true" className={`transition duration-500 ${isLanguageMenuOpen ? 'rotate-180' : ''}`} />
      </button>

      <div
        className={`absolute right-0 top-12 z-50 w-44 origin-top-right rounded-md border border-white/10 bg-panel p-2 shadow-2xl shadow-black/40 backdrop-blur-xl transition duration-200 ease-out ${
          isLanguageMenuOpen
            ? 'translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none -translate-y-2 scale-95 opacity-0'
        }`}
        role="menu"
        aria-hidden={!isLanguageMenuOpen}
      >
        {languageOptions.map((option) => {
          const isSelected = language === option.code;

          return (
            <button
              key={option.code}
              type="button"
              className={`flex w-full items-center justify-between rounded px-3 py-2 text-left text-sm font-semibold transition duration-200 ease-out ${
                isSelected ? 'bg-white text-slate-950' : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
              role="menuitemradio"
              aria-checked={isSelected}
              tabIndex={isLanguageMenuOpen ? 0 : -1}
              onClick={() => {
                setLanguage(option.code);
                setIsLanguageMenuOpen(false);
              }}
            >
              <span>{t.nav.languageOptions[option.code]}</span>
              {isSelected && <Check size={16} aria-hidden="true" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Navbar() {
  const { t, language } = useLanguage();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const desktopLinksRef = useRef<HTMLDivElement>(null);

  // Compact header after scrolling, plus a page-wide scroll progress line.
  useEffect(() => {
    let frame = 0;

    function update() {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setHasScrolled(window.scrollY > 8);
      headerRef.current?.style.setProperty(
        '--page-progress',
        scrollable > 0 ? Math.min(window.scrollY / scrollable, 1).toFixed(4) : '0',
      );
    }

    function handleScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // While the mobile menu is open: lock page scroll and close on Escape.
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Slide the active-link indicator under the current page's link.
  useLayoutEffect(() => {
    const container = desktopLinksRef.current;
    if (!container) {
      return;
    }

    function placeIndicator() {
      const active = container?.querySelector<HTMLElement>('[aria-current="page"]');
      container?.style.setProperty('--indicator-x', `${active?.offsetLeft ?? 0}px`);
      container?.style.setProperty('--indicator-width', `${active?.offsetWidth ?? 0}px`);
      container?.style.setProperty('--indicator-opacity', active ? '1' : '0');
    }

    placeIndicator();
    const observer = new ResizeObserver(placeIndicator);
    observer.observe(container);

    return () => observer.disconnect();
  }, [pathname, language]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `focus-ring relative rounded-md px-3 py-2 text-sm font-semibold transition duration-200 ease-out ${
      isActive ? 'text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'
    }`;

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 ease-out ${
          hasScrolled || isOpen ? 'border-white/10 bg-ink/90 shadow-2xl shadow-black/40' : 'border-transparent bg-ink/40'
        }`}
      >
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-[height] duration-300 ease-out sm:px-6 lg:px-8 ${
            hasScrolled ? 'h-16' : 'h-20'
          }`}
          aria-label={t.nav.ariaLabel}
        >
          <NavLink to="/" className="focus-ring group flex items-center gap-3 rounded-md" onClick={() => setIsOpen(false)}>
            <img
              src="/images/bagu-mark.png?v=4"
              alt=""
              aria-hidden="true"
              className={`shrink-0 rounded-md object-cover shadow-neon transition-all duration-300 group-hover:rotate-[-4deg] group-hover:scale-105 ${
                hasScrolled ? 'h-10 w-10' : 'h-12 w-12'
              }`}
            />
            <span>
              <span className="block text-base font-black text-white">BAGU Studio</span>
              <span className="block text-xs uppercase tracking-[0.22em] text-slate-400 transition group-hover:text-neon-blue">Game Dev</span>
            </span>
          </NavLink>

          <div className="hidden items-center gap-3 md:flex">
            <div ref={desktopLinksRef} className="relative flex items-center gap-1 rounded-lg border border-white/5 bg-white/[0.03] p-1">
              <span
                aria-hidden="true"
                className="nav-indicator pointer-events-none absolute bottom-1 left-0 top-1 rounded-md border border-neon-blue/30 bg-neon-blue/10 shadow-[0_0_18px_rgba(56,189,248,0.25)] [opacity:var(--indicator-opacity,0)]"
              />
              {links.map((link) => (
                <NavLink key={link.path} to={link.path} className={linkClass}>
                  {t.nav.links[link.key]}
                </NavLink>
              ))}
            </div>
            <LanguageToggle />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageToggle />
            <button
              type="button"
              className="focus-ring relative inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/10 text-white transition duration-200 ease-out hover:border-neon-blue hover:bg-white/5"
              aria-label={t.nav.toggleLabel}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsOpen((current) => !current)}
            >
              <Menu
                size={22}
                aria-hidden="true"
                className={`absolute transition duration-300 ${isOpen ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}
              />
              <X
                size={22}
                aria-hidden="true"
                className={`absolute transition duration-300 ${isOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'}`}
              />
            </button>
          </div>
        </nav>

        <div
          aria-hidden="true"
          className="page-progress absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-neon-blue via-neon-violet to-neon-green"
        />
      </header>

      {/* Kept outside the header: as a child of its backdrop-filter, the overlay was painted see-through. */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 overflow-y-auto bg-ink pt-20 transition-[opacity,visibility] duration-300 ease-out md:hidden ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        aria-hidden={!isOpen}
      >
        <div aria-hidden="true" className="grid-backdrop absolute inset-0" />
        <div className="relative mx-auto flex max-w-7xl flex-col px-4 pb-32 pt-6 sm:px-6">
          {links.map((link, index) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `focus-ring group flex items-center justify-between gap-4 rounded-md border-b border-white/5 px-2 py-5 text-2xl font-black transition duration-500 ease-out ${
                  isOpen ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'
                } ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'}`
              }
              style={{ transitionDelay: isOpen ? `${80 + index * 60}ms` : '0ms' }}
              onClick={() => setIsOpen(false)}
            >
              {({ isActive }) => (
                <>
                  <span className="flex items-baseline gap-4">
                    <span className={`text-xs font-semibold tabular-nums ${isActive ? 'text-neon-blue' : 'text-slate-600'}`}>
                      0{index + 1}
                    </span>
                    {t.nav.links[link.key]}
                  </span>
                  <ArrowRight
                    size={22}
                    aria-hidden="true"
                    className={`transition duration-300 group-hover:translate-x-1 ${isActive ? 'text-neon-blue' : 'text-slate-600'}`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}

export default Navbar;
