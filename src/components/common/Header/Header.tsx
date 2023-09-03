/* eslint-disable no-nested-ternary */
import './Header.css';

import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '@react-hook/media-query';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../../images/logo.svg';
import { useCurrentUser } from '../../../contexts/CurrentUserContext';
import LoggedInHeader from './LoggedInHeader';
import GuestHeader from './GuestHeader';
import BurgerLoggedInHeader from './BurgerLoggedInHeader';
import BurgerBtn from '../../others/BurgerBtn/BurgerBtn';

export default function Header() {
  const location = useLocation();
  const curUser = useCurrentUser();
  const isSmallScreen = useMediaQuery('only screen and (max-width : 768px)');

  const [isOpenBurger, setIsOpenBurger] = useState(false);
  const [isMain, setIsMain] = useState(location.pathname === '/');

  const toggleBurgerState = () => {
    setIsOpenBurger(!isOpenBurger);
  };

  useEffect(() => {
    setIsMain(location.pathname === '/');
  }, [location.pathname]);

  return (
    <header className={`header ${isMain ? 'main-header-style' : ''}`}>
      <Link to='/'>
        <img src={logo} alt='Логотип' className='header__logo btn-hover' />
      </Link>
      {!curUser?.loggedIn ? (
        <GuestHeader />
      ) : !isSmallScreen ? (
        <LoggedInHeader />
      ) : (
        <BurgerBtn onClick={toggleBurgerState} isOpen={isOpenBurger} />
      )}
      <BurgerLoggedInHeader isOpen={isOpenBurger && isSmallScreen} />
    </header>
  );
}
