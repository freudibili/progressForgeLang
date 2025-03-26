import { VocabularyCard } from '../../types/vocabTypes';

export const mockLevels: VocabularyCard[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440012',
    infinitiv: {
      de: 'erklären',
      fr: 'expliquer',
      en: 'to explain'
    },
    conjugation: {
      präsens: 'erklärt',
      präteritum: 'erklärte',
      perfekt: 'hat erklärt',
      plusquamperfekt: 'hatte erklärt',
      futurI: 'wird erklären'
    },
    levelId: 'B1',
    type: 'regular',
    example: {
      de: 'Er erklärt die Aufgabe.',
      fr: 'Il explique la tâche.',
      en: 'He explains the task.'
    }
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440013',
    infinitiv: {
      de: 'empfehlen',
      fr: 'recommander',
      en: 'to recommend'
    },
    conjugation: {
      präsens: 'empfiehlt',
      präteritum: 'empfahl',
      perfekt: 'hat empfohlen',
      plusquamperfekt: 'hatte empfohlen',
      futurI: 'wird empfehlen'
    },
    levelId: 'B1',
    type: 'irregular',
    example: {
      de: 'Ich empfehle dieses Buch.',
      fr: 'Je recommande ce livre.',
      en: 'I recommend this book.'
    }
  }
];
