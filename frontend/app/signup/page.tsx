
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Check, Loader2, MessageSquare, X } from "lucide-react";
import { api } from "@/lib/api";

export default function SignupPage() {
    const router = useRouter();
    const setToken = useAuthStore((state) => state.setToken);
    const setUser = useAuthStore((state) => state.setUser);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Simple password strength check
    const isPasswordStrong = password.length >= 6;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!isPasswordStrong) {
            setError("Password must be at least 6 characters long");
            return;
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-zinc-950 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <Card className="w-full max-w-md z-10 bg-zinc-900 border-zinc-800 shadow-xl">
                <CardHeader className="space-y-1 text-center pb-8">
                    <div className="mx-auto w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
                        <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight text-white">Create an account</CardTitle>
                    <CardDescription className="text-zinc-400">
                        Get started with your new workspace
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSignup} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-zinc-300">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="johndoe"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-primary focus:ring-primary/20"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-zinc-300">Email</Label>
                            <div className="relative">
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className={`bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-primary focus:ring-primary/20 ${email && !isEmailValid ? 'border-red-500/50' : ''}`}
                                />
                                {email && (
                                    <div className="absolute right-3 top-2.5">
                                        {isEmailValid ? <Check className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-red-500" />}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-zinc-300">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-zinc-950 border-zinc-800 text-white focus:border-primary focus:ring-primary/20"
                            />
                            {password && (
                                <p className={`text-xs ${isPasswordStrong ? 'text-green-500' : 'text-zinc-500'}`}>
                                    {isPasswordStrong ? 'Password strength: Good' : 'Must be at least 6 characters'}
                                </p>
                            )}
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-sm text-red-400 bg-red-950/30 border border-red-900/50 p-3 rounded-md">
                                <AlertCircle className="h-4 w-4 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-5"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Create Account"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center border-t border-zinc-800 pt-6">
                    <p className="text-sm text-zinc-400">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                            Sign In
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
