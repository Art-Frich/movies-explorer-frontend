/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-lone-blocks */
import './App.css';

import React, { useEffect, useState } from 'react';
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

function App() {
  console.log('render App');
  const curUser = useCurrentUser();
  const { setUserDataAndLogin } = useUserData();
  const [isCheckJwt, setIsCheckJwt] = useState(true);

  const [allFilms, setAllFilms] = useState<any>([]);
  const [savedFilms, setSavedFilms] = useState<any>([]);

  const addMovies = (dataMovie: any): any => {
    const newDataMovie = { ...dataMovie };
    delete newDataMovie.btnType;
    return mainApi.addMovie({ ...newDataMovie, owner: curUser?.id })
      .then((res) => {
        const newDataFilm = res.data;
        const index = allFilms.findIndex((el: any) => el.movieId === newDataFilm.movieId);

        setSavedFilms((prev: any) => ([...prev, { ...newDataFilm, btnType: 'movies-card__btn_delete' }]));
        setAllFilms((prev: any) => {
          const updatedFilms = [...prev];
          updatedFilms[index] = { ...newDataFilm, btnType: 'movies-card__btn_saved' };
          return updatedFilms;
        });
      }).catch(async (err) => (
        console.log(`Не удалось добавить фильм в сохраненные: ${(await err).message}`)
      ));
  };

  const deleteMovie = (data: any) => {
    mainApi
      .deleteMovie(data._id)
      .then(() => {
        setSavedFilms((prev: any) => {
          const updatedFilms = prev.filter((el: any) => el.movieId !== data.movieId);
          return updatedFilms;
        });

        const index = allFilms.findIndex((el: any) => el.movieId === data.movieId);
        const updateData = { ...data };
        delete updateData._id;
        delete updateData.__v;
        setAllFilms((prev: any) => {
          const updatedFilms = [...prev];
          updatedFilms[index] = { ...updateData, btnType: 'movies-card__btn_save' };
          return updatedFilms;
        });
      })
      .catch(async (err) => (
        console.log(`Не удалось удалить фильм из сохраненных: ${(await err).message}`)
      ));
  };

  const onClickSaveBtn = (data: any, isSavedPage: boolean) => {
    if (isSavedPage || data.btnType === 'movies-card__btn_saved') {
      deleteMovie(data);
    } else {
      addMovies(data);
    }
  };

  const moviesProps = {
    allFilms, savedFilms, setAllFilms, setSavedFilms, onClickSaveBtn,
  };

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

  // проверяю токен
  useEffect(() => {
    const getDataFilms = async () => {
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
        console.log('Ошибка при попытке получить данные о фильмах с серверов');
        console.log(err);
      }
    };

    try {
      if (!curUser?.loggedIn) {
        mainApi.checkJWT()
          .then((res) => {
            setUserDataAndLogin({ values: res, curUser });
          })
          .catch((err) => {
            console.log(`Не удалось авторизоваться автоматически: ${err}`);
          })
          .finally(() => setIsCheckJwt(false));
      }
    } catch (err) {
      console.log('Ошибка при попытке получить данные предыдущего запроса пользователя и данные с серверов');
      console.log(err);
    }

    if (curUser?.loggedIn) getDataFilms();
    // такая зависимость вызывает лишнее срабатывание при logout
  }, [curUser?.loggedIn]);

  // useEffect(() => {
  //   console.log(allFilms);
  // }, [allFilms]);

  return (
    // чтобы избежать ложного срабатывания защиты
    isCheckJwt ? <Preloader /> : (
      <Routes>
        <Route path='/signin' element={<ProtectOfRoute Element={LoginContainer} />} />
        <Route path='/signup' element={<ProtectOfRoute Element={RegisterContainer} />} />
        <Route path='/' element={<AddHeader />}>
          <Route path='/profile' element={<ProtectOfRoute Element={ProfileContainer} onlyLogedIn />} />
          <Route path='/' element={<AddFooter />}>
            <Route
              path='/saved-movies'
              element={(
                <ProtectOfRoute
                  Element={MoviesContainer}
                  onlyLogedIn
                  data={moviesProps}
                />
              )}
            />
            <Route
              path='/movies'
              element={(
                <ProtectOfRoute
                  Element={MoviesContainer}
                  onlyLogedIn
                  data={moviesProps}
                />
              )}
            />
            <Route index element={<MainContainer />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFoundContainer />} />
      </Routes>
    )
  );
}

export default App;
