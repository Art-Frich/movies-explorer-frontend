import React, {
  useEffect, useCallback,
} from 'react';

import PageWithFilms from '../components/pages/PageWithFilms/PageWithFilms';
import useSaveCardBtn from '../сustomHooks/useSaveCardBtn';
import useSearcher from '../сustomHooks/useSearcher';
import useSetterVisibleFilms from '../сustomHooks/useSetterVisibleFilms';
import { useErrorPopupContext } from '../contexts/ErrorPopupContext';
import { useMoviesApiContext } from '../contexts/MoviesApiContext';

function MoviesContainer({ data }: any) {
  const popupContext = useErrorPopupContext();
  const moviesContext = useMoviesApiContext();

  const { isSavedPage } = data;

  const objVisibleFilmsProps = useSetterVisibleFilms();
  const objSearchProps = useSearcher({ isSavedPage });
  const [onClickSaveBtn] = useSaveCardBtn({ isSavedPage });

  const { setMessageForUser } = objSearchProps;

  const getDataFilms = useCallback(() => {
    try {
      if (isSavedPage) {
        moviesContext?.getSavedFilms();
      } else {
        // TODO раскомментировать после ревью
        // moviesContext?.getAllFilms();
      }
    } catch (err) {
      // \n не отрабатывают
      setMessageForUser(
        `Во время запроса произошла ошибка.\n
        Возможно, проблема с соединением или сервер недоступен.\n
        Подождите немного и попробуйте ещё раз`
      );
      popupContext?.setErMsg('Ошибка при попытке получить данные о фильмах с серверов');
    }
  }, [isSavedPage]);

  useEffect(() => {
    getDataFilms();
  }, [isSavedPage]);

  return (
    <PageWithFilms data={{
      ...objSearchProps,
      ...objVisibleFilmsProps,
      onClickSaveBtn,
      isSavedPage,
    }}
    />
  );
}

export default MoviesContainer;
