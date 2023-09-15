import './GuestHeader.css';

import React from 'react';
import { Link } from 'react-router-dom';

export default function GuestHeader() {
  return (
    <nav className='navigation-guest'>
      <Link className='navigation-guest__link link-hover active-underline' to='/signup'>Регистрация</Link>
      <Link className='navigation-guest__link navigation-guest__signin-btn btn-hover active-btn-effect' to='/signin'>
        Войти
      </Link>
    </nav>
  );
}
