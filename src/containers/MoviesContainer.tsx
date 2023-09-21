/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import React, { FormEvent, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from '@react-hook/media-query';
import moviesApi from '../helpers/utils/MoviesApi';
import PageWithFilms from '../components/pages/PageWithFilms/PageWithFilms';
import mainApi from '../helpers/utils/MainApi';
import { parseMovieData } from '../helpers/utils/utils';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import useSearcher from '../сustomHooks/useSearcher';
import useSaveCardBtn from '../сustomHooks/useSaveCardBtn';

export default function MoviesContainer() {
  const location = useLocation();
  const curUser = useCurrentUser();

  const [isSavedPage, setIsSavedPage] = useState(location.pathname !== '/movies');
  const [allFilms, setAllFilms] = useState<any>([]);
  const [savedFilms, setSavedFilms] = useState<any>([]);

  const [baseLimit, setBaseLimit] = useState(12);
  const [addedLimit, setAddedLimit] = useState(3);
  const [cntAddedContent, setCntAddedContent] = useState(0);

  const toTwoColumn = useMediaQuery('only screen and (max-width: 1095px)');
  const toOneColumn = useMediaQuery('only screen and (max-width: 683px)');

  const [
    onReset, onSearch, visibleFilms, messageForUser,
    userQuery, isActiveFilters, filters, setFilters,
  ] = useSearcher({ allFilms, savedFilms, isSavedPage });

  const [onClickSaveBtn] = useSaveCardBtn({
    allFilms, savedFilms, setAllFilms, setSavedFilms, curUser, isSavedPage,
  });

  // Functions

  // const onReset = () => {
  //   setUserQuery('');
  //   setFilters({isShort: false});
  //   setCntAddedContent(0);
  //   setMessageForUser('Здесь пока ничего нет =)');
  // };

  const onClickAddedContent = () => { setCntAddedContent(cntAddedContent + 1); };

  // Use Effects
  useEffect(() => {
    const getDataFilms = async () => {
      try {
        const filmsData = await moviesApi.getMovies();
        const savedFilmsData = await mainApi.getAllSavedMovies();

        setSavedFilms(savedFilmsData.map((film: any) => ({
          ...film, btnType: 'movies-card__btn_delete',
        })));

        setAllFilms(filmsData.map((film: any) => {
          const inSaved = savedFilmsData.some((el: any) => el.movieId === film.movieId);
          return { ...film, btnType: inSaved ? 'movies-card__btn_saved' : 'movies-card__btn_save' };
        }));
      } catch (err) {
        console.log('Ошибка при попытке получить данные о фильмах с серверов');
        console.log(err);
      }
    };

    try {
      if (allFilms.length === 0) getDataFilms();
    } catch (err) {
      console.log('Ошибка при попытке получить данные предыдущего запроса пользователя и данные с серверов');
      console.log(err);
    }
  }, []);

  useEffect(() => {
    setIsSavedPage(location.pathname !== '/movies');
  }, [location.pathname]);

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

  return (
    <PageWithFilms
      filters={filters}
      setFilters={setFilters}
      films={visibleFilms}
      onSearch={onSearch}
      isFilter={isActiveFilters}
      messageForUser={messageForUser}
      onReset={onReset}
      onClickAddedContent={onClickAddedContent}
      cntFilms={visibleFilms.length}
      userQuery={userQuery}
      onClickSaveBtn={onClickSaveBtn}
    />
  );
}

// (visibleFilms.length === 0 && localSavedFilms.length > 0
//   ? localSavedFilms
//   : visibleFilms)
//   .slice(0, baseLimit + addedLimit * cntAddedContent)
