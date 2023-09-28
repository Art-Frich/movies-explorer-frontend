import './Logo.css';

import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../images/logo.svg';

function Logo() {
  return (
    <Link to='/' className='logo' hrefLang='ru'>
      <img src={logo} alt='Логотип' className='logo__img btn-hover active-btn-effect' />
    </Link>
  );
}

export default Logo;
