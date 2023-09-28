import React from 'react';

import { useNavigate } from 'react-router-dom';
import PageWithLogin from '../components/pages/PageWithLogin/PageWithLogin';
import mainApi from '../helpers/utils/MainApi';
import { useErrorPopupContext } from '../contexts/ErrorPopupContext';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { formRegisterSetting } from '../helpers/constants';

export default function RegisterContainer() {
  const navigate = useNavigate();
  const popupContext = useErrorPopupContext();
  const { setUserDataAndLogin, sbtMsg, setSbtMsg } = useCurrentUser()!;

  const toEndFetch = ({ values }: any) => mainApi.toLoginUser(values)
    .then(() => {
      setUserDataAndLogin({ values });
      navigate('/movies');
      setSbtMsg('');
    })
    .catch(() => popupContext?.setErMsg('Непредвиденная богами ошибка при попытке автоматического логининга'));

  const propsOfUseForm = {
    fetch: mainApi.toRegisterUser,
    toEndFetch,
    sbtSucMsg: 'Подождите ещё немного и я перекину вас к фильмам ;)',
  };

  const inputTypes = { inputTypeEmail: true, inputTypePassword: true, inputTypeName: true };

  return (
    <PageWithLogin
      propsOfUseForm={propsOfUseForm}
      inputTypes={inputTypes}
      formSetting={formRegisterSetting}
      sbtMsg={sbtMsg}
    />
  );
}
