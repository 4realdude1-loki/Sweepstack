# SweepStack

The go-to sweepstakes casino bonus tracker. 65+ sweeps casinos, free SC offers, purchase deals, daily streaks, and a personal claim-to-payout tracker. Built to earn affiliate commissions.

## Make money with it

1. Sign up for each casino's affiliate program (or a network that carries them).
2. Paste your tracking links into `src/config.js` under `AFFILIATE_LINKS`, keyed by casino id.
3. Push to GitHub. Vercel redeploys automatically.

Every "Open Offer" and "Collect" button uses your affiliate link first.

## Features

- Offer board: search, filter by bonus type, state, device, and new brands; sort by most free SC, Gold Coins, newest, or A-Z
- Tracker: Active, Claimed, Pending Payout, Paid, Expired, plus notes, value, proof links, reminders, expiration dates, and custom tags
- Daily checklist with streaks, XP, levels, and achievements (with confetti)
- Calendar of reminders and expirations
- Insights: pipeline, bonus mix, claim rate, and value logged
- CSV export, plus a share link that imports a tracked list
- Add your own offers
- Dark/light mode (dark by default), mobile bottom nav, loading skeletons, and a first-run walkthrough
- Affiliate Mode (press `a` or the $ button): estimated CPA per brand, your deal model, CPA sort and filter, and CPA potential
- Keyboard shortcuts: `/` search, `1-5` tabs, `n` add, `t` theme, `a` affiliate mode, `?` help

All user data stays in the browser (localStorage). No backend is needed.

## Run locally

```
npm install
npm run dev
```

## Deploy on Vercel

Import the repo at vercel.com/new. Vercel detects Vite automatically (build: `npm run build`, output: `dist`).

## Update offers

Edit `src/data/casinos.js`, then update `DATA_CHECKED` in `src/config.js`.
