import React from "react";
import { Card, Text, YStack, Button, XStack } from "tamagui";

import { VocabularyCard as VocabularyCardType } from "../types";

interface Props {
  card: VocabularyCardType;
  onCorrect: () => Promise<void>;
  onIncorrect: () => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

export const VocabularyCard: React.FC<Props> = ({
  card,
  onCorrect,
  onIncorrect,
  isLoading = false,
  error = null,
}) => {
  if (isLoading) {
    return (
      <Card elevate size="$4" bordered>
        <Card.Header padded>
          <Text>Loading...</Text>
        </Card.Header>
      </Card>
    );
  }

  if (error) {
    return (
      <Card elevate size="$4" bordered>
        <Card.Header padded>
          <Text color="$red10">{error}</Text>
        </Card.Header>
      </Card>
    );
  }

  return (
    <Card
      elevate
      size="$4"
      bordered
      scale={0.9}
      hoverStyle={{ scale: 0.925 }}
      pressStyle={{ scale: 0.875 }}
    >
      <Card.Header padded>
        <YStack gap="$4">
          <Text fontSize="$8" fontWeight="bold" textAlign="center">
            {card.french}
          </Text>
          <Text fontSize="$6" textAlign="center" color="$gray11">
            {card.german}
          </Text>
          <Text fontSize="$4" textAlign="center" color="$gray10">
            {card.example}
          </Text>
          <XStack gap="$4" justifyContent="center" marginTop="$4">
            <Button size="$4" onPress={onIncorrect} disabled={isLoading}>
              Incorrect
            </Button>
            <Button size="$4" onPress={onCorrect} disabled={isLoading}>
              Correct
            </Button>
          </XStack>
        </YStack>
      </Card.Header>
    </Card>
  );
};
