import { useLevelStore } from '@levels/store/levelStore';
import { userActions } from '@user/store/userActions';
import { userSelectors } from '@user/store/userSelectors';
import { UserVocabProgress } from '@user/types/userTypes';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { useUserStore } from '@user/store/userStore';

import { useVocabularyCardStore } from '../store/vocabularyCardsStore';
import { VocabularyCard } from '../types/vocabTypes';
import { selectWeightedRandomCard } from '../utils/weightedSelection';

export const useVocabularyCardsViewModel = () => {
  const {
    vocabularyCards,
    isLoading: isCardsLoading,
    error,
    loadCards
  } = useVocabularyCardStore();
  const { selectedLevel } = useLevelStore();

  // Get current level's cards
  const availableCards = useMemo(() => {
    if (!selectedLevel?.name) return [];
    const levelData = vocabularyCards.find(
      (vc) => vc.level === selectedLevel.name
    );
    return levelData?.vocab ?? [];
  }, [vocabularyCards, selectedLevel?.name]);

  // Card Display State
  const [isLoading, setIsLoading] = useState(false);
  const [isCardRevealed, setIsCardRevealed] = useState(false);
  const [activeCard, setActiveCard] = useState<VocabularyCard | null>(null);
  const [lastShownCardId, setLastShownCardId] = useState<string | null>(null);

  // Mastery Tracking State
  const [isMasteryModalVisible, setIsMasteryModalVisible] = useState(false);
  const [lastAchievedMilestone, setLastAchievedMilestone] = useState(0);

  // User Progress Selectors
  const currentLevel = selectedLevel?.name;
  const practiceHistory = userSelectors.useWordsSeen(currentLevel);
  const { masteredCount: masteredCardsCount, seenCount: totalCardsAttempted } =
    userSelectors.useCardStats(currentLevel ?? 'A1');
  const hasCompletedLevel = userSelectors.useAreLevelCardsMastered(
    currentLevel ?? 'A1'
  );
  const { currentMilestone } = userSelectors.useMasteryMilestone(
    currentLevel ?? 'A1'
  );
  const activeCardCorrectAttempts = userSelectors.useCardProgress(
    activeCard?.id ?? '',
    currentLevel ?? 'A1'
  );

  // Card Selection Logic
  const showNextCard = useCallback(
    (excludeCardId?: string | null) => {
      if (!availableCards.length) return;

      // Convert practice history to UserVocabProgress format
      const seenCards: UserVocabProgress[] = (practiceHistory ?? []).map(
        (card) => ({
          cardId: card.id,
          correctAttempts: 0,
          incorrectAttempts: 0,
          lastReviewDate: new Date()
        })
      );

      const nextCard = selectWeightedRandomCard(
        availableCards,
        seenCards,
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

  const resetCardState = useCallback(() => {
    setActiveCard(null);
    setLastShownCardId(null);
    setIsCardRevealed(false);
  }, []);

  // Load Cards Effect
  useEffect(() => {
    if (selectedLevel?.name) {
      resetCardState();
      loadCards(selectedLevel.name);
    }
  }, [selectedLevel?.name, loadCards, resetCardState]);

  // Sync cards to user store
  useEffect(() => {
    if (vocabularyCards.length > 0) {
      useUserStore.setState({ vocabularyCards });
    }
  }, [vocabularyCards]);

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
      if (activeCard && currentLevel) {
        if (wasCorrect) {
          userActions.markVocabCorrect(activeCard);
        } else {
          userActions.markVocabIncorrect(activeCard);
        }
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

    // Handlers
    handleCardResponse,
    handleCardFlip,
    handleMasteryModalClose
  };
};
