import { VocabularyCard } from '@/shared/types/sharedTypes';

export const mockCard: VocabularyCard = {
  id: '550e8400-e29b-41d4-a716-446655440001',
  infinitiv: {
    de: 'test',
    fr: 'test',
    en: 'test',
    uk: 'тест',
    er: 'ሙከራ',
    af: 'تست',
    ru: 'тест'
  },
  conjugation: {
    präsens: 'test',
    präteritum: 'test',
    perfekt: 'test',
    plusquamperfekt: 'test',
    futurI: 'test'
  },
  levelId: 'A1',
  type: 'regular',
  example: {
    de: 'test',
    fr: 'test',
    en: 'test',
    uk: 'тест',
    er: 'ሙከራ',
    af: 'تست',
    ru: 'тест'
  }
};

export const mockCards: VocabularyCard[] = [
  mockCard,
  {
    ...mockCard,
    id: '550e8400-e29b-41d4-a716-446655440002'
  }
];
