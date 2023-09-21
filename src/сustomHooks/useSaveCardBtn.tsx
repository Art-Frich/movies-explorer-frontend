/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import mainApi from '../helpers/utils/MainApi';

export default function useSaveCardBtn({
  allFilms, savedFilms, setAllFilms, setSavedFilms, curUser, isSavedPage,
}: any) {
  const addMovies = (dataMovie: any): any => {
    const newDataMovie = dataMovie;
    delete newDataMovie.btnType;
    return mainApi.addMovie({ ...newDataMovie, owner: curUser?.id })
      .then((res) => {
        const newDataFilm = res.data;
        const index = allFilms.findIndex((el: any) => el.movieId === newDataFilm.movieId);

        setSavedFilms((prev: any) => ([...prev, { ...newDataFilm, btnType: 'movies-card__btn_delete' }]));
        setAllFilms((prev: any) => {
          prev.splice(index, 1, { ...newDataFilm, btnType: 'movies-card__btn_saved' });
          return [...prev];
        });
      }).catch(async (err) => (
        console.log(`Не удалось добавить фильм в сохраненные: ${(await err).message}`)
      ));
  };

  const deleteMovie = (data: any) => {
    mainApi
      .deleteMovie(data._id)
      .then(() => {
        let index = savedFilms.findIndex((el: any) => el.movieId === data.movieId);
        setSavedFilms((prev: any) => prev.splice(index, 1));

        index = allFilms.findIndex((el: any) => el.movieId === data.movieId);
        const updateData = data;
        delete updateData._id;
        delete updateData.__v;
        setAllFilms((prev: any) => {
          prev.splice(index, 1, { ...updateData, btnType: 'movies-card__btn_save' });
          return prev;
        });
      })
      .catch(async (err) => (
        console.log(`Не удалось удалить фильм из сохраненных: ${(await err).message}`)
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
