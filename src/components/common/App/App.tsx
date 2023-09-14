import './App.css';

import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import MainContainer from '../../../containers/MainContainer';
import NotFoundContainer from '../../../containers/NotFoundContainer';
import MoviesContainer from '../../../containers/MoviesContainer';
import SavedMoviesContainer from '../../../containers/SavedMoviesContainer';
import ProfileContainer from '../../../containers/ProfileContainer';
import RegisterContainer from '../../../containers/RegisterContainer';
import LoginContainer from '../../../containers/LoginContainer';

import { CurrentUserProvider } from '../../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function App() {
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

  return (
    <CurrentUserProvider>
      <Routes>
        <Route path='/signin' element={<LoginContainer />} />
        <Route path='/signup' element={<RegisterContainer />} />
        <Route path='/' element={<AddHeader />}>
          <Route path='/profile' element={<ProfileContainer />} />
          <Route path='/' element={<AddFooter />}>
            <Route path='/saved-movies' element={<SavedMoviesContainer />} />
            <Route path='/movies' element={<MoviesContainer />} />
            <Route index element={<MainContainer />} />
          </Route>
        </Route>

        <Route path='*' element={<NotFoundContainer />} />
      </Routes>
    </CurrentUserProvider>
  );
}

export default App;
