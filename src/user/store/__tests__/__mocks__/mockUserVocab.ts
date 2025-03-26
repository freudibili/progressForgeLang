import { LevelProgress } from '@user/types/userTypes';

export const mockUserProgress: LevelProgress[] = [
  {
    levelId: '550e8400-e29b-41d4-a716-446655440001',
    vocabProgress: [
      {
        cardId: '550e8400-e29b-41d4-a716-446655440002',
        correctAttempts: 5,
        incorrectAttempts: 2
      },
      {
        cardId: '550e8400-e29b-41d4-a716-446655440003',
        correctAttempts: 2,
        incorrectAttempts: 1
      }
    ]
  },
  {
    levelId: '550e8400-e29b-41d4-a716-446655440011',
    vocabProgress: [
      {
        cardId: '550e8400-e29b-41d4-a716-446655440012',
        correctAttempts: 2,
        incorrectAttempts: 1
      }
    ]
  }
];
