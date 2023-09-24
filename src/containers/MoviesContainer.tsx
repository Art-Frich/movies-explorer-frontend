/* eslint-disable react/destructuring-assignment */
import React, {
  useState, useEffect, useCallback,
} from 'react';

import { useLocation } from 'react-router-dom';
import PageWithFilms from '../components/pages/PageWithFilms/PageWithFilms';
import useSaveCardBtn from '../сustomHooks/useSaveCardBtn';
import useSearcher from '../сustomHooks/useSearcher';
import useSetterVisibleFilms from '../сustomHooks/useSetterVisibleFilms';
import { parseMovieData } from '../helpers/utils/utils';
import moviesApi from '../helpers/utils/MoviesApi';
import mainApi from '../helpers/utils/MainApi';
import { useErrorPopupContext } from '../contexts/ErrorPopupContext';

function MoviesContainer() {
  const location = useLocation();
  const popupContext = useErrorPopupContext();

  const [allFilms, setAllFilms] = useState<any>([]);
  const [savedFilms, setSavedFilms] = useState<any>([]);
  const [isSavedPage, setIsSavedPage] = useState<any>(location.pathname === '/saved-movies');

  const [onClickSaveBtn] = useSaveCardBtn({
    allFilms, setAllFilms, setSavedFilms, isSavedPage, savedFilms,
  });

  const objSearchProps = useSearcher({ allFilms, savedFilms, isSavedPage });
  const objVisibleFilmsProps = useSetterVisibleFilms();
  const { setMessageForUser } = objSearchProps;

  const getDataFilms = useCallback(async () => {
    try {
      const filmsData = await moviesApi.getMovies();

      setSavedFilms((await mainApi.getAllSavedMovies()).data);
      setAllFilms(filmsData.map((film: any) => {
        const parsedFilm = parseMovieData(film);
        return { ...parsedFilm };
      }));
    } catch (err) {
      // \n не отрабатывают
      setMessageForUser(
        `Во время запроса произошла ошибка.\n
        Возможно, проблема с соединением или сервер недоступен.\n
        Подождите немного и попробуйте ещё раз`
      );
      popupContext?.setErMsg('Ошибка при попытке получить данные о фильмах с серверов');
    }
  }, []);

  // получаю фильмы
  useEffect(() => {
    getDataFilms();
    // TODO такая зависимость вызывает лишнее срабатывание при logout
  }, []);

  useEffect(() => {
    setIsSavedPage(location.pathname !== '/movies');
  }, [location.pathname]);

  return (
    <PageWithFilms data={{ ...objSearchProps, ...objVisibleFilmsProps, onClickSaveBtn }} />
  );
}

export default MoviesContainer;
