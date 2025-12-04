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
  fetchUser: () => Promise<void>;
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

  fetchUser: async () => {
    try {
      const { api } = require("@/lib/api");
      const res = await api.get("/auth/me");
      set({ user: res.data.data });
    } catch (error) {
      console.error("Failed to fetch user:", error);
      // If fetch fails (e.g. 401), logout
      set({ token: null, user: null });
      localStorage.removeItem("accessToken");
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    set({ token: null, user: null });
  },
}));
