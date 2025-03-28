export type Language = 'en' | 'fr' | 'de' | 'uk' | 'er' | 'af';

export interface SettingsState {
  language: Language;
}

export interface SettingsStore extends SettingsState {
  setLanguage: (language: Language) => void;
}
