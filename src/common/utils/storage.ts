import AsyncStorage from '@react-native-async-storage/async-storage';

// Cache for frequently accessed items
const cache = new Map<string, unknown>();

export const storageUtils = {
  getItem: async (name: string) => {
    // Check cache first
    if (cache.has(name)) {
      return cache.get(name);
    }

    try {
      const value = await AsyncStorage.getItem(name);
      if (value) {
        const parsed = JSON.parse(value);
        // Cache the parsed value
        cache.set(name, parsed);
        return parsed;
      }
      return null;
    } catch (error) {
      console.error(`Error reading from storage: ${name}`, error);
      return null;
    }
  },

  setItem: async (name: string, value: unknown) => {
    try {
      await AsyncStorage.setItem(name, JSON.stringify(value));
      // Update cache
      cache.set(name, value);
    } catch (error) {
      console.error(`Error writing to storage: ${name}`, error);
    }
  },

  removeItem: async (name: string) => {
    try {
      await AsyncStorage.removeItem(name);
      // Clear from cache
      cache.delete(name);
    } catch (error) {
      console.error(`Error removing from storage: ${name}`, error);
    }
  },

  // Clear all storage
  clear: async () => {
    try {
      await AsyncStorage.clear();
      cache.clear();
    } catch (error) {
      console.error('Error clearing storage', error);
    }
  }
};
