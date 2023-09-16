import './PageWithFilms.css';

import React, { FormEvent } from 'react';

import SearchForm from '../../sections/SearchForm/SearchForm';
import MoviesCardList from '../../sections/MoviesCardList/MoviesCardList';
import Preloader from '../../common/Preloader/Preloader';

interface IPageWithFilms {
  isShort: boolean,
  setIsShort: (newValue: boolean) => void,
  films: any[],
  onSearch: (e: FormEvent<HTMLFormElement>, value: string) => void,
  fetchCondition: boolean,
  messageForUser: string,
  onReset: () => void;
}

export default function PageWithFilms({
  isShort, setIsShort, films, onSearch, messageForUser, fetchCondition, onReset,
}: IPageWithFilms) {
  return (
    <main className='page-with-films'>
      <SearchForm
        isShort={isShort}
        setIsShort={setIsShort}
        onSearch={onSearch}
        fetchCondition={fetchCondition}
        onReset={onReset}
      />
      {films.length > 0 && (
        <MoviesCardList cardType='movies-card__btn_delete' films={films} />
      )}
      {!fetchCondition && films.length === 0 && <p className='page-with-films__message-for-user'>{messageForUser}</p>}
      {fetchCondition && <Preloader />}
    </main>
  );
}
