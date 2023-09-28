import './MoviesCardList.css';

import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

interface IMoviesCardList {
  films: any[],
  onClickToAddContent: () => void;
  cntAllFilms: number;
  onClickSaveBtn: (data: any) => void;

}

export default function MoviesCardList({
  films, onClickToAddContent, cntAllFilms, onClickSaveBtn,
}: IMoviesCardList) {
  return (
    <section className='movies-list' aria-label='cards'>
      <ul className='movies-list__list list-reset'>
        {films.map((el) => (
          <li className='movies-list__list-element' key={el.movieId}>
            <MoviesCard data={el} onClickSaveBtn={onClickSaveBtn} />
          </li>
        ))}
      </ul>
      {cntAllFilms > films.length && (
        <button
          className='movies-list__btn-load-films btn-reset btn-hover active-btn-effect'
          type='button'
          onClick={onClickToAddContent}
        >
          Ещё
        </button>
      )}
    </section>
  );
}
