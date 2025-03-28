export interface Level {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
}

export type GroupedLevels = Record<string, Level[]>;
