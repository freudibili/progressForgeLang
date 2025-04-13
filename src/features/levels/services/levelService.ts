import { getErrorMessage } from '../../vocabularyCards/utils/errorUtils';

import { API_URL } from '@/shared/config/apiConfig';
import { Level } from '@/shared/types/sharedTypes';

const LEVELS_ENDPOINTS = '/levels';

export const levelService = {
  getLevels: async (): Promise<{
    data: Level[] | null;
    error: string | null;
  }> => {
    const url = API_URL + LEVELS_ENDPOINTS;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        return {
          data: null,
          error: getErrorMessage(`HTTP error! status: ${response.status}`)
        };
      }

      const data = await response.json();

      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: getErrorMessage(error, 'Failed to fetch levels')
      };
    }
  }
};
