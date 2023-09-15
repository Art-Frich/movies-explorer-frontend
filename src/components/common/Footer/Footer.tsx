import './Footer.css';

import React from 'react';
import FooterLinkElement from '../../others/FooterLinkElement/FooterLinkElement';

export default function Footer() {
  return (
    <footer className='footer'>
      <span className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</span>
      <div className='footer__dividing-line' />
      <div className='footer__row'>
        <span className='footer__signature'>© Art Frich 2023</span>
        <ul className='footer__list list-reset'>
          <FooterLinkElement url='https://practicum.yandex.ru/' content='Яндекс.Практикум' />
          <FooterLinkElement url='https://github.com/Art-Frich' content='Github' />
        </ul>
      </div>
    </footer>
  );
}
