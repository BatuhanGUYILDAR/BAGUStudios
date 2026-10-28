import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePointerGlow } from '../hooks/usePointerGlow';
import { localizeProduct, useLanguage } from '../i18n/LanguageContext';
import type { Product } from '../types/Product';

type ProjectCardProps = {
  product: Product;
};

function ProjectCard({ product }: ProjectCardProps) {
  const { t } = useLanguage();
  const cardRef = usePointerGlow<HTMLElement>(4);
  const localizedProduct = localizeProduct(product, t.products);
  const detailPath = `/projects/${localizedProduct.id}`;

  return (
    <article
      ref={cardRef}
      className="glow-card tilt group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-panel/80 shadow-2xl shadow-black/30 hover:border-neon-blue/50 hover:shadow-neon focus-within:border-neon-blue/50"
    >
      <Link
        to={detailPath}
        tabIndex={-1}
        aria-hidden="true"
        className="relative block aspect-video overflow-hidden bg-gradient-to-br from-cyan-400/30 via-violet-500/25 to-emerald-400/20"
      >
        <img
          src={localizedProduct.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.06] motion-reduce:transform-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neon-blue/70 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
        <span className="absolute left-4 top-4 max-w-[calc(100%-2rem)] truncate rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-neon-blue backdrop-blur">
          {localizedProduct.category}
        </span>
      </Link>

      <div className="relative z-[2] flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-bold leading-snug text-white sm:text-xl">
          <Link to={detailPath} className="focus-ring rounded-sm transition hover:text-neon-blue">
            {localizedProduct.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-slate-300">{localizedProduct.shortDescription}</p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
          <span className="text-base font-semibold text-neon-green">{localizedProduct.price}</span>
          <div className="flex w-full gap-2 sm:w-auto">
            <Link
              to={detailPath}
              className="focus-ring group/details inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-md border border-white/10 px-3 text-sm font-semibold text-white transition hover:border-neon-blue hover:bg-neon-blue/10 sm:h-10 sm:flex-none"
            >
              {t.common.details}{' '}
              <ArrowRight size={16} aria-hidden="true" className="transition duration-300 group-hover/details:translate-x-0.5" />
            </Link>
            <a
              href={localizedProduct.marketplaceUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${localizedProduct.title} – ${t.common.marketplace}`}
              className="focus-ring inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-white px-3 text-sm font-semibold text-slate-950 transition hover:bg-neon-blue sm:h-10 sm:flex-none"
            >
              {t.common.marketplace} <ExternalLink size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
