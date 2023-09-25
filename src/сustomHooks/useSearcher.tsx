import {
  useState, useEffect, FormEvent, useCallback,
} from 'react';
import { useErrorPopupContext } from '../contexts/ErrorPopupContext';
import { useMoviesApiContext } from '../contexts/MoviesApiContext';

export default function useSearcher({ isSavedPage }: any) {
  const popupContext = useErrorPopupContext();
  const { allFilms, savedFilms, getAllFilms } = useMoviesApiContext()!;

  // TODO убрать после ревью в PageWithFilms
  // let defaultMsgForUser = 'Здесь пока ничего нет =)';
  let defaultMsgForUser = '';
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
  const [isActiveFilters, setIsActiveFilters] = useState(
    Object.keys(filters).some((key: string): boolean => filters[key])
  );

  const [filteredFilms, setFilteredFilms] = useState<any>([]);
  const [visibleFilms, setVisibleFilms] = useState<any>([]);

  // TODO убрать после ревью в PageWithFilms
  const [localFilms, setLocalFilms] = useState(localSaved);

  // сброс поиска
  const onReset = useCallback(() => {
    setUserQuery('');
    // TODO убрать после ревью в PageWithFilms
    setMessageForUser('');
    setFilters({ isShort: false });
    if (!isSavedPage) {
      window.localStorage.removeItem('movies-explorer-last-query');
      // TODO убрать после ревью в PageWithFilms
      setLocalFilms([]);
      if (allFilms.length === 0) getAllFilms();
    }
  }, [isSavedPage]);

  // при поиске установить новый запрос
  const onSearch = useCallback((e: FormEvent<HTMLFormElement>, value: string) => {
    e.preventDefault();
    if (value === userQuery) {
      setMessageForUser('Я уже пытался! Измените запрос пожалуйста...');
      return;
    }
    // TODO убрать после ревью
    setLocalFilms([]);
    if (allFilms.length === 0) getAllFilms();
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
      // TODO раскомментировать после ревью
      // setMessageForUser('');
    }

    if ((userQuery || isActiveFilters) && !isSavedPage) {
      window.localStorage.setItem('movies-explorer-last-query', getJsonQuery());
    }
  }, [visibleFilms]);

  // Функция для обновления фильтров
  const updateFilters = useCallback(async () => {
    const isActive = Object.keys(filters).some((key: string): boolean => filters[key]);
    setIsActiveFilters(isActive);
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
        || el.nameEN.toLowerCase().includes(userQuery)))
      .map((el: any) => {
        let btnType = '';
        if (isSavedPage) { btnType = 'movies-card__btn_delete'; }
        if (!btnType) {
          const isSavedFilm = savedFilms.some((film: any) => film.movieId === el.movieId);
          btnType = isSavedFilm ? 'movies-card__btn_saved' : 'movies-card__btn_save';
        }
        return { ...el, btnType };
      });

    setVisibleFilms((filteredByQuery.length === 0 && localFilms.length > 0)
      ? localFilms
      : filteredByQuery);
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
