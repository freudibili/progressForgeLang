import { UserState, useUserStore } from './userStore';

export const userSelectors = {
  useLanguage: () => {
    return useUserStore((state: UserState) => state.preferences.language);
  },

  useStatistics: () => {
    return useUserStore((state: UserState) => state.statistics);
  },

  useUser: () => {
    return useUserStore((state: UserState) => state.user);
  }
};
