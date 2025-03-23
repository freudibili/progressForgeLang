import { MyScreen } from "@common/components/MyScreen";
import { useLevelStore } from "@levels/store/levelStore";
import { userActions } from "@user/store/userActions";
import { userSelectors } from "@user/store/userSelectors";
import React, { useCallback, useEffect, useState } from "react";

import { CardDisplay } from "./CardDisplay";
import { CardFooter } from "./CardFooter";
import { CompletionScreen } from "./CompletionScreen";
import { MasteryModal } from "./MasteryModal";
import { VocabularyStats } from "./VocabularyStats";
import { useVocabularyCardStore } from "../store/vocabularyCardsStore";
import { VocabularyCard } from "../types";
import { selectWeightedRandomCard } from "../utils/weightedSelection";

export const VocabularyCardsScreen = () => {
  const {
    vocabularyCards = [],
    isLoading,
    error,
    loadCards,
  } = useVocabularyCardStore();
  const { selectedLevel } = useLevelStore();

  // State
  const [isCardRevealed, setIsCardRevealed] = useState(false);
  const [activeCard, setActiveCard] = useState<VocabularyCard | null>(null);
  const [lastShownCardId, setLastShownCardId] = useState<string | null>(null);
  const [isMasteryModalVisible, setIsMasteryModalVisible] = useState(false);
  const [lastAchievedMilestone, setLastAchievedMilestone] = useState(0);

  // Selectors
  const practiceHistory = userSelectors.useWordsSeen();
  const { masteredCount: masteredCardsCount, seenCount: totalCardsAttempted } =
    userSelectors.useCardStats(vocabularyCards);
  const hasCompletedLevel =
    userSelectors.useAreLevelCardsMastered(vocabularyCards);
  const { currentMilestone } =
    userSelectors.useMasteryMilestone(vocabularyCards);
  const activeCardCorrectAttempts = userSelectors.useCardProgress(
    activeCard?.id ?? ""
  );

  // Card Selection Logic
  const showNextCard = useCallback(
    (excludeCardId?: string | null) => {
      const nextCard = selectWeightedRandomCard(
        vocabularyCards,
        practiceHistory ?? [],
        excludeCardId
      );

      if (nextCard) {
        setActiveCard(nextCard);
        setLastShownCardId(nextCard.id);
        setIsCardRevealed(false);
      }
    },
    [vocabularyCards, practiceHistory]
  );

  // Effects
  useEffect(() => {
    if (selectedLevel?.name) {
      loadCards(selectedLevel.name);
    }
  }, [selectedLevel?.name, loadCards]);

  useEffect(() => {
    if (vocabularyCards.length > 0 && !activeCard) {
      showNextCard(lastShownCardId);
    }
  }, [vocabularyCards, activeCard, showNextCard, lastShownCardId]);

  useEffect(() => {
    if (currentMilestone > lastAchievedMilestone) {
      setIsMasteryModalVisible(true);
      setLastAchievedMilestone(currentMilestone);
    }
  }, [currentMilestone, lastAchievedMilestone]);

  // Handlers
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

  if (hasCompletedLevel) {
    return <CompletionScreen />;
  }

  return (
    <MyScreen
      title={`Level ${selectedLevel?.name}`}
      loading={isLoading}
      error={error}
      footer={
        <CardFooter
          isRevealed={isCardRevealed}
          onCorrect={() => handleCardResponse(true)}
          onIncorrect={() => handleCardResponse(false)}
        />
      }
    >
      <VocabularyStats
        seenCount={totalCardsAttempted}
        masteredCount={masteredCardsCount}
      />
      {activeCard && (
        <CardDisplay
          currentCard={activeCard}
          currentIndex={activeCardCorrectAttempts}
          totalCards={3}
          isRevealed={isCardRevealed}
          onCardPress={handleCardFlip}
        />
      )}
      <MasteryModal
        open={isMasteryModalVisible}
        onClose={handleMasteryModalClose}
        masteredCount={currentMilestone}
      />
    </MyScreen>
  );
};
