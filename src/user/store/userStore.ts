import { VocabularyCard } from "@vocabularyCards/types";
import { create } from "zustand";

import { User, UserVocabProgress } from "../types";
import { userStoreActions } from "./userStoreActions";
import { userStoreSelector } from "./userStoreSelector";

interface UserState {
  user: User | null;
  userVocab: UserVocabProgress[];
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  markVocabCorrect: (card: VocabularyCard) => void;
  getUserVocabProgress: (cardId: string) => UserVocabProgress | undefined;
  getMasteredWordsCount: () => number;
  getMasteredWords: () => UserVocabProgress[];
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  userVocab: [],
  isLoading: false,
  error: null,

  setUser: (user: User | null) => set({ user }),

  markVocabCorrect: (card: VocabularyCard) => {
    const { userVocab } = get();
    const updatedVocab = userStoreActions.updateVocabProgress(userVocab, card);
    set({ userVocab: updatedVocab });
  },

  getUserVocabProgress: (cardId: string) => {
    const { userVocab } = get();
    return userStoreSelector.getVocabProgress(userVocab, cardId);
  },

  getMasteredWordsCount: () => {
    const { userVocab } = get();
    return userStoreSelector.getMasteredWordsCount(userVocab);
  },

  getMasteredWords: () => {
    const { userVocab } = get();
    return userStoreSelector.getMasteredWords(userVocab);
  },
}));
