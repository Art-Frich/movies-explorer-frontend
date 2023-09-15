import './SavedMovies.css';

import React from 'react';

import SearchForm from '../../sections/SearchForm/SearchForm';
import MoviesCardList from '../../sections/MoviesCardList/MoviesCardList';

interface ISavedMovies {
  isShort: boolean,
  setIsShort: (newValue: boolean) => void,
}

export default function SavedMovies({ isShort, setIsShort }: ISavedMovies) {
  return (
    <main className='saved-movies'>
      <SearchForm isShort={isShort} setIsShort={setIsShort} />
      <MoviesCardList cardType='movies-card__btn_delete' />
    </main>
  );
}
