import { VocabularyCard } from '../types/vocabTypes';
import { getErrorMessage } from '../utils/errorUtils';
import { VOCABULARY_API_URLS } from '../constants/apiUrls';

export const vocabularyCardService = {
  fetchCardsByLevel: async (
    levelId: string
  ): Promise<{ data: VocabularyCard[] | null; error: string | null }> => {
    try {
      const url =
        VOCABULARY_API_URLS[levelId as keyof typeof VOCABULARY_API_URLS];
      if (!url) {
        throw new Error(`No vocabulary data available for level ${levelId}`);
      }

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
          `Failed to fetch vocabulary cards for level ${levelId}`
        )
      };
    }
  }
};
