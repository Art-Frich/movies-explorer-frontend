import './Login.css';

import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../images/logo.svg';

interface LoginInterface {
  isValidForm: boolean,
  onSubmit: () => void,
  fetchCondition: boolean,

}

export default function Login({
  isValidForm, onSubmit, fetchCondition,
}: LoginInterface) {
  return (
    <main className='page-login'>
      <form
        className='page-login__form'
        name='change-user-data-form'
        noValidate
        onSubmit={onSubmit}
        autoComplete='off'
      >
        <Link to='/'>
          <img src={logo} alt='Логотип' className='page-login__logo btn-hover btn-active' />
        </Link>
        <h1 className='page-login__title'>Рады видеть!</h1>

        <label className='page-login__field' htmlFor='user-email'>
          <span className='page-login__desctiption'>E&#8209;mail</span>
          <input
            className='page-login__input page-login__input_type_email input-reset'
            id='user-email'
            name='user email'
            placeholder='Email'
            type='email'
            required
          />
          <span className='page-login__error' />
        </label>

        <label className='page-login__field' htmlFor='user-password'>
          <span className='page-login__desctiption'>Пароль</span>
          <input
            className='page-login__input page-login__input_type_password input-reset'
            id='user-password'
            name='user password'
            placeholder='Password'
            type='password'
            required
          />
          <span className='page-login__error'>Демонстрация ошибки</span>
        </label>

        <button
          className='page-login__btn-submit btn-reset btn-hover btn-active'
          type='submit'
          name='submit-btn-change-user-data-form'
          disabled={!isValidForm}
        >
          {fetchCondition ? 'Попробуем-ка...' : 'Войти'}
        </button>
      </form>

      <div className='page-login__yet-login'>
        <span className='page-login__yet-login-text'>
          Ещё не зарегистрированы?
        </span>
        <Link to='/signup' className='page-login__yet-login-link link-hover link-active'>
          Регистрация
        </Link>
      </div>
    </main>
  );
}
