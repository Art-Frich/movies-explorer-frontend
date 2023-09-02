import './App.css';

import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

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
      <Routes>
        <Route path='/signin' element={<LoginContainer />} />
        <Route path='/signup' element={<RegisterContainer />} />

        {/* // add header for pages */}
        <Route
          path='/'
          element={(
            <>
              <Header />
              <Outlet />
            </>
          )}
        >
          <Route path='/profile' element={<ProfileContainer />} />

          {/* add footer for pages */}
          <Route
            path='/'
            element={(
              <>
                <Outlet />
                <Footer />
              </>
            )}
          >
            <Route path='/saved-movies' element={<SavedMoviesContainer />} />
            <Route path='/movies' element={<MoviesContainer />} />
            <Route index element={<MainContainer />} />
          </Route>
        </Route>

        {/* otherRouter */}
        <Route path='*' element={<NotFoundContainer />} />
      </Routes>
    </CurrentUserProvider>
  );
}

export default App;
