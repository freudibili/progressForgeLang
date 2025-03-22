import { MyScreen } from "@common/components/MyScreen";
import { useLevelStore } from "@levels/store/levelStore";
import { userActions } from "@user/store/userActions";
import { userSelectors } from "@user/store/userSelectors";
import { Href, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

import { CardDisplay } from "./CardDisplay";
import { CardFooter } from "./CardFooter";
import { CompletionScreen } from "./CompletionScreen";
import { MasteryModal } from "./MasteryModal";
import { VocabularyStats } from "./VocabularyStats";
import { useVocabularyCardStore } from "../store/vocabularyCardsStore";
import {
  areAllCardsMastered,
  getCardProgress,
  getMasteredCount,
  MASTERY_THRESHOLD,
} from "../utils/progressUtils";
import { selectWeightedRandomCard } from "../utils/weightedSelection";

const MASTERY_MILESTONE = 5;

export const VocabularyCardsScreen = () => {
  const { vocabularyCards, isLoading, error, loadCards } =
    useVocabularyCardStore();
  const { selectedLevel } = useLevelStore();
  const [isRevealed, setIsRevealed] = useState(false);
  const router = useRouter();
  const userProgress = userSelectors.useMasteredWords();

  const [currentCard, setCurrentCard] = useState<
    (typeof vocabularyCards)[0] | null
  >(null);
  const [previousCardId, setPreviousCardId] = useState<string | null>(null);
  const [showMasteryModal, setShowMasteryModal] = useState(false);
  const [lastMasteryMilestone, setLastMasteryMilestone] = useState(0);

  const selectNextCard = () => {
    const nextCard = selectWeightedRandomCard(
      vocabularyCards,
      userProgress,
      previousCardId
    );
    setCurrentCard(nextCard);
    setPreviousCardId(nextCard?.id ?? null);
    setIsRevealed(false);
  };

  useEffect(() => {
    if (vocabularyCards.length > 0) {
      selectNextCard();
    }
  }, [vocabularyCards]);

  useEffect(() => {
    if (selectedLevel) {
      const vocabLevel = selectedLevel.name;
      loadCards(vocabLevel);
    }
  }, [selectedLevel]);

  // Check for mastery milestones
  useEffect(() => {
    const masteredCount = getMasteredCount(vocabularyCards, userProgress);
    const currentMilestone =
      Math.floor(masteredCount / MASTERY_MILESTONE) * MASTERY_MILESTONE;

    if (currentMilestone > lastMasteryMilestone) {
      setShowMasteryModal(true);
      setLastMasteryMilestone(currentMilestone);
    }
  }, [userProgress, vocabularyCards]);

  const handleNextCard = (correct: boolean) => {
    if (currentCard && correct) {
      userActions.markVocabCorrect(currentCard);
    }
    selectNextCard();
  };

  const handleCardClick = () => {
    setIsRevealed(true);
  };

  const handleGoHome = () => {
    router.replace("/" as Href);
  };

  if (areAllCardsMastered(vocabularyCards, userProgress)) {
    return <CompletionScreen onGoHome={handleGoHome} />;
  }

  const currentCardProgress = currentCard
    ? getCardProgress(currentCard, userProgress)
    : 0;

  const masteredCount = getMasteredCount(vocabularyCards, userProgress);
  const seenCount = userProgress.length;

  return (
    <MyScreen
      title={`Level ${selectedLevel?.name}`}
      loading={isLoading}
      error={error}
      footer={
        <CardFooter
          isRevealed={isRevealed}
          onCorrect={() => handleNextCard(true)}
          onIncorrect={() => handleNextCard(false)}
        />
      }
    >
      <VocabularyStats seenCount={seenCount} masteredCount={masteredCount} />
      {currentCard && (
        <CardDisplay
          currentCard={currentCard}
          currentIndex={currentCardProgress}
          totalCards={MASTERY_THRESHOLD}
          isRevealed={isRevealed}
          onCardPress={handleCardClick}
        />
      )}
      <MasteryModal
        open={showMasteryModal}
        onClose={() => setShowMasteryModal(false)}
        masteredCount={lastMasteryMilestone}
      />
    </MyScreen>
  );
};
