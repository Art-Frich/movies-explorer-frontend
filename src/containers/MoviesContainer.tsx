/* eslint-disable react/destructuring-assignment */
import React, {
  useState, useEffect, FormEvent,
} from 'react';

import { useLocation } from 'react-router-dom';
import { useMediaQuery } from '@react-hook/media-query';
import PageWithFilms from '../components/pages/PageWithFilms/PageWithFilms';
// import moviesApi from '../helpers/utils/MoviesApi';
// import { parseMovieData } from '../helpers/utils/utils';
// import mainApi from '../helpers/utils/MainApi';

function MoviesContainer(props: any) {
  const {
    allFilms, savedFilms, setAllFilms, setSavedFilms, onClickSaveBtn,
  } = props.data;
  console.log('> render MovieContainer');
  const location = useLocation();

  const [isSavedPage, setIsSavedPage] = useState<any>(location.pathname === '/saved-movies');

  let defaultMsgForUser = 'Здесь пока ничего нет =)';
  let parsedData = { localQuery: '', localFilters: { isShort: false }, localSaved: [] };
  if (!isSavedPage) {
    try {
      const storedData = window.localStorage.getItem('movies-explorer-last-query');
      if (storedData) {
        parsedData = JSON.parse(storedData);
        if (parsedData.localSaved.length === 0) {
          defaultMsgForUser = 'Ничего не найдено =(';
        }
      }
    } catch {
      console.log('Не удалось разобрать json из localStorage');
    }
  }

  const { localQuery, localFilters, localSaved } = parsedData;

  const [userQuery, setUserQuery] = useState(localQuery);
  const [messageForUser, setMessageForUser] = useState(defaultMsgForUser);

  const [filters, setFilters] = useState<any>(localFilters);
  const [isActiveFilters, setIsActiveFilters] = useState(false);

  const [filteredFilms, setFilteredFilms] = useState<any>([]);
  console.log(localSaved, isSavedPage);
  const [visibleFilms, setVisibleFilms] = useState<any>(localSaved);

  // сброс поиска
  const onReset = () => {
    setUserQuery('');
    setFilters({ isShort: false });
    if (isSavedPage) window.localStorage.removeItem('movies-explorer-last-query');
  };

  // при поиске установить новый запрос
  const onSearch = (e: FormEvent<HTMLFormElement>, value: string) => {
    e.preventDefault();
    if (value === userQuery) {
      setMessageForUser('Я уже пытался! Измените запрос пожалуйста...');
      return;
    }
    setUserQuery(value.toLowerCase());
  };

  // создать объект для записи в localStorage
  const getJsonQuery = (): string => {
    const data = {
      localQuery: userQuery,
      localFilters: filters,
      localSaved: visibleFilms,
    };
    return JSON.stringify(data);
  };

  // Функция для обновления локального хранилища и сообщения для пользователя
  const updateLocalStorage = () => {
    if ((userQuery || isActiveFilters) && visibleFilms.length === 0) {
      setMessageForUser('Ничего не найдено =(');
    } else if (isSavedPage && visibleFilms.length === 0) {
      setMessageForUser('Здесь пока ничего нет =)');
    } else {
      setMessageForUser('');
    }

    if ((userQuery || isActiveFilters) && !isSavedPage) {
      window.localStorage.setItem('movies-explorer-last-query', getJsonQuery());
    }
  };

  // Функция для обновления фильтров
  const updateFilters = () => {
    setIsActiveFilters(Object.keys(filters).some((key: string): boolean => filters[key]));
  };

  // Функция для обновления отфильтрованных фильмов
  const updateFilteredFilms = () => {
    setFilteredFilms((isSavedPage ? savedFilms : allFilms)
      .filter((el: any): boolean => (
        (filters.isShort ? el.duration < 40 : true)
      )));
  };

  // Функция для обновления видимых фильмов
  const updateVisibleFilms = () => {
    const filteredByQuery = filteredFilms
      .filter((el: any): boolean => (
        el.nameRU.toLowerCase().includes(userQuery)
        || el.nameEN.toLowerCase().includes(userQuery)));

    setVisibleFilms(filteredByQuery);
  };

  // Эффект для обновления фильтров и отфильтрованных фильмов
  useEffect(() => {
    updateFilters();
    updateFilteredFilms();
  }, [updateFilters, updateFilteredFilms]);

  useEffect(() => {
    setIsSavedPage(location.pathname === '/saved-movies');
  }, [location.pathname]);

  // как только для пользователя установлен видимый массив карточек
  useEffect(() => {
    updateLocalStorage();
  }, [updateLocalStorage]);

  // // установить видимые карточки
  useEffect(() => {
    updateVisibleFilms();
  }, [updateVisibleFilms]);

  const [baseLimit, setBaseLimit] = useState(12);
  const [addedLimit, setAddedLimit] = useState(3);
  const [cntAddedContent, setCntAddedContent] = useState(0);
  const [cntVisibleFilms, setCntVisibleFilms] = useState<any>(null);

  const toTwoColumn = useMediaQuery('only screen and (max-width: 1095px)');
  const toOneColumn = useMediaQuery('only screen and (max-width: 683px)');

  // Functions
  const onClickToAddContent = () => { setCntAddedContent(cntAddedContent + 1); };
  const onClickToReset = () => { setCntAddedContent(0); };

  // Use Effects
  useEffect(() => {
    if (toTwoColumn) {
      setBaseLimit(8);
      setAddedLimit(2);
    } else if (toOneColumn) {
      setBaseLimit(5);
      setAddedLimit(2);
    } else {
      setBaseLimit(12);
      setAddedLimit(3);
    }
  }, [toTwoColumn, toOneColumn]);

  useEffect(() => {
    setCntVisibleFilms(baseLimit + addedLimit * cntAddedContent);
  }, [baseLimit, addedLimit, cntAddedContent]);

  return (
    <PageWithFilms
      allFilms={allFilms}
      savedFilms={savedFilms}
      setAllFilms={setAllFilms}
      setSavedFilms={setSavedFilms}
      onClickSaveBtn={onClickSaveBtn}
      visibleFilms={visibleFilms}
      userQuery={userQuery}
      isActiveFilters={isActiveFilters}
      isSavedPage={isSavedPage}
      localQuery={localQuery}
      filters={filters}
      setFilters={setFilters}
      onReset={onReset}
      onSearch={onSearch}
      messageForUser={messageForUser}
      onClickToAddContent={onClickToAddContent}
      onClickToReset={onClickToReset}
      cntVisibleFilms={cntVisibleFilms}
    />
  );
}

export default MoviesContainer;
