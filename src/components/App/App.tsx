import './App.css';

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainContainer from '../../containers/MainContainer';
import NotFoundContainer from '../../containers/NotFoundContainer';
import MoviesContainer from '../../containers/MoviesContainer';
import SavedMoviesContainer from '../../containers/SavedMoviesContainer';
import ProfileContainer from '../../containers/ProfileContainer';
import RegisterContainer from '../../containers/RegisterContainer';
import LoginContainer from '../../containers/LoginContainer';

import { CurrentUserProvider } from '../../contexts/CurrentUserContext';
import Header from '../common/Header/Header';
import Footer from '../common/Footer/Footer';

function App() {
  return (
    <CurrentUserProvider>
      <Header />
      <Routes>
        <Route path='/signin' element={<LoginContainer />} />
        <Route path='/signup' element={<RegisterContainer />} />
        <Route path='/profile' element={<ProfileContainer />} />
        <Route path='/saved-movies' element={<SavedMoviesContainer />} />
        <Route path='/movies' element={<MoviesContainer />} />
        <Route path='/' element={<MainContainer />} />
        <Route path='*' element={<NotFoundContainer />} />
      </Routes>
      <Footer />
    </CurrentUserProvider>
  );
}

export default App;
