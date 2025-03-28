import { SettingsStore } from '../types/settings.types';

export const selectLanguage = (state: SettingsStore) => state.language;
