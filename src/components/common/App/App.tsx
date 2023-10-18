import './App.css';

import React, { useEffect, useState } from 'react';
import {
  Outlet, Route, Routes,
} from 'react-router-dom';

import { useCurrentUser } from '../../../contexts/CurrentUserContext';

import MainContainer from '../../../containers/MainContainer';
import NotFoundContainer from '../../../containers/NotFoundContainer';
import MoviesContainer from '../../../containers/MoviesContainer';
import ProfileContainer from '../../../containers/ProfileContainer';
import RegisterContainer from '../../../containers/RegisterContainer';
import LoginContainer from '../../../containers/LoginContainer';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ProtectOfRoute from '../ProtectOfRoute';
import Preloader from '../Preloader/Preloader';
import ErrorPopup from '../ErrorPopup/ErrorPopup';

function App() {
  const curUser = useCurrentUser();
  const [isCheckJwt, setIsCheckJwt] = useState(true);

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
    (curUser.checkToken() || Promise.resolve())
      .finally(() => setIsCheckJwt(false));
  }, []);

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
                  <ProtectOfRoute<{ isSavedPage: boolean }>
                    Element={MoviesContainer}
                    onlyLoggedIn
                    data={{ isSavedPage: true }}
                  />
                )}
              />
              <Route
                path='/movies'
                element={(
                  <ProtectOfRoute<{ isSavedPage: boolean }>
                    Element={MoviesContainer}
                    onlyLoggedIn
                    data={{ isSavedPage: false }}
                  />
                )}
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
