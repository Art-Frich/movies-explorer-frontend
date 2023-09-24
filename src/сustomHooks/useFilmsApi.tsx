import { useCallback, useState } from 'react';
import mainApi from '../helpers/utils/MainApi';
import { parseMovieData } from '../helpers/utils/utils';
import moviesApi from '../helpers/utils/MoviesApi';

export default function useFilmsApi() {
  const [allFilms, setAllFilms] = useState<any>([]);
  const [savedFilms, setSavedFilms] = useState<any>([]);

  const funcSetAllFilms = (allFilmsData: any) => {
    if (allFilms.length === 0) {
      setAllFilms(allFilmsData
        .map((film: any) => {
          const parsedFilm = parseMovieData(film);
          return { ...parsedFilm };
        }));
    }
  };

  const getSavedFilms = useCallback(async () => {
    if (savedFilms.length === 0) {
      const filmsData = (await mainApi.getAllSavedMovies()).data;
      setSavedFilms(filmsData);
    }
  }, []);

  const getAllFilms = useCallback(async () => {
    if (savedFilms.length === 0) {
      const savedFilmsData = (await mainApi.getAllSavedMovies()).data;
      const allFilmsData = await moviesApi.getMovies();
      setSavedFilms(savedFilmsData);
      funcSetAllFilms(allFilmsData);
    } else if (allFilms.length === 0) {
      const allFilmsData = await moviesApi.getMovies();
      funcSetAllFilms(allFilmsData);
    }
  }, [savedFilms]);

  return {
    allFilms, setSavedFilms, savedFilms, getSavedFilms, getAllFilms,
  };
}
