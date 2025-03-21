import { createGenericStore } from "../../common/store/createGenericStore";
import { VocabularyCard } from "../types";

type Level = "A1" | "A2" | "B1" | "B2";

interface VocabularyCardState {
  cards: VocabularyCard[];
  currentLevel: Level;
}

const initialState: VocabularyCardState = {
  cards: [],
  currentLevel: "A1",
};

export const useVocabularyCardStore =
  createGenericStore<VocabularyCardState>(initialState);

// Add vocabulary card-specific actions
useVocabularyCardStore.setState((state) => ({
  ...state,
  setCards: (cards: VocabularyCard[]) =>
    useVocabularyCardStore.setState({ cards }),
  setCurrentLevel: (level: Level) =>
    useVocabularyCardStore.setState({ currentLevel: level }),
}));
