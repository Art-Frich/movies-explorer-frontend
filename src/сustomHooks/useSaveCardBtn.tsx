import { useCurrentUser } from '../contexts/CurrentUserContext';
import { useErrorPopupContext } from '../contexts/ErrorPopupContext';
import { useMoviesApiContext } from '../contexts/MoviesApiContext';
import { IdataOfBtnSave } from '../helpers/InterfacesOfDataFilm';
import mainApi from '../helpers/utils/MainApi';

export default function useSaveCardBtn({ isSavedPage }: { isSavedPage: boolean }) {
  const curUser = useCurrentUser();
  const popupContext = useErrorPopupContext();
  const { savedFilms, setSavedFilms } = useMoviesApiContext();

  const addMovies = (dataMovie: IdataOfBtnSave) => {
    const newDataMovie = dataMovie;
    delete newDataMovie.btnType;
    return mainApi.addMovie({ ...newDataMovie, owner: curUser.id })
      .then((res) => {
        const newDataFilm = res.data;
        setSavedFilms((prev) => (
          [...prev, { ...newDataFilm }]
        ));
      }).catch(() => (
        popupContext.setErMsg('Не удалось добавить фильм в сохраненные')
      ));
  };

  const deleteMovie = (data: IdataOfBtnSave) => {
    Promise.resolve()
      .then(() => {
        const index = savedFilms.findIndex((el) => el.movieId === data.movieId);
        // eslint-disable-next-line no-underscore-dangle
        const id = savedFilms[index]._id;
        mainApi.deleteMovie(id);
      })
      .then(() => {
        setSavedFilms((prev) => {
          const updatedFilms = prev.filter((el) => el.movieId !== data.movieId);
          return updatedFilms;
        });
      })
      .catch(async () => (
        popupContext.setErMsg('Не удалось удалить фильм из сохраненных')
      ));
  };

  const onClickSaveBtn = (data: IdataOfBtnSave) => {
    if (isSavedPage || data.btnType === 'movies-card__btn_saved') {
      deleteMovie(data);
    } else {
      addMovies(data);
    }
  };

  return ([onClickSaveBtn]);
}
