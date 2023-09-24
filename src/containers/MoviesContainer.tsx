/* eslint-disable react/destructuring-assignment */
import React, {
  useState, useEffect, useCallback,
} from 'react';

import { useLocation } from 'react-router-dom';
import PageWithFilms from '../components/pages/PageWithFilms/PageWithFilms';
import useSaveCardBtn from '../сustomHooks/useSaveCardBtn';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import useSearcher from '../сustomHooks/useSearcher';
import useSetterVisibleFilms from '../сustomHooks/useSetterVisibleFilms';
import { parseMovieData } from '../helpers/utils/utils';
import moviesApi from '../helpers/utils/MoviesApi';
import mainApi from '../helpers/utils/MainApi';

function MoviesContainer() {
  const location = useLocation();
  const curUser = useCurrentUser();

  const [allFilms, setAllFilms] = useState<any>([]);
  const [savedFilms, setSavedFilms] = useState<any>([]);
  const [isSavedPage, setIsSavedPage] = useState<any>(location.pathname === '/saved-movies');

  const [onClickSaveBtn] = useSaveCardBtn({
    allFilms, setAllFilms, setSavedFilms, curUser, isSavedPage,
  });

  const objSearchProps = useSearcher({ allFilms, savedFilms, isSavedPage });
  const objVisibleFilmsProps = useSetterVisibleFilms();
  const { setMessageForUser } = objSearchProps;

  const getDataFilms = useCallback(async () => {
    try {
      const filmsData = await moviesApi.getMovies();
      const savedFilmsData = (await mainApi.getAllSavedMovies()).data;

      setSavedFilms(savedFilmsData.map((film: any) => ({
        ...film, btnType: 'movies-card__btn_delete',
      })));

      setAllFilms(filmsData.map((film: any) => {
        const parsedFilm = parseMovieData(film);
        const indexInSaved = savedFilmsData
          .findIndex((el: any) => el.movieId === parsedFilm.movieId);
        return indexInSaved > -1
          ? { ...savedFilmsData[indexInSaved], btnType: 'movies-card__btn_saved' }
          : { ...parsedFilm, btnType: 'movies-card__btn_save' };
      }));
    } catch (err) {
      // \n не отрабатывают
      setMessageForUser(
        `Во время запроса произошла ошибка.\n
        Возможно, проблема с соединением или сервер недоступен.\n
        Подождите немного и попробуйте ещё раз`
      );
      console.log('Ошибка при попытке получить данные о фильмах с серверов');
      console.log(err);
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
