import { UserVocabProgress } from '@user/types';

export const mockProgress: UserVocabProgress[] = [
  {
    cardId: 'card1',
    originalWord: 'test1',
    correctCount: 3,
    lastReviewedAt: new Date('2024-03-23')
  }
];
