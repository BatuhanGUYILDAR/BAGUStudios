import { ArrowRight, Mail } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import Reveal from '../components/Reveal';
import SkillBadge from '../components/SkillBadge';
import { usePointerGlow } from '../hooks/usePointerGlow';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useLanguage } from '../i18n/LanguageContext';
import { getProducts } from '../services/productService';
import type { Product } from '../types/Product';

const moduleFloatDelayClasses = [
  '[animation-delay:0s]',
  '[animation-delay:0.4s]',
  '[animation-delay:0.8s]',
  '[animation-delay:1.2s]',
];

function Home() {
  const { t } = useLanguage();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const heroRef = useRef<HTMLElement>(null);
  const panelRef = usePointerGlow<HTMLDivElement>(6);

  useScrollProgress(heroRef);

  useEffect(() => {
    getProducts().then((items) => setFeaturedProducts(items.filter((item) => item.featured)));
  }, []);

  return (
    <>
      <section ref={heroRef} className="hero-scroll relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.22),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(139,92,246,0.18),transparent_28%),linear-gradient(180deg,#050608_0%,#0b0f18_100%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="hero-scroll-grid absolute inset-x-[-20%] bottom-[-30%] top-[35%]" />
          <div className="hero-scroll-glow absolute left-[calc(50%-18rem)] top-1/3 h-[36rem] w-[36rem] rounded-full blur-2xl" />
          <div className="hero-scanline absolute inset-x-0 top-0 h-px" />
        </div>
        <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="hero-scroll-copy">
            <p className="hero-reveal section-kicker kicker-line">{t.home.brand}</p>
            <h1 className="hero-reveal mt-5 max-w-4xl text-5xl font-black leading-[1.02] text-white [--reveal-delay:120ms] sm:text-6xl lg:text-7xl">
              <span className="text-gradient">{t.home.title}</span>
            </h1>
            <div className="hero-reveal mt-6 h-px w-24 bg-gradient-to-r from-neon-blue via-neon-violet to-transparent shadow-[0_0_12px_rgba(56,189,248,0.6)] [--reveal-delay:220ms]" />
            <p className="hero-reveal mt-6 text-xl font-semibold text-slate-100 [--reveal-delay:260ms] sm:text-2xl">
              {t.home.role}
            </p>
            <p className="hero-reveal mt-5 max-w-2xl text-base leading-8 text-slate-300 [--reveal-delay:380ms] sm:text-lg">
              {t.home.intro}
            </p>
            <div className="hero-reveal mt-8 flex flex-col gap-3 [--reveal-delay:500ms] sm:flex-row">
              <Link to="/projects" className="btn-primary group">
                {t.home.viewProjects} <ArrowRight size={18} aria-hidden="true" className="transition duration-300 group-hover:translate-x-1" />
              </Link>
              <Link to="/contact" className="btn-ghost">
                {t.home.contactMe} <Mail size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="hero-scroll-visual relative">
            <div className="absolute -inset-4 rounded-full bg-neon-blue/10 blur-3xl" />
            <div className="hero-reveal relative [--reveal-delay:320ms]">
              <div ref={panelRef} className="glow-card tilt glass-panel overflow-hidden rounded-xl p-4 shadow-neon sm:p-6">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {t.home.modules.map((module, index) => (
                    <div
                      key={module.label}
                      className={`rounded-lg border border-white/10 bg-black/35 p-4 transition duration-300 hover:border-neon-green/40 sm:p-5 animate-float ${
                        moduleFloatDelayClasses[index % moduleFloatDelayClasses.length]
                      }`}
                    >
                      <div className="h-2 w-12 rounded-full bg-neon-green shadow-[0_0_10px_rgba(52,211,153,0.6)] sm:w-16" />
                      <p className="mt-6 text-sm font-bold text-white sm:mt-8">{module.label}</p>
                      <p className="mt-2 text-xs leading-5 text-slate-400">{module.description}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-lg border border-neon-blue/30 bg-neon-blue/10 p-4 sm:mt-5 sm:p-5">
                  <p className="text-sm font-semibold text-neon-blue">{t.home.marketplacePipelineTitle}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{t.home.marketplacePipelineBody}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="hero-scroll-cue pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block">
          <div className="flex h-10 w-6 justify-center rounded-full border border-neon-blue/40 pt-2 shadow-[0_0_14px_rgba(56,189,248,0.3)]">
            <span className="hero-cue-dot h-2 w-1 rounded-full bg-neon-blue" />
          </div>
        </div>
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-white/5">
          <div className="hero-scroll-bar h-full bg-gradient-to-r from-neon-blue to-neon-violet shadow-[0_0_10px_rgba(56,189,248,0.7)]" />
        </div>
      </section>

      <section className="bg-[#080b11] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="section-kicker kicker-line">{t.home.featuredKicker}</p>
              <h2 className="section-title">{t.home.featuredTitle}</h2>
            </div>
            <Link to="/projects" className="link-underline focus-ring group inline-flex items-center gap-2 self-start rounded-sm pb-1 font-semibold text-neon-blue hover:text-white md:self-auto">
              {t.home.viewAllProjects} <ArrowRight size={16} aria-hidden="true" className="transition duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {featuredProducts.map((product, index) => (
              <Reveal key={product.id} delay={index * 120} className="h-full">
                <ProjectCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 sm:py-24">
        <div aria-hidden="true" className="grid-backdrop absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="section-kicker kicker-line">{t.home.coreSkillsKicker}</p>
            <h2 className="section-title">{t.home.coreSkillsTitle}</h2>
          </Reveal>
        </div>
        <Reveal delay={120} className="relative mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="marquee overflow-hidden">
            <div className="marquee-track flex w-max">
              <ul className="flex shrink-0 gap-3 pr-3">
                {t.home.skills.map((skill) => (
                  <li key={skill}>
                    <SkillBadge label={skill} />
                  </li>
                ))}
              </ul>
              <ul aria-hidden="true" className="marquee-duplicate flex shrink-0 gap-3 pr-3">
                {t.home.skills.map((skill) => (
                  <li key={skill}>
                    <SkillBadge label={skill} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

export default Home;
