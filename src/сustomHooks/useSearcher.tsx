import {
  useState, useEffect, FormEvent, useCallback,
} from 'react';
import { useLocation } from 'react-router-dom';
import { useErrorPopupContext } from '../contexts/ErrorPopupContext';
import { useMoviesApiContext } from '../contexts/MoviesApiContext';

export default function useSearcher({ isSavedPage }: any) {
  const popupContext = useErrorPopupContext();
  const { allFilms, savedFilms } = useMoviesApiContext()!;

  let defaultMsgForUser = '';
  let parsedData = { localQuery: '', localFilters: { isShort: false }, localSaved: [] };
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

  const { localQuery, localFilters, localSaved } = parsedData;

  const [userQuery, setUserQuery] = useState(isSavedPage ? '' : localQuery);
  const [messageForUser, setMessageForUser] = useState(defaultMsgForUser);

  const [filters, setFilters] = useState<any>(isSavedPage ? { isShort: false } : localFilters);
  const [isActiveFilters, setIsActiveFilters] = useState(
    Object.keys(filters).some((key: string): boolean => filters[key])
  );

  const [filteredFilms, setFilteredFilms] = useState<any>([]);
  const [visibleFilms, setVisibleFilms] = useState<any>(localSaved);

  // создать объект для записи в localStorage
  const getJsonQuery = (): string => {
    const data = {
      localQuery: userQuery,
      localFilters: filters,
      localSaved: visibleFilms,
    };
    return JSON.stringify(data);
  };

  // сброс поиска
  const onReset = useCallback(() => {
    setUserQuery('');
    setFilters({ isShort: false });
    if (!isSavedPage) {
      window.localStorage.removeItem('movies-explorer-last-query');
    }
  }, [isSavedPage, allFilms, savedFilms]);

  // при поиске установить новый запрос
  const onSearch = useCallback((e: FormEvent<HTMLFormElement> | null, value: string) => {
    e?.preventDefault();
    if (value === userQuery) {
      setMessageForUser('Я уже пытался! Измените запрос пожалуйста...');
      return;
    }

    setUserQuery(value.toLowerCase());
  }, [userQuery, allFilms, savedFilms, isSavedPage]);

  // Функция для обновления локального хранилища и сообщения для пользователя
  const updateLocalStorage = useCallback(() => {
    if ((userQuery || isActiveFilters) && !isSavedPage) {
      window.localStorage.setItem('movies-explorer-last-query', getJsonQuery());
    }
  }, [visibleFilms, isSavedPage, userQuery, isActiveFilters]);

  // функци обновления сообщения для пользователя
  const updateMsgForUser = useCallback(() => {
    if ((userQuery || isActiveFilters) && visibleFilms.length === 0) {
      setMessageForUser('Ничего не найдено =(');
    } else if (isSavedPage && visibleFilms.length === 0) {
      setMessageForUser('Здесь пока ничего нет =)');
    } else {
      setMessageForUser('');
    }
  }, [visibleFilms, isSavedPage, userQuery, isActiveFilters]);

  // Функция для обновления фильтров
  const updateFilters = useCallback(async () => {
    const isActive = Object.keys(filters).some((key: string): boolean => filters[key]);
    setIsActiveFilters(isActive);
  }, [filters]);

  // Функция для обновления отфильтрованных фильмов
  const updateFilteredFilms = useCallback(
    () => setFilteredFilms((
      isSavedPage ? savedFilms : allFilms)
      .filter((el: any): boolean => (
        (filters.isShort ? el.duration < 40 : true)
      ))),
    [filters, allFilms, savedFilms, isSavedPage]
  );

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

    setVisibleFilms(filteredByQuery);
  }, [filteredFilms, userQuery, isSavedPage, savedFilms]);

  // обновить под роут запрос и фильтры
  // ? ранее в этом не было необходимости...
  useEffect(() => {
    setFilters(isSavedPage ? { isShort: false } : localFilters);
    setUserQuery(isSavedPage ? '' : localQuery);
  }, [useLocation().pathname]);

  // установить видимые карточки
  useEffect(() => {
    updateVisibleFilms();
  }, [updateVisibleFilms]);

  // Эффект для обновления фильтров и отфильтрованных фильмов
  useEffect(() => {
    updateFilters();
    updateFilteredFilms();
  }, [updateFilters, updateFilteredFilms]);

  // как только для пользователя установлен видимый массив карточек
  useEffect(() => {
    updateMsgForUser();
    updateLocalStorage();
  }, [visibleFilms]);

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
