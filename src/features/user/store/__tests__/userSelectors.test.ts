import { useVocabularyCardStore } from '@/features/vocabularyCards/store/vocabularyCardsStore';

import { userSelectors } from '../userSelectors';
import { useUserStore } from '../userStore';
import { mockCards } from './__mocks__/mockUserStoreCards';
import { mockUserProgress } from './__mocks__/mockUserVocab';
import { Language } from '@/shared/types/sharedTypes';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('./__mocks__/asyncStorage')
);

// Mock the Zustand stores
const mockUseUserStore = useUserStore as unknown as jest.Mock;
const mockUseVocabularyCardStore =
  useVocabularyCardStore as unknown as jest.Mock;

jest.mock('../userStore', () => ({
  useUserStore: jest.fn()
}));

jest.mock('@vocabularyCards/store/vocabularyCardsStore', () => ({
  useVocabularyCardStore: jest.fn()
}));

describe('userSelectors', () => {
  const mockState = {
    progress: mockUserProgress,
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
    // Mock the vocabulary cards store
    mockUseVocabularyCardStore.mockImplementation(() => ({
      vocabularyCards: mockCards
    }));
  });

  describe('useCardProgress', () => {
    it('returns correct count for a card', () => {
      mockUseUserStore.mockImplementation((selector) => selector(mockState));
      const result = userSelectors.useCardProgress(
        '550e8400-e29b-41d4-a716-446655440002',
        '550e8400-e29b-41d4-a716-446655440001'
      );
      expect(result).toBe(5);
    });

    it('returns 0 for unseen card', () => {
      mockUseUserStore.mockImplementation((selector) => selector(mockState));
      const result = userSelectors.useCardProgress(
        '4',
        '550e8400-e29b-41d4-a716-446655440001'
      );
      expect(result).toBe(0);
    });
  });

  describe('useIsCardMastered', () => {
    it('returns true when card is mastered', () => {
      mockUseUserStore.mockImplementation((selector) => selector(mockState));
      const result = userSelectors.useIsCardMastered(
        '550e8400-e29b-41d4-a716-446655440002',
        '550e8400-e29b-41d4-a716-446655440001'
      );
      expect(result).toBe(true);
    });

    it('returns false when card is not mastered', () => {
      mockUseUserStore.mockImplementation((selector) => selector(mockState));
      const result = userSelectors.useIsCardMastered(
        '550e8400-e29b-41d4-a716-446655440003',
        '550e8400-e29b-41d4-a716-446655440001'
      );
      expect(result).toBe(false);
    });
  });

  describe('useMasteredWordsCount', () => {
    it('returns correct count of mastered words for a level', () => {
      mockUseUserStore.mockImplementation((selector) => selector(mockState));
      const result = userSelectors.useMasteredWordsCount(
        '550e8400-e29b-41d4-a716-446655440001'
      );
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
      const result = userSelectors.useWordsSeen(
        '550e8400-e29b-41d4-a716-446655440001'
      );
      expect(result).toEqual({
        seenCount: 2,
        totalCount: 2
      });
    });

    it('returns array of all seen words', () => {
      mockUseUserStore.mockImplementation((selector) => selector(mockState));
      const result = userSelectors.useWordsSeen();
      expect(result).toEqual({
        seenCount: 3,
        totalCount: 4
      });
    });
  });

  describe('useMasteredWords', () => {
    it('returns array of mastered words for a level', () => {
      mockUseUserStore.mockImplementation((selector) => selector(mockState));
      const result = userSelectors.useMasteredWords(
        '550e8400-e29b-41d4-a716-446655440001'
      );
      expect(result).toEqual([mockCards[0]]);
    });

    it('returns array of all mastered words', () => {
      mockUseUserStore.mockImplementation((selector) => selector(mockState));
      const result = userSelectors.useMasteredWords();
      expect(result).toEqual([mockCards[0]]);
    });
  });

  describe('usePreferences', () => {
    it('returns user preferences', () => {
      mockUseUserStore.mockImplementation((selector) => selector(mockState));
      const result = userSelectors.usePreferences();
      expect(result).toEqual({ language: Language.English });
    });
  });

  describe('useSuccessRate', () => {
    it('returns correct success rate for a level', () => {
      mockUseUserStore.mockImplementation((selector) => selector(mockState));
      const result = userSelectors.useSuccessRate(
        '550e8400-e29b-41d4-a716-446655440001'
      );
      // Total correct attempts: 7 (5 + 2)
      // Total attempts: 10 (5 + 2 + 2 + 1)
      expect(result).toBe(70); // (7/10) * 100
    });

    it('returns 0 for level with no attempts', () => {
      mockUseUserStore.mockImplementation((selector) =>
        selector({
          ...mockState,
          progress: []
        })
      );
      const result = userSelectors.useSuccessRate(
        '550e8400-e29b-41d4-a716-446655440001'
      );
      expect(result).toBe(0);
    });
  });

  describe('useCardStats', () => {
    it('returns correct stats for a level', () => {
      mockUseUserStore.mockImplementation((selector) => selector(mockState));
      const { masteredCount, seenCount, totalCount } =
        userSelectors.useCardStats('550e8400-e29b-41d4-a716-446655440001');
      expect(masteredCount).toBe(1);
      expect(seenCount).toBe(2);
      expect(totalCount).toBe(2);
    });

    it('returns zero stats for empty level', () => {
      mockUseUserStore.mockImplementation((selector) =>
        selector({
          ...mockState,
          progress: []
        })
      );
      const { masteredCount, seenCount, totalCount } =
        userSelectors.useCardStats('550e8400-e29b-41d4-a716-446655440001');
      expect(masteredCount).toBe(0);
      expect(seenCount).toBe(0);
      expect(totalCount).toBe(0);
    });
  });

  describe('useAreLevelCardsMastered', () => {
    it('returns false when not all cards are mastered', () => {
      mockUseUserStore.mockImplementation((selector) => selector(mockState));
      const result = userSelectors.useAreLevelCardsMastered(
        '550e8400-e29b-41d4-a716-446655440001'
      );
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
      const result = userSelectors.useAreLevelCardsMastered(
        '550e8400-e29b-41d4-a716-446655440001'
      );
      expect(result).toBe(true);
    });
  });

  describe('useMasteryMilestone', () => {
    it('returns correct milestone based on mastered count', () => {
      mockUseUserStore.mockImplementation((selector) => selector(mockState));
      const result = userSelectors.useMasteryMilestone(
        '550e8400-e29b-41d4-a716-446655440001'
      );
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
      const result = userSelectors.useMasteryMilestone(
        '550e8400-e29b-41d4-a716-446655440001'
      );
      expect(result).toEqual({
        currentMilestone: 0,
        masteredCount: 0
      });
    });
  });
});
