import { Language } from '@/shared/types/sharedTypes';

interface LanguageConfig {
  label: string;
  value: Language;
  nativeName: string; // Name of the language in its own script
}

export const LANGUAGES: LanguageConfig[] = [
  { label: 'English', value: Language.English, nativeName: 'English' },
  { label: 'Français', value: Language.French, nativeName: 'Français' },
  { label: 'Українська', value: Language.Ukrainian, nativeName: 'Українська' },
  { label: 'Tigrinya', value: Language.Tigrinya, nativeName: 'ትግርኛ' },
  { label: 'Dari', value: Language.Dari, nativeName: 'دری' },
  { label: 'Русский', value: Language.Russian, nativeName: 'Русский' }
];

export const getLanguageLabel = (value: Language): string => {
  const language = LANGUAGES.find((lang) => lang.value === value);
  return language?.label ?? 'Unknown';
};

export const getLanguageNativeName = (value: Language): string => {
  const language = LANGUAGES.find((lang) => lang.value === value);
  return language?.nativeName ?? 'Unknown';
};
