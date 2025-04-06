import { useCallback, useEffect, useState, useMemo } from 'react';

import { useVocabularyCardStore } from '../store/vocabularyCardsStore';
import { selectWeightedRandomCard } from '../utils/weightedSelection';

import { levelSelectors } from '@/features/levels/store/levelSelectors';
import { VocabularyCard } from '@/shared/types/sharedTypes';

export const useVocabularyCardsViewModel = () => {
  // Use selective state access to prevent unnecessary re-renders
  const vocabularyCards = useVocabularyCardStore((state) => state.cards);
  const isCardsLoading = useVocabularyCardStore((state) => state.isLoading);
  const error = useVocabularyCardStore((state) => state.error);

  // Get level selector
  const selectedLevel = levelSelectors.useCurrentLevel();

  // Get current level's cards with memoization
  const availableCards = useMemo(() => {
    if (!selectedLevel?.id) return [];
    return vocabularyCards[selectedLevel?.id] || [];
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

  // User Progress Selectors with memoization
  const currentLevel = selectedLevel?.id ?? '';

  // Get stats from vocabulary card store
  const cardStats = useVocabularyCardStore((state) =>
    state.getCardStats(currentLevel)
  );
  const hasCompletedLevel = useVocabularyCardStore((state) =>
    state.isLevelCompleted(currentLevel)
  );
  const masteryMilestone = useVocabularyCardStore((state) =>
    state.getMasteryMilestone(currentLevel)
  );
  const activeCardCorrectAttempts = useVocabularyCardStore((state) =>
    state.getCardProgress(activeCard?.id ?? '', currentLevel)
  );

  // Card Selection Logic with memoization
  const showNextCard = useCallback(
    (excludeCardId?: string | null) => {
      if (!availableCards.length) return;

      // Get progress for all cards in this level
      const levelProgress = useVocabularyCardStore
        .getState()
        .progress.find((p) => p.levelId === currentLevel);

      // Create progress entries for all cards, including unseen ones
      const allCardsProgress = availableCards.map((card) => {
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
    [availableCards, currentLevel]
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
