import './LoggedInHeader.css';

import React from 'react';
import { NavLink } from 'react-router-dom';

export default function LoggedInHeader() {
  return (
    <nav className='navigation-auth'>
      <ul className='navigation-auth__list list-reset'>
        <li className='navigation-auth__list-element'>
          <NavLink className='navigation-auth__link link-hover active-underline' to='/movies'>Фильмы</NavLink>
        </li>
        <li className='navigation-auth__list-element'>
          <NavLink className='navigation-auth__link link-hover active-underline' to='/saved-movies'>Сохраненные фильмы</NavLink>
        </li>
        <li className='navigation-auth__list-element'>
          <NavLink className='navigation-auth__link navigation-auth__account-btn' to='/profile'>
            <span className='navigation-auth__account-btn-text link-hover active-underline'>Аккаунт</span>
            <span className='navigation-auth__account-btn-icon btn-hover active-btn-effect' />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
