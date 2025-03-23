import { VocabLevel } from '@levels/types/level';
import {
  mockUserProgress,
  mockVocabularyCards
} from '../../store/__tests__/__mocks__/mockUserVocab';
import {
  MASTERY_THRESHOLD,
  calculateSuccessRate,
  filterMasteredCards,
  filterSeenCards,
  findCardProgress,
  findLevelData,
  findLevelProgress,
  getCardAttempts,
  isCardMastered
} from '../progressUtils';

describe('progressUtils', () => {
  describe('findLevelData', () => {
    it('returns level data when found', () => {
      const result = findLevelData(mockVocabularyCards, 'A1' as VocabLevel);
      expect(result).toBe(mockVocabularyCards[0]);
    });

    it('returns undefined when level not found', () => {
      const result = findLevelData(mockVocabularyCards, 'B1' as VocabLevel);
      expect(result).toBeUndefined();
    });
  });

  describe('findLevelProgress', () => {
    it('returns level progress when found', () => {
      const result = findLevelProgress(mockUserProgress, 'A1' as VocabLevel);
      expect(result).toBe(mockUserProgress[0]);
    });

    it('returns undefined when level not found', () => {
      const result = findLevelProgress(mockUserProgress, 'B1' as VocabLevel);
      expect(result).toBeUndefined();
    });
  });

  describe('findCardProgress', () => {
    it('returns card progress when found', () => {
      const levelProgress = mockUserProgress[0];
      const result = findCardProgress(levelProgress, '1');
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
      const levelData = mockVocabularyCards[0];
      const levelProgress = mockUserProgress[0];
      const result = filterMasteredCards(levelData.vocab, levelProgress);
      expect(result).toEqual([levelData.vocab[0]]);
    });

    it('returns empty array when no cards are mastered', () => {
      const levelData = mockVocabularyCards[1];
      const levelProgress = mockUserProgress[1];
      const result = filterMasteredCards(levelData.vocab, levelProgress);
      expect(result).toEqual([]);
    });
  });

  describe('filterSeenCards', () => {
    it('returns seen cards', () => {
      const levelData = mockVocabularyCards[0];
      const levelProgress = mockUserProgress[0];
      const result = filterSeenCards(levelData.vocab, levelProgress);
      expect(result).toEqual([levelData.vocab[0], levelData.vocab[1]]);
    });

    it('returns empty array when no cards are seen', () => {
      const levelData = mockVocabularyCards[1];
      const levelProgress = { level: 'A2' as VocabLevel, vocabProgress: [] };
      const result = filterSeenCards(levelData.vocab, levelProgress);
      expect(result).toEqual([]);
    });
  });

  describe('calculateSuccessRate', () => {
    it('calculates correct success rate', () => {
      const levelProgress = mockUserProgress[0];
      const result = calculateSuccessRate(levelProgress);
      // Total correct attempts: 7 (5 + 2)
      // Total attempts: 8 (5 + 3)
      expect(result).toBe(87.5);
    });

    it('returns 0 when no attempts', () => {
      const emptyProgress = { vocabProgress: [] };
      const result = calculateSuccessRate(emptyProgress);
      expect(result).toBe(0);
    });
  });
});
