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
      expect(getCardProgress(mockCard, mockProgress)).toBe(3);
    });
  });

  describe('selectWeightedRandomCard', () => {
    it('returns null for empty card list', () => {
      const result = selectWeightedRandomCard([], []);
      expect(result).toBeNull();
    });

    it('excludes previous card from selection', () => {
      const result = selectWeightedRandomCard(mockCards, [], 'card1');
      expect(result?.id).toBe('card2');
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
      const card2Selections = selections.filter((card) => card?.id === 'card2');
      expect(card2Selections.length).toBeGreaterThan(60); // Should be selected >60% of the time
    });
  });
});
