import type { Destination } from "@/store/mission";

export const BIO = {
  tagline: "AI Founder · Software Engineer · Builder",
  location: "Fredericton, NB · 45.96°N 66.64°W",
  summary:
    "CS student at UNB, founder of Pyra AI, and co-founder of Hack Atlantic. I build at the intersection of AI, startups, and engineering — shipping products that feel a little like magic.",
  extended: [
    "Inspired by Iron Man's workshop ethos: prototype fast, iterate in public, and treat every project like a mission briefing.",
    "Currently on co-op at Introhive while scaling Pyra AI through the Base44 Accelerator (1 of 33 globally).",
    "Hackathon regular — Top 5 in 10+ MLH events. I thrive where deadlines are tight and the demo has to land.",
  ],
  currentFocus: ["Pyra AI agents", "Hack Atlantic 2026", "Introhive platform", "UNB CS + Math"],
};

export const ABOUT_STATS = [
  { v: "12+", l: "Projects" },
  { v: "10+", l: "Hackathons" },
  { v: "4.1", l: "GPA / 4.3" },
  { v: "25+", l: "Technologies" },
] as const;

export const ACHIEVEMENTS = [
  "Base44 Accelerator · Cohort 1 (1 of 33)",
  "Top 5 in 10+ MLH Hackathons",
  "National Astronomy Olympiad · Rank 7",
  "Mais Family Foundation Scholarship",
  "UNB Scholarship for Academic Excellence",
] as const;

export const PROJECTS = [
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
] as const;

export const EXPERIENCE = [
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
] as const;

export const SKILLS = {
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

export const CONTACT = {
  email: "ansh.tuli@unb.ca",
  links: [
    {
      href: "https://linkedin.com/in/ansh-tuli-651a60221",
      label: "LinkedIn",
      handle: "ansh-tuli",
    },
    { href: "https://github.com/Topupchips", label: "GitHub", handle: "Topupchips" },
    { href: "https://hackatlantic.ca", label: "Hack Atlantic", handle: "hackatlantic.ca" },
  ],
} as const;

export const MOBILE_SECTIONS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

export const ENGRAVINGS: { text: string; x: string; y: string; rotate?: number }[] = [
  { text: "AT · UNB '27", x: "8%", y: "12%", rotate: -8 },
  { text: "PYRA AI", x: "78%", y: "18%", rotate: 12 },
  { text: "HACK ATLANTIC", x: "85%", y: "42%", rotate: -5 },
  { text: "BASE44 · COHORT 1", x: "5%", y: "38%", rotate: 6 },
  { text: "4.1 GPA", x: "72%", y: "72%", rotate: -10 },
  { text: "FREDERICTON", x: "12%", y: "78%", rotate: 4 },
  { text: "BUILD · SHIP · ITERATE", x: "55%", y: "8%", rotate: -3 },
  { text: "MLH × 10+", x: "42%", y: "88%", rotate: 8 },
];

export const FLAVOR_UNLOCKS = [
  { threshold: 0, label: "Standard telemetry" },
  { threshold: 75, label: "Enhanced scan" },
  { threshold: 200, label: "Deep-field analysis" },
  { threshold: 400, label: "Full spectral unlock" },
] as const;

export const PLANET_FLAVOR: Record<Exclude<Destination, "home" | "contact">, string[]> = {
  about: [
    "Earth-class biosphere. Operator trained in Atlantic Canada.",
    "UNB Computer Science track · Math minor · academic excellence scholarship.",
    "National Astronomy Olympiad rank 7 — still looks up at this sky.",
  ],
  projects: [
    "Mars payload bay: GeneAI, Pyra AI, Hack Atlantic, Block Broker.",
    "Healthcare AI to Web3 escrow — diverse orbit, consistent velocity.",
    "Every repo is a prototype suit. Some become Mark VII.",
  ],
  experience: [
    "Saturn rings mark career orbits: Introhive, CIC, Irving Oil.",
    "Co-founder trajectory intersecting Hack Atlantic launch window.",
    "Fortune 500 energy to cybersecurity research — wide mission envelope.",
  ],
  skills: [
    "Lunar skill matrix: PyTorch, React, TypeScript, Postgres.",
    "Agents and LLMs at 92% signal — primary propulsion.",
    "Cloud stack rated for deep-space deployment.",
  ],
};

export type HudSection = Destination | "orbit";

export const HUD_WIDGETS: Record<
  HudSection,
  {
    diagnostics: { label: string; value: string; status: "ok" | "warn" | "active" }[];
    alerts: string[];
    mission: { phase: string; objective: string; eta: string };
  }
> = {
  orbit: {
    diagnostics: [
      { label: "Hull integrity", value: "100%", status: "ok" },
      { label: "Arc reactor", value: "Stable", status: "ok" },
      { label: "Nav mesh", value: "6 sectors", status: "active" },
      { label: "Comms", value: "Standby", status: "ok" },
    ],
    alerts: ["All systems nominal", "Orbital survey mode active"],
    mission: {
      phase: "Mission Control",
      objective: "Survey solar portfolio · select destination",
      eta: "T–0 READY",
    },
  },
  home: {
    diagnostics: [
      { label: "Sol reactor", value: "1.4 R☉", status: "active" },
      { label: "Core temp", value: "5,778 K", status: "ok" },
      { label: "J.A.R.V.I.S.", value: "Online", status: "active" },
      { label: "Operator", value: "Ansh Tuli", status: "ok" },
    ],
    alerts: ["Mission Control online", "Awaiting destination lock"],
    mission: {
      phase: "Home · Sol",
      objective: "Review operator dossier · plot course",
      eta: "T–0 READY",
    },
  },
  about: {
    diagnostics: [
      { label: "Biosphere", value: "Class M", status: "ok" },
      { label: "Education", value: "UNB CS", status: "active" },
      { label: "GPA", value: "4.1 / 4.3", status: "ok" },
      { label: "Scholarships", value: "2 active", status: "ok" },
    ],
    alerts: ["Operator profile declassified", "Earth sector unlocked"],
    mission: {
      phase: "Earth approach",
      objective: "Review operator background & achievements",
      eta: "T+00:42",
    },
  },
  projects: {
    diagnostics: [
      { label: "Payloads", value: "4 active", status: "active" },
      { label: "GeneAI", value: "Deployed", status: "ok" },
      { label: "Pyra AI", value: "Accel", status: "active" },
      { label: "Hack Atlantic", value: "Launch prep", status: "warn" },
    ],
    alerts: ["Mars sector: high innovation density", "Demo-ready builds detected"],
    mission: {
      phase: "Mars rendezvous",
      objective: "Inspect active payloads & repositories",
      eta: "T+01:15",
    },
  },
  experience: {
    diagnostics: [
      { label: "Orbit count", value: "5 roles", status: "ok" },
      { label: "Introhive", value: "Active co-op", status: "active" },
      { label: "Irving Oil", value: "Complete", status: "ok" },
      { label: "CIC research", value: "Complete", status: "ok" },
    ],
    alerts: ["Saturn rings: career timeline expanded", "Co-op trajectory stable"],
    mission: {
      phase: "Saturn survey",
      objective: "Trace mission log & role history",
      eta: "T+02:08",
    },
  },
  skills: {
    diagnostics: [
      { label: "AI stack", value: "92% avg", status: "active" },
      { label: "Full stack", value: "94% avg", status: "ok" },
      { label: "Cloud", value: "82% avg", status: "ok" },
      { label: "Languages", value: "25+", status: "ok" },
    ],
    alerts: ["Lunar constellation mapped", "TypeScript signal strongest"],
    mission: {
      phase: "Moon scan",
      objective: "Analyze skill matrix & proficiency",
      eta: "T+00:58",
    },
  },
  contact: {
    diagnostics: [
      { label: "Channel", value: "Open", status: "active" },
      { label: "Email", value: "ansh.tuli@unb.ca", status: "ok" },
      { label: "LinkedIn", value: "Linked", status: "ok" },
      { label: "GitHub", value: "Topupchips", status: "ok" },
    ],
    alerts: ["Comms array online", "Transmission channel ready"],
    mission: {
      phase: "Deep space comms",
      objective: "Establish contact with operator",
      eta: "T+00:00",
    },
  },
};

export const TRANSITION_NARRATION: Record<string, string[]> = {
  "null->about": [
    "Plotting course to Earth sector.",
    "Operator profile incoming.",
    "Atmospheric entry in 3… 2… 1…",
  ],
  "null->projects": [
    "Mars trajectory locked.",
    "Scanning active payloads.",
    "Innovation density: elevated.",
  ],
  "null->experience": [
    "Saturn approach initiated.",
    "Mission log decompressing.",
    "Career rings coming into view.",
  ],
  "null->skills": [
    "Lunar orbit established.",
    "Constellation mapping online.",
    "Skill matrix resolving.",
  ],
  "null->contact": [
    "Comms array deploying.",
    "Channel frequency open.",
    "Standing by for transmission.",
  ],
  "about->null": ["Disengaging Earth lock.", "Returning to orbital survey."],
  "projects->null": ["Mars departure sequence.", "Payload bay secured."],
  "experience->null": ["Saturn flyby complete.", "Resuming free orbit."],
  "skills->null": ["Lunar scan complete.", "Constellation archived."],
  "contact->null": ["Comms channel closed.", "Signal logged."],
  default: ["Recalibrating navigation.", "Course correction in progress.", "Arrival imminent."],
};

export function getTransitionLines(from: Destination | null, to: Destination | null): string[] {
  const key = `${from ?? "null"}->${to ?? "null"}`;
  return TRANSITION_NARRATION[key] ?? TRANSITION_NARRATION.default;
}

export function getUnlockTier(score: number): number {
  let tier = 0;
  for (let i = FLAVOR_UNLOCKS.length - 1; i >= 0; i--) {
    if (score >= FLAVOR_UNLOCKS[i].threshold) {
      tier = i;
      break;
    }
  }
  return tier;
}

export function getPlanetFlavor(
  planet: Exclude<Destination, "home" | "contact">,
  score: number,
): string | null {
  const tier = getUnlockTier(score);
  if (tier === 0) return null;
  const lines = PLANET_FLAVOR[planet];
  return lines[Math.min(tier - 1, lines.length - 1)] ?? null;
}
