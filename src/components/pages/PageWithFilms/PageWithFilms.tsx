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
  isFilter: boolean,
  messageForUser: string,
  onReset: () => void,
  onClickAddedContent: () => void,
  cntFilms: number,
  userQuery: string,
}

export default function PageWithFilms({
  isShort, setIsShort, films, onSearch, messageForUser,
  isFilter, onReset, onClickAddedContent, cntFilms,
  userQuery,
}: IPageWithFilms) {
  return (
    <main className='page-with-films'>
      <SearchForm
        isShort={isShort}
        setIsShort={setIsShort}
        onSearch={onSearch}
        onReset={onReset}
        userQuery={userQuery}
      />
      {films.length > 0 && (
        <MoviesCardList
          films={films}
          onClickAddedContent={onClickAddedContent}
          cntFilms={cntFilms}
        />
      )}
      {(isFilter || userQuery) && films.length === 0
        && <p className='page-with-films__message-for-user'>{messageForUser}</p>}
      {films.length === 0 && !userQuery && !isFilter && <Preloader />}
    </main>
  );
}
