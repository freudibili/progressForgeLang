import { Level } from '../types/levelTypes';
import { useLevelStore } from './levelStore';
import { levelService } from '../services/levelService';
import { getErrorMessage } from '@vocabularyCards/utils/errorUtils';

type LevelActions = {
  fetchLevels: () => Promise<void>;
  selectLevel: (level: Level) => void;
  clearSelectedLevel: () => void;
};

export const levelActions: LevelActions = {
  fetchLevels: async () => {
    useLevelStore.setState({ isLoading: true, error: null });
    try {
      const levels = await levelService.getLevels();
      useLevelStore.setState({ levels, isLoading: false });
    } catch (error) {
      useLevelStore.setState({
        error: getErrorMessage(error, 'Failed to fetch levels'), // TODO: Handle error in the service
        isLoading: false
      });
    }
  },

  selectLevel: (level: Level) => {
    useLevelStore.setState({ selectedLevel: level });
  },

  clearSelectedLevel: () => {
    useLevelStore.setState({ selectedLevel: null });
  }
};
