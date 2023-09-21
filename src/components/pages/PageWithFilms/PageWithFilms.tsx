/* eslint-disable @typescript-eslint/no-unused-vars */
import './PageWithFilms.css';

import React, { FormEvent } from 'react';

import SearchForm from '../../sections/SearchForm/SearchForm';
import MoviesCardList from '../../sections/MoviesCardList/MoviesCardList';
import Preloader from '../../common/Preloader/Preloader';

interface IPageWithFilms {
  filters: Record<string, boolean>,
  setFilters: (
    ((newValue: Record<string, boolean>) => void) |
    ((prev: Record<string, boolean>) => { [x: string]: boolean; })
  )
  films: any[],
  onSearch: (e: FormEvent<HTMLFormElement>, value: string) => void,
  isFilter: boolean,
  messageForUser: string,
  onReset: () => void,
  onClickAddedContent: () => void,
  cntFilms: number,
  userQuery: string,
  onClickSaveBtn: (data: any) => void;
}

export default function PageWithFilms({
  filters, setFilters, films, onSearch, messageForUser,
  isFilter, onReset, onClickAddedContent, cntFilms,
  userQuery, onClickSaveBtn,
}: IPageWithFilms) {
  return (
    <main className='page-with-films'>
      <SearchForm
        filters={filters}
        setFilters={setFilters}
        onSearch={onSearch}
        onReset={onReset}
        userQuery={userQuery}
      />
      {films.length > 0 && (
        <MoviesCardList
          films={films}
          onClickAddedContent={onClickAddedContent}
          cntFilms={cntFilms}
          onClickSaveBtn={onClickSaveBtn}
        />
      )}
      {(isFilter || userQuery) && films.length === 0
        && <p className='page-with-films__message-for-user'>{messageForUser}</p>}
      {/* {films.length === 0 && !userQuery && !isFilter && <Preloader />} */}
    </main>
  );
}
