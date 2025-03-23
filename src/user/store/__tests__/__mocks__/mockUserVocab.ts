import { UserVocabProgress } from '@user/types';

export const mockUserVocab: UserVocabProgress[] = [
  {
    cardId: '1',
    correctAttempts: 5,
    incorrectAttempts: 0,
    lastReviewedAt: new Date('2024-03-23')
  },
  {
    cardId: '2',
    correctAttempts: 2,
    incorrectAttempts: 1,
    lastReviewedAt: new Date('2024-03-23')
  },
  {
    cardId: '3',
    correctAttempts: 0,
    incorrectAttempts: 2,
    lastReviewedAt: new Date('2024-03-23')
  }
];
