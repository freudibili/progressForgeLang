import { create } from 'zustand';
import { SettingsState, SettingsStore } from '../types/settings.types';

const initialState: SettingsState = {
  language: 'en'
};

export const useSettingsStore = create<SettingsStore>((set) => ({
  ...initialState,
  setLanguage: (language) => set({ language })
}));
