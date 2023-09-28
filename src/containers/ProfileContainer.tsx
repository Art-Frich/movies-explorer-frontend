import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Profile from '../components/pages/Profile/Profile';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import mainApi from '../helpers/utils/MainApi';
import useForm from '../сustomHooks/useForm';
import { inputEmailSettings, inputNameSettings } from '../helpers/constants';
import { useMoviesApiContext } from '../contexts/MoviesApiContext';

const ProfileContainer = React.memo(() => {
  const { setUserData, setSbtMsg, sbtMsg } = useCurrentUser()!;
  const { setAllFilms, setSavedFilms } = useMoviesApiContext()!;
  const [isDisabledSubmitBtn, setIsDisabledSubmitBtn] = useState(true);
  const [isDisabledInput, setIsDisabledInput] = useState(true);
  const [localSbtMsg, setLocalSbtMsg] = useState(sbtMsg);

  const navigate = useNavigate();
  const curUser = useCurrentUser();

  const toEndFetch = (data: any) => {
    setUserData(data);
    setIsDisabledInput(true);
  };

  const {
    handleChangeInput, handleSubmit, resData, errors,
    values, isFetching, isValidForm, setIsFetching, setValues,
  } = useForm({ fetch: mainApi.toUpdateUserData, toEndFetch });

  const onLogout = useCallback(() => {
    setIsFetching(true);
    mainApi.toLogout()
      .then(() => {
        curUser?.logout();
        setAllFilms([]);
        setSavedFilms([]);
        window.localStorage.removeItem('movies-explorer-last-query');
        navigate('/');
      })
      .catch(() => {
        setSbtMsg('Не удалось выйти из аккаунта... Я тоже в шоке...');
      })
      .finally(() => setIsFetching(false));
  }, []);

  const onEditBtnClick = useCallback(() => {
    setIsDisabledInput(false);
    setLocalSbtMsg('');
  }, []);

  useEffect(() => {
    const flag = !(isValidForm && !isFetching && (
      (values[inputNameSettings.name] !== curUser?.name)
      || (values[inputEmailSettings.name] !== curUser?.email)));
    setIsDisabledSubmitBtn(flag);
  }, [isValidForm, values, isFetching]);

  useEffect(() => {
    setValues({
      ...values,
      [inputNameSettings.name]: curUser?.name,
      [inputEmailSettings.name]: curUser?.email,
    });
  }, []);

  return (
    <Profile
      onSubmit={handleSubmit}
      fetchCondition={isFetching}
      onLogout={onLogout}
      onEditBtnClick={onEditBtnClick}
      isDisabledInput={isDisabledInput}
      submitMsg={localSbtMsg}
      resData={resData}
      errorsInput={errors}
      onInput={handleChangeInput}
      isDisabledSubmitBtn={isDisabledSubmitBtn}
      valuesInput={values}
    />
  );
});

export default ProfileContainer;
