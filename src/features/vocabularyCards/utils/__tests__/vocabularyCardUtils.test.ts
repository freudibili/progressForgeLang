import { vocabularyCardUtils } from '../vocabularyCardUtils';
import { LevelProgress } from '../../types/vocabularyCardTypes';

describe('vocabularyCardUtils', () => {
  describe('createNewLevelProgress', () => {
    it('should create a new level progress with correct initial values', () => {
      const result = vocabularyCardUtils.createNewLevelProgress(
        'level1',
        'card1',
        true
      );

      expect(result).toEqual({
        levelId: 'level1',
        vocabProgress: [
          {
            cardId: 'card1',
            correctAttempts: 1,
            incorrectAttempts: 0,
            masteryLevel: 1,
            lastAttemptedAt: expect.any(Number)
          }
        ]
      });
    });

    it('should set correct values for incorrect attempts', () => {
      const result = vocabularyCardUtils.createNewLevelProgress(
        'level1',
        'card1',
        false
      );

      expect(result).toEqual({
        levelId: 'level1',
        vocabProgress: [
          {
            cardId: 'card1',
            correctAttempts: 0,
            incorrectAttempts: 1,
            masteryLevel: 0,
            lastAttemptedAt: expect.any(Number)
          }
        ]
      });
    });
  });

  describe('createNewCardProgress', () => {
    it('should add a new card progress to existing level progress', () => {
      const existingProgress: LevelProgress = {
        levelId: 'level1',
        vocabProgress: [
          {
            cardId: 'card1',
            correctAttempts: 2,
            incorrectAttempts: 1,
            masteryLevel: 1,
            lastAttemptedAt: 1000
          }
        ]
      };

      const result = vocabularyCardUtils.createNewCardProgress(
        existingProgress,
        'card2',
        true
      );

      expect(result.vocabProgress).toHaveLength(2);
      expect(result.vocabProgress[1]).toEqual({
        cardId: 'card2',
        correctAttempts: 1,
        incorrectAttempts: 0,
        masteryLevel: 1,
        lastAttemptedAt: expect.any(Number)
      });
    });
  });

  describe('calculateMasteryLevel', () => {
    it('should return 0 for not started cards', () => {
      expect(vocabularyCardUtils.calculateMasteryLevel(0, 0)).toBe(0);
      expect(vocabularyCardUtils.calculateMasteryLevel(0, 1)).toBe(0);
    });

    it('should return 1 for learning cards', () => {
      expect(vocabularyCardUtils.calculateMasteryLevel(1, 0)).toBe(1);
      expect(vocabularyCardUtils.calculateMasteryLevel(2, 1)).toBe(1); // 66% success rate
    });

    it('should return 2 for mastered cards', () => {
      expect(vocabularyCardUtils.calculateMasteryLevel(3, 0)).toBe(2);
      expect(vocabularyCardUtils.calculateMasteryLevel(4, 1)).toBe(2); // 80% success rate
    });

    it('should not return mastery for low success rates', () => {
      expect(vocabularyCardUtils.calculateMasteryLevel(3, 2)).toBe(1); // 60% success rate
    });
  });

  describe('updateCardProgress', () => {
    it('should create new card progress if card does not exist', () => {
      const levelProgress: LevelProgress = {
        levelId: 'level1',
        vocabProgress: [
          {
            cardId: 'card1',
            correctAttempts: 2,
            incorrectAttempts: 1,
            masteryLevel: 1,
            lastAttemptedAt: 1000
          }
        ]
      };

      const result = vocabularyCardUtils.updateCardProgress(
        levelProgress,
        'card2',
        true
      );

      expect(result.vocabProgress).toHaveLength(2);
      expect(result.vocabProgress[1].cardId).toBe('card2');
    });

    it('should update existing card progress correctly', () => {
      const levelProgress: LevelProgress = {
        levelId: 'level1',
        vocabProgress: [
          {
            cardId: 'card1',
            correctAttempts: 2,
            incorrectAttempts: 1,
            masteryLevel: 1,
            lastAttemptedAt: 1000
          }
        ]
      };

      const result = vocabularyCardUtils.updateCardProgress(
        levelProgress,
        'card1',
        true
      );

      expect(result.vocabProgress[0].correctAttempts).toBe(3);
      expect(result.vocabProgress[0].incorrectAttempts).toBe(1);
      expect(result.vocabProgress[0].masteryLevel).toBe(2); // Now mastered
      expect(result.vocabProgress[0].lastAttemptedAt).toBeGreaterThan(1000);
    });

    it('should handle incorrect attempts correctly', () => {
      const levelProgress: LevelProgress = {
        levelId: 'level1',
        vocabProgress: [
          {
            cardId: 'card1',
            correctAttempts: 2,
            incorrectAttempts: 1,
            masteryLevel: 1,
            lastAttemptedAt: 1000
          }
        ]
      };

      const result = vocabularyCardUtils.updateCardProgress(
        levelProgress,
        'card1',
        false
      );

      expect(result.vocabProgress[0].correctAttempts).toBe(2);
      expect(result.vocabProgress[0].incorrectAttempts).toBe(2);
      expect(result.vocabProgress[0].masteryLevel).toBe(1); // Still learning
      expect(result.vocabProgress[0].lastAttemptedAt).toBeGreaterThan(1000);
    });
  });
});
