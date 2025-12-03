import { create } from "zustand";
import { api } from "@/lib/api";

interface Channel {
  id: string;
  name: string;
  description?: string;
}

interface ChannelState {
  channels: Channel[];
  currentChannel: Channel | null;

  fetchChannels: (workspaceId: string) => Promise<void>;
  setCurrentChannel: (channel: Channel) => void;
}

export const useChannelStore = create<ChannelState>((set) => ({
  channels: [],
  currentChannel: null,

  fetchChannels: async (workspaceId) => {
    const res = await api.get(`/channels/${workspaceId}`);
    set({ channels: res.data.data });
  },

  setCurrentChannel: (channel) => set({ currentChannel: channel }),
}));
