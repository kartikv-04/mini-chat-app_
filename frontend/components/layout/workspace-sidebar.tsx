"use client";

import { useWorkspaceStore } from "@/store/workspace.store";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Plus, Compass } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function WorkspaceSidebar() {
    const workspaces = useWorkspaceStore((state) => state.workspaces);
    const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
    const setCurrentWorkspace = useWorkspaceStore((state) => state.setCurrentWorkspace);
    const createWorkspace = useWorkspaceStore((state) => state.createWorkspace);
    const joinWorkspace = useWorkspaceStore((state) => state.joinWorkspace);

    const [isCreating, setIsCreating] = useState(false);
    const [isJoining, setIsJoining] = useState(false);
    const [newName, setNewName] = useState("");
    const [joinCode, setJoinCode] = useState("");

    const handleCreate = async () => {
        if (!newName.trim()) return;
        await createWorkspace(newName);
        setIsCreating(false);
        setNewName("");
    };

    const handleJoin = async () => {
        if (!joinCode.trim()) return;
        try {
            await joinWorkspace(joinCode);
            setIsJoining(false);
            setJoinCode("");
        } catch (error) {

        }
    };

    return (
        <div className="w-[72px] bg-zinc-950 flex flex-col items-center py-4 space-y-4 border-r border-zinc-800 h-full overflow-y-auto no-scrollbar">
            <TooltipProvider delayDuration={0}>
                {workspaces.map((ws) => (
                    <Tooltip key={ws._id}>
                        <TooltipTrigger asChild>
                            <button
                                onClick={() => setCurrentWorkspace(ws)}
                                className={`relative group flex items-center justify-center w-12 h-12 rounded-[24px] hover:rounded-[16px] transition-all duration-200 ${currentWorkspace?._id === ws._id
                                    ? "bg-primary text-white rounded-[16px]"
                                    : "bg-zinc-800 text-zinc-400 hover:bg-primary hover:text-white"
                                    }`}
                            >
                                {/* Active Indicator */}
                                {currentWorkspace?._id === ws._id && (
                                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                                )}
                                <span className="font-bold text-lg">
                                    {ws.name.charAt(0).toUpperCase()}
                                </span>
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="bg-black text-white border-zinc-800">
                            <p>{ws.name}</p>
                        </TooltipContent>
                    </Tooltip>
                ))}

                <div className="w-8 h-[2px] bg-zinc-800 rounded-full mx-auto" />

                {/* Create Workspace Button */}
                <Dialog open={isCreating} onOpenChange={setIsCreating}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <DialogTrigger asChild>
                                <button className="flex items-center justify-center w-12 h-12 rounded-[24px] bg-zinc-800 text-green-500 hover:bg-green-500 hover:text-white hover:rounded-[16px] transition-all duration-200 group">
                                    <Plus className="h-6 w-6" />
                                </button>
                            </DialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="bg-black text-white border-zinc-800">
                            <p>Add Workspace</p>
                        </TooltipContent>
                    </Tooltip>
                    <DialogContent className="bg-zinc-900 border-zinc-800">
                        <DialogHeader>
                            <DialogTitle className="text-white">Create Workspace</DialogTitle>
                            <DialogDescription className="text-zinc-400">
                                Create a new workspace to start chatting.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                            <Input
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder="Workspace Name"
                                className="bg-zinc-950 border-zinc-800 text-white focus:border-primary"
                            />
                        </div>
                        <DialogFooter>
                            <Button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700 text-white">
                                Create
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Join Workspace Button */}
                <Dialog open={isJoining} onOpenChange={setIsJoining}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <DialogTrigger asChild>
                                <button className="flex items-center justify-center w-12 h-12 rounded-[24px] bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white hover:rounded-[16px] transition-all duration-200 group">
                                    <Compass className="h-6 w-6" />
                                </button>
                            </DialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="bg-black text-white border-zinc-800">
                            <p>Join Workspace</p>
                        </TooltipContent>
                    </Tooltip>
                    <DialogContent className="bg-zinc-900 border-zinc-800">
                        <DialogHeader>
                            <DialogTitle className="text-white">Join Workspace</DialogTitle>
                            <DialogDescription className="text-zinc-400">
                                Enter an invite code to join an existing workspace.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                            <Input
                                value={joinCode}
                                onChange={(e) => setJoinCode(e.target.value)}
                                placeholder="Invite Code"
                                className="bg-zinc-950 border-zinc-800 text-white focus:border-primary"
                            />
                        </div>
                        <DialogFooter>
                            <Button onClick={handleJoin} className="bg-primary hover:bg-primary/90 text-white">
                                Join
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </TooltipProvider>
        </div>
    );
}
