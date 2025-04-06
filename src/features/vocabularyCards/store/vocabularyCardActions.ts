import { Level } from '@/shared/types/sharedTypes';
import { vocabularyCardService } from '../services/vocabularyCardsService';
import { useVocabularyCardStore } from './vocabularyCardsStore';

export const vocabularyCardActions = {
  loadCards: async (level: Level) => {
    try {
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
    } catch (error) {
      useVocabularyCardStore.setState({
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false
      });
    }
  }
};
