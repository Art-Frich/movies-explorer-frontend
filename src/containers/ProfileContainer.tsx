import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from '../components/pages/Profile/Profile';

import { useCurrentUser } from '../contexts/CurrentUserContext';

export default function ProfileContainer() {
  const [isValidForm, setIsvalidForm] = useState(false);
  const [fetchCondition, setFetchCondition] = useState(false);

  const navigate = useNavigate();
  const curUser = useCurrentUser();

  const onSubmit = () => {
    setFetchCondition(true);
    setFetchCondition(false);
    setIsvalidForm(true);
  };

  const onLogout = () => {
    curUser?.logout();
    navigate('/');
  };

  return curUser ? (
    <Profile
      nameUser={curUser.name}
      userEmail={curUser.email}
      isValidForm={isValidForm}
      onSubmit={onSubmit}
      fetchCondition={fetchCondition}
      onLogout={onLogout}
    />
  ) : null;
}
