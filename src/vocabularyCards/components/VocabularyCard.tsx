import React from 'react';
import { Card, Text, YStack } from 'tamagui';

import { VocabularyCard as VocabularyCardType } from '../types/vocabTypes';
import { getTranslation } from '../utils/translationUtils';

import { selectedLanguage } from '@/settings/store/settingsSelectors';
import { useSettingsStore } from '@/settings/store/settingsStore';

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
  const currentLanguage = useSettingsStore(selectedLanguage);

  const mainTranslation = getTranslation(card, 'de'); // German is always the main language to learn
  const userTranslation = getTranslation(card, currentLanguage);

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
          {mainTranslation.infinitiv}
        </Text>
      </Card.Header>

      {isRevealed && (
        <Card.Footer padded>
          <YStack gap="$4" width="100%">
            <Text fontSize="$6" textAlign="center" fontWeight="bold">
              {userTranslation.infinitiv}
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
