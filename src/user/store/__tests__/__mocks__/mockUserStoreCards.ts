import { VocabularyCard, VocabLevel } from '../../../../vocabularyCards/types';

export const mockUserStoreCards: VocabularyCard[] = [
  {
    id: '1',
    infinitiv: { de: 'gehen', fr: 'aller', en: 'to go' },
    conjugation: {
      präsens: 'geht',
      präteritum: 'ging',
      perfekt: 'gegangen',
      plusquamperfekt: 'war gegangen',
      futurI: 'wird gehen'
    },
    level: 'A1' as VocabLevel,
    type: 'irregular' as const,
    example: {
      de: 'Ich gehe zur Schule',
      fr: "Je vais à l'école",
      en: 'I go to school'
    },
    difficulty: 'beginner' as const,
    mastered: false
  },
  {
    id: '2',
    infinitiv: { de: 'spielen', fr: 'jouer', en: 'to play' },
    conjugation: {
      präsens: 'spielt',
      präteritum: 'spielte',
      perfekt: 'gespielt',
      plusquamperfekt: 'hatte gespielt',
      futurI: 'wird spielen'
    },
    level: 'A1' as VocabLevel,
    type: 'regular' as const,
    example: {
      de: 'Die Kinder spielen im Garten',
      fr: 'Les enfants jouent dans le jardin',
      en: 'The children play in the garden'
    },
    difficulty: 'beginner' as const,
    mastered: false
  },
  {
    id: '3',
    infinitiv: { de: 'lernen', fr: 'apprendre', en: 'to learn' },
    conjugation: {
      präsens: 'lernt',
      präteritum: 'lernte',
      perfekt: 'gelernt',
      plusquamperfekt: 'hatte gelernt',
      futurI: 'wird lernen'
    },
    level: 'A1' as VocabLevel,
    type: 'regular' as const,
    example: {
      de: 'Ich lerne Deutsch',
      fr: "J'apprends l'allemand",
      en: 'I learn German'
    },
    difficulty: 'beginner' as const,
    mastered: false
  }
];
