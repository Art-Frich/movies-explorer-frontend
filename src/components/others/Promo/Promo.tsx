import './Promo.css';

import React from 'react';
import { Link } from 'react-router-dom';

export default function Promo() {
  return (
    <section className='promo'>
      <div className='promo__content'>
        <h1 className='promo__title'>
          Учебный проект студента факультета Веб-&nbsp;разработки.
        </h1>
        <span className='promo__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</span>
      </div>
      <button type='button' className='promo__btn btn-reset btn-hover btn-active'>
        <Link to='/' className='promo__link'>
          Узнать больше
        </Link>
      </button>
    </section>
  );
}
