import { create } from "zustand";

import { userService } from "../services/userService";
import { User } from "../types";

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  // Actions
  fetchUser: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,

  fetchUser: async (): Promise<void> => {
    try {
      set({ isLoading: true, error: null });
      const user = await userService.fetchUser();
      set({ user, isLoading: false });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch user";
      set({ error: errorMessage, isLoading: false });
    }
  },

  setLoading: (loading: boolean): void => set({ isLoading: loading }),
  setError: (error: string | null): void => set({ error }),
}));
