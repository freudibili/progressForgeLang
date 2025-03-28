import { Language } from '../types/settings.types';

interface LanguageConfig {
  label: string;
  value: Language;
  nativeName: string; // Name of the language in its own script
}

export const LANGUAGES: LanguageConfig[] = [
  { label: 'English', value: 'en', nativeName: 'English' },
  { label: 'Français', value: 'fr', nativeName: 'Français' },
  { label: 'Українська', value: 'uk', nativeName: 'Українська' },
  { label: 'Tigrinya', value: 'er', nativeName: 'ትግርኛ' },
  { label: 'Dari', value: 'af', nativeName: 'دری' }
];

export const getLanguageLabel = (value: Language): string => {
  const language = LANGUAGES.find((lang) => lang.value === value);
  return language?.label ?? 'Unknown';
};

export const getLanguageNativeName = (value: Language): string => {
  const language = LANGUAGES.find((lang) => lang.value === value);
  return language?.nativeName || 'Unknown';
};
