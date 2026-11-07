// ============================================================
//  CASINO DATA
//  Offers change often. Re-check each brand on its site and update
//  DATA_CHECKED in src/config.js when you do.
//  Fields:
//    id          unique slug (used as the key in AFFILIATE_LINKS)
//    name        display name
//    color       brand accent color for the card logo
//    url         homepage (fallback when no affiliate link is set)
//    noDeposit   free sign-up offer text
//    freeSC      free Sweeps Coins on sign-up (number) or null if unknown
//    purchase    first-purchase deal text
//    code        promo code (if any)
//    types       bonus types (see BONUS_TYPES below)
//    devices     'web' | 'ios' | 'android'
//    restricted  states where the brand is not available (typical list -
//                always check the brand's terms)
//    isNew       launched 2025-2026
//    verified    true = offer text confirmed from published lists Nov 2026
// ============================================================

export const BONUS_TYPES = {
  'no-deposit':     { label: 'No Deposit',     color: '#22c55e' },
  'first-purchase': { label: 'First Purchase', color: '#7c5cff' },
  'daily':          { label: 'Daily Login',    color: '#f59e0b' },
  'cashback':       { label: 'Cashback',       color: '#06b6d4' },
  'tournament':     { label: 'Tournaments',    color: '#ec4899' },
  'sportsbook':     { label: 'Sports',         color: '#3b82f6' },
  'crypto':         { label: 'Crypto',         color: '#eab308' },
};

// Most sweepstakes casinos are blocked in these states. Check each brand.
const STD = ['WA', 'ID', 'NV', 'MI', 'CA', 'NY', 'NJ', 'CT', 'MT'];

const search = (n) =>
  `https://www.google.com/search?q=${encodeURIComponent(n + ' sweepstakes casino official site')}`;

const c = (o) => ({
  types: ['no-deposit', 'daily'],
  devices: ['web'],
  restricted: STD,
  freeSC: null,
  gc: null,
  code: '',
  purchase: '',
  notes: '',
  isNew: false,
  verified: false,
  ...o,
  url: o.url || search(o.name),
});

export const CASINOS = [
  c({ id: 'stake-us', name: 'Stake.us', color: '#1475e1', url: 'https://stake.us', noDeposit: '250,000 GC + $25 Stake Cash', freeSC: 25, gc: 250000, types: ['no-deposit', 'daily', 'cashback', 'crypto'], notes: 'Stake Cash is spread out over your first days. Rakeback and weekly boosts.', verified: true }),
  c({ id: 'crown-coins', name: 'Crown Coins', color: '#f5b301', url: 'https://crowncoinscasino.com', noDeposit: '100,000 CC + 2 SC', freeSC: 2, gc: 100000, purchase: '200% more coins on first purchase', types: ['no-deposit', 'first-purchase', 'daily'], verified: true }),
  c({ id: 'mcluck', name: 'McLuck', color: '#ff4d6d', url: 'https://www.mcluck.com', noDeposit: '7,500 GC + 2.5 SC', freeSC: 2.5, gc: 7500, purchase: 'Big first-purchase pack with bonus SC + free spins', types: ['no-deposit', 'first-purchase', 'daily'], verified: true }),
  c({ id: 'pulsz', name: 'Pulsz', color: '#8b5cf6', url: 'https://www.pulsz.com', noDeposit: '5,000 GC + free SC on sign-up', freeSC: 2.3, gc: 5000, devices: ['web', 'ios', 'android'], types: ['no-deposit', 'first-purchase', 'daily'], verified: true }),
  c({ id: 'chumba', name: 'Chumba Casino', color: '#e11d48', url: 'https://www.chumbacasino.com', noDeposit: 'Up to 2,000,000 GC + 2 SC', freeSC: 2, gc: 2000000, types: ['no-deposit', 'first-purchase', 'daily'], verified: true }),
  c({ id: 'luckyland', name: 'LuckyLand Slots', color: '#10b981', url: 'https://www.luckylandslots.com', noDeposit: '7,777 GC + 10 SC', freeSC: 10, gc: 7777, types: ['no-deposit', 'first-purchase', 'daily'], verified: true }),
  c({ id: 'wow-vegas', name: 'WOW Vegas', color: '#a855f7', url: 'https://www.wowvegas.com', noDeposit: 'Up to 250,000 WOW Coins + 5 SC', freeSC: 5, gc: 250000, types: ['no-deposit', 'first-purchase', 'daily'], verified: true }),
  c({ id: 'realprize', name: 'RealPrize', color: '#f97316', url: 'https://www.realprize.com', noDeposit: '100,000 GC + 2 SC, no code needed', freeSC: 2, gc: 100000, purchase: 'First-purchase pack with bonus SC + VIP points', types: ['no-deposit', 'first-purchase', 'daily'], verified: true }),
  c({ id: 'lonestar', name: 'LoneStar Casino', color: '#dc2626', url: 'https://www.lonestarcasino.com', noDeposit: '100,000 GC + 2.5 SC', freeSC: 2.5, gc: 100000, types: ['no-deposit', 'first-purchase', 'daily'], verified: true }),
  c({ id: 'mega-bonanza', name: 'Mega Bonanza', color: '#facc15', url: 'https://www.megabonanza.com', noDeposit: 'Free GC + SC on sign-up', purchase: '80,000 GC + 30 SC + 30 spins for $9.99', types: ['no-deposit', 'first-purchase', 'daily'], verified: true }),
  c({ id: 'spree', name: 'Spree', color: '#14b8a6', url: 'https://spree.com', noDeposit: '25,000 GC free on sign-up', gc: 25000, purchase: '30,000 GC + 30 SC for $9.99', types: ['no-deposit', 'first-purchase', 'daily'], verified: true }),
  c({ id: 'playfame', name: 'PlayFame', color: '#6366f1', url: 'https://www.playfame.com', noDeposit: 'Free GC + SC on sign-up', purchase: 'First-purchase pack with bonus SC + free spins', types: ['no-deposit', 'first-purchase', 'daily'], verified: true }),
  c({ id: 'jackpota', name: 'Jackpota', color: '#22c55e', url: 'https://www.jackpota.com', noDeposit: '7,500 GC + 2.5 SC', freeSC: 2.5, gc: 7500, purchase: '135,000 GC + 67 SC + 100 SC spins', types: ['no-deposit', 'first-purchase', 'daily'], verified: true }),
  c({ id: 'spinblitz', name: 'SpinBlitz', color: '#0ea5e9', url: 'https://www.spinblitz.com', noDeposit: '7,500 GC + 2.5 SC', freeSC: 2.5, gc: 7500, purchase: '360,000 GC + 150 SC + 150 spins', code: 'BLITZ', types: ['no-deposit', 'first-purchase', 'daily'], verified: true }),
  c({ id: 'legendz', name: 'Legendz', color: '#d946ef', url: 'https://legendz.com', noDeposit: '500 GC + 3 SC', freeSC: 3, gc: 500, purchase: '100% bonus on first purchase + offers on first 5 buys', code: 'LEGLIVE', types: ['no-deposit', 'first-purchase', 'daily', 'sportsbook'], verified: true }),
  c({ id: 'coinsback', name: 'CoinsBack', color: '#06b6d4', noDeposit: 'Free coins on sign-up', purchase: '2,000,000 GC + 32 SC for $9.99', types: ['no-deposit', 'first-purchase', 'cashback'], notes: 'Returns 50% of the SC house edge. From the WOW Vegas group.', isNew: true, verified: true }),
  c({ id: 'dorados', name: 'Dorados', color: '#eab308', noDeposit: 'Free coins on sign-up', purchase: '750,000 GC + 75 SC for $29.99', types: ['no-deposit', 'first-purchase'], isNew: true, verified: true }),
  c({ id: 'splash-coins', name: 'Splash Coins', color: '#38bdf8', url: 'https://splashcoins.com', noDeposit: '150,000 GC + 2 SC', freeSC: 2, gc: 150000, purchase: '2,500,000 GC + 100 SC + 100% bonus', types: ['no-deposit', 'first-purchase', 'daily'], notes: 'Near-instant Skrill redemptions.', verified: true }),
  c({ id: 'sweepspot', name: 'SweepSpot', color: '#84cc16', noDeposit: '10,000 GC + 2 SC', freeSC: 2, gc: 10000, purchase: '150,000 GC + 40 SC for $19.99', types: ['no-deposit', 'first-purchase'], verified: true }),
  c({ id: 'speedsweeps', name: 'SpeedSweeps', color: '#ef4444', noDeposit: '50,000 GC + 1 SC', freeSC: 1, gc: 50000, notes: 'Publishes per-game RTP.', verified: true }),
  c({ id: 'dimesweeps', name: 'DimeSweeps', color: '#64748b', noDeposit: '50,000 GC + 1 SC + daily wheel spin', freeSC: 1, gc: 50000, verified: true }),
  c({ id: 'myprize', name: 'MyPrize.US', color: '#f43f5e', url: 'https://myprize.us', noDeposit: '1,000 GC + welcome wheel up to 11,000 GC + 1.3 SC', freeSC: 1.3, gc: 1000, verified: true }),
  c({ id: 'chanced', name: 'Chanced', color: '#7c3aed', url: 'https://chanced.com', noDeposit: '10,000 GC + 2 SC + 20 bonus spins', freeSC: 2, gc: 10000, verified: true }),
  c({ id: 'the-boss', name: 'The Boss', color: '#78716c', noDeposit: '2,000 GC + 2 SC', freeSC: 2, gc: 2000, verified: true }),
  c({ id: 'dingdingding', name: 'DingDingDing', color: '#fb923c', url: 'https://www.dingdingding.com', noDeposit: '100,000 Tao Coins + daily login bonuses', gc: 100000, verified: true }),
  c({ id: 'funrize', name: 'Funrize', color: '#f472b6', url: 'https://funrize.com', noDeposit: '75,000 Promo Coins + 125,000 Tournament Coins', gc: 75000, types: ['no-deposit', 'daily', 'tournament'], verified: true }),
  c({ id: 'taofortune', name: 'TaoFortune', color: '#ca8a04', url: 'https://taofortune.com', noDeposit: '128,000 Tao Coins + bonus coins', gc: 128000, verified: true }),
  c({ id: 'rolling-riches', name: 'Rolling Riches', color: '#16a34a', url: 'https://www.rollingriches.com', noDeposit: '100,000 GC + 1 SC', freeSC: 1, gc: 100000, verified: true }),
  c({ id: 'nolimitcoins', name: 'NoLimitCoins', color: '#2563eb', url: 'https://nolimitcoins.com', noDeposit: '100,000 GC + 1,800 Super Coins', gc: 100000, verified: true }),
  c({ id: 'golden-hearts', name: 'Golden Hearts', color: '#e879f9', noDeposit: '250,000 GC + free SC on first login', gc: 250000, notes: 'Part of play supports charity.', verified: true }),
  c({ id: 'vegas-gems', name: 'Vegas Gems', color: '#a3e635', url: 'https://vegasgems.com', noDeposit: 'Sign-up bonus, no purchase needed', purchase: '50% extra gems on first deposit', types: ['no-deposit', 'first-purchase', 'crypto'], verified: true }),
  c({ id: 'global-poker', name: 'Global Poker', color: '#0891b2', url: 'https://www.globalpoker.com', noDeposit: 'Free GC + SC on sign-up', types: ['no-deposit', 'first-purchase', 'daily'], notes: 'Sweeps poker plus slots.' }),
  c({ id: 'fliff', name: 'Fliff', color: '#22d3ee', url: 'https://www.getfliff.com', noDeposit: 'Free Fliff Coins on sign-up', purchase: '100% match up to 600,000 Fliff Coins + $100 Fliff Cash', types: ['no-deposit', 'first-purchase', 'sportsbook'], devices: ['web', 'ios', 'android'], notes: 'Social sportsbook.', verified: true }),
  c({ id: 'sweepking', name: 'SweepKing', color: '#fbbf24', noDeposit: 'Free coins on sign-up', purchase: 'Strong first-purchase deal', notes: '1,600+ games with live dealer.', isNew: true }),
  c({ id: 'courtside', name: 'Courtside', color: '#1d4ed8', noDeposit: 'Free coins on sign-up', types: ['no-deposit', 'sportsbook'], devices: ['ios', 'android'], notes: 'App-only. Social sports picks plus 4,500+ slots. 42 states.', isNew: true }),
  c({ id: 'dexyplay', name: 'DexyPlay', color: '#9333ea', noDeposit: 'Free coins on sign-up', notes: '1,500+ games, 24-tier VIP.', isNew: true }),
  c({ id: 'thrillcoins', name: 'ThrillCoins', color: '#f59e0b', noDeposit: 'No-purchase welcome bonus', types: ['no-deposit', 'crypto'], notes: 'Fast crypto redemptions.', isNew: true }),
  c({ id: 'sweepico', name: 'Sweepico', color: '#10b981', noDeposit: 'Free coins on sign-up', notes: '1x playthrough, 25 SC minimum redemption.', isNew: true }),
  c({ id: 'deal-or-no-deal', name: 'Deal or No Deal Win', color: '#111827', noDeposit: 'Free coins on sign-up', notes: 'Built on the TV game show brand.', isNew: true }),
  c({ id: 'zonko', name: 'Zonko', color: '#ec4899', noDeposit: 'Free coins on sign-up', notes: 'Smaller, curated game library.', isNew: true }),
  c({ id: 'spinsly', name: 'Spinsly', color: '#8b5cf6', noDeposit: 'Free coins on sign-up', notes: 'Infinity Wheel daily spin.', isNew: true }),
  c({ id: 'high5', name: 'High 5 Casino', color: '#ef4444', url: 'https://www.high5casino.com', noDeposit: 'Free GC + SC + Diamonds on sign-up', devices: ['web', 'ios', 'android'], types: ['no-deposit', 'first-purchase', 'daily'] }),
  c({ id: 'fortune-coins', name: 'Fortune Coins', color: '#f59e0b', url: 'https://www.fortunecoins.com', noDeposit: 'Free GC + Fortune Coins on sign-up', types: ['no-deposit', 'first-purchase', 'daily'] }),
  c({ id: 'zula', name: 'Zula Casino', color: '#06b6d4', url: 'https://www.zulacasino.com', noDeposit: 'Free GC + SC on sign-up', types: ['no-deposit', 'first-purchase', 'daily'] }),
  c({ id: 'sportzino', name: 'Sportzino', color: '#16a34a', url: 'https://sportzino.com', noDeposit: 'Free GC + SC on sign-up', types: ['no-deposit', 'daily', 'sportsbook'] }),
  c({ id: 'hello-millions', name: 'Hello Millions', color: '#f97316', url: 'https://www.hellomillions.com', noDeposit: 'Free GC + SC on sign-up', purchase: '120,000 GC + 60 SC pack', types: ['no-deposit', 'first-purchase', 'daily'] }),
  c({ id: 'modo', name: 'Modo', color: '#7c5cff', url: 'https://modo.us', noDeposit: 'Free GC + SC on sign-up' }),
  c({ id: 'sixty6', name: 'Sixty6', color: '#e11d48', url: 'https://sixty6.com', noDeposit: 'Free GC + SC on sign-up' }),
  c({ id: 'rolla', name: 'Rolla', color: '#0ea5e9', url: 'https://www.rolla.com', noDeposit: 'Free GC + SC on sign-up' }),
  c({ id: 'punt', name: 'Punt', color: '#22c55e', url: 'https://punt.com', noDeposit: 'Free GC + SC on sign-up', types: ['no-deposit', 'daily', 'crypto'] }),
  c({ id: 'casino-click', name: 'Casino.Click', color: '#3b82f6', url: 'https://casino.click', noDeposit: 'Free GC + SC on sign-up' }),
  c({ id: 'luckybird', name: 'LuckyBird', color: '#facc15', url: 'https://luckybird.io', noDeposit: 'Free coins + faucet', types: ['no-deposit', 'daily', 'crypto'] }),
  c({ id: 'sweeptastic', name: 'Sweeptastic', color: '#a855f7', url: 'https://sweeptastic.com', noDeposit: 'Free GC + SC on sign-up' }),
  c({ id: 'american-luck', name: 'American Luck', color: '#dc2626', url: 'https://americanluck.com', noDeposit: 'Free GC + SC on sign-up' }),
  c({ id: 'scratchful', name: 'Scratchful', color: '#f472b6', url: 'https://scratchful.com', noDeposit: 'Free coins on sign-up', notes: 'Scratch-card focused.' }),
  c({ id: 'ace', name: 'Ace.com', color: '#111827', url: 'https://ace.com', noDeposit: 'Free GC + SC on sign-up' }),
  c({ id: 'moonspin', name: 'Moonspin', color: '#6366f1', url: 'https://moonspin.us', noDeposit: 'Free coins on sign-up', types: ['no-deposit', 'daily', 'crypto'] }),
  c({ id: 'yay', name: 'Yay Casino', color: '#fb7185', url: 'https://www.yaycasino.com', noDeposit: 'Free GC + SC on sign-up' }),
  c({ id: 'funzpoints', name: 'Funzpoints', color: '#f59e0b', url: 'https://www.funzpoints.com', noDeposit: 'Free Funzpoints on sign-up' }),
  c({ id: 'rebet', name: 'Rebet', color: '#0f766e', url: 'https://rebet.app', noDeposit: 'Free coins on sign-up', types: ['no-deposit', 'sportsbook'], devices: ['web', 'ios', 'android'], notes: 'Social sportsbook.' }),
  c({ id: 'spinfinite', name: 'Spinfinite', color: '#8b5cf6', noDeposit: 'Free coins on sign-up' }),
  c({ id: 'sweepnext', name: 'SweepNext', color: '#14b8a6', noDeposit: 'Free coins on sign-up' }),
  c({ id: 'epic-sweep', name: 'Epic Sweep', color: '#f97316', noDeposit: '250,000 GC on sign-up', gc: 250000 }),
  c({ id: 'jumbo88', name: 'Jumbo88', color: '#ef4444', noDeposit: 'Free coins on sign-up' }),
  c({ id: 'cazino', name: 'Caz!no', color: '#d946ef', noDeposit: 'Free coins on sign-up' }),
];
