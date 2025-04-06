export enum Language {
  English = 'en',
  French = 'fr',
  German = 'de',
  Ukrainian = 'uk',
  Tigrinya = 'er',
  Dari = 'af',
  Russian = 'ru'
}

export interface Level {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
}

export interface VocabularyCard {
  id: string;
  infinitiv: {
    de: string;
    fr: string;
    en: string;
    uk: string;
    er: string;
    af: string;
    ru: string;
  };
  conjugation: {
    präsens: string;
    präteritum: string;
    perfekt: string;
    plusquamperfekt: string;
    futurI: string;
  };
  levelId: string;
  type: 'regular' | 'irregular';
  example: {
    de: string;
    fr: string;
    en: string;
    uk: string;
    er: string;
    af: string;
    ru: string;
  };
}

export interface CardProgress {
  cardId: string;
  correctAttempts: number;
  incorrectAttempts: number;
  masteryLevel?: number;
}
