import {
  UserVocabProgress,
  UserPreferences,
  UserStatistics
} from '@user/types';
import { userSelectors } from '../userSelectors';
import { useUserStore } from '../userStore';
import { mockUserStoreCards } from './__mocks__/mockUserStoreCards';
import { mockUserVocab } from './__mocks__/mockUserVocab';

// Mock the Zustand store
const mockUseUserStore = useUserStore as unknown as jest.Mock;
jest.mock('../userStore', () => ({
  useUserStore: jest.fn()
}));

describe('userSelectors', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  describe('useCardProgress', () => {
    it('returns correct count for a card', () => {
      mockUseUserStore.mockImplementation((selector) =>
        selector({ userVocab: mockUserVocab })
      );
      const result = userSelectors.useCardProgress('1');
      expect(result).toBe(5);
    });

    it('returns 0 for unseen card', () => {
      mockUseUserStore.mockImplementation((selector) =>
        selector({ userVocab: mockUserVocab })
      );
      const result = userSelectors.useCardProgress('4');
      expect(result).toBe(0);
    });
  });

  describe('useIsCardMastered', () => {
    it('returns true when card is mastered', () => {
      mockUseUserStore.mockImplementation((selector) =>
        selector({ userVocab: mockUserVocab })
      );
      const result = userSelectors.useIsCardMastered('1');
      expect(result).toBe(true);
    });

    it('returns false when card is not mastered', () => {
      mockUseUserStore.mockImplementation((selector) =>
        selector({ userVocab: mockUserVocab })
      );
      const result = userSelectors.useIsCardMastered('3');
      expect(result).toBe(false);
    });
  });

  describe('useMasteredWordsCount', () => {
    it('returns correct count of mastered words', () => {
      mockUseUserStore.mockImplementation((selector) =>
        selector({ userVocab: mockUserVocab })
      );
      const result = userSelectors.useMasteredWordsCount();
      expect(result).toBe(1);
    });
  });

  describe('useWordsSeen', () => {
    it('returns array of seen words', () => {
      mockUseUserStore.mockImplementation((selector) =>
        selector({ userVocab: mockUserVocab })
      );
      const result = userSelectors.useWordsSeen();
      // Only return words that have been seen (correctCount > 0)
      const expectedWords = mockUserVocab.filter(
        (word) => word.correctCount > 0
      );
      expect(result).toEqual(expectedWords);
    });
  });

  describe('useMasteredWords', () => {
    it('returns array of mastered words', () => {
      mockUseUserStore.mockImplementation((selector) =>
        selector({ userVocab: mockUserVocab })
      );
      const result = userSelectors.useMasteredWords();
      expect(result).toEqual([mockUserVocab[0]]);
    });
  });

  describe('usePreferences', () => {
    it('returns user preferences', () => {
      const mockPreferences: UserPreferences = {
        notifications: true,
        dailyReminder: true,
        reminderTime: '09:00',
        language: 'german',
        theme: 'light'
      };
      mockUseUserStore.mockImplementation((selector) =>
        selector({ preferences: mockPreferences })
      );
      const result = userSelectors.usePreferences();
      expect(result).toEqual(mockPreferences);
    });
  });

  describe('useSuccessRate', () => {
    it('returns user success rate', () => {
      const mockStatistics: UserStatistics = {
        totalCards: 10,
        masteredCards: 5,
        dailyStreak: 3,
        lastStudyDate: '2024-03-23',
        successRate: 0.75,
        studyTime: 3600
      };
      mockUseUserStore.mockImplementation((selector) =>
        selector({ statistics: mockStatistics })
      );
      const result = userSelectors.useSuccessRate();
      expect(result).toBe(0.75);
    });
  });

  describe('useCardStats', () => {
    it('returns correct stats', () => {
      mockUseUserStore.mockImplementation((selector) =>
        selector({ userVocab: mockUserVocab })
      );

      const stats = userSelectors.useCardStats(mockUserStoreCards);

      expect(stats).toEqual({
        masteredCount: 1, // card 1 has correctCount >= MASTERY_THRESHOLD
        totalAttempted: 2, // cards 1 and 2 have correctCount > 0
        totalCount: 3 // total number of cards
      });
    });
  });

  describe('useAreLevelCardsMastered', () => {
    it('returns false when not all cards are mastered', () => {
      mockUseUserStore.mockImplementation((selector) =>
        selector({ userVocab: mockUserVocab })
      );
      const result = userSelectors.useAreLevelCardsMastered(mockUserStoreCards);
      expect(result).toBe(false);
    });

    it('returns true when all cards are mastered', () => {
      const allMasteredVocab: UserVocabProgress[] = mockUserStoreCards.map(
        (card) => ({
          cardId: card.id,
          originalWord: card.infinitiv.de,
          correctCount: 5,
          lastReviewedAt: new Date('2024-03-23')
        })
      );
      mockUseUserStore.mockImplementation((selector) =>
        selector({ userVocab: allMasteredVocab })
      );
      const result = userSelectors.useAreLevelCardsMastered(mockUserStoreCards);
      expect(result).toBe(true);
    });
  });

  describe('useMasteryMilestone', () => {
    it('returns correct milestone based on mastered count', () => {
      mockUseUserStore.mockImplementation((selector) =>
        selector({ userVocab: mockUserVocab })
      );
      const result = userSelectors.useMasteryMilestone(mockUserStoreCards);
      expect(result).toEqual({
        currentMilestone: 0,
        masteredCount: 1
      });
    });

    it('returns zero milestone for no mastered cards', () => {
      mockUseUserStore.mockImplementation((selector) =>
        selector({ userVocab: [] })
      );
      const result = userSelectors.useMasteryMilestone(mockUserStoreCards);
      expect(result).toEqual({
        currentMilestone: 0,
        masteredCount: 0
      });
    });
  });
});
