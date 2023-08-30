import './BurgerLoggedInHeader.css';

import { Link } from 'react-router-dom';
import React from 'react';

export default function BurgerLoggedInHeader({ isOpen }: { isOpen: boolean }) {
  return (
    <aside className={`aside-bar ${isOpen ? 'aside-bar_visible' : ''}`}>
      <nav className='navigation-auth-burger'>
        <ul className='navigation-auth-burger__list list-reset'>
          <li className='navigation-auth-burger__list-element'>
            <Link className='navigation-auth-burger__link link-hover link-active' to='/'>Главная</Link>
          </li>
          <li className='navigation-auth-burger__list-element'>
            <Link className='navigation-auth-burger__link link-hover link-active' to='/movies'>Фильмы</Link>
          </li>
          <li className='navigation-auth-burger__list-element'>
            <Link className='navigation-auth-burger__link link-hover link-active' to='/saved-movies'>Сохраненные фильмы</Link>
          </li>
        </ul>
        <Link className='navigation-auth-burger__link link-hover' to='/profile'>
          <button type='button' className='navigation-auth-burger__account-btn button-reset'>
            <span className='navigation-auth-burger__account-btn-text link-active'>Аккаунт</span>
            <span className='navigation-auth-burger__account-btn-icon' />
          </button>
        </Link>
      </nav>
    </aside>
  );
}
