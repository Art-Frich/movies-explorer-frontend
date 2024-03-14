import './BurgerBtn.css';

import React from 'react';

interface IBurgerBtnProps {
  onClick: () => void;
  isOpen: boolean;
}

function BurgerBtn({ onClick, isOpen }: IBurgerBtnProps) {
  return (
    <div
      className={`burger-menu btn-hover btn-reset ${isOpen ? 'burger-menu_open' : ''}`}
      role='button'
      aria-label='Открыть меню'
      onClick={onClick}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.code === 'Enter') onClick();
      }}
    >
      <div className='burger-menu__line burger-menu__line_type_top' />
      <div className='burger-menu__line burger-menu__line_type_middle' />
      <div className='burger-menu__line burger-menu__line_type_bottom' />
    </div>
  );
}

export default BurgerBtn;
