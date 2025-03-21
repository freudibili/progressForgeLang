import { Level, VocabularyCard } from "../types";
import { mockLevels as A1MockLevels } from "./mocks/A1VocabularyCardMockData";
import { mockLevels as A2MockLevels } from "./mocks/A2VocabularyCardMockData";
import { mockLevels as B1MockLevels } from "./mocks/B1VocabularyCardMockData";
import { mockLevels as B2MockLevels } from "./mocks/B2VocabularyCardMockData";

export const vocabularyCardService = {
  fetchCards: async (level: Level): Promise<VocabularyCard[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const levels = {
      A1: A1MockLevels,
      A2: A2MockLevels,
      B1: B1MockLevels,
      B2: B2MockLevels,
    };

    return levels[level];
  },

  fetchCardsByLevel: async (level: Level): Promise<VocabularyCard[]> => {
    try {
      return await vocabularyCardService.fetchCards(level);
    } catch (error) {
      console.error(`Error fetching cards for level ${level}:`, error);
      return [];
    }
  },
};
