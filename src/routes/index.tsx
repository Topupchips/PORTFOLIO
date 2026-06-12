import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Rocket,
  Sparkles,
  Code2,
  GraduationCap,
  Trophy,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";
import { Starfield } from "@/components/Starfield";
import { Planet } from "@/components/Planet";
import astronaut from "@/assets/astronaut.jpg";
import nebula from "@/assets/nebula.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ansh Tuli — Software Developer & Builder" },
      {
        name: "description",
        content:
          "Ansh Tuli — Computer Science student at UNB, software developer at Introhive, founder of Pyra AI and Hack Atlantic.",
      },
    ],
  }),
  component: Portfolio,
});

const experience = [
  {
    role: "Co-Founder",
    org: "Hack Atlantic",
    period: "May 2026 — Present",
    desc: "Building Atlantic Canada's flagship student hackathon — connecting builders, founders, and industry.",
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
    desc: "Selected for the first-ever Base44 Accelerator cohort — 33 of hundreds of ventures.",
  },
  {
    role: "Software Developer",
    org: "Canadian Institute for Cybersecurity",
    period: "Sep 2025 — Dec 2025",
    desc: "Built modern web apps with Next.js, React, TypeScript, Zustand, React Hook Form + Zod, and Framer Motion.",
  },
  {
    role: "Teaching Assistant",
    org: "University of New Brunswick",
    period: "Sep 2024 — Dec 2025",
    desc: "TA for Faculty of Computer Science and Mathematics. Helped students debug, refactor, and ship.",
  },
  {
    role: "Software Developer Co-op",
    org: "Irving Oil",
    period: "Jan 2025 — Apr 2025",
    desc: "Built full-stack apps with Angular, React, Vite, Salesforce LWC, and an Einstein Bot for Hometown Rewards.",
  },
];

const projects = [
  {
    name: "GeneAI",
    tag: "HackIllinois 2025",
    desc: "Pharmacogenomics-powered REST API and web app that personalizes drug safety using genetic profiles. Cross-Attention Set Transformer + CPIC recommendations.",
    stack: ["PyTorch", "FastAPI", "React", "Three.js", "GPT-4o"],
    href: "https://github.com/Topupchips",
  },
  {
    name: "Block Broker",
    tag: "MLH Web3 Hackathon",
    desc: "Decentralized marketplace for freelancers and clients. Smart contracts enable secure, transparent transactions with fair compensation.",
    stack: ["React", "Vite", "Solidity", "Rainbow Kit", "Hedera"],
    href: "https://github.com/Topupchips/MLH-Web3-Hackathon",
  },
  {
    name: "Pyra AI",
    tag: "Base44 Accelerator",
    desc: "Building at the intersection of AI and real-world impact. One of 33 ventures in the first-ever Base44 Accelerator cohort.",
    stack: ["AI", "Product", "Startup"],
    href: "#",
  },
];

const skills = [
  "TypeScript", "React", "Next.js", "Java", "Python", "Angular",
  "Tailwind", "Node.js", "MySQL", "Solidity", "PyTorch", "FastAPI",
];

const honors = [
  "Mais Family Foundation Scholarship (2024-25)",
  "Eldon and Maxine Clair Scholarship in CS (2025-26)",
  "UNB Scholarship for Academic Excellence (2023-24)",
  "Richard Scott Merit Award (2025-26)",
  "Top 5 in 10+ MLH hackathons",
  "National Astronomy Olympiad — Rank 7",
];

function Portfolio() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Starfield />

      <nav className="fixed top-0 z-50 w-full px-4">
        <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full glass-panel px-5 py-2.5">
          <a href="#top" className="flex items-center gap-2 font-display font-semibold tracking-tight">
            <Rocket className="h-4 w-4 text-accent" />
            <span>ansh.tuli</span>
          </a>
          <div className="hidden gap-7 text-sm text-muted-foreground md:flex">
            <a href="#about" className="transition-colors hover:text-foreground">About</a>
            <a href="#experience" className="transition-colors hover:text-foreground">Experience</a>
            <a href="#projects" className="transition-colors hover:text-foreground">Projects</a>
            <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-all hover:scale-105"
          >
            Let's talk <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section id="top" className="relative flex min-h-screen items-center px-6 pt-32">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-60"
          style={{ background: "var(--gradient-radial)" }}
        />
        <Planet
          size={120}
          delay={0}
          className="right-[8%] top-[18%] hidden lg:block"
          gradient="radial-gradient(circle at 35% 30%, oklch(0.88 0.16 85), oklch(0.55 0.2 50) 50%, oklch(0.2 0.08 40) 100%)"
          ring
        />
        <Planet
          size={70}
          delay={1.5}
          className="left-[6%] top-[60%] hidden lg:block"
          gradient="radial-gradient(circle at 30% 30%, oklch(0.85 0.18 200), oklch(0.45 0.2 220) 50%, oklch(0.15 0.08 240) 100%)"
        />

        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full glass-panel px-3 py-1 text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aurora opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-aurora" />
              </span>
              Available for collaborations — Fredericton, NB
            </div>

            <h1 className="mt-6 font-display text-6xl font-bold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
              Building from
              <br />
              <span className="text-gradient-cosmic">first principles</span>
              <br />
              across the cosmos.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              I'm <span className="text-foreground">Ansh Tuli</span> — a CS student at UNB, software developer at Introhive, and founder of Pyra AI. I learn fast and ship things that matter.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 font-medium text-primary-foreground transition-all hover:scale-[1.03] hover:glow-primary"
              >
                <Sparkles className="h-4 w-4" /> Explore the mission
              </a>
              <a
                href="https://github.com/Topupchips"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full glass-panel px-6 py-3 font-medium transition-all hover:border-accent/40"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Fredericton, NB</span>
              <span className="flex items-center gap-1.5"><GraduationCap className="h-3.5 w-3.5" /> UNB · GPA 4.1/4.3</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative mx-auto aspect-square w-full max-w-md"
          >
            <div className="absolute inset-0 animate-orbit orbit-ring" />
            <div className="absolute inset-8 orbit-ring opacity-50" style={{ animation: "orbit 60s linear infinite reverse" }} />
            <div className="absolute inset-16 orbit-ring opacity-30" />
            <div className="absolute inset-0 animate-orbit">
              <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_20px_rgba(0,200,255,0.8)]" />
            </div>
            <div className="absolute inset-12 overflow-hidden rounded-full border border-border glow-primary animate-pulse-glow">
              <img
                src={astronaut}
                alt="Astronaut helmet reflecting a nebula"
                width={1024}
                height={1024}
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          scroll
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative px-6 py-32">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent">/ 01 — about</div>
            <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
              Curious by default,<br /> <span className="text-gradient-aurora">builder by craft.</span>
            </h2>
          </div>
          <div className="space-y-4 text-lg text-muted-foreground">
            <p>
              I got hooked on technology after watching Iron Man — building something meaningful suddenly felt possible. That spark turned into a habit of learning new tools and shipping useful products.
            </p>
            <p>
              I love startup ideas, building from scratch, and growing through hands-on experience. As a developer I'm focused on improving every day and making things that actually matter to people.
            </p>
            <div className="flex flex-wrap gap-2 pt-4">
              {skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border bg-card px-3 py-1 font-mono text-xs text-foreground/80"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="relative px-6 py-32">
        <div className="mx-auto max-w-6xl">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent">/ 02 — trajectory</div>
          <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
            Mission log
          </h2>

          <div className="relative mt-16">
            <div className="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-primary via-accent to-transparent md:left-1/2" />
            <div className="space-y-12">
              {experience.map((e, i) => (
                <motion.div
                  key={e.org + e.period}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className={`relative grid gap-4 md:grid-cols-2 md:gap-12 ${
                    i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"
                  }`}
                >
                  <div className={`pl-10 md:pl-0 ${i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                    <div className="font-mono text-xs text-accent">{e.period}</div>
                    <h3 className="mt-1 font-display text-xl font-semibold">{e.role}</h3>
                    <div className="text-sm text-muted-foreground">{e.org}</div>
                  </div>
                  <div className={`pl-10 md:pl-0 ${i % 2 === 0 ? "md:pl-8" : "md:pr-8 md:text-right"}`}>
                    <p className="text-muted-foreground">{e.desc}</p>
                  </div>
                  <div className="absolute left-3 top-2 -translate-x-1/2 md:left-1/2">
                    <div className="h-3 w-3 rounded-full bg-accent shadow-[0_0_15px_rgba(100,220,255,0.8)]" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="relative px-6 py-32">
        <div
          className="absolute inset-x-0 top-0 -z-10 h-[60%] opacity-40"
          style={{
            backgroundImage: `url(${nebula})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
        <div className="mx-auto max-w-6xl">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent">/ 03 — payloads</div>
            <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
              Things I've launched
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <motion.a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl glass-panel p-6 transition-all hover:-translate-y-1 hover:border-accent/40 hover:glow-primary"
              >
                <div
                  className="absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-30 blur-2xl transition-opacity group-hover:opacity-60"
                  style={{ background: "var(--gradient-aurora)" }}
                />
                <div className="relative">
                  <div className="font-mono text-xs uppercase tracking-wider text-accent">{p.tag}</div>
                  <h3 className="mt-2 flex items-center justify-between font-display text-2xl font-semibold">
                    {p.name}
                    <ExternalLink className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span key={s} className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* HONORS */}
      <section className="relative px-6 py-32">
        <div className="mx-auto max-w-6xl">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent">/ 04 — constellations</div>
          <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
            Honors & recognition
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {honors.map((h) => (
              <div key={h} className="flex items-start gap-3 rounded-xl glass-panel p-5">
                <Trophy className="mt-0.5 h-5 w-5 shrink-0 text-stardust" />
                <span className="text-sm text-foreground/90">{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative px-6 py-32">
        <div className="mx-auto max-w-4xl text-center">
          <Code2 className="mx-auto h-8 w-8 text-accent" />
          <h2 className="mt-4 font-display text-5xl font-bold leading-tight md:text-7xl">
            Let's build something <span className="text-gradient-cosmic">stellar.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Whether it's a startup idea, a hackathon team, or a hard problem to solve — I'd love to hear from you.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="https://www.linkedin.com/in/ansh-tuli-651a60221"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 font-medium text-primary-foreground transition-all hover:scale-105 hover:glow-primary"
            >
              <Mail className="h-4 w-4" /> Send a transmission
            </a>
            <a
              href="https://www.linkedin.com/in/ansh-tuli-651a60221"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass-panel px-6 py-3 font-medium transition-all hover:border-accent/40"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a
              href="https://github.com/Topupchips"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass-panel px-6 py-3 font-medium transition-all hover:border-accent/40"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>© 2026 Ansh Tuli — Built with curiosity.</span>
          <span className="font-mono">lat 45.96° N · lon 66.64° W</span>
        </div>
      </footer>
    </main>
  );
}
