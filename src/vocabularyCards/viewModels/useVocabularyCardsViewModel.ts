import { useLevelStore } from '@levels/store/levelStore';
import { userActions } from '@user/store/userActions';
import { userSelectors } from '@user/store/userSelectors';
import { useCallback, useEffect, useState } from 'react';

import { useVocabularyCardStore } from '../store/vocabularyCardsStore';
import { VocabularyCard } from '../types';
import { selectWeightedRandomCard } from '../utils/weightedSelection';

export const useVocabularyCardsViewModel = () => {
  const {
    vocabularyCards: availableCards = [],
    isLoading: isCardsLoading,
    error,
    loadCards
  } = useVocabularyCardStore();
  const { selectedLevel } = useLevelStore();

  // Card Display State
  const [isLoading, setIsLoading] = useState(false);
  const [isCardRevealed, setIsCardRevealed] = useState(false);
  const [activeCard, setActiveCard] = useState<VocabularyCard | null>(null);
  const [lastShownCardId, setLastShownCardId] = useState<string | null>(null);

  // Mastery Tracking State
  const [isMasteryModalVisible, setIsMasteryModalVisible] = useState(false);
  const [lastAchievedMilestone, setLastAchievedMilestone] = useState(0);

  // User Progress Selectors
  const practiceHistory = userSelectors.useWordsSeen();
  const { masteredCount: masteredCardsCount, seenCount: totalCardsAttempted } =
    userSelectors.useCardStats(availableCards);
  const hasCompletedLevel =
    userSelectors.useAreLevelCardsMastered(availableCards);
  const { currentMilestone } =
    userSelectors.useMasteryMilestone(availableCards);
  const activeCardCorrectAttempts = userSelectors.useCardProgress(
    activeCard?.id ?? ''
  );

  // Card Selection Logic
  const showNextCard = useCallback(
    (excludeCardId?: string | null) => {
      const nextCard = selectWeightedRandomCard(
        availableCards,
        practiceHistory ?? [],
        excludeCardId
      );

      if (nextCard) {
        setActiveCard(nextCard);
        setLastShownCardId(nextCard.id);
        setIsCardRevealed(false);
      }
    },
    [availableCards, practiceHistory]
  );

  // Load Cards Effect
  useEffect(() => {
    if (selectedLevel?.name) {
      loadCards(selectedLevel.name);
    }
  }, [selectedLevel?.name, loadCards]);

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
    if (currentMilestone > lastAchievedMilestone) {
      setIsMasteryModalVisible(true);
      setLastAchievedMilestone(currentMilestone);
    }
  }, [currentMilestone, lastAchievedMilestone]);

  // Card Interaction Handlers
  const handleCardResponse = useCallback(
    (wasCorrect: boolean) => {
      if (activeCard && wasCorrect) {
        userActions.markVocabCorrect(activeCard);
      }
      showNextCard(activeCard?.id);
    },
    [activeCard, showNextCard]
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

    // Handlers
    handleCardResponse,
    handleCardFlip,
    handleMasteryModalClose
  };
};
