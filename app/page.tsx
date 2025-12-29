"use client";

import { useEffect, useState } from "react";
import MiniAppSDK from "@farcaster/miniapp-sdk";

const sdk = MiniAppSDK; // No 'new'

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const connectQuickAuth = async () => {
    setLoading(true);
    try {
      const session = await (sdk.quickAuth as any).authenticate();
      setUser(session.user);
    } catch (error) {
      console.error("Auth failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (sdk.quickAuth as any)
      .authenticate()
      .then((session: any) => {
        if (session?.user) setUser(session.user);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
      {!user ? (
        <button
          onClick={connectQuickAuth}
          disabled={loading}
          className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-xl shadow-2xl"
        >
          {loading ? "Connecting..." : "Connect Farcaster"}
        </button>
      ) : (
        <div className="text-center p-8 glass rounded-2xl shadow-2xl">
          <img
            src={user.pfp}
            className="w-24 h-24 rounded-full mx-auto mb-4"
            alt="Profile"
          />
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome @{user.username}
          </h1>
          <p className="text-xl text-white/80 mb-4">FID: {user.fid}</p>
          <pre className="bg-white/10 p-4 rounded-lg text-sm text-white/90">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
