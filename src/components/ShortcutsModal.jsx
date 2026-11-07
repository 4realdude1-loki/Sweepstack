import React from 'react';
import { Modal } from './ui.jsx';

const KEYS = [
  ['/', 'Search offers'], ['1 - 5', 'Switch tabs'], ['n', 'Add your own offer'],
  ['t', 'Toggle dark / light'], ['a', 'Toggle affiliate mode'], ['?', 'Show shortcuts'], ['Esc', 'Close'],
];
export default function ShortcutsModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Shortcuts">
      <h2>Keyboard shortcuts</h2>
      <div className="keys">{KEYS.map(([k, d]) => <div key={k}><kbd>{k}</kbd><span>{d}</span></div>)}</div>
    </Modal>
  );
}
