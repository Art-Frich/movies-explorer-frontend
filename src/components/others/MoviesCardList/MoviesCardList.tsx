import './MoviesCardList.css';

import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

import data from '../../../helpers/initialCards';

export default function MoviesCardList() {
  return (
    <section className='movies-list'>
      <ul className='movies-list__list list-reset'>
        {data.map((el, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <li className='movies-list__list-element' key={i}>
            <MoviesCard data={el} />
          </li>
        ))}
      </ul>
    </section>
  );
}
