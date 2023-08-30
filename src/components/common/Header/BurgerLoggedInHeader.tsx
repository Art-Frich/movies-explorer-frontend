import './BurgerLoggedInHeader.css';

import { NavLink } from 'react-router-dom';
import React from 'react';

export default function BurgerLoggedInHeader({ isOpen }: { isOpen: boolean }) {
  return (
    <aside className={`aside-bar ${isOpen ? 'aside-bar_visible' : ''}`}>
      <nav className='navigation-auth-burger'>
        <ul className='navigation-auth-burger__list list-reset'>
          <li className='navigation-auth-burger__list-element'>
            <NavLink className='navigation-auth-burger__link link-hover link-active' to='/'>Главная</NavLink>
          </li>
          <li className='navigation-auth-burger__list-element'>
            <NavLink className='navigation-auth-burger__link link-hover link-active' to='/movies'>Фильмы</NavLink>
          </li>
          <li className='navigation-auth-burger__list-element'>
            <NavLink className='navigation-auth-burger__link link-hover link-active' to='/saved-movies'>Сохраненные фильмы</NavLink>
          </li>
        </ul>
        <NavLink className='navigation-auth-burger__link link-hover' to='/profile'>
          <button type='button' className='navigation-auth-burger__account-btn button-reset'>
            <span className='navigation-auth-burger__account-btn-text link-active'>Аккаунт</span>
            <span className='navigation-auth-burger__account-btn-icon' />
          </button>
        </NavLink>
      </nav>
    </aside>
  );
}
