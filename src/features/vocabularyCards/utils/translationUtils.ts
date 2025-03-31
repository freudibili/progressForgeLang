import { Language, VocabularyCard } from '@/shared/types/sharedTypes';
interface Translation {
  infinitiv: string;
  example: string;
}

export const getTranslation = (
  card: VocabularyCard,
  language: Language
): Translation => {
  switch (language) {
    case Language.French: // 'fr'
      return { infinitiv: card.infinitiv.fr, example: card.example.fr };
    case Language.German: // 'de'
      return { infinitiv: card.infinitiv.de, example: card.example.de };
    case Language.English: // 'en'
      return { infinitiv: card.infinitiv.en, example: card.example.en };
    case Language.Ukrainian: // 'uk'
      return { infinitiv: card.infinitiv.uk, example: card.example.uk };
    case Language.Tigrinya: // 'er'
      return { infinitiv: card.infinitiv.er, example: card.example.er };
    case Language.Dari: // 'af'
      return { infinitiv: card.infinitiv.af, example: card.example.af };
    default:
      return { infinitiv: card.infinitiv.de, example: card.example.de };
  }
};
