# My Farcaster MiniApp (Next.js + TypeScript)

This is a minimal experimental Farcaster Mini App built with Next.js 15 (App Router) and TypeScript. It demonstrates Quick Auth with `@farcaster/miniapp-sdk` and shows connected Farcaster user info (FID, username, profile picture).

Getting started

1. Install dependencies

```bash
npm install
```

2. Run dev server

```bash
npm run dev
# open http://localhost:3000
```

Deploy to Vercel

- Push this repo to GitHub and use Vercel's import flow — no serverless functions required.

Farcaster manifest

Use the included `farcaster.json` as a starting manifest. You can also generate a manifest with Warpcast tools.

Testing in Warpcast client

- Open this app inside Warpcast / the Farcaster MiniApp host to test Quick Auth flows. The demo attempts to auto-detect the MiniApp SDK and call Quick Auth.

Notes

- This demo uses client-side Quick Auth only; no env vars required.
- The SDK API surface may change; the app attempts several common Quick Auth entry points for compatibility.
