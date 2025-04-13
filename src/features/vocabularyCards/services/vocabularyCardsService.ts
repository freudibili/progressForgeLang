import { getErrorMessage } from '../utils/errorUtils';

import { API_URL } from '@/shared/config/apiConfig';
import { Level, VocabularyCard } from '@/shared/types/sharedTypes';

const VOCABULARY_ENDPOINTS = '/vocabulary';

export const vocabularyCardService = {
  fetchCardsByLevel: async (
    level: Level
  ): Promise<{ data: VocabularyCard[] | null; error: string | null }> => {
    const url = API_URL + VOCABULARY_ENDPOINTS + `/${level.id}`;

    try {
      const response = await fetch(url);
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
