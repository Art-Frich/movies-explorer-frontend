/* eslint-disable max-len */
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

// {
//   onClickSaveBtn, visibleFilms, filters, setFilters, isSavedPage,
//   isActiveFilters, userQuery, localQuery, onReset, onSearch,
//   messageForUser, onClickToAddContent, onClickToReset, cntVisibleFilms,
// }

const PageWithFilms = React.memo((props: any) => {
  const {
    onClickSaveBtn, visibleFilms, filters, setFilters, isSavedPage,
    isActiveFilters, userQuery, localQuery, onReset, onSearch,
    messageForUser, onClickToAddContent, onClickToReset, cntVisibleFilms,
  } = props.data;
  const [isSearch, setIsSearch] = useState(true);

  // // TODO нужно что-то ещё придумывать, вроде отслеживания последнего действия,
  // // если его не было, то ждать, если было, то нет

  // // хитрая штука для отслеживания перерендеров
  // // позволяет корректно отображать прелоадер и стейт кнопки
  useEffect(() => {
    setIsSearch(true);

    if (visibleFilms.length !== 0 // если фильмы нашлись
      || (visibleFilms.length === 0 && (userQuery || isActiveFilters) // или их нет, но был запрос
        && ((isSavedPage) || (userQuery !== localQuery)))) { // и при этом этом...
      setIsSearch(false);
    } else { // иначе установить запланированную проверку попозже
      clearTimeout(getSideEffect);
      getSideEffect(() => setIsSearch(false), 5000); // 5000 для fast3G 10000 для slow3G
      // не уверен, что это работает действительно так, как я хотел
    }
  }, [visibleFilms]);

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
      {visibleFilms.length > 0 ? (
        <MoviesCardList
          films={visibleFilms.slice(0, cntVisibleFilms)}
          onClickToAddContent={onClickToAddContent}
          cntAllFilms={visibleFilms.length}
          onClickSaveBtn={onClickSaveBtn}
        />
      ) : null}
      {!isSearch && visibleFilms.length === 0
        ? <p className='page-with-films__message-for-user'>{messageForUser}</p>
        : null}
      {isSearch && visibleFilms.length === 0 ? <Preloader /> : null}
    </main>
  );
});

export default PageWithFilms;
