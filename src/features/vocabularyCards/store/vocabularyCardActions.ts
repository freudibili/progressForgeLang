import { Level } from '@/shared/types/sharedTypes';
import { vocabularyCardService } from '../services/vocabularyCardsService';
import { useVocabularyCardStore } from './vocabularyCardsStore';
import { vocabularyCardUtils } from '../utils/vocabularyCardUtils';

export const vocabularyCardActions = {
  loadCards: async (level: Level) => {
    const { data, error } =
      await vocabularyCardService.fetchCardsByLevel(level);

    if (data && !error) {
      const store = useVocabularyCardStore.getState();

      useVocabularyCardStore.setState({
        cards: {
          ...store.cards,
          [level.id]: data
        },
        isLoading: false,
        error: null
      });
    } else {
      useVocabularyCardStore.setState({
        error,
        isLoading: false
      });
    }
  },

  markAttempt: (cardId: string, levelId: string, isCorrect: boolean) => {
    const store = useVocabularyCardStore.getState();
    const levelProgress = store.progress.find((p) => p.levelId === levelId);

    if (!levelProgress) {
      // Create new progress for this level
      useVocabularyCardStore.setState({
        progress: [
          ...store.progress,
          vocabularyCardUtils.createNewLevelProgress(levelId, cardId, isCorrect)
        ]
      });
      return;
    }

    // Update existing progress
    const updatedProgress = vocabularyCardUtils.updateCardProgress(
      levelProgress,
      cardId,
      isCorrect
    );

    useVocabularyCardStore.setState({
      progress: store.progress.map((p) =>
        p.levelId === levelId ? updatedProgress : p
      )
    });
  }
};
