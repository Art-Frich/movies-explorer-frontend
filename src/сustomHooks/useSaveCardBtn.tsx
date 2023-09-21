/* eslint-disable no-console */
import mainApi from '../helpers/utils/MainApi';

export default function useSaveCardBtn({
  allFilms, savedFilms, setAllFilms, setSavedFilms, curUser, isSavedPage,
}: any) {
  const addMovies = (dataMovie: any): any => (
    mainApi.addMovie({ ...dataMovie, owner: curUser?.id })
      .then((res) => {
        console.log(res);
        const newDataFilm = res.data;
        const index = allFilms.indexOf((el: any) => el.movieId === newDataFilm.movieId);

        setSavedFilms((prev: any) => ([...prev, { ...newDataFilm, btnType: 'movies-card__btn_delete' }]));
        setAllFilms((prev: any) => prev.splice(index, 1, { ...newDataFilm, btnType: 'movies-card__btn_saved' }));
      }).catch(async (err) => (
        console.log(`Не удалось добавить фильм в сохраненные: ${(await err).message}`)
      ))
  );

  const deleteMovie = (data: any) => {
    mainApi
      .deleteMovie(data)
      .then(() => {
        let index = savedFilms.indexOf((el: any) => el.movieId === data.movieId);
        setSavedFilms((prev: any) => prev.splice(index, 1));

        index = allFilms.indexOf((el: any) => el.movieId === data.movieId);
        setAllFilms((prev: any) => prev.splice(index, 1, { ...data, btnType: 'movies-card__btn_save' }));
      })
      .catch(async (err) => (
        console.log(`Не удалось удалить фильм из сохраненных: ${(await err).message}`)
      ));
  };

  const onClickSaveBtn = (data: any) => {
    console.log(data);
    if (isSavedPage || data.btnType === 'movies-card__btn_saved') {
      deleteMovie(data);
    } else {
      addMovies(data);
    }
  };

  return ([onClickSaveBtn]);
}
