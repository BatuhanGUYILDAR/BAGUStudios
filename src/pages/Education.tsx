import GlowPanel from '../components/GlowPanel';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { useReveal } from '../hooks/useReveal';
import { useLanguage } from '../i18n/LanguageContext';

function Education() {
  const { t } = useLanguage();
  const { ref: timelineRef, isRevealed } = useReveal<HTMLDivElement>();

  return (
    <>
      <PageHeader kicker={t.education.kicker} title={t.education.title} />
      <section className="page-body">
        <div ref={timelineRef} className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative pl-10">
            {/* Timeline rail; the glowing part draws downward when the section scrolls into view. */}
            <span aria-hidden="true" className="absolute bottom-0 left-[7px] top-0 w-px bg-white/10" />
            <span
              aria-hidden="true"
              className={`absolute bottom-0 left-[7px] top-0 w-px origin-top bg-gradient-to-b from-neon-blue via-neon-violet to-transparent transition-transform duration-[1400ms] ease-out ${
                isRevealed ? 'scale-y-100' : 'scale-y-0'
              }`}
            />
            <span aria-hidden="true" className="absolute left-0 top-8 flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-blue/60" />
              <span className="relative inline-flex h-4 w-4 rounded-full border-4 border-ink bg-neon-blue shadow-neon" />
            </span>

            <Reveal>
              <GlowPanel className="p-6 sm:p-8">
                <article>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-neon-blue">{t.education.label}</p>
                  <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">{t.education.school}</h2>
                  <p className="mt-3 text-lg text-slate-200">{t.education.department}</p>
                  <p className="mt-5 leading-8 text-slate-300">{t.education.body}</p>
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {t.education.focusAreas.map((area, index) => (
                      <Reveal key={area} delay={150 + index * 80}>
                        <div className="group flex h-full items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4 text-sm font-semibold text-slate-200 transition duration-300 hover:border-neon-green/40 hover:bg-neon-green/5 hover:text-white">
                          <span
                            aria-hidden="true"
                            className="h-2 w-2 shrink-0 rounded-full bg-neon-green/70 transition group-hover:shadow-[0_0_10px_rgba(52,211,153,0.9)]"
                          />
                          {area}
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </article>
              </GlowPanel>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

export default Education;
