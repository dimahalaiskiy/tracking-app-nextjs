"use client";

import { useActivityTracker } from "@/hooks/useActivityTracker";
import { TrackingCard } from "@/components/TrackingCard";
import { INACTIVITY_TIMEOUT } from "@/utils/constants";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { user, loading, logout } = useAuth();

  const { lastInteraction } = useActivityTracker({
    onInactive: logout,
    inactivityTimeout: INACTIVITY_TIMEOUT,
  });

  if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;
  
  if (!user) return null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white font-sans">
      <button
        onClick={logout}
        className="absolute top-6 right-6 border border-black text-black px-4 py-2 rounded-lg bg-white hover:bg-black hover:text-white transition-colors font-semibold shadow-sm"
      >
        Logout
      </button>
      <div className="absolute top-6 left-6 text-black font-semibold">
        User: {user.username}
      </div>
      <TrackingCard lastInteraction={lastInteraction} inactive={false} />
    </main>
  );
}
