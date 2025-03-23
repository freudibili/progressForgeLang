import { VocabularyCard } from '../../../types';

export const mockCard: VocabularyCard = {
  id: 'card1',
  infinitiv: { de: 'test', fr: 'test', en: 'test' },
  conjugation: {
    präsens: 'test',
    präteritum: 'test',
    perfekt: 'test',
    plusquamperfekt: 'test',
    futurI: 'test'
  },
  level: 'A1',
  type: 'regular',
  example: { de: 'test', fr: 'test', en: 'test' },
  difficulty: 'beginner',
  mastered: false
};

export const mockCards: VocabularyCard[] = [
  mockCard,
  {
    ...mockCard,
    id: 'card2'
  }
];
