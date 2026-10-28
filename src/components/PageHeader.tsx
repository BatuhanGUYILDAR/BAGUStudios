import { useRef, type ReactNode } from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';

type PageHeaderProps = {
  kicker: string;
  title: string;
  intro?: string;
  children?: ReactNode;
};

function PageHeader({ kicker, title, intro, children }: PageHeaderProps) {
  const headerRef = useRef<HTMLElement>(null);

  useScrollProgress(headerRef);

  return (
    <section ref={headerRef} className="hero-scroll relative overflow-hidden border-b border-white/5">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hero-scroll-glow absolute left-[calc(50%-20rem)] top-[-12rem] h-[32rem] w-[40rem] rounded-full blur-2xl" />
        <div className="grid-backdrop absolute inset-0" />
      </div>
      <div className="hero-scroll-copy relative mx-auto max-w-7xl px-4 pb-14 pt-16 sm:px-6 sm:pb-20 sm:pt-24 lg:px-8">
        <p className="hero-reveal section-kicker kicker-line">{kicker}</p>
        <h1 className="hero-reveal mt-5 max-w-4xl text-4xl font-black leading-[1.05] text-white [--reveal-delay:100ms] sm:text-6xl">
          <span className="text-gradient">{title}</span>
        </h1>
        {intro && (
          <p className="hero-reveal mt-6 max-w-2xl text-base leading-8 text-slate-300 [--reveal-delay:200ms] sm:text-lg">
            {intro}
          </p>
        )}
        {children && <div className="hero-reveal mt-8 [--reveal-delay:300ms]">{children}</div>}
      </div>
    </section>
  );
}

export default PageHeader;
