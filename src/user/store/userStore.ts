import { createGenericStore } from "../../common/store/createGenericStore";
import { User } from "../types";

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const useUserStore = createGenericStore<UserState>(initialState);

useUserStore.setState((state) => ({
  ...state,
  setUser: (user: User | null) => useUserStore.setState({ user }),
}));
