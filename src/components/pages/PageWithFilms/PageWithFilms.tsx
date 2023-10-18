import './PageWithFilms.css';

import React from 'react';

import SearchForm from '../../others/SearchForm/SearchForm';
import MoviesCardList from '../../others/MoviesCardList/MoviesCardList';
import Preloader from '../../common/Preloader/Preloader';
import { useMoviesApiContext } from '../../../contexts/MoviesApiContext';
import { IdataOfBtnSave } from '../../../helpers/InterfacesOfDataFilm';
import { IobjValBool } from '../../../helpers/InterfacesOthers';

interface IPageWithFilms {
  onReset: () => void;
  onSearch: (e: React.FormEvent<HTMLFormElement> | null, value: string) => void;
  onClickSaveBtn: (data: IdataOfBtnSave) => void;
  onClickToAddContent: () => void;
  onClickToReset: () => void;
  setFilters: (newVal: (prev: IobjValBool) => IobjValBool) => void;

  visibleFilms: IdataOfBtnSave[];
  isSavedPage: boolean;
  messageForUser: string;
  userQuery: string,
  cntVisibleFilms: number;
  filters: IobjValBool,
}

// eslint-disable-next-line @typescript-eslint/comma-dangle
function PageWithFilms({ data }: { data: IPageWithFilms }) {
  const {
    onClickSaveBtn, visibleFilms, filters, setFilters,
    userQuery, onReset, onSearch, isSavedPage,
    messageForUser, onClickToAddContent, onClickToReset, cntVisibleFilms,
  } = data;
  const { isSearch } = useMoviesApiContext();

  return (
    <main className='page-with-films'>
      <SearchForm
        filters={filters}
        setFilters={setFilters}
        onSearch={(e, value) => {
          onSearch(e, value);
          onClickToReset();
        }}
        onReset={() => {
          onReset();
          onClickToReset();
        }}
        userQuery={userQuery}
        isSearch={isSearch}
        isSavedPage={isSavedPage}
      />
      {visibleFilms.length > 0 && !isSearch ? (
        <MoviesCardList
          films={visibleFilms.slice(0, cntVisibleFilms)}
          onClickToAddContent={onClickToAddContent}
          cntAllFilms={visibleFilms.length}
          onClickSaveBtn={onClickSaveBtn}
        />
      ) : null}
      {(isSearch || (visibleFilms.length !== 0)) ? null
        : <p className='page-with-films__message-for-user'>{messageForUser}</p>}
      {isSearch ? <Preloader /> : null}
    </main>
  );
}

export default PageWithFilms;
