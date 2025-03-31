import { useCallback, useEffect, useState, useMemo } from 'react';

import { useVocabularyCardStore } from '../store/vocabularyCardsStore';
import { selectWeightedRandomCard } from '../utils/weightedSelection';

import { levelSelectors } from '@/features/levels/store/levelSelectors';
import { userActions } from '@/features/user/store/userActions';
import { userSelectors } from '@/features/user/store/userSelectors';
import { vocabularyCardActions } from '@/features/vocabularyCards/store/vocabularyCardActions';
import { VocabularyCard } from '@/shared/types/sharedTypes';
import { useUserStore } from '@/features/user/store/userStore';

export const useVocabularyCardsViewModel = () => {
  const {
    vocabularyCards,
    isLoading: isCardsLoading,
    error
  } = useVocabularyCardStore();

  const { loadCards } = vocabularyCardActions;
  const selectedLevel = levelSelectors.useCurrentLevel();

  // Get current level's cards
  const availableCards = useMemo(() => {
    if (!selectedLevel?.id) return [];
    return vocabularyCards.filter((card) => card.levelId === selectedLevel.id);
  }, [vocabularyCards, selectedLevel?.id]);

  // Card Display State
  const [isLoading, setIsLoading] = useState(false);
  const [isCardRevealed, setIsCardRevealed] = useState(false);
  const [activeCard, setActiveCard] = useState<VocabularyCard | null>(null);
  const [lastShownCardId, setLastShownCardId] = useState<string | null>(null);

  // Mastery Tracking State
  const [isMasteryModalVisible, setIsMasteryModalVisible] = useState(false);
  const [lastAchievedMilestone, setLastAchievedMilestone] = useState<
    number | null
  >(null);

  // User Progress Selectors
  const currentLevel = selectedLevel?.id ?? '';
  const { masteredCount: masteredCardsCount, seenCount: totalCardsAttempted } =
    userSelectors.useCardStats(currentLevel);
  const hasCompletedLevel =
    userSelectors.useAreLevelCardsMastered(currentLevel);
  const { currentMilestone } = userSelectors.useMasteryMilestone(currentLevel);
  const activeCardCorrectAttempts = userSelectors.useCardProgress(
    activeCard?.id ?? '',
    currentLevel
  );
  const totalWords = userSelectors.useTotalWordsCount(currentLevel);

  // Card Selection Logic
  const showNextCard = useCallback(
    (excludeCardId?: string | null) => {
      if (!availableCards.length) return;

      // Get all cards for the current level
      const levelCards = availableCards.filter(
        (card) => card.levelId === currentLevel
      );

      // Get the progress for all cards in this level
      const levelProgress = useUserStore
        .getState()
        .progress.find((progress) => progress.levelId === currentLevel);

      // Create progress entries for all cards, including unseen ones
      const allCardsProgress = levelCards.map((card) => {
        const progress = levelProgress?.vocabProgress.find(
          (p) => p.cardId === card.id
        );
        return (
          progress || {
            cardId: card.id,
            correctAttempts: 0,
            incorrectAttempts: 0
          }
        );
      });

      const nextCard = selectWeightedRandomCard(
        levelCards,
        allCardsProgress,
        excludeCardId
      );

      if (nextCard) {
        setActiveCard(nextCard);
        setLastShownCardId(nextCard.id);
        setIsCardRevealed(false);
      }
    },
    [availableCards, currentLevel]
  );

  const resetCardState = useCallback(() => {
    setActiveCard(null);
    setLastShownCardId(null);
    setIsCardRevealed(false);
  }, []);

  // Load Cards Effect
  useEffect(() => {
    if (selectedLevel?.id) {
      resetCardState();
      loadCards(selectedLevel);
    }
  }, [selectedLevel, loadCards, resetCardState]);

  // Initial Card Selection Effect
  useEffect(() => {
    if (availableCards.length > 0 && !activeCard) {
      setIsLoading(true);
      showNextCard(lastShownCardId);
      setIsLoading(false);
    }
  }, [availableCards, activeCard, showNextCard, lastShownCardId]);

  // Milestone Tracking Effect
  useEffect(() => {
    if (lastAchievedMilestone === null) {
      setLastAchievedMilestone(currentMilestone);
      return;
    }

    if (currentMilestone > lastAchievedMilestone) {
      setIsMasteryModalVisible(true);
      setLastAchievedMilestone(currentMilestone);
    }
  }, [currentMilestone, lastAchievedMilestone]);

  // Card Interaction Handlers
  const handleCardResponse = useCallback(
    (wasCorrect: boolean) => {
      if (activeCard && currentLevel) {
        userActions.markVocabAttempt({
          id: activeCard.id,
          levelId: currentLevel,
          isCorrect: wasCorrect
        });
      }
      showNextCard(activeCard?.id);
    },
    [activeCard, currentLevel, showNextCard]
  );

  const handleCardFlip = useCallback(() => {
    setIsCardRevealed(true);
  }, []);

  const handleMasteryModalClose = useCallback(() => {
    setIsMasteryModalVisible(false);
  }, []);

  return {
    // State
    isLoading: isLoading || isCardsLoading,
    error,
    selectedLevel,
    activeCard,
    isCardRevealed,
    isMasteryModalVisible,

    // Stats
    masteredCardsCount,
    totalCardsAttempted,
    hasCompletedLevel,
    currentMilestone,
    activeCardCorrectAttempts,
    totalWords,

    // Handlers
    handleCardResponse,
    handleCardFlip,
    handleMasteryModalClose
  };
};
