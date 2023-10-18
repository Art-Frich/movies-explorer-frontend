import './Header.css';

import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '@react-hook/media-query';
import { useLocation } from 'react-router-dom';

import { useCurrentUser } from '../../../contexts/CurrentUserContext';
import LoggedInHeader from './LoggedInHeader';
import GuestHeader from './GuestHeader';
import BurgerLoggedInHeader from './BurgerLoggedInHeader';
import BurgerBtn from '../../others/BurgerBtn/BurgerBtn';
import Logo from '../../others/Logo/Logo';

function Header() {
  const location = useLocation();
  const curUser = useCurrentUser();
  const isSmallScreen = useMediaQuery('only screen and (max-width : 768px)');

  const [isOpenBurger, setIsOpenBurger] = useState(false);
  const [isMain, setIsMain] = useState(location.pathname === '/');

  const toggleBurgerState = () => {
    setIsOpenBurger(!isOpenBurger);
  };

  let headerComponent;

  if (!curUser.loggedIn) {
    headerComponent = <GuestHeader />;
  } else if (!isSmallScreen) {
    headerComponent = <LoggedInHeader />;
  } else {
    headerComponent = <BurgerBtn onClick={toggleBurgerState} isOpen={isOpenBurger} />;
  }

  useEffect(() => {
    setIsMain(location.pathname === '/');
    setIsOpenBurger(false);
  }, [location.pathname]);

  useEffect(() => {
    setIsOpenBurger(false);
  }, [isSmallScreen]);

  return (
    <header className={`header ${isMain ? 'main-header-style' : ''}`}>
      <Logo />
      {headerComponent}
      <BurgerLoggedInHeader isOpen={isOpenBurger && isSmallScreen} />
    </header>
  );
}

export default Header;
