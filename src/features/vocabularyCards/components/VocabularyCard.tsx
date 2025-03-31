import React from 'react';
import { Card, Text, YStack } from 'tamagui';

import { getTranslation } from '../utils/translationUtils';

import { capitalizeFirstLetter } from '@/common/utils/stringUtils';
import { Language, VocabularyCard } from '@/shared/types/sharedTypes';
import { settingsSelectors } from '@/features/settings/store/settingsSelectors';

interface VocabularyPlayingCardProps {
  card: VocabularyCard;
  iconHeader?: React.ReactNode;
  isRevealed: boolean;
  onPress: () => void;
}

export const VocabularyPlayingCard: React.FC<VocabularyPlayingCardProps> = ({
  card,
  iconHeader,
  isRevealed,
  onPress
}) => {
  const currentLanguage = settingsSelectors.useLanguage();

  const mainTranslation = getTranslation(card, Language.German); // German is always the main language to learn
  const userTranslation = getTranslation(card, currentLanguage);

  return (
    <Card
      elevation={2}
      size="$4"
      bordered
      animation="bouncy"
      backgroundColor="white"
      scale={0.95}
      pressStyle={{ scale: 0.975 }}
      onPress={onPress}
    >
      <Card.Header padded>
        <YStack justifyContent="space-between">
          {iconHeader}
          <Text fontSize="$8" textAlign="center" fontWeight="bold">
            {capitalizeFirstLetter(mainTranslation.infinitiv)}
          </Text>
        </YStack>
      </Card.Header>

      {isRevealed && (
        <Card.Footer padded>
          <YStack gap="$4" width="100%">
            <Text fontSize="$6" textAlign="center" fontWeight="bold">
              {capitalizeFirstLetter(userTranslation.infinitiv)}
            </Text>

            <YStack gap="$2">
              <Text fontSize="$4" textAlign="center">
                {mainTranslation.example}
              </Text>
              <Text fontSize="$4" textAlign="center" color="$gray10">
                {userTranslation.example}
              </Text>
            </YStack>
          </YStack>
        </Card.Footer>
      )}
    </Card>
  );
};
