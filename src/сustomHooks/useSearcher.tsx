import { useState, useEffect, FormEvent } from 'react';

export default function useSearcher({ allFilms, savedFilms, isSavedPage }: any) {
  const [userQuery, setUserQuery] = useState('');
  const [messageForUser, setMessageForUser] = useState('Здесь пока ничего нет =)');

  const [filters, setFilters] = useState<any>({ isShort: false });
  const [isActiveFilters, setIsActiveFilters] = useState(false);

  const [filteredFilms, setFilteredFilms] = useState<any>([]);
  const [visibleFilms, setVisibleFilms] = useState<any>([]);

  // создать объект для записи в localStorage
  const getJsonQuery = (): string => {
    const data = {
      localQuery: userQuery,
      localFilters: filters,
      localSaved: visibleFilms,
    };
    return JSON.stringify(data);
  };

  // первый useEffect чекает локальные сохры
  useEffect(() => {
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
  }, []);

  // если меняется filters, значит надо изменить isActiveFilteres
  useEffect(() => {
    setIsActiveFilters(Object.keys(filters).some((key: string): boolean => filters[key]));
  }, [filters]);

  // как только для пользователя установлен массив
  useEffect(() => {
    console.log('i work');
    if ((userQuery || isActiveFilters) && visibleFilms.length === 0) {
      setMessageForUser('Ничего не найдено =(');
    }

    // если был запрос - закинуть данные о нем в локал или удалить вовсе
    if ((userQuery || isActiveFilters) && !isSavedPage) {
      window.localStorage.setItem('movies-explorer-last-query', getJsonQuery());
    } else {
      window.localStorage.removeItem('movies-explorer-last-query');
    }
  }, visibleFilms);

  // отфильтровать соотв. массив по чекбоксам
  useEffect(() => {
    setFilteredFilms((isSavedPage ? savedFilms : allFilms)
      .filter((el: any): boolean => (
        (filters.isShort ? el.duration < 40 : true)
      )));
  }, [filters, allFilms, savedFilms]);

  // установить видимые карточки
  useEffect(() => {
    const filteredByQuery = filteredFilms
      .filter((el: any): boolean => (
        el.nameRU.toLowerCase().includes(userQuery)
        || el.nameEN.toLowerCase().includes(userQuery)));
    setVisibleFilms(filteredByQuery);
  }, [userQuery, filteredFilms]);

  // сброс поиска
  const onReset = () => {
    setUserQuery('');
    setFilters({ isShort: false });
    setMessageForUser('Здесь пока ничего нет =)');
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

  return [
    onReset, onSearch, visibleFilms, messageForUser,
    userQuery, isActiveFilters, filters, setFilters,
  ];
}
