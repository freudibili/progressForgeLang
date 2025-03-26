import { UserVocabProgress, LevelProgress } from '@user/types/userTypes';

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
  incorrectAttempts: 0
});

/**
 * Creates a new level progress object
 */
export const createLevelProgress = (
  levelId: string,
  id: string
): LevelProgress => ({
  levelId,
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
    p.levelId === level_progress.levelId
      ? { ...p, vocabProgress: [...p.vocabProgress, createWordProgress(id)] }
      : p
  );
};

/**
 * Creates an updated progress array with an updated word
 */
export const getUpdatedProgressWithWord = (
  progress: LevelProgress[],
  levelId: string,
  word: UserVocabProgress
): LevelProgress[] => {
  return progress.map((p) =>
    p.levelId === levelId
      ? {
          ...p,
          vocabProgress: p.vocabProgress.map((vp) =>
            vp.cardId === word.cardId
              ? {
                  ...vp,
                  correctAttempts: vp.correctAttempts + 1
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
  levelId: string,
  word: UserVocabProgress
): LevelProgress[] => {
  return progress.map((p) =>
    p.levelId === levelId
      ? {
          ...p,
          vocabProgress: p.vocabProgress.map((vp) =>
            vp.cardId === word.cardId
              ? {
                  ...vp,
                  incorrectAttempts: vp.incorrectAttempts + 1
                }
              : vp
          )
        }
      : p
  );
};
