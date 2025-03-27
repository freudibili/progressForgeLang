import { Level } from '@levels/types/levelTypes';

import { VocabularyCard } from '../types/vocabTypes';
import { getErrorMessage } from '../utils/errorUtils';

export const vocabularyCardService = {
  fetchCardsByLevel: async (
    level: Level
  ): Promise<{ data: VocabularyCard[] | null; error: string | null }> => {
    try {
      const response = await fetch(level.url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: getErrorMessage(
          error,
          `Failed to fetch vocabulary cards for level ${level.name}`
        )
      };
    }
  }
};
