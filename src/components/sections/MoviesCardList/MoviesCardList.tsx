import './MoviesCardList.css';

import React from 'react';
import MoviesCard from '../../others/MoviesCard/MoviesCard';

interface IMoviesCardList {
  films: any[],
  onClickAddedContent: () => void;
  cntFilms: number;
}

export default function MoviesCardList({ films, onClickAddedContent, cntFilms }: IMoviesCardList) {
  return (
    <section className='movies-list'>
      <ul className='movies-list__list list-reset'>
        {films.map((el) => (
          <li className='movies-list__list-element' key={el.id}>
            <MoviesCard data={el} />
          </li>
        ))}
      </ul>
      {cntFilms > films.length && (
        <button
          className='movies-list__btn-load-films btn-reset btn-hover active-btn-effect'
          type='button'
          onClick={onClickAddedContent}
        >
          Ещё
        </button>
      )}
    </section>
  );
}
