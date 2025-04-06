import { Level, VocabularyCard } from '@/shared/types/sharedTypes';
import {
  LevelProgress,
  VocabularyCardProgress
} from '../../types/vocabularyCardTypes';

export const mockLevels: Level[] = [
  {
    id: 'level1',
    name: 'Level 1',
    description: 'First level',
    url: '/level1',
    category: 'A1'
  },
  {
    id: 'level2',
    name: 'Level 2',
    description: 'Second level',
    url: '/level2',
    category: 'A2'
  },
  {
    id: 'level3',
    name: 'Level 3',
    description: 'Third level',
    url: '/level3',
    category: 'B1'
  }
];

export const mockCards: Record<string, VocabularyCard[]> = {
  level1: [
    {
      id: 'card1',
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
        präteritum: 'tested',
        perfekt: 'has tested',
        plusquamperfekt: 'had tested',
        futurI: 'will test'
      },
      levelId: 'level1',
      type: 'regular',
      example: {
        de: 'Test example',
        fr: 'Exemple de test',
        en: 'Test example',
        uk: 'Тестовий приклад',
        er: 'የሙከራ ምሳሌ',
        af: 'مثال تست',
        ru: 'Тестовый пример'
      }
    },
    {
      id: 'card2',
      infinitiv: {
        de: 'test2',
        fr: 'test2',
        en: 'test2',
        uk: 'тест2',
        er: 'ሙከራ2',
        af: 'تست2',
        ru: 'тест2'
      },
      conjugation: {
        präsens: 'test2',
        präteritum: 'tested2',
        perfekt: 'has tested2',
        plusquamperfekt: 'had tested2',
        futurI: 'will test2'
      },
      levelId: 'level1',
      type: 'regular',
      example: {
        de: 'Test example 2',
        fr: 'Exemple de test 2',
        en: 'Test example 2',
        uk: 'Тестовий приклад 2',
        er: 'የሙከራ ምሳሌ 2',
        af: 'مثال تست 2',
        ru: 'Тестовый пример 2'
      }
    }
  ],
  level2: [
    {
      id: 'card3',
      infinitiv: {
        de: 'test3',
        fr: 'test3',
        en: 'test3',
        uk: 'тест3',
        er: 'ሙከራ3',
        af: 'تست3',
        ru: 'тест3'
      },
      conjugation: {
        präsens: 'test3',
        präteritum: 'tested3',
        perfekt: 'has tested3',
        plusquamperfekt: 'had tested3',
        futurI: 'will test3'
      },
      levelId: 'level2',
      type: 'regular',
      example: {
        de: 'Test example 3',
        fr: 'Exemple de test 3',
        en: 'Test example 3',
        uk: 'Тестовий приклад 3',
        er: 'የሙከራ ምሳሌ 3',
        af: 'مثال تست 3',
        ru: 'Тестовый пример 3'
      }
    }
  ]
};

export const mockProgress: LevelProgress[] = [
  {
    levelId: 'level1',
    vocabProgress: [
      {
        cardId: 'card1',
        correctAttempts: 4,
        incorrectAttempts: 1,
        lastAttemptedAt: Date.now()
      },
      {
        cardId: 'card2',
        correctAttempts: 1,
        incorrectAttempts: 2,
        lastAttemptedAt: Date.now()
      }
    ]
  },
  {
    levelId: 'level2',
    vocabProgress: [
      {
        cardId: 'card3',
        correctAttempts: 5,
        incorrectAttempts: 0,
        lastAttemptedAt: Date.now()
      }
    ]
  }
];
