import { getErrorMessage } from '../../vocabularyCards/utils/errorUtils';
import { Level } from '../types/levelTypes';

const LEVELS_API_URL =
  'https://gist.github.com/freudibili/d79e0e30abe713b8f02668ea8f9363df/raw';

export const levelService = {
  getLevels: async (): Promise<{
    data: Level[] | null;
    error: string | null;
  }> => {
    try {
      const response = await fetch(LEVELS_API_URL);
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
