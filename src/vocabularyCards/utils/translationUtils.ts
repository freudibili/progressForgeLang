import { VocabularyCard } from '../types/vocabTypes';

import { Language } from '@/settings/types/settings.types';

interface Translation {
  infinitiv: string;
  example: string;
}

export const getTranslation = (
  card: VocabularyCard,
  language: Language
): Translation => {
  switch (language) {
    case 'fr':
      return { infinitiv: card.infinitiv.fr, example: card.example.fr };
    case 'en':
      return { infinitiv: card.infinitiv.en, example: card.example.en };
    case 'uk':
      return { infinitiv: card.infinitiv.uk, example: card.example.uk };
    case 'er':
      return { infinitiv: card.infinitiv.er, example: card.example.er };
    case 'af':
      return { infinitiv: card.infinitiv.af, example: card.example.af };
    default:
      return { infinitiv: card.infinitiv.de, example: card.example.de };
  }
};
