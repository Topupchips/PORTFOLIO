import { create } from "zustand";
import { getUnlockTier } from "@/lib/content";

const STORAGE_KEY = "nebula-shooting-game";

type PersistedGame = {
  highScore: number;
  totalScore: number;
};

function loadPersisted(): PersistedGame {
  if (typeof window === "undefined") return { highScore: 0, totalScore: 0 };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { highScore: 0, totalScore: 0 };
    return JSON.parse(raw) as PersistedGame;
  } catch {
    return { highScore: 0, totalScore: 0 };
  }
}

function persist(data: PersistedGame) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

type GameState = {
  highScore: number;
  totalScore: number;
  sessionScore: number;
  active: boolean;
  hydrated: boolean;
  unlockTier: number;
  hydrate: () => void;
  startGame: () => void;
  endGame: () => void;
  addScore: (points: number) => void;
  resetSession: () => void;
};

export const useGame = create<GameState>((set, get) => ({
  highScore: 0,
  totalScore: 0,
  sessionScore: 0,
  active: false,
  hydrated: false,
  unlockTier: 0,

  hydrate: () => {
    const data = loadPersisted();
    set({
      highScore: data.highScore,
      totalScore: data.totalScore,
      unlockTier: getUnlockTier(data.totalScore),
      hydrated: true,
    });
  },

  startGame: () => set({ active: true, sessionScore: 0 }),

  endGame: () => {
    const { sessionScore, highScore, totalScore } = get();
    const newTotal = totalScore + sessionScore;
    const newHigh = Math.max(highScore, sessionScore);
    persist({ highScore: newHigh, totalScore: newTotal });
    set({
      active: false,
      highScore: newHigh,
      totalScore: newTotal,
      unlockTier: getUnlockTier(newTotal),
      sessionScore: 0,
    });
  },

  addScore: (points) => {
    set((s) => ({ sessionScore: s.sessionScore + points }));
  },

  resetSession: () => set({ sessionScore: 0 }),
}));
