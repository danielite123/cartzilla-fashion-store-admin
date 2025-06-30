/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUserItem } from "@/types/user";

interface AuthState {
  accessToken: string | null;
  user: IUserItem | null;
  setToken: (token: string) => void;
  setUser: (user: IUserItem) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  getUser: () => IUserItem | null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      setToken: (token) => set({ accessToken: token }),
      setUser: (user) => set({ user }),
      logout: () => set({ accessToken: null, user: null }),
      isAuthenticated: () => {
        const state = get();
        return !!(state.accessToken && state.user);
      },
      getUser: () => {
        const state = get();
        return state.user;
      },
    }),
    { name: "auth" }
  )
);
