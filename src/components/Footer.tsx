import { ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

const footerLinks = [
  { key: 'home', path: '/' },
  { key: 'about', path: '/about' },
  { key: 'projects', path: '/projects' },
  { key: 'education', path: '/education' },
  { key: 'contact', path: '/contact' },
] as const;

function Footer() {
  const { t } = useLanguage();

  function scrollToTop() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  }

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-70" />
      <div aria-hidden="true" className="absolute left-[calc(50%-20rem)] top-[-6rem] h-48 w-[40rem] rounded-full bg-neon-blue/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.3fr_1fr_auto] md:items-start lg:px-8">
        <div className="flex items-start gap-4">
          <img src="/images/bagu-mark.png?v=4" alt="" aria-hidden="true" className="h-12 w-12 shrink-0 rounded-md object-cover shadow-neon" />
          <div>
            <p className="text-lg font-black text-white">BAGU Studio</p>
            <p className="mt-2 max-w-xs text-sm leading-6 text-slate-400">{t.footer.tagline}</p>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
          {footerLinks.map((link) => (
            <li key={link.path}>
              <Link to={link.path} className="link-underline focus-ring rounded-sm pb-1 text-slate-400 hover:text-white">
                {t.nav.links[link.key]}
              </Link>
            </li>
          ))}
        </ul>

        <button type="button" onClick={scrollToTop} className="btn-ghost group h-11 justify-self-start px-4 text-sm">
          <ArrowUp size={16} aria-hidden="true" className="transition duration-300 group-hover:-translate-y-0.5" />
          {t.footer.backToTop}
        </button>
      </div>

      <div className="relative border-t border-white/5">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-slate-500 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} BAGU Studio
        </p>
      </div>
    </footer>
  );
}

export default Footer;
