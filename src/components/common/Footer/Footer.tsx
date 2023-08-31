import './Footer.css';

import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className='footer'>
      <span className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</span>
      <div className='footer__dividing-line' />
      <div className='footer__row'>
        <span className='footer__signature'>© Art Frich 2023</span>
        <ul className='footer__list list-reset'>
          <li className='footer__list-element'>
            <Link to='https://practicum.yandex.ru/' className='footer__link link-hover link-active'>
              Яндекс.Практикум
            </Link>
          </li>
          <li className='footer__list-element'>
            <Link to='https://github.com/Art-Frich' className='footer__link link-hover link-active'>
              Github
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
