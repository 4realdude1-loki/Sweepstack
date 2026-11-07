import React, { useState } from 'react';
import { Modal } from './ui.jsx';
import { Search, Target, Flame, ArrowRight } from 'lucide-react';

const STEPS = [
  { icon: Search, title: 'Every sweeps casino, one board', body: 'Free Sweeps Coins, no-deposit bonuses, and purchase deals for 65+ casinos. Search, filter by your state, and sort by the most free SC.' },
  { icon: Target, title: 'Track it. Claim it. Get paid.', body: 'Hit Track This, then move each bonus from Active to Claimed to Pending Payout to Paid. Add notes, proof links, and reminders.' },
  { icon: Flame, title: 'Build your streak', body: 'Check off daily login bonuses to keep your streak alive, earn XP, level up, and unlock achievements.' },
];

// Short first-run walkthrough. Shown once.
export default function Onboarding({ open, onDone }) {
  const [i, setI] = useState(0);
  const S = STEPS[i];
  const Ic = S.icon;
  return (
    <Modal open={open} onClose={onDone} title="Welcome">
      <div className="onb">
        <div className="onb-ic"><Ic size={34} /></div>
        <h2>{S.title}</h2>
        <p>{S.body}</p>
        <div className="dots-row">{STEPS.map((_, j) => <i key={j} className={j === i ? 'on' : ''} />)}</div>
        <div className="actions center">
          <button className="btn ghost" onClick={onDone}>Skip</button>
          <button className="btn primary" onClick={() => (i < STEPS.length - 1 ? setI(i + 1) : onDone())}>
            {i < STEPS.length - 1 ? 'Next' : "Let's go"}<ArrowRight size={16} />
          </button>
        </div>
      </div>
    </Modal>
  );
}
