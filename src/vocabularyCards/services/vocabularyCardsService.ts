import { getErrorMessage } from '@vocabularyCards/utils/errorUtils';
import { VocabularyCard } from '../types/vocabTypes';
import { mockLevels as A1MockLevels } from './mocks/A1VocabularyCardMockData';
import { mockLevels as A2MockLevels } from './mocks/A2VocabularyCardMockData';
import { mockLevels as B1MockLevels } from './mocks/B1VocabularyCardMockData';
import { mockLevels as B2MockLevels } from './mocks/B2VocabularyCardMockData';

export const vocabularyCardService = {
  fetchCards: async (level: string): Promise<VocabularyCard[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const levels = {
      A1: A1MockLevels,
      A2: A2MockLevels,
      B1: B1MockLevels,
      B2: B2MockLevels
    };

    return levels[level as keyof typeof levels] ?? [];
  },

  fetchCardsByLevel: async (
    level: string
  ): Promise<{
    data: VocabularyCard[];
    error?: string | null;
  }> => {
    try {
      const cards = await vocabularyCardService.fetchCards(level);
      return { data: cards };
    } catch (error) {
      return {
        data: [],
        error: getErrorMessage(error, 'Failed to fetch cards')
      };
    }
  }
};
