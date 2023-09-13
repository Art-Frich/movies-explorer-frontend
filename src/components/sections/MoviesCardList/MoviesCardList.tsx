import './MoviesCardList.css';

import React from 'react';
import MoviesCard from '../../others/MoviesCard/MoviesCard';

import data from '../../../helpers/initialCards';

interface IMoviesCardList {
  cardType: string,
}

export default function MoviesCardList({ cardType }: IMoviesCardList) {
  return (
    <section className='movies-list'>
      <ul className='movies-list__list list-reset'>
        {data.map((el, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <li className='movies-list__list-element' key={i}>
            <MoviesCard data={el} type={i === 0 && cardType === 'movies-card__btn_save' ? 'movies-card__btn_saved' : cardType} />
          </li>
        ))}
      </ul>
    </section>
  );
}
