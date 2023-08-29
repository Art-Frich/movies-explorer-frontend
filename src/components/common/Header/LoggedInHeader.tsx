import './LoggedInHeader.css';

import React from 'react';
import { Link } from 'react-router-dom';

export default function LoggedInHeader() {
  return (
    <nav className='navigation-auth'>
      <Link className='navigation-auth__link' to='/movies'>Фильмы</Link>
      <Link className='navigation-auth__link' to='/saved-movies'>Сохраненные фильмы</Link>
      <Link className='navigation-auth__link' to='/profile'>
        <button type='button' className='navigation-auth__account-btn button-reset'>
          <span className='navigation-auth__account-btn-text'>Аккаунт</span>
          <span className='navigation-auth__account-btn-icon' />
        </button>
      </Link>

    </nav>
  );
}
