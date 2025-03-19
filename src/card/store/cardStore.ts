import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { cardService } from "../services/cardService";
import { VocabularyCard } from "../types";

interface CardState {
  cards: VocabularyCard[];
  isLoading: boolean;
  error: string | null;
  fetchCards: () => Promise<void>;
  updateCardProgress: (cardId: string, isCorrect: boolean) => Promise<void>;
  clearError: () => void;
}

export const useCardStore = create<CardState>()(
  devtools((set) => ({
    cards: [],
    isLoading: false,
    error: null,

    fetchCards: async (): Promise<void> => {
      set({ isLoading: true, error: null });
      try {
        const cards = await cardService.fetchCards();
        set({ cards });
      } catch (err) {
        set({
          error: err instanceof Error ? err.message : "Failed to fetch cards",
        });
      } finally {
        set({ isLoading: false });
      }
    },

    updateCardProgress: async (
      cardId: string,
      isCorrect: boolean
    ): Promise<void> => {
      set({ isLoading: true, error: null });
      try {
        const updatedCard = await cardService.updateCardProgress(
          cardId,
          isCorrect
        );
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === cardId ? updatedCard : card
          ),
        }));
      } catch (err) {
        set({
          error:
            err instanceof Error
              ? err.message
              : "Failed to update card progress",
        });
      } finally {
        set({ isLoading: false });
      }
    },

    clearError: (): void => set({ error: null }),
  }))
);
