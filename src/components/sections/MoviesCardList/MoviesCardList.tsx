import './MoviesCardList.css';

import React from 'react';
import MoviesCard from '../../others/MoviesCard/MoviesCard';

interface IMoviesCardList {
  cardType: string,
  films: any[],
}

export default function MoviesCardList({ cardType, films }: IMoviesCardList) {
  return (
    <section className='movies-list'>
      <ul className='movies-list__list list-reset'>
        {films.map((el) => (
          // eslint-disable-next-line react/no-array-index-key
          <li className='movies-list__list-element' key={el.id}>
            <MoviesCard data={el} type={cardType} />
          </li>
        ))}
      </ul>
    </section>
  );
}
