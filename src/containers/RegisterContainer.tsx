import React from 'react';

import PageWithLogin from '../components/pages/PageWithLogin/PageWithLogin';
import mainApi from '../helpers/utils/MainApi';
import useUserData from '../сustomHooks/useUserData';
import { useErrorPopupContext } from '../contexts/ErrorPopupContext';

export default function RegisterContainer() {
  const popupContext = useErrorPopupContext();
  const { setUserDataAndLoginAndNavToFilms } = useUserData();

  const toEndFetch = ({ values, curUser }: any) => mainApi.toLoginUser(values)
    .then(() => setUserDataAndLoginAndNavToFilms({ values, curUser }))
    .catch(() => popupContext?.setErMsg('Непредвиденная богами ошибка при попытке автоматического логининга'));

  const propsOfUseForm = {
    fetch: mainApi.toRegisterUser,
    toEndFetch,
    sbtSucMsg: 'Подождите ещё немного и я перекину вас к фильмам ;)',
  };

  const inputTypes = { inputTypeEmail: true, inputTypePassword: true, inputTypeName: true };
  const formSetting = {
    name: 'register-user-form',
    title: 'Добро пожаловать!',
    sbtBtnText: 'Зарегистрироваться',
    questionText: 'Уже зарегистрированы?',
    pathLink: '/signin',
    linkText: 'Войти',
  };

  return (
    <PageWithLogin
      propsOfUseForm={propsOfUseForm}
      inputTypes={inputTypes}
      formSetting={formSetting}
    />
  );
}
