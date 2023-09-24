/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useState, useEffect, FormEvent, useCallback, useMemo,
} from 'react';
import { useErrorPopupContext } from '../contexts/ErrorPopupContext';

// DID убрал useMemo выходных пропсов
export default function useSearcher({ savedFilms, allFilms, isSavedPage }: any) {
  const popupContext = useErrorPopupContext();

  // TODO было бы слоавно переписать это лаконичнее
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
      popupContext?.setErMsg('Попытка проверить был ли у вас предыдущий запрос окончилась провалом...');
    }
  }

  const { localQuery, localFilters, localSaved } = parsedData;

  const [userQuery, setUserQuery] = useState(localQuery);
  const [messageForUser, setMessageForUser] = useState(defaultMsgForUser);

  const [filters, setFilters] = useState<any>(localFilters);
  const [isActiveFilters, setIsActiveFilters] = useState(false);

  const [filteredFilms, setFilteredFilms] = useState<any>([]);
  const [visibleFilms, setVisibleFilms] = useState<any>(localSaved);

  // сброс поиска
  const onReset = useCallback(() => {
    setUserQuery('');
    setFilters({ isShort: false });
    if (isSavedPage) window.localStorage.removeItem('movies-explorer-last-query');
  }, []);

  // при поиске установить новый запрос
  const onSearch = useCallback((e: FormEvent<HTMLFormElement>, value: string) => {
    e.preventDefault();
    if (value === userQuery) {
      setMessageForUser('Я уже пытался! Измените запрос пожалуйста...');
      return;
    }
    setUserQuery(value.toLowerCase());
  }, [userQuery]);

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
  const updateLocalStorage = useCallback(() => {
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
  }, [visibleFilms]);

  // Функция для обновления фильтров
  const updateFilters = useCallback(() => {
    setIsActiveFilters(Object.keys(filters).some((key: string): boolean => filters[key]));
  }, [filters]);

  // Функция для обновления отфильтрованных фильмов
  const updateFilteredFilms = useCallback(() => {
    setFilteredFilms((isSavedPage ? savedFilms : allFilms)
      .filter((el: any): boolean => (
        (filters.isShort ? el.duration < 40 : true)
      )));
  }, [filters, allFilms, savedFilms, isSavedPage]);

  // Функция для обновления видимых фильмов
  const updateVisibleFilms = useCallback(() => {
    const filteredByQuery = filteredFilms
      .filter((el: any): boolean => (
        el.nameRU.toLowerCase().includes(userQuery)
        || el.nameEN.toLowerCase().includes(userQuery)));

    setVisibleFilms(filteredByQuery);
  }, [filteredFilms, userQuery]);

  // Эффект для обновления фильтров и отфильтрованных фильмов
  useEffect(() => {
    updateFilters();
    updateFilteredFilms();
  }, [updateFilters, updateFilteredFilms]);

  // как только для пользователя установлен видимый массив карточек
  useEffect(() => {
    updateLocalStorage();
  }, [updateLocalStorage]);

  // // установить видимые карточки
  useEffect(() => {
    updateVisibleFilms();
  }, [updateVisibleFilms]);

  return {
    onReset,
    onSearch,
    visibleFilms,
    messageForUser,
    userQuery,
    isActiveFilters,
    filters,
    setFilters,
    localQuery,
    setMessageForUser,
  };
}
