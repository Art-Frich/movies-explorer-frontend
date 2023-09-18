import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/pages/Login/Login';
import mainApi from '../helpers/utils/MainApi';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { IOnSubmitLogin } from '../helpers/Interfaces';

export default function LoginContainer() {
  const [isValidForm, setIsvalidForm] = useState(true);
  const [fetchCondition, setFetchCondition] = useState(false);
  const [submitMsg, setSubmitMsg] = useState('');

  const navigate = useNavigate();
  const curUser = useCurrentUser();

  const onSubmit = ({
    e, email, password,
  }: IOnSubmitLogin): void => {
    e.preventDefault();
    setFetchCondition(true);
    mainApi.toLoginUser({ email, password })
      .then(() => {
        setSubmitMsg('Успешно!');
        curUser?.login();
        navigate('/movies');
      })
      .catch(async (err) => {
        if (err) {
          const data = await err.json();
          setSubmitMsg(`Ошибка при попытке авторизации: ${data.message}`);
        } else {
          setSubmitMsg('Ошибка при попытке авторизации.');
        }
      })
      .finally(() => {
        setFetchCondition(false);
      });
    setIsvalidForm(true);
  };

  return (
    <Login
      isValidForm={isValidForm}
      onSubmit={onSubmit}
      fetchCondition={fetchCondition}
      submitMsg={submitMsg}
    />
  );
}
