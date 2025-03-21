import { create } from "zustand";

interface GenericState {
  isLoading: boolean;
  error: string | null;
}

interface GenericActions {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const createGenericStore = <T extends object>(initialState: T) => {
  type CombinedState = T & GenericState;
  type CombinedActions = GenericActions;

  return create<CombinedState & CombinedActions>((set) => ({
    // Initial state
    ...initialState,
    isLoading: false,
    error: null,
    // Generic actions
    setLoading: (loading: boolean) =>
      set((state) => ({ ...state, isLoading: loading })),
    setError: (error: string | null) => set((state) => ({ ...state, error })),
    clearError: () => set((state) => ({ ...state, error: null })),
  }));
};
