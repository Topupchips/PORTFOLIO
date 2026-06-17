import { motion, AnimatePresence } from "framer-motion";
import { useMission, type Destination } from "@/store/mission";
import { getPlanetFlavor } from "@/lib/content";
import { useGame } from "@/store/game";
import {
  GraduationCap,
  Trophy,
  Briefcase,
  Github,
  Linkedin,
  Mail,
  Copy,
  Check,
  ExternalLink,
  Download,
  Send,
} from "lucide-react";
import { useState } from "react";

const PANELS: Record<Exclude<Destination, "home">, { title: string; subtitle: string }> = {
  about: { title: "Earth · About", subtitle: "Operator profile" },
  projects: { title: "Mars · Payloads", subtitle: "Active missions" },
  experience: { title: "Saturn · Mission Log", subtitle: "Career trajectory" },
  skills: { title: "Moon · Constellation", subtitle: "Skill matrix" },
  contact: { title: "Comms · Channel Open", subtitle: "Establish contact" },
};

export function PanelLayer() {
  const focus = useMission((s) => s.focus);
  const totalScore = useGame((s) => s.totalScore);

  const flavor =
    focus && focus !== "home" && focus !== "contact" ? getPlanetFlavor(focus, totalScore) : null;

  return (
    <AnimatePresence mode="wait">
      {focus && focus !== "home" && (
        <motion.div
          key={focus}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          className="pointer-events-none fixed inset-0 z-30 flex items-end justify-center safe-x p-2 pb-[4.5rem] md:items-center md:p-4 md:pb-8 lg:p-8"
        >
          <div className="pointer-events-auto glass-holo border-holo relative flex max-h-[min(85dvh,100%)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl md:max-h-[85vh]">
            {/* Scanline */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
              <div className="scanline absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
            </div>

            <header className="flex flex-col gap-2 border-b border-cyan-400/20 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.25em] sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4 sm:text-[10px] sm:tracking-[0.3em]">
              <div className="flex items-center gap-3 text-cyan-300">
                <span className="pulse-ring h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                <span className="truncate">{PANELS[focus].title}</span>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-white/40">{PANELS[focus].subtitle}</div>
                {flavor && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-1 max-w-xs text-[8px] normal-case tracking-normal text-amber-300/70 sm:text-[9px]"
                  >
                    🔓 {flavor}
                  </motion.div>
                )}
              </div>
            </header>

            <div className="overflow-y-auto overscroll-contain p-4 sm:p-6 md:p-10">
              {focus === "about" && <AboutPanel />}
              {focus === "projects" && <ProjectsPanel />}
              {focus === "experience" && <ExperiencePanel />}
              {focus === "skills" && <SkillsPanel />}
              {focus === "contact" && <ContactPanel />}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AboutPanel() {
  const stats = [
    { v: "12+", l: "Projects" },
    { v: "10+", l: "Hackathons" },
    { v: "4.1", l: "GPA / 4.3" },
    { v: "25+", l: "Technologies" },
  ];
  const achievements = [
    "Base44 Accelerator · Cohort 1 (1 of 33)",
    "Top 5 in 10+ MLH Hackathons",
    "National Astronomy Olympiad · Rank 7",
    "Mais Family Foundation Scholarship",
    "UNB Scholarship for Academic Excellence",
  ];
  return (
    <div className="grid gap-8 md:grid-cols-5">
      <div className="md:col-span-3 space-y-5">
        <h2 className="font-display text-2xl font-bold text-holo sm:text-3xl md:text-4xl lg:text-5xl">
          Operator Profile
        </h2>
        <p className="text-white/70 leading-relaxed">
          I got pulled into tech the way most kids my age did — watching Iron Man build something
          impossible in a cave. Now I'm a CS student at UNB, founder of{" "}
          <span className="text-cyan-300">Pyra AI</span>, and co-founder of{" "}
          <span className="text-cyan-300">Hack Atlantic</span>. I work at the intersection of AI,
          startups, and engineering — shipping things that feel a little like magic.
        </p>
        <div className="flex items-start gap-3 rounded-lg border border-cyan-400/20 p-4">
          <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
          <div>
            <div className="font-display text-sm">University of New Brunswick</div>
            <div className="text-xs text-white/50">
              Bachelor of Computer Science · Math Minor · GPA 4.1/4.3
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-cyan-400/20 p-4">
          <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-300">
            <Trophy className="h-3.5 w-3.5" /> Achievements
          </div>
          <ul className="space-y-2 text-sm text-white/70">
            {achievements.map((a) => (
              <li key={a} className="flex gap-2">
                <span className="text-cyan-400">▸</span>
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="md:col-span-2 grid grid-cols-2 gap-3 self-start">
        {stats.map((s) => (
          <div key={s.l} className="rounded-lg border border-cyan-400/20 bg-black/30 p-5">
            <div className="font-display text-3xl font-bold text-holo">{s.v}</div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
              {s.l}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const PROJECTS = [
  {
    name: "GeneAI",
    tag: "HackIllinois 2025",
    desc: "Pharmacogenomics drug safety platform that flags adverse drug-gene interactions using deep learning.",
    stack: ["PyTorch", "FastAPI", "React", "Healthcare AI"],
    url: "#",
  },
  {
    name: "Pyra AI",
    tag: "Base44 Cohort 1",
    desc: "AI venture selected as 1 of 33 startups for Base44 Accelerator. Building agents that ship work.",
    stack: ["LLMs", "Next.js", "Postgres", "Agents"],
    url: "#",
  },
  {
    name: "Hack Atlantic",
    tag: "Co-Founder",
    desc: "Atlantic Canada's flagship student hackathon — connecting builders, founders, and industry.",
    stack: ["React", "Community", "Events"],
    url: "https://hackatlantic.ca",
  },
  {
    name: "Block Broker",
    tag: "MLH Hackathon",
    desc: "Web3 freelancer marketplace using smart contracts to escrow payments trustlessly.",
    stack: ["React", "Solidity", "Web3"],
    url: "#",
  },
];

function ProjectsPanel() {
  return (
    <div>
      <h2 className="mb-4 font-display text-2xl font-bold text-holo sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl">
        Active Payloads
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <motion.a
            key={p.name}
            href={p.url}
            target={p.url.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-xl border border-cyan-400/20 bg-black/40 p-5 transition-colors hover:border-cyan-400/60"
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-cyan-300">
                {p.tag}
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-white/30 transition-colors group-hover:text-cyan-300" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white">{p.name}</h3>
            <p className="mt-2 text-sm text-white/60">{p.desc}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-cyan-400/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-cyan-200/80"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}

const EXPERIENCE = [
  {
    role: "Co-Founder",
    org: "Hack Atlantic",
    period: "May 2026 — Present",
    desc: "Building Atlantic Canada's flagship student hackathon.",
  },
  {
    role: "Associate Software Engineer",
    org: "Introhive",
    period: "Jan 2026 — Present",
    desc: "Co-op engineer shipping production features across the Introhive platform.",
  },
  {
    role: "Founder",
    org: "Pyra AI",
    period: "Jan 2026 — Present",
    desc: "Selected for Base44 Accelerator Cohort 1 (1 of 33 globally).",
  },
  {
    role: "Software Developer",
    org: "Canadian Institute for Cybersecurity",
    period: "Sep — Dec 2025",
    desc: "Research engineering on cybersecurity tooling at UNB.",
  },
  {
    role: "Software Developer Co-op",
    org: "Irving Oil",
    period: "Jan — Apr 2025",
    desc: "Internal tools, automation, and data pipelines for a Fortune 500 energy company.",
  },
];

function ExperiencePanel() {
  return (
    <div>
      <h2 className="mb-6 font-display text-2xl font-bold text-holo sm:mb-8 sm:text-3xl md:text-4xl lg:text-5xl">
        Mission Log
      </h2>
      <ol className="relative space-y-6 border-l border-cyan-400/30 pl-6">
        {EXPERIENCE.map((e, i) => (
          <motion.li
            key={e.org + e.period}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative"
          >
            <span className="absolute -left-[31px] top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-black ring-2 ring-cyan-400">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            </span>
            <div className="rounded-lg border border-cyan-400/20 bg-black/40 p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="font-display text-lg font-semibold text-white">
                  {e.role} · <span className="text-cyan-300">{e.org}</span>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                  {e.period}
                </div>
              </div>
              <p className="mt-1.5 text-sm text-white/60">{e.desc}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

const SKILLS = {
  AI: [
    ["PyTorch", 88],
    ["LLMs / Agents", 92],
    ["FastAPI", 85],
    ["Computer Vision", 75],
  ],
  "Full Stack": [
    ["React / Next.js", 95],
    ["TypeScript", 92],
    ["Node.js", 85],
    ["Tailwind", 95],
  ],
  Cloud: [
    ["AWS", 78],
    ["Vercel", 90],
    ["Docker", 82],
    ["Cloudflare", 80],
  ],
  Data: [
    ["Postgres", 88],
    ["Supabase", 90],
    ["Python", 92],
    ["SQL", 90],
  ],
} as const;

function SkillsPanel() {
  return (
    <div>
      <h2 className="mb-2 font-display text-2xl font-bold text-holo sm:text-3xl md:text-4xl lg:text-5xl">
        Skill Constellation
      </h2>
      <p className="mb-4 text-sm text-white/50 sm:mb-6">
        <span className="hidden sm:inline">Hover a star to read its signal strength.</span>
        <span className="sm:hidden">Tap a skill to read its signal strength.</span>
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {Object.entries(SKILLS).map(([cat, items]) => (
          <div key={cat} className="rounded-xl border border-cyan-400/20 bg-black/30 p-5">
            <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-300">
              {cat}
            </div>
            <div className="space-y-3">
              {items.map(([name, val]) => (
                <div key={name} className="group">
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-white/80">{name}</span>
                    <span className="font-mono text-cyan-300/70 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
                      {val}%
                    </span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${val}%` }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-cyan-400 to-violet-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactPanel() {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const email = "ansh.tuli@unb.ca";

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
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <h2 className="mb-2 font-display text-2xl font-bold text-holo sm:text-3xl md:text-4xl lg:text-5xl">
          Open Comms
        </h2>
        <p className="mb-6 text-sm text-white/60">
          Transmission channel active. Send a signal — I read everything.
        </p>

        <button
          onClick={copy}
          className="glass-holo mb-3 flex w-full touch-target items-center justify-between rounded-lg px-4 py-3 text-left transition-colors hover:bg-cyan-400/10"
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
          <SocialLink
            href="https://linkedin.com/in/ansh-tuli-651a60221"
            icon={Linkedin}
            label="LinkedIn"
            handle="ansh-tuli"
          />
          <SocialLink
            href="https://github.com/Topupchips"
            icon={Github}
            label="GitHub"
            handle="Topupchips"
          />
          <SocialLink
            href="https://hackatlantic.ca"
            icon={ExternalLink}
            label="Hack Atlantic"
            handle="hackatlantic.ca"
          />
        </div>

        <a
          href="#"
          className="border-holo mt-4 flex items-center justify-center gap-2 rounded-lg px-4 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-300 hover:bg-cyan-400/10"
        >
          <Download className="h-3.5 w-3.5" /> Download Resume
        </a>
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
            rows={5}
            placeholder="Begin transmission..."
            className="w-full rounded-lg border border-cyan-400/20 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-cyan-400/60 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="border-holo flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-400/10 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-200 transition-colors hover:bg-cyan-400/20"
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

function SocialLink({
  href,
  icon: Icon,
  label,
  handle,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  handle: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="glass-holo touch-target flex items-center justify-between rounded-lg px-4 py-3 transition-colors hover:bg-cyan-400/10"
    >
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-cyan-300" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">{label}</span>
      </div>
      <span className="font-mono text-xs text-white/80">{handle}</span>
    </a>
  );
}
