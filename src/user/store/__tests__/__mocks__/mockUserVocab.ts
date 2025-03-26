import {
  LevelProgress,
  UserVocabProgress,
  VocabularyCards
} from '@user/types/userTypes';
import { VocabLevel } from '@levels/types/level';

const a1Progress: UserVocabProgress[] = [
  {
    cardId: '1',
    correctAttempts: 5,
    incorrectAttempts: 0,
    lastReviewDate: new Date('2024-03-23')
  },
  {
    cardId: '2',
    correctAttempts: 2,
    incorrectAttempts: 1,
    lastReviewDate: new Date('2024-03-23')
  }
];

const a2Progress: UserVocabProgress[] = [
  {
    cardId: '3',
    correctAttempts: 0,
    incorrectAttempts: 2,
    lastReviewDate: new Date('2024-03-23')
  }
];

export const mockUserProgress: LevelProgress[] = [
  {
    level: 'A1' as VocabLevel,
    vocabProgress: a1Progress
  },
  {
    level: 'A2' as VocabLevel,
    vocabProgress: a2Progress
  }
];

export const mockVocabularyCards: VocabularyCards[] = [
  {
    level: 'A1' as VocabLevel,
    vocab: [
      {
        id: '1',
        infinitiv: { de: 'sein', fr: 'être', en: 'to be' },
        conjugation: {
          präsens: 'bin',
          präteritum: 'war',
          perfekt: 'gewesen',
          plusquamperfekt: 'war gewesen',
          futurI: 'werde sein'
        },
        level: 'A1',
        type: 'irregular',
        example: {
          de: 'Ich bin müde',
          fr: 'Je suis fatigué',
          en: 'I am tired'
        }
      },
      {
        id: '2',
        infinitiv: { de: 'haben', fr: 'avoir', en: 'to have' },
        conjugation: {
          präsens: 'habe',
          präteritum: 'hatte',
          perfekt: 'gehabt',
          plusquamperfekt: 'hatte gehabt',
          futurI: 'werde haben'
        },
        level: 'A1',
        type: 'irregular',
        example: {
          de: 'Ich habe ein Buch',
          fr: "J'ai un livre",
          en: 'I have a book'
        }
      }
    ]
  },
  {
    level: 'A2' as VocabLevel,
    vocab: [
      {
        id: '3',
        infinitiv: { de: 'gehen', fr: 'aller', en: 'to go' },
        conjugation: {
          präsens: 'gehe',
          präteritum: 'ging',
          perfekt: 'gegangen',
          plusquamperfekt: 'war gegangen',
          futurI: 'werde gehen'
        },
        level: 'A2',
        type: 'irregular',
        example: {
          de: 'Ich gehe zur Schule',
          fr: "Je vais à l'école",
          en: 'I go to school'
        }
      }
    ]
  }
];
