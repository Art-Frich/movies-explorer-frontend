import './Portfolio.css';

import React from 'react';
import PortfolioLinkElement from '../../others/PortfolioLinkElement/PortfolioLinkElement';

export default function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>
        Портфолио
      </h2>
      <ul className='portfolio__list list-reset'>
        <PortfolioLinkElement
          url='https://github.com/Art-Frich/YP.Project-1.how-to-learn'
          content='Статичный сайт'
        />
        <PortfolioLinkElement
          url='https://github.com/Art-Frich/russian-travel'
          content='Адаптивный сайт'
        />
        <PortfolioLinkElement
          url='https://github.com/Art-Frich/react-mesto-api-full-gha'
          content='Одностраничное приложение'
        />
      </ul>

    </section>
  );
}
