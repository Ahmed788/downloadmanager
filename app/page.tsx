"use client";

import React, { useEffect, useState } from 'react';
import '../app/globals.css';

type FarcasterUser = {
  fid?: string | number;
  username?: string;
  displayName?: string;
  pfp?: string;
};

export default function Page() {
  const [sdk, setSdk] = useState<any>(null);
  const [jwt, setJwt] = useState<string | null>(null);
  const [user, setUser] = useState<FarcasterUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Auto-detect SDK exposed by the host or load package dynamically
    const detected = (window as any).farcasterMiniapp || (window as any).FarcasterMiniApp;
    if (detected) {
      setSdk(detected);
    } else {
      // Try to lazy-import the SDK for local dev (it will be a no-op outside a host)
      import('@farcaster/miniapp-sdk')
        .then((mod) => {
          setSdk((mod as any).default || mod);
        })
        .catch(() => {
          // silently fail; SDK usually comes from host in Warpcast
        });
    }
  }, []);

  const quickAuth = async () => {
    setError(null);
    setLoading(true);
    try {
      if (!sdk) throw new Error('MiniApp SDK not detected. Open in Warpcast or a MiniApp host.');

      // Try several common Quick Auth entry points to be compatible across SDK versions
      let result: any = null;
      if (typeof sdk.quickAuth === 'function') {
        result = await sdk.quickAuth();
      } else if (sdk.auth && typeof sdk.auth.quickAuth === 'function') {
        result = await sdk.auth.quickAuth();
      } else if (typeof sdk.connect === 'function') {
        result = await sdk.connect();
      } else {
        throw new Error('No Quick Auth method found on SDK.');
      }

      // Normalize result
      const token = typeof result === 'string' ? result : result?.token || result?.jwt;
      const maybeUser = result?.user || result?.account || result?.me || null;
      if (token) setJwt(token);
      if (maybeUser) setUser(maybeUser);

      // If SDK exposes a getProfile-style method, try to fetch details
      if (!maybeUser && typeof sdk.getProfile === 'function') {
        try {
          const prof = await sdk.getProfile();
          setUser(prof);
        } catch (_) {}
      }

    } catch (e: any) {
      setError(e?.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="flex items-center gap-4 mb-4">
        <img src="/icon.png" alt="app icon" className="w-14 h-14 rounded-lg" />
        <div>
          <h1 className="text-2xl font-semibold">Farcaster Quick Auth Demo</h1>
          <p className="text-sm text-slate-600">Auto-detects MiniApp context and performs Quick Auth</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center">
              <img
                src={user?.pfp || '/icon.png'}
                alt="profile"
                className="avatar"
                onError={(e) => ((e.target as HTMLImageElement).src = '/icon.png')}
              />
            </div>
            <div>
              <div className="text-lg font-medium">{user?.displayName || user?.username || 'Guest'}</div>
              <div className="text-sm text-slate-500">FID: {user?.fid ?? '—'}</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="min-w-[140px]">
            <button
              className="w-full py-2 px-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-semibold hover:opacity-95"
              onClick={quickAuth}
              disabled={loading}
            >
              {loading ? 'Connecting...' : jwt ? 'Connected' : 'Quick Auth'}
            </button>
          </div>
          {loading && <div className="spinner" aria-hidden />}
        </div>
      </div>

      <div className="mt-6">
        {error && <div className="text-red-600">Error: {error}</div>}

        {!error && (
          <div className="mt-4 text-sm text-slate-700">
            <div className="mb-2">Status: <strong>{jwt ? 'Connected' : 'Not connected'}</strong></div>
            {jwt && (
              <div className="bg-slate-50 p-3 rounded-md overflow-auto text-xs break-all">
                <div className="font-semibold mb-1">JWT Token (truncated)</div>
                <div>{jwt.slice(0, 120)}{jwt.length > 120 ? '…' : ''}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
