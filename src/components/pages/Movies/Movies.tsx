import './Movies.css';

import React from 'react';

import SearchForm from '../../sections/SearchForm/SearchForm';
import MoviesCardList from '../../sections/MoviesCardList/MoviesCardList';

interface IMovies {
  isShort: boolean,
  setIsShort: (newValue: boolean) => void,
}

export default function Movies({ isShort, setIsShort }: IMovies) {
  return (
    <main className='movies'>
      <SearchForm isShort={isShort} setIsShort={setIsShort} />
      <MoviesCardList cardType='movies-card__btn_save' />
      <button className='movies__btn-load-films btn-reset btn-hover active-btn-effect' type='button'>Ещё</button>
    </main>
  );
}
