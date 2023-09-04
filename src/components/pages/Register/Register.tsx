import './Register.css';

import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../images/logo.svg';

interface RegisterInterface {
  isValidForm: boolean,
  onSubmit: () => void,
  fetchCondition: boolean,

}

export default function Register({
  isValidForm, onSubmit, fetchCondition,
}: RegisterInterface) {
  return (
    <main className='page-register'>

      <form
        className='page-register__form'
        name='change-user-data-form'
        noValidate
        onSubmit={onSubmit}
        autoComplete='off'
      >
        <Link to='/'>
          <img src={logo} alt='Логотип' className='page-register__logo btn-hover btn-active' />
        </Link>
        <h1 className='page-register__title'>Добро пожаловать!</h1>

        <label className='page-register__field' htmlFor='user-name'>
          <span className='page-register__desctiption'>Имя</span>
          <input
            className='page-register__input page-register__input_type_string input-reset'
            id='user-name'
            name='user name'
            placeholder='Name'
            type='string'
            required
          />
          <span className='page-register__error' />
        </label>

        <label className='page-register__field' htmlFor='user-email'>
          <span className='page-register__desctiption'>E&#8209;mail</span>
          <input
            className='page-register__input page-register__input_type_email input-reset'
            id='user-email'
            name='user email'
            placeholder='Email'
            type='email'
            required
          />
          <span className='page-register__error' />
        </label>

        <label className='page-register__field' htmlFor='user-password'>
          <span className='page-register__desctiption'>Пароль</span>
          <input
            className='page-register__input page-register__input_type_password input-reset'
            id='user-password'
            name='user password'
            placeholder='Password'
            type='password'
            required
          />
          <span className='page-register__error'>Демонстрация ошибки</span>
        </label>

        <button
          className='page-register__btn-submit btn-reset btn-hover btn-active'
          type='submit'
          name='submit-btn-change-user-data-form'
          disabled={!isValidForm}
        >
          {fetchCondition ? 'Попробуем-ка...' : 'Зарегистрироваться'}
        </button>
      </form>

      <div className='page-register__yet-register'>
        <span className='page-register__yet-register-text'>
          Уже зарегистрированы?
        </span>
        <Link to='/signin' className='page-register__yet-register-link link-hover link-active'>
          Войти
        </Link>
      </div>
    </main>
  );
}
