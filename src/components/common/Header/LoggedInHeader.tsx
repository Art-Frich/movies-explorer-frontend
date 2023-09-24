import './LoggedInHeader.css';

import React from 'react';
import { NavLink } from 'react-router-dom';

export default function LoggedInHeader() {
  return (
    <nav className='navigation-auth'>
      <ul className='navigation-auth__list list-reset'>
        <li className='navigation-auth__list-element'>
          <NavLink
            className={({ isActive }) => (
              `navigation-auth__link ${isActive ? 'navigation-auth__link_active' : 'active-underline link-hover'}`
            )}
            to='/movies'
          >
            Фильмы
          </NavLink>
        </li>
        <li className='navigation-auth__list-element'>
          <NavLink
            className={({ isActive }) => (
              `navigation-auth__link ${isActive ? 'navigation-auth__link_active' : 'active-underline link-hover'}`
            )}
            to='/saved-movies'
          >
            Сохраненные фильмы
          </NavLink>
        </li>
        <li className='navigation-auth__list-element'>
          <NavLink
            className={({ isActive }) => (
              `navigation-auth__link navigation-auth__account-btn ${isActive ? 'navigation-auth__link_active' : 'active-underline link-hover'}`
            )}
            to='/profile'
          >
            <span className='navigation-auth__account-btn-text link-hover active-underline'>Аккаунт</span>
            <span className='navigation-auth__account-btn-icon btn-hover active-btn-effect' />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
