import { mockUserProgress } from '../../store/__tests__/__mocks__/mockUserVocab';
import {
  MASTERY_THRESHOLD,
  calculateSuccessRate,
  filterMasteredCards,
  filterSeenCards,
  findCardProgress,
  findLevelProgress,
  getCardAttempts,
  isCardMastered
} from '../progressUtils';

describe('progressUtils', () => {
  describe('findLevelProgress', () => {
    it('returns level progress when found', () => {
      const result = findLevelProgress(
        mockUserProgress,
        '550e8400-e29b-41d4-a716-446655440001'
      );
      expect(result).toBe(mockUserProgress[0]);
    });

    it('returns undefined when level not found', () => {
      const result = findLevelProgress(mockUserProgress, 'B1');
      expect(result).toBeUndefined();
    });
  });

  describe('findCardProgress', () => {
    it('returns card progress when found', () => {
      const levelProgress = mockUserProgress[0];
      const result = findCardProgress(
        levelProgress,
        '550e8400-e29b-41d4-a716-446655440002'
      );
      expect(result).toBe(levelProgress.vocabProgress[0]);
    });

    it('returns undefined when card not found', () => {
      const levelProgress = mockUserProgress[0];
      const result = findCardProgress(levelProgress, '999');
      expect(result).toBeUndefined();
    });
  });

  describe('getCardAttempts', () => {
    it('returns correct attempts when progress exists', () => {
      const progress = mockUserProgress[0].vocabProgress[0];
      const result = getCardAttempts(progress);
      expect(result).toBe(5);
    });

    it('returns 0 when progress is undefined', () => {
      const result = getCardAttempts(undefined);
      expect(result).toBe(0);
    });
  });

  describe('isCardMastered', () => {
    it('returns true when attempts >= threshold', () => {
      const result = isCardMastered(MASTERY_THRESHOLD);
      expect(result).toBe(true);
    });

    it('returns false when attempts < threshold', () => {
      const result = isCardMastered(MASTERY_THRESHOLD - 1);
      expect(result).toBe(false);
    });
  });

  describe('filterMasteredCards', () => {
    it('returns mastered cards', () => {
      const levelProgress = mockUserProgress[0];
      const cardIds = levelProgress.vocabProgress.map((p) => p.cardId);
      const result = filterMasteredCards(cardIds, levelProgress);
      expect(result).toEqual(['550e8400-e29b-41d4-a716-446655440002']);
    });

    it('returns empty array when no cards are mastered', () => {
      const levelProgress = mockUserProgress[1];
      const cardIds = levelProgress.vocabProgress.map((p) => p.cardId);
      const result = filterMasteredCards(cardIds, levelProgress);
      expect(result).toEqual([]);
    });
  });

  describe('filterSeenCards', () => {
    it('returns seen cards', () => {
      const levelProgress = mockUserProgress[0];
      const cardIds = levelProgress.vocabProgress.map((p) => p.cardId);
      const result = filterSeenCards(cardIds, levelProgress);
      expect(result).toEqual([
        '550e8400-e29b-41d4-a716-446655440002',
        '550e8400-e29b-41d4-a716-446655440003'
      ]);
    });

    it('returns empty array when no cards are seen', () => {
      const levelProgress = { levelId: 'A2', vocabProgress: [] };
      const result = filterSeenCards([], levelProgress);
      expect(result).toEqual([]);
    });
  });

  describe('calculateSuccessRate', () => {
    it('calculates correct success rate', () => {
      const levelProgress = mockUserProgress[0];
      const result = calculateSuccessRate(levelProgress);
      // Total correct attempts: 7 (5 + 2)
      // Total attempts: 10 (5 + 2 + 2 + 1)
      expect(result).toBe(70);
    });

    it('returns 0 when no attempts', () => {
      const levelProgress = { levelId: 'A2', vocabProgress: [] };
      const result = calculateSuccessRate(levelProgress);
      expect(result).toBe(0);
    });
  });
});
