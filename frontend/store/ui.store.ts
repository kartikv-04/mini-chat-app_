import { create } from "zustand";

interface UIState {
    isInfoSidebarOpen: boolean;
    toggleInfoSidebar: () => void;
    setInfoSidebarOpen: (isOpen: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
    isInfoSidebarOpen: false, // Hidden by default
    toggleInfoSidebar: () => set((state) => ({ isInfoSidebarOpen: !state.isInfoSidebarOpen })),
    setInfoSidebarOpen: (isOpen) => set({ isInfoSidebarOpen: isOpen }),
}));
