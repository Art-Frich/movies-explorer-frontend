import './PageWithFilms.css';

import React, { useEffect, useState } from 'react';

import SearchForm from '../../others/SearchForm/SearchForm';
import MoviesCardList from '../../others/MoviesCardList/MoviesCardList';
import Preloader from '../../common/Preloader/Preloader';

const PageWithFilms = React.memo((props: any) => {
  const {
    onClickSaveBtn, visibleFilms, filters, setFilters, isSavedPage,
    isActiveFilters, userQuery, localQuery, onReset, onSearch,
    messageForUser, onClickToAddContent, onClickToReset, cntVisibleFilms,

  } = props.data;
  const [isSearch, setIsSearch] = useState(true);

  // позволяет корректно отображать прелоадер и стейт кнопки
  useEffect(() => {
    setIsSearch(true);

    if (visibleFilms.length !== 0 // если фильмы нашлись
      || (visibleFilms.length === 0 // или их нет, но
        && (userQuery || isActiveFilters) // был запрос и
        && ((isSavedPage) || (userQuery !== localQuery)))) { // это сохраненные или
      // запрос пользователя отличается от последнего из localStorage
      setIsSearch(false);
    } else { // иначе дать время на загрузку
      setTimeout(() => setIsSearch(false), 5000);
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
