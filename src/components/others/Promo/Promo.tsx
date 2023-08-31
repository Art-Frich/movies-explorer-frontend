import './Promo.css';

import React from 'react';
import { Link } from 'react-scroll';

export default function Promo() {
  return (
    <section className='promo'>
      <div className='promo__content'>
        <div>
          <h1 className='promo__title'>
            Учебный проект студента факультета Веб&nbsp;-&nbsp;разработки.
          </h1>
          <span className='promo__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</span>
        </div>

        <Link to='about-project' smooth duration={500} className='promo__link'>
          <button type='button' className='promo__btn btn-reset btn-hover btn-active'>
            Узнать больше
          </button>
        </Link>
      </div>
    </section>
  );
}
