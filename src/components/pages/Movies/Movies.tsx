import './Movies.css';

import React from 'react';

import SearchForm from '../../others/SearchForm/SearchForm';

interface MoviesInterface {
  isShort: boolean,
  setIsShort: (newValue: boolean) => void,
}

export default function Movies({ isShort, setIsShort }: MoviesInterface) {
  return (
    <SearchForm isShort={isShort} setIsShort={setIsShort} />

  );
}
