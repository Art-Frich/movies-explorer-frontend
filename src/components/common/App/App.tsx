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

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isCheckJwt, setIsCheckJwt] = useState(true);
  const curUser = useCurrentUser();
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

  useEffect(() => {
    if (!curUser?.loggedIn) {
      mainApi.checkJWT()
        .then(() => {
          curUser?.login();
        })
        .catch(() => {
          console.log('Не удалось авторизоваться автоматически');
        })
        .finally(() => setIsCheckJwt(false));
    }
  }, []);

  return (
    isCheckJwt ? <Preloader /> : (
      <Routes>
        <Route path='/signin' element={<LoginContainer />} />
        <Route path='/signup' element={<RegisterContainer />} />
        <Route path='/' element={<AddHeader />}>
          <Route path='/profile' element={<ProtectOfRoute Element={ProfileContainer} />} />
          <Route path='/' element={<AddFooter />}>
            <Route path='/saved-movies' element={<ProtectOfRoute Element={MoviesContainer} />} />
            <Route path='/movies' element={<ProtectOfRoute Element={MoviesContainer} />} />
            <Route index element={<MainContainer />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFoundContainer />} />
      </Routes>
    )
  );
}

export default App;

{ /* <Routes>
<Route path='/signin' element={<LoginContainer />} />
<Route path='/signup' element={<RegisterContainer />} />
<Route path='/' element={<AddHeader />}>
  <Route path='/profile' element={<ProtectOfRoute element={ProfileContainer} />} />
  <Route path='/' element={<AddFooter />}>
    <Route path='/saved-movies' element={<ProtectOfRoute element={MoviesContainer} />} />
    <Route path='/movies' element={<ProtectOfRoute element={MoviesContainer} />} />
    <Route index element={<MainContainer />} />
  </Route>
</Route>
<Route path='*' element={<NotFoundContainer />} />
</Routes> */ }
