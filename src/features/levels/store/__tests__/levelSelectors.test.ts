import { levelSelectors } from '../levelSelectors';
import { useLevelStore } from '../levelStore';
import { Level, LevelState } from '../../types/levelTypes';
import { mockLevels, createMockState } from './mocks';

// Mock the Zustand store
jest.mock('../levelStore', () => ({
  useLevelStore: jest.fn()
}));

describe('levelSelectors', () => {
  const setupMockStore = (levels: Level[]) => {
    (useLevelStore as unknown as jest.Mock).mockImplementation(
      (selector: (state: LevelState) => unknown) =>
        selector(createMockState(levels))
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
