import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Register from '../components/pages/Register/Register';
import mainApi from '../helpers/utils/MainApi';
import { IOnSubmitRegister } from '../helpers/Interfaces';
import { useCurrentUser } from '../contexts/CurrentUserContext';

export default function RegisterContainer() {
  const [fetchCondition, setFetchCondition] = useState(false);
  const [submitMsg, setSubmitMsg] = useState('');

  const navigate = useNavigate();
  const curUser = useCurrentUser();

  const onSubmit = ({
    e, email, name, password,
  }: IOnSubmitRegister): void => {
    e.preventDefault();
    setFetchCondition(true);
    mainApi.toRegisterUser({ email, name, password })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then(() => mainApi.toLoginUser({ email, password }))
      .then(() => {
        setSubmitMsg('Успешно!');
        curUser?.login();
        navigate('/movies');
      })
      .catch((err) => {
        if (err.status === 409) {
          setSubmitMsg('Пользователь с таким email уже существует.');
        } else {
          setSubmitMsg('Ошибка при регистрации =(');
        }
      })
      .finally(() => {
        setFetchCondition(false);
      });
  };

  return (
    <Register onSubmit={onSubmit} fetchCondition={fetchCondition} submitMsg={submitMsg} />
  );
}
