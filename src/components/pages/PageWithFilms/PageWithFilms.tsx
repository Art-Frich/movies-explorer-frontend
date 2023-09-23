/* eslint-disable @typescript-eslint/no-unused-vars */
import './PageWithFilms.css';

import React, { FormEvent, useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import SearchForm from '../../others/SearchForm/SearchForm';
import MoviesCardList from '../../others/MoviesCardList/MoviesCardList';
import Preloader from '../../common/Preloader/Preloader';
import { getSideEffect } from '../../../helpers/utils/utils';
import useSearcher from '../../../сustomHooks/useSearcher';
import useSaveCardBtn from '../../../сustomHooks/useSaveCardBtn';
import useSetterVisibleFilms from '../../../сustomHooks/useSetterVisibleFilms';

interface IPageWithFilms {
  // filters: Record<string, boolean>,
  // setFilters: (
  //   ((newValue: Record<string, boolean>) => void) |
  //   ((prev: Record<string, boolean>) => { [x: string]: boolean; })
  // )
  // films: any[],
  // onSearch: (e: FormEvent<HTMLFormElement>, value: string) => void,
  // isActiveFilters: boolean,
  // messageForUser: string,
  // onReset: () => void,
  // onClickToAddContent: () => void,
  // cntFilms: number,
  // userQuery: string,
  // onClickSaveBtn: (data: any) => void,
}

export default function PageWithFilms({
  allFilms = [], savedFilms = [], setAllFilms, setSavedFilms,
}: any) {
  console.log('>> render PageWithFilms');

  const location = useLocation();

  const [isSearch, setIsSearch] = useState(true);
  const [isSavedPage, setIsSavedPage] = useState<any>(location.pathname === '/saved-movies');

  const [onClickToAddContent, cntVisibleFilms, onClickToReset] = useSetterVisibleFilms();

  const [
    onReset, onSearch, visibleFilms, messageForUser,
    userQuery, isActiveFilters, filters, setFilters, localQuery,
  ] = useSearcher({
    allFilms, savedFilms, isSavedPage,
  });

  const [onClickSaveBtn] = useSaveCardBtn({
    allFilms, setAllFilms, setSavedFilms, isSavedPage,
  });

  // хитрая штука для отслеживания перерендеров
  // позволяет корректно отображать прелоадер и стейт кнопки
  useEffect(() => {
    setIsSearch(true);

    if (visibleFilms.length !== 0 // если фильмы нашлись
      || (visibleFilms.length === 0 && (userQuery || isActiveFilters) // или их нет, но был запрос
        && ((isSavedPage) || (userQuery !== localQuery)))) { // и при этом...
      setIsSearch(false);
    } else { // иначе установить запланированную проверку попозже
      clearTimeout(getSideEffect);
      getSideEffect(() => setIsSearch(false), 5000);
    }
  }, [visibleFilms]);

  // // для корректной работы страниц с фильмами
  useEffect(() => {
    setIsSavedPage(location.pathname === '/saved-movies');
  }, [location.pathname]);

  return (
    <main className='page-with-films'>
      <SearchForm
        filters={filters}
        setFilters={setFilters}
        onSearch={onSearch}
        onReset={() => {
          onReset();
          onClickToReset();
        }}
        userQuery={userQuery}
        isSearch={isSearch}
      />
      {visibleFilms.length > 0 && (
        <MoviesCardList
          films={visibleFilms.slice(0, cntVisibleFilms)}
          onClickToAddContent={onClickToAddContent}
          cntAllFilms={visibleFilms.length}
          onClickSaveBtn={onClickSaveBtn}
        />
      )}
      {!isSearch && visibleFilms.length === 0 && <p className='page-with-films__message-for-user'>{messageForUser}</p>}
      {isSearch && visibleFilms.length === 0 && <Preloader />}
    </main>
  );
}
