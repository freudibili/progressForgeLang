import { VocabLevel } from '@levels/types/level';
import { UserVocabProgress, VocabularyCards, LevelProgress } from '@user/types';

export const MASTERY_THRESHOLD = 3;
export const MASTERY_MILESTONE = 5;

/**
 * Finds vocabulary cards data for a specific level
 */
export const findLevelData = (
  vocabularyCards: VocabularyCards[],
  level: VocabLevel
): VocabularyCards | undefined => {
  return vocabularyCards.find((data) => data.level === level);
};

/**
 * Finds progress data for a specific level
 */
export const findLevelProgress = (
  progress: LevelProgress[],
  level: VocabLevel
) => {
  return progress.find((p) => p.level === level);
};

/**
 * Finds progress data for a specific card
 */
export const findCardProgress = (
  levelProgress: { vocabProgress: UserVocabProgress[] } | undefined,
  cardId: string
) => {
  return levelProgress?.vocabProgress.find(
    (progress) => progress.cardId === cardId
  );
};

/**
 * Gets the number of correct attempts for a card
 */
export const getCardAttempts = (progress: UserVocabProgress | undefined) => {
  if (!progress) return 0;
  return progress.correctAttempts;
};

/**
 * Gets the total number of attempts for a card
 */
export const getTotalAttempts = (progress: UserVocabProgress | undefined) => {
  if (!progress) return 0;
  return progress.correctAttempts + progress.incorrectAttempts;
};

/**
 * Checks if a card is mastered based on the number of correct attempts
 */
export const isCardMastered = (attempts: number) => {
  return attempts >= MASTERY_THRESHOLD;
};

/**
 * Filters cards that have been mastered in a level
 */
export const filterMasteredCards = (
  vocabCards: VocabularyCards['vocab'],
  levelProgress: { vocabProgress: UserVocabProgress[] }
) => {
  return vocabCards.filter((card) => {
    const progress = findCardProgress(levelProgress, card.id);
    return isCardMastered(getCardAttempts(progress));
  });
};

/**
 * Filters cards that have been seen at least once in a level
 */
export const filterSeenCards = (
  vocabCards: VocabularyCards['vocab'],
  levelProgress: { vocabProgress: UserVocabProgress[] }
) => {
  return vocabCards.filter((card) => {
    const progress = findCardProgress(levelProgress, card.id);
    return getTotalAttempts(progress) > 0;
  });
};

/**
 * Calculates success rate for a level's progress
 */
export const calculateSuccessRate = (levelProgress: {
  vocabProgress: UserVocabProgress[];
}) => {
  const totalAttempts = levelProgress.vocabProgress.reduce(
    (sum, progress) =>
      sum + progress.correctAttempts + progress.incorrectAttempts,
    0
  );
  const correctAttempts = levelProgress.vocabProgress.reduce(
    (sum, progress) => sum + progress.correctAttempts,
    0
  );

  return totalAttempts > 0 ? (correctAttempts / totalAttempts) * 100 : 0;
};

/**
 * Creates a new word progress object
 */
export const createWordProgress = (id: string): UserVocabProgress => ({
  cardId: id,
  correctAttempts: 1,
  incorrectAttempts: 0,
  lastReviewDate: new Date()
});

/**
 * Creates a new level progress object
 */
export const createLevelProgress = (
  level: VocabLevel,
  id: string
): LevelProgress => ({
  level,
  vocabProgress: [createWordProgress(id)]
});

/**
 * Creates an updated progress array with a new word added to a level
 */
export const getUpdatedProgressWithNewWord = (
  progress: LevelProgress[],
  level_progress: LevelProgress,
  id: string
): LevelProgress[] => {
  return progress.map((p) =>
    p.level === level_progress.level
      ? { ...p, vocabProgress: [...p.vocabProgress, createWordProgress(id)] }
      : p
  );
};

/**
 * Creates an updated progress array with an updated word
 */
export const getUpdatedProgressWithWord = (
  progress: LevelProgress[],
  level: VocabLevel,
  word: UserVocabProgress
): LevelProgress[] => {
  return progress.map((p) =>
    p.level === level
      ? {
          ...p,
          vocabProgress: p.vocabProgress.map((vp) =>
            vp.cardId === word.cardId
              ? {
                  ...vp,
                  correctAttempts: vp.correctAttempts + 1,
                  lastReviewDate: new Date()
                }
              : vp
          )
        }
      : p
  );
};

/**
 * Creates an updated progress array with an incorrect attempt
 */
export const getUpdatedProgressWithIncorrectAttempt = (
  progress: LevelProgress[],
  level: VocabLevel,
  word: UserVocabProgress
): LevelProgress[] => {
  return progress.map((p) =>
    p.level === level
      ? {
          ...p,
          vocabProgress: p.vocabProgress.map((vp) =>
            vp.cardId === word.cardId
              ? {
                  ...vp,
                  incorrectAttempts: vp.incorrectAttempts + 1,
                  lastReviewDate: new Date()
                }
              : vp
          )
        }
      : p
  );
};
