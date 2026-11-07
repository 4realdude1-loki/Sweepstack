// Achievement definitions. `test` gets a stats snapshot and returns true when earned.
export const ACHIEVEMENTS = [
  { id: 'first-track', icon: 'Target',   name: 'First Blood',   desc: 'Track your first bonus',            test: (s) => s.tracked >= 1 },
  { id: 'five-track',  icon: 'Layers',   name: 'Stacking Up',   desc: 'Track 5 casinos',                   test: (s) => s.tracked >= 5 },
  { id: 'collector',   icon: 'Gem',      name: 'Collector',     desc: 'Track 25 casinos',                  test: (s) => s.tracked >= 25 },
  { id: 'first-claim', icon: 'Check',    name: 'Cha-Ching',     desc: 'Mark your first bonus claimed',     test: (s) => s.claimed >= 1 },
  { id: 'ten-claim',   icon: 'Trophy',   name: 'Bonus Hunter',  desc: 'Claim 10 bonuses',                  test: (s) => s.claimed >= 10 },
  { id: 'first-paid',  icon: 'Banknote', name: 'Got Paid',      desc: 'Log your first payout',             test: (s) => s.paid >= 1 },
  { id: 'sc-100',      icon: 'Coins',    name: 'Hundred Club',  desc: 'Log 100+ SC in claimed value',      test: (s) => s.value >= 100 },
  { id: 'streak-3',    icon: 'Flame',    name: 'Heating Up',    desc: '3-day daily streak',                test: (s) => s.best >= 3 },
  { id: 'streak-7',    icon: 'Zap',      name: 'On Fire',       desc: '7-day daily streak',                test: (s) => s.best >= 7 },
  { id: 'streak-30',   icon: 'Crown',    name: 'Unstoppable',   desc: '30-day daily streak',               test: (s) => s.best >= 30 },
  { id: 'perfect-day', icon: 'Star',     name: 'Perfect Day',   desc: 'Hit your daily goal',               test: (s) => s.goalsHit >= 1 },
  { id: 'organizer',   icon: 'Tag',      name: 'Organizer',     desc: 'Add a custom tag',                  test: (s) => s.tags >= 1 },
  { id: 'sharer',      icon: 'Share2',   name: 'Spread the Word', desc: 'Export or share your list',       test: (s) => s.shared >= 1 },
];
