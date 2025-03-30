import { VocabularyCards } from '@/features/vocabularyCards/types/vocabTypes';

export const mockCards: VocabularyCards = [
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    infinitiv: {
      de: 'sein',
      fr: 'être',
      en: 'to be'
    },
    conjugation: {
      präsens: 'ist',
      präteritum: 'war',
      perfekt: 'ist gewesen',
      plusquamperfekt: 'war gewesen',
      futurI: 'wird sein'
    },
    levelId: '550e8400-e29b-41d4-a716-446655440001',
    type: 'irregular',
    example: {
      de: 'Er ist müde.',
      fr: 'Il est fatigué.',
      en: 'He is tired.'
    }
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    infinitiv: {
      de: 'haben',
      fr: 'avoir',
      en: 'to have'
    },
    conjugation: {
      präsens: 'hat',
      präteritum: 'hatte',
      perfekt: 'hat gehabt',
      plusquamperfekt: 'hatte gehabt',
      futurI: 'wird haben'
    },
    levelId: '550e8400-e29b-41d4-a716-446655440001',
    type: 'irregular',
    example: {
      de: 'Ich habe Hunger.',
      fr: "J'ai faim.",
      en: 'I am hungry.'
    }
  }
];
