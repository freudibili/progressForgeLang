import {
  getCardProgress,
  selectWeightedRandomCard
} from '../weightedSelection';
import { mockCard, mockCards } from './__mocks__/mockVocabularyCards';
import { mockProgress } from './__mocks__/mockUserProgress';

describe('weightedSelection utils', () => {
  describe('getCardProgress', () => {
    it('returns 0 for unseen cards', () => {
      const unseenCard = { ...mockCard, id: 'unseen-card-id' };
      expect(getCardProgress(unseenCard, mockProgress)).toBe(0);
    });

    it('returns correct count for seen cards', () => {
      expect(getCardProgress(mockCards[0], mockProgress)).toBe(3);
    });
  });

  describe('selectWeightedRandomCard', () => {
    it('returns null for empty card list', () => {
      const result = selectWeightedRandomCard([], []);
      expect(result).toBeNull();
    });

    it('excludes previous card from selection', () => {
      const result = selectWeightedRandomCard(
        mockCards,
        mockProgress,
        mockCards[0].id
      );
      expect(result?.id).toBe('550e8400-e29b-41d4-a716-446655440002');
    });

    it('returns first card if all others are excluded', () => {
      const singleCard = [mockCards[0]];
      const result = selectWeightedRandomCard(
        singleCard,
        mockProgress,
        'someOtherId'
      );
      expect(result).toBe(singleCard[0]);
    });

    it('prioritizes unseen cards', () => {
      // Create progress entries for all cards
      const allCardsProgress = mockCards.map((card) => {
        const progress = mockProgress.find((p) => p.cardId === card.id);
        return (
          progress || {
            cardId: card.id,
            correctAttempts: 0,
            incorrectAttempts: 0,
            masteryLevel: 0
          }
        );
      });

      // Run multiple times to ensure statistical significance
      const selections = Array.from({ length: 100 }, () =>
        selectWeightedRandomCard(mockCards, allCardsProgress)
      );

      // Card2 should be selected more often as it's unseen
      const card2Selections = selections.filter(
        (card) => card?.id === '550e8400-e29b-41d4-a716-446655440002'
      );
      // With weights of 1.0 for unseen, 20 for one correct, 40 for two correct, and 0.001 for mastered cards,
      // unseen cards should be selected ~60% of the time
      expect(card2Selections.length).toBeGreaterThan(50); // Should be selected >50% of the time
    });
  });
});
