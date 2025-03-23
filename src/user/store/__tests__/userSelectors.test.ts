import { VocabLevel } from '@levels/types/level';

import { userSelectors } from '../userSelectors';
import { useUserStore } from '../userStore';
import {
  mockUserProgress,
  mockVocabularyCards
} from './__mocks__/mockUserVocab';

// Mock the Zustand store
const mockUseUserStore = useUserStore as unknown as jest.Mock;
jest.mock('../userStore', () => ({
  useUserStore: jest.fn()
}));

describe('userSelectors', () => {
  const mockState = {
    progress: mockUserProgress,
    vocabularyCards: mockVocabularyCards,
    statistics: {
      successRate: 0,
      totalAttempts: 0,
      correctAttempts: 0
    },
    preferences: {
      language: 'en'
    },
    user: null
  };

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  describe('useCardProgress', () => {
    it('returns correct count for a card', () => {
      mockUseUserStore.mockImplementation((selector) => selector(mockState));
      const result = userSelectors.useCardProgress('1', 'A1' as VocabLevel);
      expect(result).toBe(5);
    });

    it('returns 0 for unseen card', () => {
      mockUseUserStore.mockImplementation((selector) => selector(mockState));
      const result = userSelectors.useCardProgress('4', 'A1' as VocabLevel);
      expect(result).toBe(0);
    });
  });

  describe('useIsCardMastered', () => {
    it('returns true when card is mastered', () => {
      mockUseUserStore.mockImplementation((selector) => selector(mockState));
      const result = userSelectors.useIsCardMastered('1', 'A1' as VocabLevel);
      expect(result).toBe(true);
    });

    it('returns false when card is not mastered', () => {
      mockUseUserStore.mockImplementation((selector) => selector(mockState));
      const result = userSelectors.useIsCardMastered('3', 'A2' as VocabLevel);
      expect(result).toBe(false);
    });
  });

  describe('useMasteredWordsCount', () => {
    it('returns correct count of mastered words for a level', () => {
      mockUseUserStore.mockImplementation((selector) => selector(mockState));
      const result = userSelectors.useMasteredWordsCount('A1' as VocabLevel);
      expect(result).toBe(1);
    });

    it('returns correct total count of mastered words', () => {
      mockUseUserStore.mockImplementation((selector) => selector(mockState));
      const result = userSelectors.useMasteredWordsCount();
      expect(result).toBe(1);
    });
  });

  describe('useWordsSeen', () => {
    it('returns array of seen words for a level', () => {
      mockUseUserStore.mockImplementation((selector) => selector(mockState));
      const result = userSelectors.useWordsSeen('A1' as VocabLevel);
      expect(result).toEqual([
        mockVocabularyCards[0].vocab[0],
        mockVocabularyCards[0].vocab[1]
      ]);
    });

    it('returns array of all seen words', () => {
      mockUseUserStore.mockImplementation((selector) => selector(mockState));
      const result = userSelectors.useWordsSeen();
      expect(result).toEqual([
        mockVocabularyCards[0].vocab[0],
        mockVocabularyCards[0].vocab[1],
        mockVocabularyCards[1].vocab[0]
      ]);
    });
  });

  describe('useMasteredWords', () => {
    it('returns array of mastered words for a level', () => {
      mockUseUserStore.mockImplementation((selector) => selector(mockState));
      const result = userSelectors.useMasteredWords('A1' as VocabLevel);
      expect(result).toEqual([mockVocabularyCards[0].vocab[0]]);
    });

    it('returns array of all mastered words', () => {
      mockUseUserStore.mockImplementation((selector) => selector(mockState));
      const result = userSelectors.useMasteredWords();
      expect(result).toEqual([mockVocabularyCards[0].vocab[0]]);
    });
  });

  describe('usePreferences', () => {
    it('returns user preferences', () => {
      mockUseUserStore.mockImplementation((selector) => selector(mockState));
      const result = userSelectors.usePreferences();
      expect(result).toEqual({ language: 'en' });
    });
  });

  describe('useSuccessRate', () => {
    it('returns correct success rate for a level', () => {
      mockUseUserStore.mockImplementation((selector) => selector(mockState));
      const result = userSelectors.useSuccessRate('A1' as VocabLevel);
      expect(result).toBe(87.5); // (7/8) * 100
    });

    it('returns 0 for level with no attempts', () => {
      mockUseUserStore.mockImplementation((selector) =>
        selector({
          ...mockState,
          progress: []
        })
      );
      const result = userSelectors.useSuccessRate('A1' as VocabLevel);
      expect(result).toBe(0);
    });

    it('returns overall success rate', () => {
      mockUseUserStore.mockImplementation((selector) => selector(mockState));
      const result = userSelectors.useSuccessRate();
      expect(result).toBe(0);
    });
  });

  describe('useCardStats', () => {
    it('returns correct stats for a level', () => {
      mockUseUserStore.mockImplementation((selector) => selector(mockState));
      const { masteredCount, seenCount } = userSelectors.useCardStats(
        'A1' as VocabLevel
      );
      expect(masteredCount).toBe(1);
      expect(seenCount).toBe(2);
    });

    it('returns zero stats for empty level', () => {
      mockUseUserStore.mockImplementation((selector) =>
        selector({
          ...mockState,
          progress: []
        })
      );
      const { masteredCount, seenCount } = userSelectors.useCardStats(
        'A1' as VocabLevel
      );
      expect(masteredCount).toBe(0);
      expect(seenCount).toBe(0);
    });
  });

  describe('useAreLevelCardsMastered', () => {
    it('returns false when not all cards are mastered', () => {
      mockUseUserStore.mockImplementation((selector) => selector(mockState));
      const result = userSelectors.useAreLevelCardsMastered('A1' as VocabLevel);
      expect(result).toBe(false);
    });

    it('returns true when all cards are mastered', () => {
      const allMasteredProgress = mockUserProgress.map((level) => ({
        ...level,
        vocabProgress: level.vocabProgress.map((word) => ({
          ...word,
          correctAttempts: 5
        }))
      }));

      mockUseUserStore.mockImplementation((selector) =>
        selector({
          ...mockState,
          progress: allMasteredProgress
        })
      );
      const result = userSelectors.useAreLevelCardsMastered('A1' as VocabLevel);
      expect(result).toBe(true);
    });
  });

  describe('useMasteryMilestone', () => {
    it('returns correct milestone based on mastered count', () => {
      mockUseUserStore.mockImplementation((selector) => selector(mockState));
      const result = userSelectors.useMasteryMilestone('A1' as VocabLevel);
      expect(result).toEqual({
        currentMilestone: 0,
        masteredCount: 1
      });
    });

    it('returns zero milestone for no mastered cards', () => {
      mockUseUserStore.mockImplementation((selector) =>
        selector({
          ...mockState,
          progress: []
        })
      );
      const result = userSelectors.useMasteryMilestone('A1' as VocabLevel);
      expect(result).toEqual({
        currentMilestone: 0,
        masteredCount: 0
      });
    });
  });
});
