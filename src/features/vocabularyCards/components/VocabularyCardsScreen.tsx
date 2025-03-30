import React from 'react';
import { Separator } from 'tamagui';

import { CardDisplay } from './CardDisplay';
import { CardFooter } from './CardFooter';
import { CompletionScreen } from './CompletionScreen';
import { MasteryModal } from './MasteryModal';
import { NoLevelSelectedScreen } from './NoLevelSelectedScreen';
import { VocabularyStats } from './VocabularyStats';
import { useVocabularyCardsViewModel } from '../viewModels/useVocabularyCardsViewModel';

import { MyScreen } from '@/common/components/MyScreen';

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
    return <NoLevelSelectedScreen />;
  }

  if (hasCompletedLevel) {
    return <CompletionScreen />;
  }

  return (
    <MyScreen
      title={selectedLevel.name}
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
      <Separator />
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
