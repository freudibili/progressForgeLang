import { useVocabularyCardStore } from './vocabularyCardsStore';
import { vocabularyCardService } from '../services/vocabularyCardsService';
import { Level } from '@levels/types/levelTypes';

type VocabularyCardActions = {
  loadCards: (level: Level) => Promise<void>;
};

export const vocabularyCardActions: VocabularyCardActions = {
  loadCards: async (level: Level) => {
    useVocabularyCardStore.setState({ isLoading: true, error: null });

    const { data, error } =
      await vocabularyCardService.fetchCardsByLevel(level);

    if (data && !error) {
      const currentCards = useVocabularyCardStore.getState().vocabularyCards;
      // Remove existing cards for this level
      const filteredCards = currentCards.filter(
        (card) => card.levelId !== level.id
      );

      // Add new cards
      useVocabularyCardStore.setState({
        vocabularyCards: [...filteredCards, ...data],
        isLoading: false
      });
    } else {
      useVocabularyCardStore.setState({
        error,
        isLoading: false
      });
    }
  }
};
