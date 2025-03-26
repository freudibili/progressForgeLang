import { mockLevels } from './levelMockData';
import { Level } from '../types/levelTypes';

export const levelService = {
  getLevels: async (): Promise<Level[]> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockLevels;
  },

  getLevelById: async (id: string): Promise<Level | null> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockLevels.find((level) => level.id === id) || null;
  }
};
