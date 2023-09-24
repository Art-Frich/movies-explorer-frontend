import React from 'react';
import PageWithLogin from '../components/pages/PageWithLogin/PageWithLogin';
import mainApi from '../helpers/utils/MainApi';
import useUserData from '../сustomHooks/useUserData';

export default function LoginContainer() {
  const { setUserDataAndLoginAndNavToFilms } = useUserData();

  const toEndFetch = ({ values, curUser }: any) => (
    setUserDataAndLoginAndNavToFilms({ values, curUser })
  );

  const propsOfUseForm = {
    fetch: mainApi.toLoginUser,
    toEndFetch,
  };

  const inputTypes = { inputTypeEmail: true, inputTypePassword: true };
  const formSetting = {
    name: 'login-user-form',
    title: 'Рады видеть!',
    sbtBtnText: 'Войти',
    questionText: 'Ещё не зарегистрированы?',
    pathLink: '/signup',
    linkText: 'Регистрация',
  };

  return (
    <PageWithLogin
      propsOfUseForm={propsOfUseForm}
      inputTypes={inputTypes}
      formSetting={formSetting}
    />
  );
}
