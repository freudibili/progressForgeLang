import { VocabularyCard } from '../../types/vocabTypes';

export const mockLevels: VocabularyCard[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440014',
    infinitiv: {
      de: 'widersprechen',
      fr: 'contredire',
      en: 'to contradict'
    },
    conjugation: {
      präsens: 'widerspricht',
      präteritum: 'widersprach',
      perfekt: 'hat widersprochen',
      plusquamperfekt: 'hatte widersprochen',
      futurI: 'wird widersprechen'
    },
    levelId: 'B2',
    type: 'irregular',
    example: {
      de: 'Er widerspricht seinem Chef.',
      fr: 'Il contredit son chef.',
      en: 'He contradicts his boss.'
    }
  }
];
