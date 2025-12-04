
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

    const isPasswordStrong = password.length >= 6;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!isPasswordStrong) {
            setError("Password must be at least 6 characters long");
            return;
        }

        setLoading(true);

        try {
            const res = await api.post("/auth/signup", { username, email, password });
            const { accessToken, user } = res.data.data;

            setToken(accessToken);
            setUser(user);

            router.push("/");
        } catch (err: any) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-zinc-950 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

            <Card className="w-full max-w-md z-10 bg-zinc-900/80 backdrop-blur-xl border-zinc-800/50 shadow-2xl rounded-3xl overflow-hidden">
                <CardHeader className="space-y-1 text-center pb-8 pt-10">
                    <div className="mx-auto w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/25 rotate-3 hover:rotate-6 transition-transform duration-300">
                        <MessageSquare className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-3xl font-bold tracking-tight text-white">Create an account</CardTitle>
                    <CardDescription className="text-zinc-400 text-base">
                        Get started with your new workspace
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-8 pb-10">
                    <form onSubmit={handleSignup} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-zinc-300 ml-1">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="johndoe"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="bg-zinc-950/50 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-primary focus:ring-primary/20 rounded-xl h-12 px-4 transition-all duration-200 hover:border-zinc-700"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-zinc-300 ml-1">Email</Label>
                            <div className="relative">
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className={`bg-zinc-950/50 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-primary focus:ring-primary/20 rounded-xl h-12 px-4 transition-all duration-200 hover:border-zinc-700 ${email && !isEmailValid ? 'border-red-500/50' : ''}`}
                                />
                                {email && (
                                    <div className="absolute right-3 top-3.5">
                                        {isEmailValid ? <Check className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-red-500" />}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-zinc-300 ml-1">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-zinc-950/50 border-zinc-800 text-white focus:border-primary focus:ring-primary/20 rounded-xl h-12 px-4 transition-all duration-200 hover:border-zinc-700"
                            />
                            {password && (
                                <p className={`text-xs ml-1 ${isPasswordStrong ? 'text-green-500' : 'text-zinc-500'}`}>
                                    {isPasswordStrong ? 'Password strength: Good' : 'Must be at least 6 characters'}
                                </p>
                            )}
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-sm text-red-400 bg-red-950/30 border border-red-900/50 p-4 rounded-xl animate-in fade-in slide-in-from-top-2">
                                <AlertCircle className="h-4 w-4 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-semibold py-6 rounded-xl shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Create Account"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center border-t border-zinc-800/50 py-6 bg-zinc-950/30">
                    <p className="text-sm text-zinc-400">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary hover:text-primary/80 font-semibold transition-colors hover:underline underline-offset-4">
                            Sign In
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
