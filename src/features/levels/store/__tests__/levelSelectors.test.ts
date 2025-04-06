import { levelSelectors } from '../levelSelectors';
import { useLevelStore, State } from '../levelStore';
import { Level } from '@/shared/types/sharedTypes';
import { mockLevels, createMockState } from './mocks';

// Mock React
jest.mock('react', () => ({
  useMemo: (fn: Function) => fn()
}));

// Mock the Zustand store
jest.mock('../levelStore', () => ({
  useLevelStore: jest.fn()
}));

describe('levelSelectors', () => {
  const setupMockStore = (levels: Level[]) => {
    (useLevelStore as unknown as jest.Mock).mockImplementation(
      (selector: (state: State) => unknown) => selector(createMockState(levels))
    );
  };

  it('should group levels by category', () => {
    setupMockStore(mockLevels);
    const groupedLevels = levelSelectors.useLevelsByCategory();

    expect(groupedLevels).toEqual({
      Beginner: [mockLevels[0], mockLevels[1]],
      Intermediate: [mockLevels[2]]
    });
  });

  it('should handle empty levels array', () => {
    setupMockStore([]);
    const groupedLevels = levelSelectors.useLevelsByCategory();
    expect(groupedLevels).toEqual({});
  });

  it('should handle single level', () => {
    setupMockStore([mockLevels[0]]);
    const groupedLevels = levelSelectors.useLevelsByCategory();
    expect(groupedLevels).toEqual({
      Beginner: [mockLevels[0]]
    });
  });

  it('should handle levels with same category', () => {
    const sameCategoryLevels = [mockLevels[0], mockLevels[1]];
    setupMockStore(sameCategoryLevels);
    const groupedLevels = levelSelectors.useLevelsByCategory();
    expect(groupedLevels).toEqual({
      Beginner: sameCategoryLevels
    });
  });
});
