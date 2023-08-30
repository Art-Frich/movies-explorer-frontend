import './LoggedInHeader.css';

import React from 'react';
import { Link } from 'react-router-dom';

export default function LoggedInHeader() {
  return (
    <nav className='navigation-auth'>
      <ul className='navigation-auth__list list-reset'>
        <li className='navigation-auth__list-element'>
          <Link className='navigation-auth__link link-hover link-active' to='/movies'>Фильмы</Link>
        </li>
        <li className='navigation-auth__list-element'>
          <Link className='navigation-auth__link link-hover link-active' to='/saved-movies'>Сохраненные фильмы</Link>
        </li>
        <li className='navigation-auth__list-element'>
          <Link className='navigation-auth__link link-hover' to='/profile'>
            <button type='button' className='navigation-auth__account-btn button-reset'>
              <span className='navigation-auth__account-btn-text link-active'>Аккаунт</span>
              <span className='navigation-auth__account-btn-icon' />
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
