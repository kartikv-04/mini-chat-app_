"use client";

import { useEffect } from "react";
import Sidebar from "./sidebar";
import WorkspaceSidebar from "./workspace-sidebar";
import ChatPane from "./chat-pane";
import DashboardPane from "./dashboard-pane";
import { useWorkspaceStore } from "@/store/workspace.store";
import { useChannelStore } from "@/store/channel.store";

import { useUIStore } from "@/store/ui.store";

export default function MainLayout() {
    const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
    const workspaces = useWorkspaceStore((state) => state.workspaces);
    const setCurrentWorkspace = useWorkspaceStore((state) => state.setCurrentWorkspace);
    const isInfoSidebarOpen = useUIStore((state) => state.isInfoSidebarOpen);

    // Set initial workspace if none selected
    useEffect(() => {
        if (!currentWorkspace && workspaces.length > 0) {
            setCurrentWorkspace(workspaces[0]);
        }
    }, [currentWorkspace, workspaces, setCurrentWorkspace]);

    if (!currentWorkspace) return null;

    return (
        <div className="flex h-screen w-full bg-zinc-950 overflow-hidden">
            {/* Column 1: Navigation Rail (Workspaces) */}
            <WorkspaceSidebar />

            {/* Column 2: Channel Sidebar */}
            <div className="w-[240px] flex-shrink-0 border-r border-zinc-800 bg-zinc-900">
                <Sidebar />
            </div>

            {/* Column 3: Chat Feed (Main Area) */}
            <div className="flex-1 flex flex-col min-w-0 bg-zinc-950">
                <ChatPane />
            </div>

            {/* Column 4: Info Sidebar */}
            {isInfoSidebarOpen && (
                <div className="w-[280px] flex-shrink-0 border-l border-zinc-800 bg-zinc-950">
                    <DashboardPane />
                </div>
            )}
        </div>
    );
}
