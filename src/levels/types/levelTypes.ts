export interface Level {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
}

export type GroupedLevels = Record<string, Level[]>;

export interface LevelState {
  levels: Level[];
  selectedLevel: Level | null;
  isLoading: boolean;
  error: string | null;
}
