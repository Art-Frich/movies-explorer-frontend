/* eslint-disable react/function-component-definition */
import './BurgerBtn.css';
import React from 'react';

interface BurgerBtnProps {
  onClick: () => void;
  isOpen: boolean;
}

const BurgerBtn: React.FC<BurgerBtnProps> = ({ onClick, isOpen }) => (
  <div
    className={`burger-menu ${isOpen ? 'burger-menu_open' : ''}`}
    onClick={onClick}
    role='button'
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onClick();
      }
    }}
  >
    <div className='burger-menu__line burger-menu__line_type_top' />
    <div className='burger-menu__line burger-menu__line_type_middle' />
    <div className='burger-menu__line burger-menu__line_type_bottom' />
  </div>
);

export default BurgerBtn;
