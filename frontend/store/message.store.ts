import { create } from "zustand";
import { api } from "@/lib/api";

interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    username: string;
    email: string;
  };
  createdAt: string;
  isEdited?: boolean;
}

interface MessageState {
  messages: Message[];

  fetchMessages: (channelId: string, page?: number) => Promise<void>;
  addMessage: (msg: Message) => void;
  clearMessages: () => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],

  fetchMessages: async (channelId, page = 1) => {
    const res = await api.get(`/messages/channel/${channelId}?page=${page}`);
    set({ messages: res.data.data });
  },

  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, msg],
    })),

  clearMessages: () => set({ messages: [] }),
}));
