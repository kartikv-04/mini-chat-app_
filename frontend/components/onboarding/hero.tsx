"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useWorkspaceStore } from "@/store/workspace.store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, ArrowRight, Rocket, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Hero() {
    const user = useAuthStore((state) => state.user);
    const createWorkspace = useWorkspaceStore((state) => state.createWorkspace);
    const joinWorkspace = useWorkspaceStore((state) => state.joinWorkspace);
    const router = useRouter();

    const [isCreating, setIsCreating] = useState(false);
    const [isJoining, setIsJoining] = useState(false);
    const [newWorkspaceName, setNewWorkspaceName] = useState("");
    const [joinCode, setJoinCode] = useState("");
    const [error, setError] = useState("");

    const handleCreate = async () => {
        if (!newWorkspaceName.trim()) return;
        setIsCreating(true);
        setError("");
        try {
            await createWorkspace(newWorkspaceName);
            // Store updates automatically, parent component will switch view
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to create workspace");
        } finally {
            setIsCreating(false);
        }
    };

    const handleJoin = async () => {
        if (!joinCode.trim()) return;
        setIsJoining(true);
        setError("");
        try {
            await joinWorkspace(joinCode);
            // Store updates automatically, parent component will switch view
        } catch (err: any) {
            setError(err.response?.data?.message || "Invalid join code");
        } finally {
            setIsJoining(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-zinc-950 relative overflow-hidden p-4">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

            <Card className="w-full max-w-2xl bg-zinc-900/80 backdrop-blur-xl border-zinc-800 shadow-2xl relative z-10">
                <CardHeader className="text-center space-y-4 pb-8">
                    <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 animate-bounce-slow">
                        <Rocket className="w-10 h-10 text-primary" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-white">Welcome, {user?.username || "Traveler"}!</CardTitle>
                    <CardDescription className="text-lg text-zinc-400 max-w-lg mx-auto">
                        You aren&apos;t part of any workspaces yet. Let&apos;s get you settled in so you can start collaborating.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6 p-8 pt-0">
                    {/* Option A: Create Workspace */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <button className="group flex flex-col items-center justify-center p-8 rounded-xl border border-zinc-800 bg-zinc-950/50 hover:bg-zinc-900 hover:border-primary/50 transition-all duration-300 text-center space-y-4 h-full">
                                <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-zinc-800 group-hover:border-primary">
                                    <Plus className="w-8 h-8 text-zinc-400 group-hover:text-primary transition-colors" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">Create a Workspace</h3>
                                    <p className="text-sm text-zinc-400">Set up a new space for your team or friends.</p>
                                </div>
                            </button>
                        </DialogTrigger>
                        <DialogContent className="bg-zinc-900 border-zinc-800 sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle className="text-white">Create Workspace</DialogTitle>
                                <DialogDescription className="text-zinc-400">
                                    Give your new workspace a name. You can invite others later.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Input
                                        id="name"
                                        placeholder="Acme Corp"
                                        value={newWorkspaceName}
                                        onChange={(e) => setNewWorkspaceName(e.target.value)}
                                        className="bg-zinc-950 border-zinc-800 focus:border-primary"
                                    />
                                </div>
                                {error && <p className="text-sm text-red-500">{error}</p>}
                            </div>
                            <DialogFooter>
                                <Button onClick={handleCreate} disabled={isCreating} className="bg-primary hover:bg-primary/90 text-white">
                                    {isCreating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Workspace"}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    {/* Option B: Join via Code */}
                    <div className="flex flex-col items-center justify-center p-8 rounded-xl border border-zinc-800 bg-zinc-950/50 space-y-4 h-full">
                        <div className="w-full space-y-4">
                            <div className="text-center">
                                <h3 className="text-xl font-semibold text-white mb-2">Join via Code</h3>
                                <p className="text-sm text-zinc-400">Have an invite code? Enter it here.</p>
                            </div>
                            <div className="flex gap-2 w-full">
                                <Input
                                    placeholder="Enter code..."
                                    value={joinCode}
                                    onChange={(e) => setJoinCode(e.target.value)}
                                    className="bg-zinc-900 border-zinc-800 focus:border-primary"
                                />
                                <Button
                                    size="icon"
                                    onClick={handleJoin}
                                    disabled={isJoining}
                                    className="bg-primary hover:bg-primary/90 text-white shrink-0"
                                >
                                    {isJoining ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                                </Button>
                            </div>
                            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
