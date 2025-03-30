import { useSettingsStore } from './settingsStore';
import { Language } from '@/shared/types/sharedTypes';

type SettingsActions = {
  setLanguage: (language: Language) => void;
};

export const settingsActions: SettingsActions = {
  setLanguage: (language: Language) => {
    useSettingsStore.setState({ language });
  }
};
