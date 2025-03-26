import { useVocabularyCardStore } from './vocabularyCardsStore';
import { vocabularyCardService } from '../services/vocabularyCardsService';

type VocabularyCardActions = {
  loadCards: (level: string) => Promise<void>;
};

export const vocabularyCardActions: VocabularyCardActions = {
  loadCards: async (level: string) => {
    useVocabularyCardStore.setState({ isLoading: true, error: null });

    const { data, error } =
      await vocabularyCardService.fetchCardsByLevel(level);

    if (data && !error) {
      const currentCards = useVocabularyCardStore.getState().vocabularyCards;
      // Remove existing cards for this level
      const filteredCards = currentCards.filter(
        (card) => card.levelId !== level
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
