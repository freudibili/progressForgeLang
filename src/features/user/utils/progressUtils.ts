import {
  UserVocabProgress,
  LevelProgress
} from '@/features/user/types/userTypes';

export const MASTERY_THRESHOLD = 3;
export const MASTERY_MILESTONE = 5;

/**
 * Finds progress data for a specific level
 */
export const findLevelProgress = (
  progress: LevelProgress[],
  levelId: string
) => {
  return progress.find((p) => p.levelId === levelId);
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
  cardIds: string[],
  levelProgress: { vocabProgress: UserVocabProgress[] }
) => {
  return cardIds.filter((cardId) => {
    const progress = findCardProgress(levelProgress, cardId);
    return isCardMastered(getCardAttempts(progress));
  });
};

/**
 * Filters cards that have been seen at least once in a level
 */
export const filterSeenCards = (
  cardIds: string[],
  levelProgress: { vocabProgress: UserVocabProgress[] }
) => {
  return cardIds.filter((cardId) => {
    const progress = findCardProgress(levelProgress, cardId);
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
      sum + (progress.correctAttempts ?? 0) + (progress.incorrectAttempts ?? 0),
    0
  );
  const correctAttempts = levelProgress.vocabProgress.reduce(
    (sum, progress) => sum + progress.correctAttempts,
    0
  );

  return totalAttempts > 0 ? (correctAttempts / totalAttempts) * 100 : 0;
};
