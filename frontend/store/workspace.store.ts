import { create } from "zustand";
import { api } from "@/lib/api";

interface Workspace {
  _id: string;
  name: string;
  description?: string;
  owner: string;
  members: { _id: string; username: string; email: string; isOnline: boolean }[];
  joinCode?: string;
}

interface WorkspaceState {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;

  fetchWorkspaces: () => Promise<void>;
  setCurrentWorkspace: (ws: Workspace) => void;
  createWorkspace: (name: string) => Promise<Workspace>;
  joinWorkspace: (joinCode: string) => Promise<Workspace>;
}

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  workspaces: [],
  currentWorkspace: null,

  fetchWorkspaces: async () => {
    try {
      const res = await api.get("/workspaces");
      set({ workspaces: res.data.data });
    } catch (error) {
      console.error("Failed to fetch workspaces", error);
    }
  },

  setCurrentWorkspace: (ws) => {
    set({ currentWorkspace: ws });
  },

  createWorkspace: async (name: string) => {
    try {
      const res = await api.post("/workspaces", { name });
      const newWorkspace = res.data.data;
      set((state) => ({
        workspaces: [...state.workspaces, newWorkspace],
        currentWorkspace: newWorkspace
      }));
      return newWorkspace;
    } catch (error: any) {
      console.error("Failed to create workspace:", error.response?.data || error.message);
      throw error;
    }
  },

  joinWorkspace: async (joinCode: string) => {
    try {
      const res = await api.post("/workspaces/join", { code: joinCode });
      const newWorkspace = res.data.data;
      set((state) => ({
        workspaces: [...state.workspaces, newWorkspace],
        currentWorkspace: newWorkspace
      }));
      return newWorkspace;
    } catch (error: any) {
      console.error("Failed to join workspace:", error.response?.data || error.message);
      throw error;
    }
  },
}));
