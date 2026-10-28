import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Reveal from '../components/Reveal';
import SkillBadge from '../components/SkillBadge';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { localizeProduct, useLanguage } from '../i18n/LanguageContext';
import { getProductById } from '../services/productService';
import type { Product } from '../types/Product';

type DetailHeroProps = {
  title: string;
  category: string;
  image: string;
  imageAlt: string;
  backLabel: string;
};

// Separate component so the scroll hook attaches once the product (and this section) exists.
function DetailHero({ title, category, image, imageAlt, backLabel }: DetailHeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  useScrollProgress(heroRef);

  return (
    <section ref={heroRef} className="hero-scroll relative isolate overflow-hidden border-b border-white/5">
      <img src={image} alt={imageAlt} className="parallax-media absolute inset-0 -z-10 h-full w-full object-cover opacity-60" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_85%,rgba(56,189,248,0.2),transparent_35%),radial-gradient(circle_at_85%_15%,rgba(139,92,246,0.18),transparent_35%)]" />
      <div className="hero-scroll-copy mx-auto flex min-h-[24rem] max-w-6xl flex-col justify-between gap-16 px-4 py-8 sm:min-h-[32rem] sm:px-6 lg:px-8">
        <Link
          to="/projects"
          className="hero-reveal focus-ring group inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-black/40 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:border-neon-blue hover:text-neon-blue"
        >
          <ArrowLeft size={16} aria-hidden="true" className="transition duration-300 group-hover:-translate-x-0.5" /> {backLabel}
        </Link>
        <div className="pb-2">
          <p className="hero-reveal section-kicker kicker-line [--reveal-delay:100ms]">{category}</p>
          <h1 className="hero-reveal mt-4 max-w-4xl text-4xl font-black leading-[1.05] [--reveal-delay:180ms] sm:text-6xl">
            <span className="text-gradient">{title}</span>
          </h1>
        </div>
      </div>
    </section>
  );
}

function ProjectDetail() {
  const { t } = useLanguage();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getProductById(id).then((item) => {
      setProduct(item);
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) {
    return (
      <section className="page-body" aria-busy="true">
        <span className="sr-only">{t.projectDetail.loading}</span>
        <div aria-hidden="true" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="skeleton h-80 rounded-xl sm:h-[28rem]" />
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_0.6fr]">
            <div className="space-y-4">
              <div className="skeleton h-4 w-1/3 rounded" />
              <div className="skeleton h-4 w-full rounded" />
              <div className="skeleton h-4 w-11/12 rounded" />
              <div className="skeleton h-4 w-4/5 rounded" />
            </div>
            <div className="skeleton h-48 rounded-xl" />
          </div>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="page-body">
        <div className="glass-panel mx-4 max-w-xl p-10 text-center sm:mx-auto">
          <h1 className="text-3xl font-black text-white">{t.projectDetail.notFound}</h1>
          <Link to="/projects" className="btn-ghost mt-8">
            <ArrowLeft size={18} aria-hidden="true" /> {t.projectDetail.backToProjects}
          </Link>
        </div>
      </section>
    );
  }

  const localizedProduct = localizeProduct(product, t.products);

  return (
    <>
      <DetailHero
        title={localizedProduct.title}
        category={localizedProduct.category}
        image={localizedProduct.image}
        imageAlt={`${localizedProduct.title} ${t.common.previewAlt}`}
        backLabel={t.projectDetail.backToProjects}
      />

      <section className="page-body">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr]">
            <Reveal>
              <p className="section-kicker kicker-line">{t.projectDetail.kicker}</p>
              <p className="mt-6 whitespace-pre-line text-base leading-8 text-slate-300 sm:text-lg">{localizedProduct.longDescription}</p>
            </Reveal>

            <Reveal delay={150} className="lg:sticky lg:top-28 lg:self-start">
              <aside className="glass-panel relative overflow-hidden p-6">
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-green/70 to-transparent" />
                <p className="text-3xl font-black text-neon-green">{localizedProduct.price}</p>
                <a href={localizedProduct.marketplaceUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 w-full">
                  {t.projectDetail.openMarketplace} <ExternalLink size={18} aria-hidden="true" />
                </a>
                <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-6">
                  {localizedProduct.tags.map((tag) => (
                    <SkillBadge key={tag} label={tag} />
                  ))}
                </div>
              </aside>
            </Reveal>
          </div>

          {localizedProduct.youtubeVideoId && (
            <Reveal className="mt-16">
              <p className="section-kicker kicker-line">{t.projectDetail.videoKicker}</p>
              <div className="relative mt-6 rounded-xl bg-gradient-to-br from-neon-blue/50 via-neon-violet/30 to-neon-green/30 p-px shadow-neon">
                <div className="overflow-hidden rounded-xl bg-black">
                  <iframe
                    className="aspect-video w-full"
                    src={`https://www.youtube.com/embed/${localizedProduct.youtubeVideoId}`}
                    title={`${localizedProduct.title} demo video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}

export default ProjectDetail;
