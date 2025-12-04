"use client";

import { useWorkspaceStore } from "@/store/workspace.store";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Copy, Users, Settings, Shield } from "lucide-react";
import { useState } from "react";

import { useUIStore } from "@/store/ui.store";
import { X } from "lucide-react";

export default function DashboardPane() {
    const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
    const setInfoSidebarOpen = useUIStore((state) => state.setInfoSidebarOpen);
    const [copied, setCopied] = useState(false);

    if (!currentWorkspace) return null;

    const handleCopyCode = () => {
        if (currentWorkspace.joinCode) {
            navigator.clipboard.writeText(currentWorkspace.joinCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="flex flex-col h-full bg-zinc-950 border-l border-zinc-800 relative">
            {/* Header */}
            <div className="h-14 px-4 flex items-center border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-sm flex-shrink-0">
                <h2 className="font-bold text-white">Workspace Info</h2>
                <button
                    onClick={() => setInfoSidebarOpen(false)}
                    className="ml-auto p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>

            <ScrollArea className="flex-1">
                {/* Header Image */}
                <div className="h-32 bg-gradient-to-br from-primary/20 to-zinc-900 relative">
                    <div className="absolute -bottom-6 left-6">
                        <div className="h-16 w-16 rounded-xl bg-zinc-900 border-4 border-zinc-950 flex items-center justify-center shadow-xl">
                            <span className="text-2xl font-bold text-white">
                                {currentWorkspace.name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 px-6 pb-6 space-y-6">
                    <div>
                        <h2 className="text-xl font-bold text-white">{currentWorkspace.name}</h2>
                        <p className="text-sm text-zinc-400 mt-1">
                            {currentWorkspace.description || "No description provided"}
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                Members
                            </h3>
                            <span className="text-xs bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded-full border border-zinc-800">
                                {currentWorkspace.members?.length || 0}
                            </span>
                        </div>

                        <div className="space-y-1">
                            {currentWorkspace.members?.map((member: any) => (
                                <div key={member._id} className="flex items-center gap-2 p-1.5 rounded-md hover:bg-zinc-900/50 transition-colors group">
                                    <Avatar className="h-6 w-6 border border-zinc-800">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.username}`} />
                                        <AvatarFallback className="bg-zinc-800 text-zinc-400 text-[10px]">
                                            {member.username?.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 overflow-hidden">
                                        <p className="text-sm font-medium text-zinc-300 truncate group-hover:text-zinc-200">
                                            {member.username}
                                        </p>
                                    </div>
                                    {member._id === currentWorkspace.owner && (
                                        <Shield className="h-3 w-3 text-amber-500 shrink-0" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <Separator className="bg-zinc-800" />

                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                            <Copy className="h-4 w-4" />
                            Invite Code
                        </h3>
                        <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800 flex items-center justify-between group">
                            <code className="text-sm font-mono text-primary">
                                {currentWorkspace.joinCode}
                            </code>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 text-zinc-400 hover:text-white"
                                onClick={handleCopyCode}
                            >
                                {copied ? (
                                    <span className="text-xs text-green-500 font-medium">Copied</span>
                                ) : (
                                    <Copy className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        <p className="text-xs text-zinc-500">
                            Share this code with others to let them join this workspace.
                        </p>
                    </div>

                    <Separator className="bg-zinc-800" />

                    <Button variant="outline" className="w-full justify-start text-zinc-400 hover:text-white border-zinc-800 hover:bg-zinc-900">
                        <Settings className="h-4 w-4 mr-2" />
                        Workspace Settings
                    </Button>
                </div>
            </ScrollArea>
        </div>
    );
}
