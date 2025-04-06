import { useUserStore } from './userStore';
import { User, UserPreferences, UserStatistics } from '../types/userTypes';

type UserActions = {
  setUser: (user: User | null) => void;
  updateStatistics: (statistics: Partial<UserStatistics>) => void;
  setLanguage: (language: UserPreferences['language']) => void;
};

export const userActions: UserActions = {
  setUser: (user: User | null) => {
    useUserStore.setState({ user });
  },

  updateStatistics: (statistics: Partial<UserStatistics>) => {
    const currentStats = useUserStore.getState().statistics;
    useUserStore.setState({
      statistics: { ...currentStats, ...statistics }
    });
  },

  setLanguage: (language: UserPreferences['language']) => {
    const { preferences } = useUserStore.getState();
    useUserStore.setState({
      preferences: { ...preferences, language }
    });
  }
};
