import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUserItem } from "@/types/user";

interface AuthState {
  accessToken: string | null;
  user: IUserItem | null;
  setToken: (token: string) => void;
  setUser: (user: IUserItem) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      setToken: (token) => set({ accessToken: token }),
      setUser: (user) => set({ user }),
      logout: () => set({ accessToken: null, user: null }),
    }),
    { name: "auth" }
  )
);
