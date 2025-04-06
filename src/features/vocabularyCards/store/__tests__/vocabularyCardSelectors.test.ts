import { vocabularyCardSelectors } from '../vocabularyCardSelectors';
import {
  mockLevels,
  mockCards,
  mockStore
} from '../__mocks__/vocabularyCardMocks';
import { VocabularyCard } from '@/shared/types/sharedTypes';

// Mock the store module
jest.mock('../vocabularyCardsStore', () => ({
  useVocabularyCardStore: jest.fn((selector) => {
    if (selector) {
      return selector(mockStore);
    }
    return mockStore;
  })
}));

describe('vocabularyCardSelectors', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useVocabularyCards', () => {
    it('should return all vocabulary cards', () => {
      const result = vocabularyCardSelectors.useVocabularyCards();
      expect(result).toEqual(mockStore.cards);
    });
  });

  describe('useIsLoading', () => {
    it('should return loading state', () => {
      const result = vocabularyCardSelectors.useIsLoading();
      expect(result).toEqual(false);
    });
  });

  describe('useError', () => {
    it('should return error state', () => {
      const result = vocabularyCardSelectors.useError();
      expect(result).toEqual(null);
    });
  });

  describe('useAvailableCards', () => {
    it('should return cards for a level', () => {
      const result = vocabularyCardSelectors.useAvailableCards('level1');
      expect(result).toEqual(mockStore.cards.level1);
    });

    it('should return empty array for undefined level', () => {
      const result = vocabularyCardSelectors.useAvailableCards(undefined);
      expect(result).toEqual([]);
    });

    it('should return empty array for non-existent level', () => {
      const result = vocabularyCardSelectors.useAvailableCards('nonexistent');
      expect(result).toEqual([]);
    });
  });

  describe('useAvailableLevels', () => {
    it('should return only levels that have vocabulary cards', () => {
      const result = vocabularyCardSelectors.useAvailableLevels(mockLevels);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('level1');
    });
  });

  describe('useMasteredWords', () => {
    it('should return mastered words for a level', () => {
      const result = vocabularyCardSelectors.useMasteredWords('level1');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('card1');
    });

    it('should return empty array for level with no progress', () => {
      const result = vocabularyCardSelectors.useMasteredWords('nonexistent');
      expect(result).toHaveLength(0);
    });
  });

  describe('useLevelProgress', () => {
    it('should return progress for a card in a level', () => {
      const availableCards = mockCards.level1;
      const result = vocabularyCardSelectors.useLevelProgress(
        'level1',
        availableCards
      );
      expect(result).toHaveLength(1);
      expect(result[0].cardId).toBe('card1');
      expect(result[0].correctAttempts).toBe(4);
      expect(result[0].incorrectAttempts).toBe(1);
      expect(result[0].masteryLevel).toBe(2);
    });

    it('should return default progress for cards with no progress', () => {
      const newCard: VocabularyCard = {
        id: 'card2',
        infinitiv: {
          de: 'kommen',
          fr: 'venir',
          en: 'come',
          uk: 'прийти',
          er: 'ምግባር',
          af: 'راشتن',
          ru: 'прийти'
        },
        conjugation: {
          präsens: 'komme',
          präteritum: 'kam',
          perfekt: 'gekommen',
          plusquamperfekt: 'gekommen',
          futurI: 'werde kommen'
        },
        levelId: 'level1',
        type: 'irregular',
        example: {
          de: 'Er kommt nach Hause',
          fr: 'Il vient à la maison',
          en: 'He comes home',
          uk: 'Він приходить додому',
          er: 'እሱ ወደ ቤት ይመጣል',
          af: 'هغه کور ته راځي',
          ru: 'Он приходит домой'
        }
      };

      const result = vocabularyCardSelectors.useLevelProgress('level1', [
        newCard
      ]);
      expect(result).toHaveLength(1);
      expect(result[0].cardId).toBe('card2');
      expect(result[0].correctAttempts).toBe(0);
      expect(result[0].incorrectAttempts).toBe(0);
      expect(result[0].masteryLevel).toBe(0);
    });
  });

  describe('useAllCardsProgress', () => {
    it('should return progress for a card in a level', () => {
      const availableCards = mockCards.level1;
      const result = vocabularyCardSelectors.useAllCardsProgress(
        'level1',
        availableCards
      );
      expect(result).toHaveLength(1);
      expect(result[0].cardId).toBe('card1');
      expect(result[0].correctAttempts).toBe(4);
      expect(result[0].incorrectAttempts).toBe(1);
    });

    it('should return default progress for cards with no progress', () => {
      const newCard: VocabularyCard = {
        id: 'card2',
        infinitiv: {
          de: 'kommen',
          fr: 'venir',
          en: 'come',
          uk: 'прийти',
          er: 'ምግባር',
          af: 'راشتن',
          ru: 'прийти'
        },
        conjugation: {
          präsens: 'komme',
          präteritum: 'kam',
          perfekt: 'gekommen',
          plusquamperfekt: 'gekommen',
          futurI: 'werde kommen'
        },
        levelId: 'level1',
        type: 'irregular',
        example: {
          de: 'Er kommt nach Hause',
          fr: 'Il vient à la maison',
          en: 'He comes home',
          uk: 'Він приходить додому',
          er: 'እሱ ወደ ቤት ይመጣል',
          af: 'هغه کور ته راځي',
          ru: 'Он приходит домой'
        }
      };

      const result = vocabularyCardSelectors.useAllCardsProgress('level1', [
        newCard
      ]);
      expect(result).toHaveLength(1);
      expect(result[0].cardId).toBe('card2');
      expect(result[0].correctAttempts).toBe(0);
      expect(result[0].incorrectAttempts).toBe(0);
    });
  });

  describe('useCardStats', () => {
    it('should return correct stats for a level', () => {
      const result = vocabularyCardSelectors.useCardStats('level1');
      expect(result).toEqual({
        masteredCount: 1,
        seenCount: 1,
        totalCount: 1,
        successRate: 0.8
      });
    });

    it('should return default stats for level with no progress', () => {
      const result = vocabularyCardSelectors.useCardStats('nonexistent');
      expect(result).toEqual({
        masteredCount: 0,
        seenCount: 0,
        totalCount: 0,
        successRate: 0
      });
    });
  });

  describe('useIsLevelCompleted', () => {
    it('should return true when all cards are mastered', () => {
      const result = vocabularyCardSelectors.useIsLevelCompleted('level1');
      expect(result).toBe(true);
    });

    it('should return false for non-existent level', () => {
      const result = vocabularyCardSelectors.useIsLevelCompleted('nonexistent');
      expect(result).toBe(false);
    });
  });

  describe('useCardProgress', () => {
    it('should return correct progress for a card', () => {
      const result = vocabularyCardSelectors.useCardProgress('card1', 'level1');
      expect(result).toBe(4);
    });

    it('should return 0 for non-existent card', () => {
      const result = vocabularyCardSelectors.useCardProgress(
        'nonexistent',
        'level1'
      );
      expect(result).toBe(0);
    });

    it('should return 0 for non-existent level', () => {
      const result = vocabularyCardSelectors.useCardProgress(
        'card1',
        'nonexistent'
      );
      expect(result).toBe(0);
    });
  });

  describe('useMasteryMilestone', () => {
    it('should return correct milestone for a level', () => {
      const result = vocabularyCardSelectors.useMasteryMilestone('level1');
      expect(result).toEqual({
        currentMilestone: 5,
        masteredCount: 1
      });
    });

    it('should return default milestone for non-existent level', () => {
      const result = vocabularyCardSelectors.useMasteryMilestone('nonexistent');
      expect(result).toEqual({
        currentMilestone: 0,
        masteredCount: 0
      });
    });
  });

  describe('useTotalStats', () => {
    it('should return correct total stats', () => {
      const result = vocabularyCardSelectors.useTotalStats();
      expect(result).toEqual({
        masteredCount: 1,
        seenCount: 1,
        totalCount: 1,
        successRate: 0.8
      });
    });
  });
});
