import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types/types";

interface UserState {
  user: User | null;
  isAuth: boolean;
  setUser: (user: User) => void;
  logoutUser: () => void;
}

export const useUserState = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuth: false,
      setUser: (user) =>
        set({
          user,
          isAuth: true,
        }),
      logoutUser: () =>
        set({
          user: null,
          isAuth: false,
        }),
    }),
    {
      name: "user-storage",
    }
  )
);
