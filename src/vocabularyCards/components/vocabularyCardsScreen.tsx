import { MyScreen } from "@common/components/MyScreen";
import { useLevelStore } from "@levels/store/levelStore";
import { userActions } from "@user/store/userActions";
import React, { useEffect, useState } from "react";
import { Button, Text, YStack } from "tamagui";

import { VocabularyCard } from "./VocabularyCard";
import { useVocabularyCardStore } from "../store/vocabularyCardsStore";

export const VocabularyCardsScreen = () => {
  const { vocabularyCards, isLoading, error, loadCards } =
    useVocabularyCardStore();
  const { selectedLevel } = useLevelStore();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  const currentCard = vocabularyCards[currentCardIndex];

  useEffect(() => {
    if (selectedLevel) {
      const vocabLevel = selectedLevel.name;
      loadCards(vocabLevel);
    }
  }, [selectedLevel]);

  useEffect(() => {
    setCurrentCardIndex(0);
    setIsRevealed(false);
  }, [vocabularyCards]);

  const handleNextCard = () => {
    if (currentCard) {
      userActions.markVocabCorrect(currentCard.id, currentCard.infinitiv.en);
    }

    if (currentCardIndex < vocabularyCards.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
      setIsRevealed(false);
    }
  };

  const handleCardClick = () => {
    setIsRevealed(true);
  };

  return (
    <MyScreen
      title={`Level ${selectedLevel?.name}`}
      loading={isLoading}
      error={error}
    >
      <YStack padding="$4" gap="$4" flex={1}>
        {currentCard && (
          <VocabularyCard
            card={currentCard}
            isRevealed={isRevealed}
            onPress={handleCardClick}
          />
        )}

        <Button
          size="$4"
          theme="active"
          onPress={handleNextCard}
          disabled={currentCardIndex === vocabularyCards.length - 1}
        >
          I Know This Word
        </Button>

        <Text textAlign="center" color="$gray10">
          Card {currentCardIndex + 1} of {vocabularyCards.length}
        </Text>
      </YStack>
    </MyScreen>
  );
};
