/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-lone-blocks */
import './App.css';

import React, { useCallback, useEffect, useState } from 'react';
import {
  Outlet, Route, Routes,
} from 'react-router-dom';

import MainContainer from '../../../containers/MainContainer';
import NotFoundContainer from '../../../containers/NotFoundContainer';
import MoviesContainer from '../../../containers/MoviesContainer';
import ProfileContainer from '../../../containers/ProfileContainer';
import RegisterContainer from '../../../containers/RegisterContainer';
import LoginContainer from '../../../containers/LoginContainer';

import { useCurrentUser } from '../../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ProtectOfRoute from '../ProtectOfRoute';
import Preloader from '../Preloader/Preloader';
import mainApi from '../../../helpers/utils/MainApi';
import useUserData from '../../../сustomHooks/useUserData';
import moviesApi from '../../../helpers/utils/MoviesApi';
import { parseMovieData } from '../../../helpers/utils/utils';
import ErrorPopup from '../ErrorPopup/ErrorPopup';
import { useErrorPopupContext } from '../../../contexts/ErrorPopupContext';

// DID убрал функционал клика по кнопке Save
// разделил крючки авторизации и получения данных о фильмах
// возможно фильмы тоже нахер отсюда
// возможно пропсы через ProtectedRoute - плохая затея

function App() {
  const curUser = useCurrentUser();
  const errPopupContext = useErrorPopupContext();
  const { setUserDataAndLogin } = useUserData();
  const [isCheckJwt, setIsCheckJwt] = useState(true);

  // const [allFilms, setAllFilms] = useState<any>([]);
  // const [savedFilms, setSavedFilms] = useState<any>([]);

  // const moviesProps = {
  //   savedFilms, setSavedFilms,
  // };

  const AddHeader = React.memo(() => (
    <>
      <Header />
      <Outlet />
    </>
  ));

  const AddFooter = React.memo(() => (
    <>
      <Outlet />
      <Footer />
    </>
  ));

  // const getDataFilms = useCallback(async () => {
  //   try {
  //     const filmsData = await moviesApi.getMovies();
  //     const savedFilmsData = (await mainApi.getAllSavedMovies()).data;

  //     setSavedFilms(savedFilmsData.map((film: any) => ({
  //       ...film, btnType: 'movies-card__btn_delete',
  //     })));

  //     setAllFilms(filmsData.map((film: any) => {
  //       const parsedFilm = parseMovieData(film);
  //       const indexInSaved = savedFilmsData
  //         .findIndex((el: any) => el.movieId === parsedFilm.movieId);
  //       return indexInSaved > -1
  //         ? { ...savedFilmsData[indexInSaved], btnType: 'movies-card__btn_saved' }
  //         : { ...parsedFilm, btnType: 'movies-card__btn_save' };
  //     }));
  //   } catch (err) {
  //     console.log('Ошибка при попытке получить данные о фильмах с серверов');
  //     console.log(err);
  //   }
  // }, []);

  // проверяю токен
  useEffect(() => {
    if (!curUser?.loggedIn) {
      mainApi.checkJWT()
        .then((res) => {
          setUserDataAndLogin({ values: res, curUser });
        })
        .catch(() => {
        })
        .finally(() => setIsCheckJwt(false));
    }
  }, []);

  // // получаю фильмы
  // useEffect(() => {
  //   if (curUser?.loggedIn) getDataFilms();
  //   // TODO такая зависимость вызывает лишнее срабатывание при logout
  // }, [curUser?.loggedIn]);

  // isCheckJwt чтобы избежать ложного срабатывания защиты ProtectOfRoute
  return (
    <>
      <ErrorPopup />
      {isCheckJwt ? <Preloader /> : (
        <Routes>
          <Route path='/signin' element={<ProtectOfRoute Element={LoginContainer} />} />
          <Route path='/signup' element={<ProtectOfRoute Element={RegisterContainer} />} />
          <Route path='/' element={<AddHeader />}>
            <Route path='/profile' element={<ProtectOfRoute Element={ProfileContainer} onlyLoggedIn />} />
            <Route path='/' element={<AddFooter />}>
              <Route
                path='/saved-movies'
                element={(
                  <ProtectOfRoute Element={MoviesContainer} onlyLoggedIn />
                )}
              />
              <Route
                path='/movies'
                element={
                  <ProtectOfRoute Element={MoviesContainer} onlyLoggedIn />
                }
              />
              <Route index element={<MainContainer />} />
            </Route>
          </Route>
          <Route path='*' element={<NotFoundContainer />} />
        </Routes>
      )}
    </>
  );
}

export default App;
