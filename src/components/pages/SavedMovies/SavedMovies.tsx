import './SavedMovies.css';

import React from 'react';

import SearchForm from '../../others/SearchForm/SearchForm';
import MoviesCardList from '../../others/MoviesCardList/MoviesCardList';

interface SavedMoviesInterface {
  isShort: boolean,
  setIsShort: (newValue: boolean) => void,
}

export default function SavedMovies({ isShort, setIsShort }: SavedMoviesInterface) {
  return (
    <>
      <SearchForm isShort={isShort} setIsShort={setIsShort} />
      <MoviesCardList />
    </>
  );
}
