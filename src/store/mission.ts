import { create } from "zustand";

export type Destination = "home" | "about" | "projects" | "experience" | "skills" | "contact";

export const DESTINATIONS: { id: Destination; label: string; planet: string }[] = [
  { id: "home", label: "Mission Control", planet: "Sun" },
  { id: "about", label: "About", planet: "Earth" },
  { id: "projects", label: "Projects", planet: "Mars" },
  { id: "experience", label: "Experience", planet: "Saturn" },
  { id: "skills", label: "Skills", planet: "Moon" },
  { id: "contact", label: "Contact", planet: "Comms" },
];

type MissionState = {
  stage: "landing" | "orbit";
  focus: Destination | null;
  warp: boolean;
  pilot: boolean;
  setStage: (s: MissionState["stage"]) => void;
  setFocus: (d: Destination | null) => void;
  setWarp: (w: boolean) => void;
  setPilot: (p: boolean) => void;
  togglePilot: () => void;
};

export const useMission = create<MissionState>((set) => ({
  stage: "landing",
  focus: null,
  warp: false,
  pilot: false,
  setStage: (stage) => set({ stage }),
  setFocus: (focus) => set({ focus }),
  setWarp: (warp) => set({ warp }),
  setPilot: (pilot) => set({ pilot }),
  togglePilot: () => set((s) => ({ pilot: !s.pilot, focus: null })),
}));
