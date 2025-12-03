"use client";

import { useEffect } from "react";
import { useWorkspaceStore } from "@/store/workspace.store";
import { useChannelStore } from "@/store/channel.store";
import { useAuthStore } from "@/store/auth.store";
import { useUIStore } from "@/store/ui.store";
import {
    Hash,
    LogOut,
    ChevronDown,
    MessageSquare,
    Mic,
    Headphones
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";

export default function Sidebar() {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const toggleInfoSidebar = useUIStore((state) => state.toggleInfoSidebar);

    const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);

    const channels = useChannelStore((state) => state.channels);
    const currentChannel = useChannelStore((state) => state.currentChannel);
    const fetchChannels = useChannelStore((state) => state.fetchChannels);
    const setCurrentChannel = useChannelStore((state) => state.setCurrentChannel);

    useEffect(() => {
        if (currentWorkspace) {
            fetchChannels(currentWorkspace._id);
        }
    }, [currentWorkspace, fetchChannels]);

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <div className="flex flex-col h-full bg-zinc-950 text-zinc-400 border-r border-zinc-800">
            {/* Workspace Header */}
            <div
                onClick={toggleInfoSidebar}
                className="h-12 px-4 flex items-center justify-between border-b border-zinc-950 shadow-sm bg-zinc-900 cursor-pointer hover:bg-zinc-800 transition-colors"
            >
                <h2 className="font-bold text-white truncate">{currentWorkspace?.name || "Select Workspace"}</h2>
                <ChevronDown className="h-4 w-4 text-zinc-400" />
            </div>

            {/* Channel List */}
            <ScrollArea className="flex-1 px-2 py-4">
                {currentWorkspace ? (
                    <div className="space-y-4">
                        <div>
                            <div className="px-2 mb-2 flex items-center justify-between group">
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 group-hover:text-zinc-400 transition-colors">
                                    Text Channels
                                </h3>
                            </div>
                            <div className="space-y-0.5">
                                {channels.map((channel) => (
                                    <button
                                        key={channel._id}
                                        onClick={() => setCurrentChannel(channel)}
                                        className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md transition-all duration-200 group ${currentChannel?._id === channel._id
                                            ? "bg-zinc-800 text-white"
                                            : "hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-300"
                                            }`}
                                    >
                                        <Hash className={`h-4 w-4 shrink-0 ${currentChannel?._id === channel._id ? "text-zinc-400" : "text-zinc-500 group-hover:text-zinc-400"
                                            }`} />
                                        <span className="truncate font-medium">{channel.name}</span>
                                    </button>
                                ))}
                                {channels.length === 0 && (
                                    <div className="px-2 py-4 text-center">
                                        <p className="text-xs text-zinc-600 mb-2">No channels yet</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center px-4 opacity-50">
                        <MessageSquare className="h-12 w-12 mb-4 text-zinc-600" />
                        <p className="text-sm">Select or create a workspace to see channels.</p>
                    </div>
                )}
            </ScrollArea>

            {/* User Footer */}
            <div className="p-2 bg-[#0c0c0e] border-t border-zinc-900">
                <div className="flex items-center gap-2 p-1.5 rounded-md hover:bg-zinc-800/50 transition-colors group">
                    <Popover>
                        <PopoverTrigger asChild>
                            <button className="flex items-center gap-2 flex-1 outline-none text-left">
                                <div className="relative">
                                    <Avatar className="h-8 w-8 border border-zinc-800">
                                        <AvatarFallback className="bg-primary/20 text-primary font-medium text-xs">
                                            {user?.username?.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-[#0c0c0e]" />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-xs font-bold text-white truncate group-hover:text-zinc-200 transition-colors">
                                        {user?.username}
                                    </p>
                                    <p className="text-[10px] text-zinc-500 truncate">Online</p>
                                </div>
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-60 bg-zinc-900 border-zinc-800 p-2 mb-2" side="top" align="start">
                            <Button
                                variant="destructive"
                                className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-950/30 h-8 text-xs"
                                onClick={handleLogout}
                            >
                                <LogOut className="h-3 w-3 mr-2" />
                                Log Out
                            </Button>
                        </PopoverContent>
                    </Popover>

                    <div className="flex items-center">
                        <button className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors">
                            <Mic className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors">
                            <Headphones className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
