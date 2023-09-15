import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from '../components/pages/Profile/Profile';

import { useCurrentUser } from '../contexts/CurrentUserContext';

export default function ProfileContainer() {
  const [fetchCondition, setFetchCondition] = useState(false);
  const [isDisabledInput, setIsDisabledInput] = useState(true);

  const navigate = useNavigate();
  const curUser = useCurrentUser();

  const onSubmit = () => {
    setFetchCondition(true);
    setFetchCondition(false);
    setIsDisabledInput(true);
  };

  const onLogout = () => {
    curUser?.logout();
    navigate('/');
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
    />
  ) : null;
}
