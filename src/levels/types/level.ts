export interface Level {
  id: string;
  name: string;
  description: string;
}

export interface LevelState {
  levels: Level[];
  selectedLevel: Level | null;
  isLoading: boolean;
  error: string | null;
  fetchLevels: () => Promise<void>;
  selectLevel: (level: Level) => void;
  clearSelectedLevel: () => void;
}
