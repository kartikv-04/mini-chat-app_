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
            {/* Close Button */}
            <button
                onClick={() => setInfoSidebarOpen(false)}
                className="absolute top-4 right-4 z-10 p-1 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
            >
                <X className="h-4 w-4" />
            </button>

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

            {/* Workspace Info */}
            <div className="mt-8 px-6">
                <h2 className="text-xl font-bold text-white mb-1">{currentWorkspace.name}</h2>
                <div className="flex items-center gap-2 text-sm text-zinc-400 mb-6">
                    <Shield className="h-3 w-3" />
                    <span>Private Workspace</span>
                </div>

                {/* Join Code */}
                <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800 mb-6">
                    <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Invite Code</p>
                    <div className="flex items-center gap-2">
                        <code className="flex-1 bg-black/20 rounded px-2 py-1 text-sm font-mono text-zinc-300">
                            {currentWorkspace.joinCode || "NO-CODE"}
                        </code>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 hover:bg-zinc-800 hover:text-white"
                            onClick={handleCopyCode}
                        >
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                    {copied && <p className="text-xs text-green-500 mt-2">Copied to clipboard!</p>}
                </div>

                <Separator className="bg-zinc-800 mb-6" />

                {/* Members */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-zinc-400 flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Members
                        </h3>
                        <span className="text-xs bg-zinc-900 text-zinc-500 px-2 py-0.5 rounded-full">
                            {currentWorkspace.members?.length || 0}
                        </span>
                    </div>

                    <ScrollArea className="h-[calc(100vh-400px)]">
                        <div className="space-y-3">
                            {currentWorkspace.members?.map((member: any) => (
                                <div key={member._id} className="flex items-center gap-3 group">
                                    <div className="relative">
                                        <Avatar className="h-8 w-8 border border-zinc-800">
                                            <AvatarFallback className="bg-zinc-900 text-zinc-400 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                                                {member.username?.charAt(0).toUpperCase() || "?"}
                                            </AvatarFallback>
                                        </Avatar>
                                        {member.isOnline && (
                                            <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-zinc-950" />
                                        )}
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <p className="text-sm font-medium text-zinc-300 truncate group-hover:text-white transition-colors">
                                            {member.username}
                                        </p>
                                        <p className="text-xs text-zinc-500 truncate">
                                            {member.email}
                                        </p>
                                    </div>
                                    {currentWorkspace.owner === member._id && (
                                        <Shield className="h-3 w-3 text-amber-500" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}
