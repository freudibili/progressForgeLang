import { MyScreen } from '@common/components/MyScreen';
import React from 'react';
import { Text, YStack } from 'tamagui';

import { CardDisplay } from './CardDisplay';
import { CardFooter } from './CardFooter';
import { CompletionScreen } from './CompletionScreen';
import { MasteryModal } from './MasteryModal';
import { VocabularyStats } from './VocabularyStats';
import { useVocabularyCardsViewModel } from '../viewModels/useVocabularyCardsViewModel';

export const VocabularyCardsScreen = () => {
  const {
    // State
    isLoading,
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
  } = useVocabularyCardsViewModel();

  if (!selectedLevel) {
    return (
      <MyScreen title="Vocabulary Cards">
        <YStack flex={1} justifyContent="center" alignItems="center">
          <Text>Please select a level to start practicing</Text>
        </YStack>
      </MyScreen>
    );
  }

  if (hasCompletedLevel) {
    return <CompletionScreen />;
  }

  return (
    <MyScreen
      title={`Level ${selectedLevel.name}`}
      loading={isLoading}
      error={error}
      footer={
        activeCard && (
          <CardFooter
            isRevealed={isCardRevealed}
            onCorrect={() => handleCardResponse(true)}
            onIncorrect={() => handleCardResponse(false)}
          />
        )
      }
    >
      <VocabularyStats
        totalAttempted={totalCardsAttempted}
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
