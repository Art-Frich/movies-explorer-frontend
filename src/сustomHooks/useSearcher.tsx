/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useState, useEffect, FormEvent, useCallback,
} from 'react';

export default function useSearcher({ allFilms, savedFilms, isSavedPage }: any) {
  const [userQuery, setUserQuery] = useState('');
  const [messageForUser, setMessageForUser] = useState('Здесь пока ничего нет =)');

  const [filters, setFilters] = useState<any>({ isShort: false });
  const [isActiveFilters, setIsActiveFilters] = useState(false);

  const [filteredFilms, setFilteredFilms] = useState<any>([]);
  const [visibleFilms, setVisibleFilms] = useState<any>([]);

  // сброс поиска
  const onReset = useCallback(() => {
    setUserQuery('');
    setFilters({ isShort: false });
    setMessageForUser('Здесь пока ничего нет =)');
    window.localStorage.removeItem('movies-explorer-last-query');
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
    }

    if ((userQuery || isActiveFilters) && !isSavedPage) {
      const data = {
        localQuery: userQuery,
        localFilters: filters,
        localSaved: visibleFilms,
      };
      window.localStorage.setItem('movies-explorer-last-query', JSON.stringify(data));
    }
    // else {
    //   window.localStorage.removeItem('movies-explorer-last-query');
    // }
  }, [visibleFilms]);
  // }, [userQuery, isActiveFilters, visibleFilms, filters, isSavedPage]);

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

  // первый useEffect чекает локальные сохры
  useEffect(() => {
    if (!isSavedPage) {
      try {
        const storedData = window.localStorage.getItem('movies-explorer-last-query');
        if (storedData) {
          const { localQuery, localFilters, localSaved } = JSON.parse(storedData) as {
            localQuery: string;
            localFilters: Record<string, boolean>;
            localSaved: any[];
          };

          setUserQuery(localQuery);
          setFilters((prev: Record<string, boolean>) => ({ ...prev, ...localFilters }));
          setVisibleFilms(localSaved);
        }
      } catch (err) {
        console.error('Ошибка при выгрузке локальных данных последнего запроса');
        console.log(err);
      }
    }
  }, []);

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

  return [
    onReset, onSearch, visibleFilms, messageForUser,
    userQuery, isActiveFilters, filters, setFilters,
  ];
}
