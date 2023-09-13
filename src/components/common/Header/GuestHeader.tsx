import './GuestHeader.css';

import React from 'react';
import { Link } from 'react-router-dom';

export default function GuestHeader() {
  return (
    <nav className='navigation-guest'>
      <Link className='navigation-guest__link link-hover active-underline' to='/signup'>Регистрация</Link>
      <Link className='navigation-guest__link' to='/signin'>
        <button type='button' className='navigation-guest__signin-btn btn-reset btn-hover active-btn-effect'>
          Войти
        </button>
      </Link>
    </nav>
  );
}
