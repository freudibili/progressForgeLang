import { UserVocabProgress } from '@user/types/userTypes';

export const mockProgress: UserVocabProgress[] = [
  {
    cardId: 'card1',
    correctAttempts: 3,
    incorrectAttempts: 1,
    lastReviewedAt: new Date('2024-03-23')
  }
];
