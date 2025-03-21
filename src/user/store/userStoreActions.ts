import { VocabularyCard } from "@vocabularyCards/types";
import { UserVocabProgress } from "../types";

export const userStoreActions = {
  updateVocabProgress(
    userVocab: UserVocabProgress[],
    card: VocabularyCard
  ): UserVocabProgress[] {
    const existingProgress = userVocab.find(
      (progress) => progress.cardId === card.id
    );

    if (existingProgress) {
      return userVocab.map((progress) =>
        progress.cardId === card.id
          ? {
              ...progress,
              correctCount: progress.correctCount + 1,
              lastReviewedAt: new Date(),
            }
          : progress
      );
    }

    return [
      ...userVocab,
      {
        cardId: card.id,
        originalWord: card.infinitiv.en,
        correctCount: 1,
        lastReviewedAt: new Date(),
      },
    ];
  },
};
