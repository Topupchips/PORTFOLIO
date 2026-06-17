import { useEffect, useState } from "react";
import {
  GraduationCap,
  Trophy,
  Mail,
  Copy,
  Check,
  ExternalLink,
  Send,
  Github,
  Linkedin,
} from "lucide-react";
import {
  BIO,
  ABOUT_STATS,
  ACHIEVEMENTS,
  PROJECTS,
  EXPERIENCE,
  SKILLS,
  CONTACT,
  MOBILE_SECTIONS,
} from "@/lib/content";

const LINK_ICONS: Record<string, typeof Github> = {
  GitHub: Github,
  LinkedIn: Linkedin,
};

export function MobilePortfolio() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    document.body.style.cursor = "auto";
    return () => {
      document.body.style.cursor = "";
    };
  }, []);

  useEffect(() => {
    const ids = MOBILE_SECTIONS.map((s) => s.id);
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="grain min-h-[100dvh] bg-[#000003] text-white">
      <header className="glass-holo sticky top-0 z-50 border-b border-cyan-400/20">
        <div className="safe-x px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
          <div className="mb-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.35em] text-cyan-300/80">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            J.A.R.V.I.S. · Mobile uplink
          </div>
          <h1 className="font-display text-xl font-bold text-holo">Ansh Tuli</h1>
          <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.25em] text-amber-300/70">
            {BIO.tagline}
          </p>
        </div>

        <nav
          className="safe-x flex gap-1 overflow-x-auto px-4 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Portfolio sections"
        >
          {MOBILE_SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollTo(id)}
              className={`shrink-0 rounded-full px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] transition-colors ${
                activeSection === id
                  ? "border border-cyan-400/50 bg-cyan-400/15 text-cyan-200"
                  : "border border-transparent text-white/45"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      <main className="safe-x space-y-10 px-4 pb-[max(2rem,env(safe-area-inset-bottom))] pt-6">
        <section id="about" className="scroll-mt-36">
          <SectionHeader title="About" subtitle="Operator profile" />
          <p className="text-sm leading-relaxed text-white/70">{BIO.summary}</p>
          <ul className="mt-4 space-y-2">
            {BIO.extended.map((line) => (
              <li key={line} className="flex gap-2 text-xs text-white/55">
                <span className="text-cyan-400">▸</span>
                {line}
              </li>
            ))}
          </ul>

          <div className="mt-5 grid grid-cols-2 gap-2">
            {ABOUT_STATS.map((s) => (
              <div key={s.l} className="rounded-lg border border-cyan-400/20 bg-black/30 p-4">
                <div className="font-display text-2xl font-bold text-holo">{s.v}</div>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">
                  {s.l}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-start gap-3 rounded-lg border border-cyan-400/20 p-4">
            <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
            <div>
              <div className="font-display text-sm">University of New Brunswick</div>
              <div className="text-xs text-white/50">
                Bachelor of Computer Science · Math Minor · GPA 4.1/4.3
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-cyan-400/20 p-4">
            <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-300">
              <Trophy className="h-3.5 w-3.5" /> Achievements
            </div>
            <ul className="space-y-2 text-sm text-white/70">
              {ACHIEVEMENTS.map((a) => (
                <li key={a} className="flex gap-2">
                  <span className="text-cyan-400">▸</span>
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {BIO.currentFocus.map((item) => (
              <span
                key={item}
                className="rounded-full border border-cyan-400/25 px-2.5 py-1 font-mono text-[8px] uppercase tracking-wider text-cyan-200/80"
              >
                {item}
              </span>
            ))}
          </div>
          <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">
            {BIO.location}
          </p>
        </section>

        <section id="projects" className="scroll-mt-36">
          <SectionHeader title="Projects" subtitle="Active payloads" />
          <div className="space-y-3">
            {PROJECTS.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target={p.url.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="block rounded-xl border border-cyan-400/20 bg-black/40 p-4 transition-colors active:border-cyan-400/50"
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-cyan-300">
                    {p.tag}
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-white/30" />
                </div>
                <h3 className="font-display text-lg font-bold text-white">{p.name}</h3>
                <p className="mt-1.5 text-sm text-white/60">{p.desc}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-cyan-400/20 px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider text-cyan-200/80"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="experience" className="scroll-mt-36">
          <SectionHeader title="Experience" subtitle="Mission log" />
          <ol className="relative space-y-4 border-l border-cyan-400/30 pl-5">
            {EXPERIENCE.map((e) => (
              <li key={e.org + e.period} className="relative">
                <span className="absolute -left-[23px] top-1.5 h-2.5 w-2.5 rounded-full bg-cyan-400 ring-2 ring-black" />
                <div className="rounded-lg border border-cyan-400/20 bg-black/40 p-3">
                  <div className="font-display text-sm font-semibold text-white">
                    {e.role} · <span className="text-cyan-300">{e.org}</span>
                  </div>
                  <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
                    {e.period}
                  </div>
                  <p className="mt-1.5 text-sm text-white/60">{e.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="skills" className="scroll-mt-36">
          <SectionHeader title="Skills" subtitle="Skill matrix" />
          <div className="space-y-4">
            {Object.entries(SKILLS).map(([cat, items]) => (
              <div key={cat} className="rounded-xl border border-cyan-400/20 bg-black/30 p-4">
                <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-300">
                  {cat}
                </div>
                <div className="space-y-2.5">
                  {items.map(([name, val]) => (
                    <div key={name}>
                      <div className="mb-1 flex justify-between text-xs">
                        <span className="text-white/80">{name}</span>
                        <span className="font-mono text-cyan-300/70">{val}%</span>
                      </div>
                      <div className="h-1 overflow-hidden rounded-full bg-white/5">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-400 to-violet-500"
                          style={{ width: `${val}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="scroll-mt-36">
          <SectionHeader title="Contact" subtitle="Open comms" />
          <p className="mb-4 text-sm text-white/60">
            Transmission channel active. Send a signal — I read everything.
          </p>
          <ContactBlock />
        </section>
      </main>
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-4">
      <div className="mb-1 font-mono text-[9px] uppercase tracking-[0.35em] text-cyan-300/70">
        {subtitle}
      </div>
      <h2 className="font-display text-2xl font-bold text-holo">{title}</h2>
    </div>
  );
}

function ContactBlock() {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const { email, links } = CONTACT;

  const copy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get("name");
    const msg = fd.get("message");
    window.location.href = `mailto:${email}?subject=Transmission from ${name}&body=${encodeURIComponent(String(msg))}`;
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  };

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={copy}
        className="glass-holo flex w-full items-center justify-between rounded-lg px-4 py-3 text-left"
      >
        <div className="flex items-center gap-3">
          <Mail className="h-4 w-4 text-cyan-300" />
          <span className="font-mono text-sm">{email}</span>
        </div>
        {copied ? (
          <Check className="h-4 w-4 text-green-400" />
        ) : (
          <Copy className="h-4 w-4 text-white/40" />
        )}
      </button>

      <div className="space-y-2">
        {links.map((link) => {
          const Icon = LINK_ICONS[link.label] ?? ExternalLink;
          return (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="glass-holo flex items-center justify-between rounded-lg px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <Icon className="h-4 w-4 text-cyan-300" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">
                  {link.label}
                </span>
              </div>
              <span className="font-mono text-xs text-white/80">{link.handle}</span>
            </a>
          );
        })}
      </div>

      <form onSubmit={onSubmit} className="space-y-3">
        <Field name="name" label="Callsign" placeholder="Your name" />
        <Field name="email" label="Channel" type="email" placeholder="you@domain.com" />
        <div>
          <label className="mb-1 block font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-300/80">
            Message
          </label>
          <textarea
            name="message"
            required
            rows={4}
            placeholder="Begin transmission..."
            className="w-full rounded-lg border border-cyan-400/20 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-cyan-400/60 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="border-holo flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-400/10 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-200"
        >
          {sent ? (
            <>
              <Check className="h-3.5 w-3.5" /> Transmission Sent
            </>
          ) : (
            <>
              <Send className="h-3.5 w-3.5" /> Transmit
            </>
          )}
        </button>
      </form>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1 block font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-300/80">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-lg border border-cyan-400/20 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-cyan-400/60 focus:outline-none"
      />
    </div>
  );
}
