/* eslint-disable react/destructuring-assignment */
import React from 'react';

import PageWithFilms from '../components/pages/PageWithFilms/PageWithFilms';
// import moviesApi from '../helpers/utils/MoviesApi';
// import { parseMovieData } from '../helpers/utils/utils';
// import mainApi from '../helpers/utils/MainApi';

const MoviesContainer = React.memo((props: any) => {
  const {
    allFilms, savedFilms, setAllFilms, setSavedFilms,
  } = props.data;
  console.log('> render MovieContainer');

  return (
    <PageWithFilms
      allFilms={allFilms}
      savedFilms={savedFilms}
      setAllFilms={setAllFilms}
      setSavedFilms={setSavedFilms}
    />
  );
});

export default MoviesContainer;
