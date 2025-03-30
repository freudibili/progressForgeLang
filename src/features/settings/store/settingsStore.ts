import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language } from '@/shared/types/sharedTypes';
import { settingsActions } from './settingsActions';
import { storageUtils } from '@/common/utils/storage';

export interface SettingsState {
  language: Language;
  setLanguage: (language: Language) => void;
}

const initialState = {
  language: Language.English
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    () => ({
      ...initialState,
      setLanguage: (language: Language) => settingsActions.setLanguage(language)
    }),
    {
      name: 'settings-storage',
      storage: storageUtils,
      partialize: (state) => ({ language: state.language })
    }
  )
);
