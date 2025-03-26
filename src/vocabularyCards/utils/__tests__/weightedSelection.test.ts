import { UserVocabProgress } from '@user/types/userTypes';
import {
  getCardProgress,
  selectWeightedRandomCard
} from '../weightedSelection';
import { mockCard, mockCards } from './__mocks__/mockVocabularyCards';
import { mockProgress } from './__mocks__/mockUserProgress';

describe('weightedSelection utils', () => {
  describe('getCardProgress', () => {
    it('returns 0 for unseen cards', () => {
      const progress: UserVocabProgress[] = [];
      expect(getCardProgress(mockCard, progress)).toBe(0);
    });

    it('returns correct count for seen cards', () => {
      const progress: UserVocabProgress[] = [
        {
          cardId: mockCard.id,
          correctAttempts: 3,
          incorrectAttempts: 1
        }
      ];
      expect(getCardProgress(mockCard, progress)).toBe(3);
    });
  });

  describe('selectWeightedRandomCard', () => {
    it('returns null for empty card list', () => {
      const result = selectWeightedRandomCard([], []);
      expect(result).toBeNull();
    });

    it('excludes previous card from selection', () => {
      const result = selectWeightedRandomCard(mockCards, [], mockCards[0].id);
      expect(result?.id).toBe(mockCards[1].id);
    });

    it('returns first card if all others are excluded', () => {
      const singleCard = [mockCards[0]];
      const result = selectWeightedRandomCard(singleCard, [], 'someOtherId');
      expect(result).toBe(singleCard[0]);
    });

    it('prioritizes unseen cards', () => {
      // Run multiple times to ensure statistical significance
      const selections = Array.from({ length: 100 }, () =>
        selectWeightedRandomCard(mockCards, mockProgress)
      );

      // Card2 should be selected more often as it's unseen
      const card2Selections = selections.filter(
        (card) => card?.id === mockCards[1].id
      );
      // With weights of 1.0 for unseen and 0.1 for seen cards,
      // unseen cards should be selected ~91% of the time
      expect(card2Selections.length).toBeGreaterThan(80); // Should be selected >80% of the time
    });
  });
});
