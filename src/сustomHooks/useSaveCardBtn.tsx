/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { useErrorPopupContext } from '../contexts/ErrorPopupContext';
import mainApi from '../helpers/utils/MainApi';

// DID вынес curUser обратно на вход
export default function useSaveCardBtn({
  allFilms, setSavedFilms, setAllFilms, isSavedPage, savedFilms,
}: any) {
  const curUser = useCurrentUser();
  const popupContext = useErrorPopupContext();

  const addMovies = (dataMovie: any): any => {
    const newDataMovie = dataMovie;
    delete newDataMovie.btnType;
    return mainApi.addMovie({ ...newDataMovie, owner: curUser?.id })
      .then((res) => {
        const newDataFilm = res.data;
        setSavedFilms((prev: any) => ([...prev, { ...newDataFilm }]));
      }).catch(async (err) => (
        popupContext?.setErMsg('Не удалось добавить фильм в сохраненные')
      ));
  };

  const deleteMovie = (data: any) => {
    const index = savedFilms.findIndex((el: any) => el.movieId === data.movieId);
    const id = savedFilms[index]._id;
    mainApi
      .deleteMovie(id)
      .then(() => {
        setSavedFilms((prev: any) => {
          const updatedFilms = prev.filter((el: any) => el.movieId !== data.movieId);
          return updatedFilms;
        });
      })
      .catch(async (err) => (
        popupContext?.setErMsg('Не удалось удалить фильм из сохраненных')
      ));
  };

  const onClickSaveBtn = (data: any) => {
    if (isSavedPage || data.btnType === 'movies-card__btn_saved') {
      deleteMovie(data);
    } else {
      addMovies(data);
    }
  };

  return ([onClickSaveBtn]);
}
