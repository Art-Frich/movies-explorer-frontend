import { Link } from 'react-router-dom';
import './Portfolio.css';

import React from 'react';

export default function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>
        Портфолио
      </h2>
      <ul className='portfolio__list list-reset'>
        <li className='portfolio__list-element'>
          <Link
            to='https://github.com/Art-Frich/YP.Project-1.how-to-learn'
            className='portfolio__link link-hover link-active'
            target='_blank'
          >
            <span className='portfolio__list-element-text'>Статичный сайт</span>
            <span>

              ↗
            </span>
          </Link>
        </li>
        <li className='portfolio__list-element'>
          <span className='portfolio__list-element-text'>Адаптивный сайт</span>
          <span>
            <Link
              to='https://github.com/Art-Frich/russian-travel'
              className='portfolio__link link-hover link-active'
              target='_blank'
            >
              ↗
            </Link>
          </span>
        </li>
        <li className='portfolio__list-element'>
          <span className='portfolio__list-element-text'>Одностраничное приложение</span>
          <span>
            <Link
              to='https://github.com/Art-Frich/react-mesto-api-full-gha'
              className='portfolio__link link-hover link-active'
              target='_blank'
            >
              ↗
            </Link>
          </span>
        </li>
      </ul>

    </section>
  );
}
