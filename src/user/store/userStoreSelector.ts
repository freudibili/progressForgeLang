import { UserVocabProgress } from "../types";

export const userStoreSelector = {
  getVocabProgress(
    userVocab: UserVocabProgress[],
    cardId: string
  ): UserVocabProgress | undefined {
    return userVocab.find((progress) => progress.cardId === cardId);
  },

  getMasteredWordsCount(userVocab: UserVocabProgress[]): number {
    return userVocab.filter((progress) => progress.correctCount >= 2).length;
  },

  getMasteredWords(userVocab: UserVocabProgress[]): UserVocabProgress[] {
    return userVocab.filter((progress) => progress.correctCount >= 1);
  },
};
