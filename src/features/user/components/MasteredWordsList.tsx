import React from 'react';
import { YStack, Text, XStack, H3 } from 'tamagui';

import { getTranslation } from '@/features/vocabularyCards/utils/translationUtils';
import { Language, VocabularyCard } from '@/shared/types/sharedTypes';

interface MasteredWordsListProps {
  masteredWords: VocabularyCard[];
  currentLanguage: Language;
}

export const MasteredWordsList: React.FC<MasteredWordsListProps> = ({
  masteredWords,
  currentLanguage
}) => (
  <YStack gap="$2">
    <H3>Mastered Words</H3>
    {masteredWords.map((card) => {
      const mainTranslation = getTranslation(card, Language.German);
      const userTranslation = getTranslation(card, currentLanguage);
      return (
        <XStack key={card.id} justifyContent="space-between" padding="$2">
          <Text>{mainTranslation.infinitiv}</Text>
          <Text color="$gray10">{userTranslation.infinitiv}</Text>
        </XStack>
      );
    })}
    {masteredWords.length === 0 && (
      <Text color="$gray10">No mastered words yet</Text>
    )}
  </YStack>
);
