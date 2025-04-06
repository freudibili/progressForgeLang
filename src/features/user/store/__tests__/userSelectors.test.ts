import { userSelectors } from '../userSelectors';
import { useUserStore } from '../userStore';
import { Language } from '@/shared/types/sharedTypes';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('./__mocks__/asyncStorage')
);

// Mock the Zustand store
const mockUseUserStore = useUserStore as unknown as jest.Mock;

jest.mock('../userStore', () => ({
  useUserStore: jest.fn()
}));

describe('userSelectors', () => {
  const mockState = {
    user: {
      id: '1',
      email: 'test@example.com',
      name: 'Test User'
    },
    statistics: {
      successRate: 75,
      totalAttempts: 100,
      correctAttempts: 75
    },
    preferences: {
      language: Language.English
    }
  };

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    mockUseUserStore.mockImplementation((selector) => selector(mockState));
  });

  describe('useLanguage', () => {
    it('returns user language preference', () => {
      const result = userSelectors.useLanguage();
      expect(result).toBe(Language.English);
    });
  });

  describe('useStatistics', () => {
    it('returns user statistics', () => {
      const result = userSelectors.useStatistics();
      expect(result).toEqual({
        successRate: 75,
        totalAttempts: 100,
        correctAttempts: 75
      });
    });
  });

  describe('useUser', () => {
    it('returns user data', () => {
      const result = userSelectors.useUser();
      expect(result).toEqual({
        id: '1',
        email: 'test@example.com',
        name: 'Test User'
      });
    });
  });
});
