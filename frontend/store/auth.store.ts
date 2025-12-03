import { create } from "zustand";

interface AuthState {
  token: string | null;
  user: {
    _id: string;
    email: string;
    username: string;
  } | null;

  setToken: (token: string) => void;
  setUser: (user: { _id: string; email: string; username: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
  user: null,

  setToken: (token) => {
    localStorage.setItem("accessToken", token);
    set({ token });
  },

  setUser: (user) => {
    set({ user });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    set({ token: null, user: null });
  },
}));
