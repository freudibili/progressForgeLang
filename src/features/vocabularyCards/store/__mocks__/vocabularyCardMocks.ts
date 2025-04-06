import {
  LevelProgress,
  VocabularyCardState
} from '../../types/vocabularyCardTypes';
import { Level, VocabularyCard } from '@/shared/types/sharedTypes';

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
        de: 'gehen',
        fr: 'aller',
        en: 'go',
        uk: 'йти',
        er: 'ሄድ',
        af: 'ځو',
        ru: 'идти'
      },
      conjugation: {
        präsens: 'gehe',
        präteritum: 'ging',
        perfekt: 'gegangen',
        plusquamperfekt: 'gegangen',
        futurI: 'werde gehen'
      },
      levelId: 'level1',
      type: 'regular',
      example: {
        de: 'Ich gehe zur Schule',
        fr: "Je vais à l'école",
        en: 'I go to school',
        uk: 'Я йду до школи',
        er: 'እወጣ ወደ ትምህርት ቤት',
        af: 'زه ښوونځي ته ځم',
        ru: 'Я иду в школу'
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
        masteryLevel: 2,
        lastAttemptedAt: 1000
      }
    ]
  }
];

export const mockStore: VocabularyCardState = {
  cards: mockCards,
  progress: mockProgress,
  isLoading: false,
  error: null,
  loadCards: jest.fn(),
  markAttempt: jest.fn()
};
