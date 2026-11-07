import React, { useState } from 'react';
import { Modal } from './ui.jsx';
import { BONUS_TYPES } from '../data/casinos.js';

// Lets a user log a bonus that is not on the board (or a limited promo).
export default function AddOfferModal({ open, onClose, onSave }) {
  const [f, setF] = useState({ name: '', noDeposit: '', freeSC: '', url: '', code: '', types: ['no-deposit'] });
  const up = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const save = (e) => {
    e.preventDefault();
    if (!f.name.trim()) return;
    onSave({
      id: 'custom-' + Date.now(), name: f.name.trim(), color: '#7c5cff', url: f.url || '',
      noDeposit: f.noDeposit || 'Custom bonus', freeSC: f.freeSC === '' ? null : Number(f.freeSC), gc: null,
      code: f.code, purchase: '', types: f.types, devices: ['web'], restricted: [], notes: '', isNew: false, verified: false, custom: true,
    });
    setF({ name: '', noDeposit: '', freeSC: '', url: '', code: '', types: ['no-deposit'] });
  };
  return (
    <Modal open={open} onClose={onClose} title="Add offer">
      <form onSubmit={save} className="form">
        <h2>Add your own bonus</h2>
        <label className="field"><span>Casino / promo name *</span><input autoFocus value={f.name} onChange={up('name')} placeholder="e.g. Pulsz weekend reload" /></label>
        <label className="field"><span>Offer</span><input value={f.noDeposit} onChange={up('noDeposit')} placeholder="e.g. 50% extra coins this weekend" /></label>
        <div className="row2">
          <label className="field"><span>Free SC</span><input type="number" step="0.1" value={f.freeSC} onChange={up('freeSC')} /></label>
          <label className="field"><span>Promo code</span><input value={f.code} onChange={up('code')} /></label>
        </div>
        <label className="field"><span>Link</span><input type="url" value={f.url} onChange={up('url')} placeholder="https://" /></label>
        <div className="chips">
          {Object.entries(BONUS_TYPES).map(([k, v]) => (
            <button type="button" key={k} className={'chip' + (f.types.includes(k) ? ' on' : '')} style={{ '--c': v.color }}
              onClick={() => setF({ ...f, types: f.types.includes(k) ? f.types.filter((x) => x !== k) : [...f.types, k] })}>{v.label}</button>
          ))}
        </div>
        <button className="btn primary block" type="submit">Add and track</button>
      </form>
    </Modal>
  );
}
