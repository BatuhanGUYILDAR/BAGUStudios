import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import ProjectCard from '../components/ProjectCard';
import Reveal from '../components/Reveal';
import { useLanguage } from '../i18n/LanguageContext';
import { getProducts } from '../services/productService';
import type { Product } from '../types/Product';

function Projects() {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts().then((items) => {
      setProducts(items);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <PageHeader kicker={t.projects.kicker} title={t.projects.title} intro={t.projects.intro} />
      <section className="page-body">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          {isLoading
            ? [0, 1].map((placeholder) => (
                <div key={placeholder} aria-hidden="true" className="overflow-hidden rounded-xl border border-white/10 bg-panel/80">
                  <div className="skeleton aspect-video" />
                  <div className="space-y-3 p-6">
                    <div className="skeleton h-5 w-2/3 rounded" />
                    <div className="skeleton h-4 w-full rounded" />
                    <div className="skeleton h-4 w-5/6 rounded" />
                  </div>
                </div>
              ))
            : products.map((product, index) => (
                <Reveal key={product.id} delay={(index % 2) * 120} className="h-full">
                  <ProjectCard product={product} />
                </Reveal>
              ))}
        </div>
      </section>
    </>
  );
}

export default Projects;
