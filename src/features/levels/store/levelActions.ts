import { useLevelStore } from './levelStore';
import { levelService } from '../services/levelService';
import { Level } from '@/shared/types/sharedTypes';

type LevelActions = {
  loadLevels: () => Promise<void>;
  selectLevel: (level: Level) => void;
};

export const levelActions: LevelActions = {
  loadLevels: async () => {
    useLevelStore.setState({ isLoading: true, error: null });
    const { data, error } = await levelService.getLevels();

    if (data && !error) {
      useLevelStore.setState({
        levels: data,
        isLoading: false
      });
    } else {
      useLevelStore.setState({
        error,
        isLoading: false
      });
    }
  },

  selectLevel: (level: Level) => {
    useLevelStore.setState({ currentLevel: level });
  }
};
