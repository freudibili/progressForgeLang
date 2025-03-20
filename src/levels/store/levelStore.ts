import { create } from "zustand";
import { Level, LevelState } from "../types/level";
import { levelService } from "../services/levelService";

export const useLevelStore = create<LevelState>((set) => ({
  levels: [],
  selectedLevel: null,
  isLoading: false,
  error: null,

  fetchLevels: async () => {
    set({ isLoading: true, error: null });
    try {
      const levels = await levelService.getLevels();
      set({ levels, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch levels",
        isLoading: false,
      });
    }
  },

  selectLevel: (level: Level) => {
    set({ selectedLevel: level });
  },

  clearSelectedLevel: () => {
    set({ selectedLevel: null });
  },
}));
