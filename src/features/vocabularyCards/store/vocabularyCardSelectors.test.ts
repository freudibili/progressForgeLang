import { vocabularyCardSelectors } from './vocabularyCardsStore';
import { Level, VocabularyCard } from '@/shared/types/sharedTypes';
import {
  LevelProgress,
  VocabularyCardProgress
} from '../types/vocabularyCardTypes';
import {
  mockLevels,
  mockCards,
  mockProgress
} from './__mocks__/vocabularyCardMocks';

// Mock React
jest.mock('react', () => ({
  useMemo: (fn: Function) => fn()
}));

// Initialize mock data
const mockStore = {
  cards: mockCards,
  progress: mockProgress
};

// Mock the store
jest.mock('./vocabularyCardsStore', () => ({
  useVocabularyCardStore: jest.fn((selector) => selector(mockStore)),
  vocabularyCardSelectors: {
    useAvailableLevels: (allLevels: Level[]) => {
      const vocabularyCards = mockStore.cards;
      return allLevels
        .filter(
          (level: Level) =>
            vocabularyCards[level.id] && vocabularyCards[level.id].length > 0
        )
        .sort((a: Level, b: Level) => a.id.localeCompare(b.id));
    },
    useMasteredWords: (levelId: string) => {
      const levelCards = mockStore.cards[levelId] || [];
      const levelProgress = mockStore.progress.find(
        (p: LevelProgress) => p.levelId === levelId
      );

      if (!levelProgress) return [];

      const masteredCardIds = levelProgress.vocabProgress
        .filter(
          (p: VocabularyCardProgress) =>
            p.correctAttempts >= 3 &&
            p.correctAttempts / (p.correctAttempts + p.incorrectAttempts) >= 0.8
        )
        .map((p: VocabularyCardProgress) => p.cardId);

      return levelCards.filter((card: VocabularyCard) =>
        masteredCardIds.includes(card.id)
      );
    },
    useLevelProgress: (levelId: string, availableCards: VocabularyCard[]) => {
      const levelProgress = mockStore.progress.find(
        (p: LevelProgress) => p.levelId === levelId
      );

      return availableCards.map((card: VocabularyCard) => {
        const progress = levelProgress?.vocabProgress.find(
          (p: VocabularyCardProgress) => p.cardId === card.id
        );

        return {
          cardId: card.id,
          correctAttempts: progress?.correctAttempts ?? 0,
          incorrectAttempts: progress?.incorrectAttempts ?? 0,
          lastAttemptedAt: progress?.lastAttemptedAt ?? 0
        };
      });
    }
  }
}));

describe('vocabularyCardSelectors', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useAvailableLevels', () => {
    it('should return only levels that have vocabulary cards', () => {
      const result = vocabularyCardSelectors.useAvailableLevels(mockLevels);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('level1');
      expect(result[1].id).toBe('level2');
    });

    it('should sort levels by id', () => {
      const unsortedLevels = [
        { ...mockLevels[2] },
        { ...mockLevels[0] },
        { ...mockLevels[1] }
      ];

      const result = vocabularyCardSelectors.useAvailableLevels(unsortedLevels);

      expect(result[0].id).toBe('level1');
      expect(result[1].id).toBe('level2');
    });
  });

  describe('useMasteredWords', () => {
    it('should return mastered words for a level', () => {
      const result = vocabularyCardSelectors.useMasteredWords('level1');

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('card1');
    });

    it('should return empty array for level with no progress', () => {
      const result = vocabularyCardSelectors.useMasteredWords('level3');

      expect(result).toHaveLength(0);
    });

    it('should return empty array for non-existent level', () => {
      const result = vocabularyCardSelectors.useMasteredWords('nonexistent');

      expect(result).toHaveLength(0);
    });
  });

  describe('useLevelProgress', () => {
    it('should return progress for all cards in a level', () => {
      const availableCards = mockCards.level1;
      const result = vocabularyCardSelectors.useLevelProgress(
        'level1',
        availableCards
      );

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        cardId: 'card1',
        correctAttempts: 4,
        incorrectAttempts: 1,
        lastAttemptedAt: expect.any(Number)
      });
      expect(result[1]).toEqual({
        cardId: 'card2',
        correctAttempts: 1,
        incorrectAttempts: 2,
        lastAttemptedAt: expect.any(Number)
      });
    });

    it('should initialize unseen cards with zero attempts', () => {
      const newCard: VocabularyCard = {
        id: 'newCard',
        infinitiv: {
          de: 'new',
          fr: 'nouveau',
          en: 'new',
          uk: 'новий',
          er: 'አዲስ',
          af: 'جدید',
          ru: 'новый'
        },
        conjugation: {
          präsens: 'new',
          präteritum: 'newed',
          perfekt: 'has newed',
          plusquamperfekt: 'had newed',
          futurI: 'will new'
        },
        levelId: 'level1',
        type: 'regular',
        example: {
          de: 'New day',
          fr: 'Nouveau jour',
          en: 'New day',
          uk: 'Новий день',
          er: 'አዲስ ቀን',
          af: 'روز جدید',
          ru: 'Новый день'
        }
      };

      const availableCards = [newCard, ...mockCards.level1];
      const result = vocabularyCardSelectors.useLevelProgress(
        'level1',
        availableCards
      );

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({
        cardId: 'newCard',
        correctAttempts: 0,
        incorrectAttempts: 0,
        lastAttemptedAt: 0
      });
    });

    it('should handle level with no progress', () => {
      const availableCards = mockCards.level1;
      const result = vocabularyCardSelectors.useLevelProgress(
        'level3',
        availableCards
      );

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        cardId: 'card1',
        correctAttempts: 0,
        incorrectAttempts: 0,
        lastAttemptedAt: 0
      });
    });
  });
});
