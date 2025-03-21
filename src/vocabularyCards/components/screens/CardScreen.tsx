import { useCardStore } from "@vocabularyCards/store/vocabularyCardsStore";
import React, { useEffect } from "react";
import { VocabularyCard } from "src/vocabularyCards/components/VocabularyCard";
import { YStack, Text, Button } from "tamagui";

export const CardScreen: React.FC = () => {
  const { cards, isLoading, error, fetchCards } = useCardStore();
  useCardStore();

  useEffect(() => {
    fetchCards("A1"); // TODO: make this dynamic
  }, [fetchCards]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text color="$red10">{error}</Text>;
  }

  if (!cards.length) {
    return (
      <YStack gap="$4" padding="$4">
        <Text>No cards available</Text>
        <Button onPress={() => {}}>Go Home</Button>
      </YStack>
    );
  }

  return (
    <YStack gap="$4" padding="$4">
      <Text fontSize="$6" fontWeight="bold">
        Practice Cards
      </Text>

      {cards.map((card) => (
        <VocabularyCard
          key={card.id}
          card={card}
          onCorrect={() => {}}
          onIncorrect={() => {}}
        />
      ))}
    </YStack>
  );
};
