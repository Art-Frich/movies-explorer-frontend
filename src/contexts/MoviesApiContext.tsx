import React, {
  useCallback, useState, useContext, useMemo, createContext, ReactNode,
} from 'react';
import mainApi from '../helpers/utils/MainApi';
import { parseMovieData } from '../helpers/utils/utils';
import moviesApi from '../helpers/utils/MoviesApi';
import { IdataFilmOriginal, IdataFilmResult, IdataSavedFilm } from '../helpers/InterfacesOfDataFilm';

interface IMoviesApiContext {
  allFilms: IdataFilmResult[],
  savedFilms: IdataSavedFilm[],
  isSearch: boolean,
  setSavedFilms: (
    newVal: IdataSavedFilm[] | ((prev: IdataSavedFilm[]) => IdataSavedFilm[])
  ) => void,
  getSavedFilms: () => void,
  getAllFilms: () => void,
  setIsSearch: (newVal: boolean) => void,
  setAllFilms: (newVal: IdataFilmResult[]) => void,
}

interface IReactChildren {
  children: ReactNode
}

const MoviesApiContext = createContext<IMoviesApiContext | undefined>(undefined);

export const useMoviesApiContext = () => {
  const context = useContext(MoviesApiContext);

  if (context === undefined) {
    throw new Error('useCurrentUser must be used within a MoviesApiProvider');
  }

  return context;
};

export function MoviesApiProvider({ children }: IReactChildren) {
  const [allFilms, setAllFilms] = useState<IdataFilmResult[] | []>([]);
  const [savedFilms, setSavedFilms] = useState<IdataSavedFilm[] | []>([]);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  // отрабатывает, когда сохраненок нет, предотвращая постоянные запросы
  const [isFirstQuery, setIsFirstQuery] = useState(true);

  const funcSetAllFilms = (allFilmsData: IdataFilmOriginal[]) => {
    if (allFilms.length === 0) {
      setAllFilms(allFilmsData
        .map((film: IdataFilmOriginal) => {
          const parsedFilm = parseMovieData(film);
          return { ...parsedFilm };
        }));
    }
  };

  const handleQuery = async (func: () => void) => {
    setIsSearch(true);
    await func();
    setIsSearch(false);
  };

  const getSavedFilms = useCallback(async () => {
    if (savedFilms.length === 0 && isFirstQuery) {
      handleQuery(async () => {
        const filmsData = (await mainApi.getAllSavedMovies()).data;
        setSavedFilms(filmsData);
        setIsFirstQuery(false);
      });
    }
  }, [savedFilms]);

  const getAllFilms = useCallback(async () => {
    if (savedFilms.length === 0 && isFirstQuery) {
      handleQuery(async () => {
        const savedFilmsData = (await mainApi.getAllSavedMovies()).data;
        const allFilmsData = await moviesApi.getMovies();
        setSavedFilms(savedFilmsData);
        setIsFirstQuery(false);
        funcSetAllFilms(allFilmsData);
      });
    } else if (allFilms.length === 0) {
      handleQuery(async () => {
        const allFilmsData = await moviesApi.getMovies();
        funcSetAllFilms(allFilmsData);
      });
    }
  }, [savedFilms, allFilms]);

  const contextValue = useMemo(() => ({
    allFilms,
    setSavedFilms,
    savedFilms,
    getSavedFilms,
    getAllFilms,
    isSearch,
    setIsSearch,
    setAllFilms,
  }), [allFilms, savedFilms, isSearch]);

  return (
    <MoviesApiContext.Provider value={contextValue}>
      {children}
    </MoviesApiContext.Provider>
  );
}
