"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { useWorkspaceStore } from "@/store/workspace.store";
import Hero from "@/components/onboarding/hero";
import MainLayout from "@/components/layout/main-layout";
import { Loader2 } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const fetchWorkspaces = useWorkspaceStore((state) => state.fetchWorkspaces);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (!token) {
      router.push("/login");
      return;
    }

    const init = async () => {
      try {
        // Fetch user profile if not already loaded (or on refresh)
        if (!user) {
          await useAuthStore.getState().fetchUser();
        }
        await fetchWorkspaces();
      } catch (error) {

      } finally {
        setLoading(false);
      }
    };

    init();
  }, [token, router, fetchWorkspaces, user, mounted]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) return null;

  if (!token) return null;

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-zinc-950 text-white">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Show onboarding if no workspaces
  if (workspaces.length === 0) {
    return <Hero />;
  }

  // Always show the Main App Layout. Empty states are handled within the layout components.
  return <MainLayout />;
}
