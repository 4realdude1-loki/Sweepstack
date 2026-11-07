// ============================================================
//  SITE CONFIG - the one file to edit for money.
// ============================================================

export const SITE_NAME = 'SweepStack';
export const TAGLINE = 'Every sweeps bonus. Tracked, claimed, cashed.';

// Date the offer data in src/data/casinos.js was last checked.
export const DATA_CHECKED = 'Nov 7, 2026';

// Default CPA estimate (USD) used in Affiliate Mode when you have not
// entered your real deal for a brand.
export const DEFAULT_CPA = 30;

// PASTE YOUR AFFILIATE TRACKING LINKS HERE.
// Key = casino id from src/data/casinos.js. Every "Open Offer" button
// on the live site uses this link first, then falls back to the casino's
// homepage. This is what gets you paid.
//
// Example:
//   'stake-us': 'https://stake.us/?c=YOURCODE',
//   'mcluck':   'https://www.mcluck.com/?ref=YOURID',
export const AFFILIATE_LINKS = {
};
