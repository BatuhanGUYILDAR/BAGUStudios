import GlowPanel from '../components/GlowPanel';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import SkillBadge from '../components/SkillBadge';
import { useLanguage } from '../i18n/LanguageContext';

function About() {
  const { t } = useLanguage();
  const paragraphs = [t.about.firstBody, t.about.secondBody];

  return (
    <>
      <PageHeader kicker={t.about.kicker} title={t.about.title} intro={t.about.intro} />
      <section className="page-body">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
          <div className="grid gap-6">
            {paragraphs.map((body, index) => (
              <Reveal key={index} delay={index * 120}>
                <GlowPanel className="p-6 sm:p-8">
                  <div aria-hidden="true" className="absolute -left-6 bottom-0 top-0 w-px bg-gradient-to-b from-neon-blue via-neon-violet to-transparent sm:-left-8" />
                  <p className="text-xs font-semibold tabular-nums tracking-[0.3em] text-neon-blue/70">0{index + 1}</p>
                  <p className="mt-4 leading-8 text-slate-300">{body}</p>
                </GlowPanel>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="lg:sticky lg:top-28 lg:self-start">
            <GlowPanel className="p-6 sm:p-8">
              <h2 className="text-2xl font-black text-white">{t.about.skillsTitle}</h2>
              <div className="mt-3 h-px w-16 bg-gradient-to-r from-neon-blue to-transparent" />
              <div className="mt-6 flex flex-wrap gap-3">
                {t.about.skills.map((skill, index) => (
                  <Reveal key={skill} delay={300 + index * 60}>
                    <SkillBadge label={skill} />
                  </Reveal>
                ))}
              </div>
            </GlowPanel>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default About;
