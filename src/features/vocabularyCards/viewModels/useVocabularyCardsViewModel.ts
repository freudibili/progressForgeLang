import { useCallback, useEffect, useState } from 'react';

import { useVocabularyCardStore } from '../store/vocabularyCardsStore';
import { vocabularyCardSelectors } from '../store/vocabularyCardSelectors';
import { selectWeightedRandomCard } from '../utils/weightedSelection';

import { levelSelectors } from '@/features/levels/store/levelSelectors';
import { VocabularyCard } from '@/shared/types/sharedTypes';

export const useVocabularyCardsViewModel = () => {
  // Use selective state access to prevent unnecessary re-renders
  const isCardsLoading = useVocabularyCardStore((state) => state.isLoading);
  const error = useVocabularyCardStore((state) => state.error);

  // Get level selector
  const selectedLevel = levelSelectors.useCurrentLevel();

  // Get current level's cards using the selector
  const availableCards = vocabularyCardSelectors.useAvailableCards(
    selectedLevel?.id
  );

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

  // User Progress Selectors with memoization
  const currentLevel = selectedLevel?.id ?? '';

  // Get stats from vocabulary card selectors
  const cardStats = vocabularyCardSelectors.useCardStats(currentLevel);
  const hasCompletedLevel =
    vocabularyCardSelectors.useIsLevelCompleted(currentLevel);
  const masteryMilestone =
    vocabularyCardSelectors.useMasteryMilestone(currentLevel);
  const activeCardCorrectAttempts = vocabularyCardSelectors.useCardProgress(
    activeCard?.id ?? '',
    currentLevel
  );

  // Get all cards progress for the current level
  const allCardsProgress = vocabularyCardSelectors.useAllCardsProgress(
    currentLevel,
    availableCards
  );

  // Card Selection Logic with memoization
  const showNextCard = useCallback(
    (excludeCardId?: string | null) => {
      if (!availableCards.length) return;

      const nextCard = selectWeightedRandomCard(
        availableCards,
        allCardsProgress,
        excludeCardId
      );

      if (nextCard) {
        setActiveCard(nextCard);
        setLastShownCardId(nextCard.id);
        setIsCardRevealed(false);
      }
    },
    [availableCards, allCardsProgress]
  );

  const resetCardState = useCallback(() => {
    setActiveCard(null);
    setLastShownCardId(null);
    setIsCardRevealed(false);
  }, []);

  // Load Cards Effect with cleanup
  useEffect(() => {
    let mounted = true;

    const loadLevelCards = async () => {
      if (selectedLevel?.id && mounted) {
        resetCardState();
        await useVocabularyCardStore.getState().loadCards(selectedLevel);
      }
    };

    loadLevelCards();

    return () => {
      mounted = false;
    };
  }, [selectedLevel, resetCardState]);

  // Initial Card Selection Effect with cleanup
  useEffect(() => {
    let mounted = true;

    if (availableCards.length > 0 && !activeCard && mounted) {
      setIsLoading(true);
      showNextCard(lastShownCardId);
      setIsLoading(false);
    }

    return () => {
      mounted = false;
    };
  }, [availableCards, activeCard, showNextCard, lastShownCardId]);

  // Milestone Tracking Effect with cleanup
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (lastAchievedMilestone === null) {
        setLastAchievedMilestone(masteryMilestone.currentMilestone);
        return;
      }

      if (masteryMilestone.currentMilestone > lastAchievedMilestone) {
        setIsMasteryModalVisible(true);
        setLastAchievedMilestone(masteryMilestone.currentMilestone);
      }
    }

    return () => {
      mounted = false;
    };
  }, [masteryMilestone.currentMilestone, lastAchievedMilestone]);

  // Card Interaction Handlers with memoization
  const handleCardResponse = useCallback(
    (wasCorrect: boolean) => {
      if (activeCard && currentLevel) {
        useVocabularyCardStore
          .getState()
          .markAttempt(activeCard.id, currentLevel, wasCorrect);
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
    masteredCardsCount: cardStats.masteredCount,
    totalCardsAttempted: cardStats.seenCount,
    hasCompletedLevel,
    currentMilestone: masteryMilestone.currentMilestone,
    activeCardCorrectAttempts,
    totalWords: cardStats.totalCount,

    // Handlers
    handleCardResponse,
    handleCardFlip,
    handleMasteryModalClose
  };
};
