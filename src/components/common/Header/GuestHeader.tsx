import './GuestHeader.css';

import React from 'react';
import { Link } from 'react-router-dom';

export default function GuestHeader() {
  return (
    <nav className='navigation-guest'>
      <Link className='navigation-guest__link link-hover link-active' to='/signup'>Регистрация</Link>
      <button type='button' className='navigation-guest__signin-btn button-reset btn-hover btn-active'>
        <Link className='navigation-guest__link navigation-guest__signin-btn-text' to='/signin'>Войти</Link>
      </button>
    </nav>
  );
}
