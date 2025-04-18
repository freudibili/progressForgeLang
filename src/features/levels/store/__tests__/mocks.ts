import { Level } from '@/shared/types/sharedTypes';
import { State } from '../levelStore';

export const mockLevels: Level[] = [
  {
    id: '1',
    name: 'Beginner 1',
    description: 'Basic vocabulary',
    category: 'Beginner',
    url: 'beginner-1'
  },
  {
    id: '2',
    name: 'Beginner 2',
    description: 'More basic vocabulary',
    category: 'Beginner',
    url: 'beginner-2'
  },
  {
    id: '3',
    name: 'Intermediate 1',
    description: 'Advanced vocabulary',
    category: 'Intermediate',
    url: 'intermediate-1'
  }
];

export const createMockState = (levels: Level[]): State => ({
  levels,
  currentLevel: null,
  isLoading: false,
  error: null
});
