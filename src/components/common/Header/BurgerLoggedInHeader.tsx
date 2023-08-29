import './BurgerLoggedInHeader.css';
import React from 'react';

export default function BurgerLoggedInHeader({ isOpen }: { isOpen: boolean }) {
  return (
    <aside className={`aside-bar ${isOpen ? 'visible' : ''}`}>
      <div />
    </aside>
  );
}
