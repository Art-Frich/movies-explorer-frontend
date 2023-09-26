import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageWithLogin from '../components/pages/PageWithLogin/PageWithLogin';
import mainApi from '../helpers/utils/MainApi';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { formLoginSetting } from '../helpers/constants';

export default function LoginContainer() {
  const navigate = useNavigate();
  const { setUserDataAndLogin, setSbtMsg } = useCurrentUser()!;

  const toEndFetch = (data: any) => {
    setUserDataAndLogin(data);
    navigate('/movies');
    setSbtMsg('');
  };

  const propsOfUseForm = {
    fetch: mainApi.toLoginUser,
    toEndFetch,
  };

  const inputTypes = { inputTypeEmail: true, inputTypePassword: true };

  return (
    <PageWithLogin
      propsOfUseForm={propsOfUseForm}
      inputTypes={inputTypes}
      formSetting={formLoginSetting}
    />
  );
}
