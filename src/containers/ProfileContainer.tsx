import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from '../components/pages/Profile/Profile';

import { useCurrentUser } from '../contexts/CurrentUserContext';
import mainApi from '../helpers/utils/MainApi';

export default function ProfileContainer() {
  const [fetchCondition, setFetchCondition] = useState(false);
  const [isDisabledInput, setIsDisabledInput] = useState(true);
  const [submitMsg, setSubmitMsg] = useState('');

  const navigate = useNavigate();
  const curUser = useCurrentUser();

  const onSubmit = () => {
    setFetchCondition(true);
    setFetchCondition(false);
    setIsDisabledInput(true);
  };

  const onLogout = () => {
    setFetchCondition(true);
    mainApi.toLogout()
      .then(() => {
        curUser?.logout();
        navigate('/');
      })
      .catch(() => {
        setSubmitMsg('Не удалось выйти из аккаунта... Я тоже в шоке...');
      })
      .finally(() => setFetchCondition(false));
  };

  const onEditBtnClick = () => {
    setIsDisabledInput(false);
  };

  return curUser ? (
    <Profile
      nameUser={curUser.name}
      userEmail={curUser.email}
      onSubmit={onSubmit}
      fetchCondition={fetchCondition}
      onLogout={onLogout}
      onEditBtnClick={onEditBtnClick}
      isDisabledInput={isDisabledInput}
      submitMsg={submitMsg}
    />
  ) : null;
}
