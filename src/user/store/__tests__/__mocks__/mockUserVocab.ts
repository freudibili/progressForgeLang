import { UserVocabProgress } from '@user/types';

export const mockUserVocab: UserVocabProgress[] = [
  {
    cardId: '1',
    originalWord: 'gehen',
    correctCount: 5,
    lastReviewedAt: new Date('2024-03-23')
  },
  {
    cardId: '2',
    originalWord: 'spielen',
    correctCount: 2,
    lastReviewedAt: new Date('2024-03-23')
  },
  {
    cardId: '3',
    originalWord: 'lernen',
    correctCount: 0,
    lastReviewedAt: new Date('2024-03-23')
  }
];
