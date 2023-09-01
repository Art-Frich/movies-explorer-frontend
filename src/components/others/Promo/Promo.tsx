import './Promo.css';

import React from 'react';
import { Link } from 'react-scroll';

import promoLogo from '../../../images/landing-logo.svg';

export default function Promo() {
  return (
    <section className='promo'>
      <div className='promo__content'>
        <h1 className='promo__title'>
          Учебный проект студента факультета Веб&#8209;разработки.
        </h1>
        <span className='promo__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</span>

        <Link to='about-project' smooth duration={500} className='promo__link'>
          <button type='button' className='promo__btn btn-reset btn-hover btn-active'>
            Узнать больше
          </button>
        </Link>
        <img src={promoLogo} alt='символ веб-разработки' className='promo__logo' />
      </div>
    </section>
  );
}
