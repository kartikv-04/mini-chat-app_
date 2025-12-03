import { create } from "zustand";
import { api } from "@/lib/api";

interface Workspace {
  id: string;
  name: string;
}

interface WorkspaceState {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;

  fetchWorkspaces: () => Promise<void>;
  setCurrentWorkspace: (ws: Workspace) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  workspaces: [],
  currentWorkspace: null,

  fetchWorkspaces: async () => {
    const res = await api.get("/workspaces");
    set({ workspaces: res.data.data });
  },

  setCurrentWorkspace: (ws) => {
    set({ currentWorkspace: ws });
  },
}));
