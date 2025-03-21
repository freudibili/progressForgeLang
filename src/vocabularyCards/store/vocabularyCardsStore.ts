import { vocabularyCardService } from "@vocabularyCards/services/vocabularyCardsService";
import { create } from "zustand";

import { VocabularyCard } from "../types";

type Level = "A1" | "A2" | "B1" | "B2";

interface CardStore {
  cards: VocabularyCard[];
  currentLevel: Level;
  isLoading: boolean;
  error: string | null;

  fetchCards: (level: Level) => Promise<void>;
  setCurrentLevel: (level: Level) => void;
  clearError: () => void;
}

export const useCardStore = create<CardStore>((set, get) => ({
  cards: [],
  currentLevel: "A1",
  isLoading: false,
  error: null,

  fetchCards: async (level: Level) => {
    set({ isLoading: true, error: null });
    try {
      const cards = await vocabularyCardService.fetchCards(level);
      set({ cards, currentLevel: level });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch cards";
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  setCurrentLevel: (level: Level) => {
    set({ currentLevel: level });
  },

  clearError: () => {
    set({ error: null });
  },
}));
