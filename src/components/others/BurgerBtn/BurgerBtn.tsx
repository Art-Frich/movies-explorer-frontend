/* eslint-disable react/function-component-definition */
import './BurgerBtn.css';
import React from 'react';

interface IBurgerBtnProps {
  onClick: () => void;
  isOpen: boolean;
}

const BurgerBtn: React.FC<IBurgerBtnProps> = ({ onClick, isOpen }) => (
  <button
    className={`burger-menu btn-hover btn-reset ${isOpen ? 'burger-menu_open' : ''}`}
    onClick={onClick}
    type='button'
  >
    <div className='burger-menu__line burger-menu__line_type_top' />
    <div className='burger-menu__line burger-menu__line_type_middle' />
    <div className='burger-menu__line burger-menu__line_type_bottom' />
  </button>
);

export default BurgerBtn;
