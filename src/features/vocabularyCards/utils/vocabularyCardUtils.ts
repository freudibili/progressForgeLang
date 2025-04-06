import { LevelProgress } from '../types/vocabularyCardTypes';

const createProgressObject = (cardId: string, isCorrect: boolean) => ({
  cardId,
  correctAttempts: isCorrect ? 1 : 0,
  incorrectAttempts: isCorrect ? 0 : 1,
  masteryLevel: isCorrect ? 1 : 0,
  lastAttemptedAt: Date.now()
});

export const vocabularyCardUtils = {
  createNewLevelProgress: (
    levelId: string,
    cardId: string,
    isCorrect: boolean
  ): LevelProgress => ({
    levelId,
    vocabProgress: [createProgressObject(cardId, isCorrect)]
  }),

  createNewCardProgress: (
    levelProgress: LevelProgress,
    cardId: string,
    isCorrect: boolean
  ): LevelProgress => ({
    ...levelProgress,
    vocabProgress: [
      ...levelProgress.vocabProgress,
      createProgressObject(cardId, isCorrect)
    ]
  }),

  calculateMasteryLevel: (
    correctAttempts: number,
    incorrectAttempts: number
  ): number => {
    // Ensure we have valid numbers
    const validCorrect = Number(correctAttempts) || 0;
    const validIncorrect = Number(incorrectAttempts) || 0;
    const totalAttempts = validCorrect + validIncorrect;

    if (totalAttempts === 0) return 0;

    const successRate = validCorrect / totalAttempts;

    if (successRate >= 0.75 && validCorrect >= 3) {
      return 2; // Mastered
    } else if (validCorrect > 0) {
      return 1; // Learning
    }
    return 0; // Not started
  },

  updateCardProgress: (
    levelProgress: LevelProgress,
    cardId: string,
    isCorrect: boolean
  ): LevelProgress => {
    const cardProgress = levelProgress.vocabProgress.find(
      (p) => p.cardId === cardId
    );

    if (!cardProgress) {
      return vocabularyCardUtils.createNewCardProgress(
        levelProgress,
        cardId,
        isCorrect
      );
    }

    const newCorrectAttempts = isCorrect
      ? cardProgress.correctAttempts + 1
      : cardProgress.correctAttempts;
    const newIncorrectAttempts = isCorrect
      ? cardProgress.incorrectAttempts
      : cardProgress.incorrectAttempts + 1;

    const newMasteryLevel = vocabularyCardUtils.calculateMasteryLevel(
      newCorrectAttempts,
      newIncorrectAttempts
    );

    return {
      ...levelProgress,
      vocabProgress: levelProgress.vocabProgress.map((cp) =>
        cp.cardId === cardId
          ? {
              ...cp,
              correctAttempts: newCorrectAttempts,
              incorrectAttempts: newIncorrectAttempts,
              masteryLevel: newMasteryLevel,
              lastAttemptedAt: Date.now()
            }
          : cp
      )
    };
  }
};
