import React from 'react';
import { Card, Text, YStack } from 'tamagui';

import { VocabularyCard as VocabularyCardType } from '../types/vocabTypes';

interface VocabularyCardProps {
  card: VocabularyCardType;
  iconHeader?: React.ReactNode;
  isRevealed: boolean;
  onPress: () => void;
}

export const VocabularyCard: React.FC<VocabularyCardProps> = ({
  card,
  iconHeader,
  isRevealed,
  onPress
}) => {
  return (
    <Card
      elevate
      size="$4"
      bordered
      animation="quick"
      scale={0.95}
      pressStyle={{ scale: 0.925 }}
      onPress={onPress}
    >
      <Card.Header padded>
        {iconHeader}
        <Text fontSize="$8" textAlign="center" fontWeight="bold">
          {card.infinitiv.de}
        </Text>
      </Card.Header>

      {isRevealed && (
        <Card.Footer padded>
          <YStack gap="$4" width="100%">
            <Text fontSize="$6" textAlign="center" fontWeight="bold">
              {card.infinitiv.fr}
            </Text>

            <YStack gap="$2">
              <Text fontSize="$4" textAlign="center">
                {card.example.de}
              </Text>
              <Text fontSize="$4" textAlign="center" color="$gray10">
                {card.example.fr}
              </Text>
            </YStack>
          </YStack>
        </Card.Footer>
      )}
    </Card>
  );
};
