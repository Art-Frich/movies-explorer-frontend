import './Movies.css';

import React from 'react';

import SearchForm from '../../others/SearchForm/SearchForm';
import MoviesCardList from '../../others/MoviesCardList/MoviesCardList';

interface MoviesInterface {
  isShort: boolean,
  setIsShort: (newValue: boolean) => void,
}

export default function Movies({ isShort, setIsShort }: MoviesInterface) {
  return (
    <main className='movies'>
      <SearchForm isShort={isShort} setIsShort={setIsShort} />
      <MoviesCardList cardType='movies-card__btn_save' />
      <button className='movies__btn-load-films btn-reset btn-hover btn-active' type='button'>Ещё</button>
    </main>
  );
}
