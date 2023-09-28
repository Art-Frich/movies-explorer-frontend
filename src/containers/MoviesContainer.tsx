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
      moviesContext?.[isSavedPage ? 'getSavedFilms' : 'getAllFilms']();
    } catch (err) {
      setMessageForUser(
        `Во время запроса произошла ошибка.
        Возможно, проблема с соединением или сервер недоступен.
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
