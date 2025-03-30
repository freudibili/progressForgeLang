import { useSettingsStore, SettingsState } from './settingsStore';
import { Language } from '@/shared/types/sharedTypes';

export const settingsSelectors = {
  useLanguage: () =>
    useSettingsStore((state: SettingsState) => state.language as Language)
};
