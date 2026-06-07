import { useState, useEffect, useCallback } from "react";

export interface GameState {
  xp: number;
  level: number;
  rank: string;
  missionsCompleted: string[]; // array of mission IDs
  pathsProgress: Record<string, number>; // pathId -> missions completed count
  streakDays: number;
  lastLogin: string;
}

const DEFAULT_STATE: GameState = {
  xp: 0,
  level: 1,
  rank: "Recruit",
  missionsCompleted: [],
  pathsProgress: {},
  streakDays: 0,
  lastLogin: "",
};

const STORAGE_KEY = "threatforge_state";

function getRank(xp: number) {
  if (xp < 500) return "Recruit";
  if (xp < 1500) return "Analyst";
  if (xp < 3000) return "Operator";
  if (xp < 5000) return "Vanguard";
  return "Sentinel";
}

function applyDerived(s: GameState): GameState {
  return { ...s, level: Math.floor(s.xp / 500) + 1, rank: getRank(s.xp) };
}

function persist(s: GameState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  window.dispatchEvent(new Event("threatforge_state_updated"));
}

export function useGameState() {
  const [state, setState] = useState<GameState>(DEFAULT_STATE);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage once on mount
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed: GameState = JSON.parse(raw);
        const today = new Date().toISOString().split("T")[0];
        if (parsed.lastLogin !== today) {
          const lastDate = new Date(parsed.lastLogin || today);
          const diff = (Date.now() - lastDate.getTime()) / (1000 * 3600 * 24);
          parsed.streakDays = diff <= 2 ? (parsed.streakDays || 0) + 1 : 1;
          parsed.lastLogin = today;
        }
        setState(applyDerived(parsed));
      } catch {
        // corrupted — start fresh
      }
    } else {
      const today = new Date().toISOString().split("T")[0];
      setState(applyDerived({ ...DEFAULT_STATE, lastLogin: today, streakDays: 1 }));
    }
    setLoaded(true);
  }, []);

  // Sync across tabs / components via the custom event
  useEffect(() => {
    const handleSync = () => {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        try { setState(applyDerived(JSON.parse(raw))); } catch { /* ignore */ }
      }
    };
    window.addEventListener("threatforge_state_updated", handleSync);
    return () => window.removeEventListener("threatforge_state_updated", handleSync);
  }, []);

  // ── Public actions ────────────────────────────────────────────────────────

  const addXp = useCallback((amount: number) => {
    setState(prev => {
      const next = applyDerived({ ...prev, xp: prev.xp + amount });
      persist(next);
      return next;
    });
  }, []);

  /**
   * Mark a mission as completed and update pathsProgress atomically.
   * @param missionId  - the deck id (e.g. "sqli")
   * @param pathId     - which learning-path owns this mission (e.g. "owasp")
   * @param isFirstTime - if false (replay), still award a small XP but don't
   *                      increment pathsProgress again.
   */
  const completeMission = useCallback((
    missionId: string,
    pathId?: string,
    isFirstTime = true,
  ) => {
    setState(prev => {
      const alreadyDone = prev.missionsCompleted.includes(missionId);

      // Build the next state atomically — no nested setState calls
      const xpGain = alreadyDone ? 50 : 150; // replay earns 50 XP
      const nextXp = prev.xp + xpGain;
      const nextMissions = alreadyDone
        ? prev.missionsCompleted
        : [...prev.missionsCompleted, missionId];

      const nextPaths = { ...prev.pathsProgress };
      if (pathId && !alreadyDone) {
        nextPaths[pathId] = (nextPaths[pathId] || 0) + 1;
      }

      const next = applyDerived({
        ...prev,
        xp: nextXp,
        missionsCompleted: nextMissions,
        pathsProgress: nextPaths,
      });

      persist(next);
      return next;
    });
  }, []);

  /** Reset a mission's completion so it can be replayed. */
  const resetMission = useCallback((missionId: string, pathId?: string) => {
    setState(prev => {
      const nextMissions = prev.missionsCompleted.filter(id => id !== missionId);
      const nextPaths = { ...prev.pathsProgress };
      if (pathId && nextPaths[pathId]) {
        nextPaths[pathId] = Math.max(0, nextPaths[pathId] - 1);
      }
      const next = applyDerived({ ...prev, missionsCompleted: nextMissions, pathsProgress: nextPaths });
      persist(next);
      return next;
    });
  }, []);

  return { state, loaded, addXp, completeMission, resetMission };
}
