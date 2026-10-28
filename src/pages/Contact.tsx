import { ExternalLink, Loader2, Mail, Send, ShieldCheck } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { usePointerGlow } from '../hooks/usePointerGlow';
import { useLanguage } from '../i18n/LanguageContext';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mvzypdrw';
const NAME_MAX_LENGTH = 100;
// Upper bound for a valid email address (RFC 5321 path limit).
const EMAIL_MAX_LENGTH = 254;
const MESSAGE_MAX_LENGTH = 2000;

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';
type FieldErrors = Partial<Record<'name' | 'email' | 'message', string>>;
type ContactCardData = { label: string; value: string; href: string };

const fieldClass =
  'rounded-md border border-white/10 bg-black/35 px-4 text-white outline-none transition duration-300 placeholder:text-slate-500 hover:border-white/20 focus:border-neon-blue focus:bg-black/50 focus:shadow-[0_0_0_4px_rgba(56,189,248,0.12),0_0_24px_rgba(56,189,248,0.15)]';

function ContactCard({ card }: { card: ContactCardData }) {
  const cardRef = usePointerGlow<HTMLAnchorElement>(0);
  const isExternal = card.href.startsWith('http');

  return (
    <a
      ref={cardRef}
      href={card.href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="glow-card focus-ring group flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-panel/80 p-5 transition duration-300 hover:border-neon-blue/50"
    >
      <span className="relative z-[2] min-w-0">
        <span className="block text-sm font-semibold uppercase tracking-[0.2em] text-neon-blue">{card.label}</span>
        <span className="mt-2 block break-all text-slate-200 transition group-hover:text-white">{card.value}</span>
      </span>
      <span className="relative z-[2] inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition duration-300 group-hover:rotate-[-8deg] group-hover:border-neon-blue/60 group-hover:text-neon-blue group-hover:shadow-[0_0_16px_rgba(56,189,248,0.35)]">
        {card.href.startsWith('mailto') ? <Mail size={20} aria-hidden="true" /> : <ExternalLink size={20} aria-hidden="true" />}
      </span>
    </a>
  );
}

function Contact() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<FormStatus>('idle');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [messageLength, setMessageLength] = useState(0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (formData.get('_gotcha')) {
      return;
    }

    setStatus('submitting');
    setFieldErrors({});

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as {
          errors?: Array<{ field?: string; message?: string }>;
        } | null;
        const nextErrors: FieldErrors = {};

        payload?.errors?.forEach((error) => {
          if (error.field === 'name' || error.field === 'email' || error.field === 'message') {
            nextErrors[error.field] = error.message;
          }
        });

        setFieldErrors(nextErrors);
        setStatus('error');
        return;
      }

      form.reset();
      setMessageLength(0);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <>
      <PageHeader kicker={t.contact.kicker} title={t.contact.title} intro={t.contact.intro} />
      <section className="page-body">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:px-8">
          <div className="grid content-start gap-4">
            {t.contact.cards.map((card, index) => (
              <Reveal key={card.label} delay={index * 100}>
                <ContactCard card={card} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={150}>
            <form onSubmit={handleSubmit} className="glass-panel relative overflow-hidden p-6 sm:p-8">
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent" />
              <div aria-hidden="true" className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-neon-violet/15 blur-3xl" />
              <div className="relative grid gap-5">
                <input type="hidden" name="subject" value={t.contact.emailSubject} />
                <input
                  className="hidden"
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <label className="grid gap-2 text-sm font-semibold text-slate-200">
                  {t.contact.nameLabel}
                  <input
                    name="name"
                    required
                    maxLength={NAME_MAX_LENGTH}
                    autoComplete="name"
                    className={`h-12 ${fieldClass}`}
                    placeholder={t.contact.namePlaceholder}
                  />
                  {fieldErrors.name && <span className="text-sm font-semibold text-red-200">{fieldErrors.name}</span>}
                </label>
                <label className="grid gap-2 text-sm font-semibold text-slate-200">
                  {t.contact.emailLabel}
                  <input
                    name="email"
                    type="email"
                    required
                    maxLength={EMAIL_MAX_LENGTH}
                    autoComplete="email"
                    className={`h-12 ${fieldClass}`}
                    placeholder={t.contact.emailPlaceholder}
                  />
                  {fieldErrors.email && <span className="text-sm font-semibold text-red-200">{fieldErrors.email}</span>}
                </label>
                <label className="grid gap-2 text-sm font-semibold text-slate-200">
                  {t.contact.messageLabel}
                  <textarea
                    name="message"
                    required
                    rows={6}
                    maxLength={MESSAGE_MAX_LENGTH}
                    className={`py-3 ${fieldClass}`}
                    placeholder={t.contact.messagePlaceholder}
                    onChange={(event) => setMessageLength(event.target.value.length)}
                  />
                  <span className="justify-self-end text-xs font-medium tabular-nums text-slate-500">
                    {messageLength} / {MESSAGE_MAX_LENGTH}
                  </span>
                  {fieldErrors.message && <span className="text-sm font-semibold text-red-200">{fieldErrors.message}</span>}
                </label>
                <button type="submit" className="btn-primary group" disabled={status === 'submitting'}>
                  {status === 'submitting' ? t.contact.sending : t.contact.sendMessage}
                  {status === 'submitting' ? (
                    <Loader2 size={18} aria-hidden="true" className="animate-spin" />
                  ) : (
                    <Send size={18} aria-hidden="true" className="transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  )}
                </button>
                <p className="flex items-start gap-2 text-xs leading-5 text-slate-400">
                  <ShieldCheck size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-neon-blue" />
                  {t.contact.privacyNote}
                </p>
                {status === 'success' && (
                  <p
                    className="animate-[fade-up_0.5s_cubic-bezier(0.16,1,0.3,1)_both] rounded-md border border-neon-green/30 bg-neon-green/10 p-4 text-sm font-semibold text-neon-green"
                    role="status"
                  >
                    {t.contact.success}
                  </p>
                )}
                {status === 'error' && (
                  <p
                    className="animate-[fade-up_0.5s_cubic-bezier(0.16,1,0.3,1)_both] rounded-md border border-red-400/30 bg-red-400/10 p-4 text-sm font-semibold text-red-200"
                    role="alert"
                  >
                    {t.contact.error}
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default Contact;
