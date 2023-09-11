import './Login.css';

import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../images/logo.svg';
import InputBlock from '../../others/InputBlock/InputBlock';
import { inputEmailSettings, inputPasswordSettings } from '../../../helpers/constants';

interface ILogin {
  isValidForm: boolean,
  onSubmit: () => void,
  fetchCondition: boolean,

}

export default function Login({
  isValidForm, onSubmit, fetchCondition,
}: ILogin) {
  return (
    <main className='page-login'>
      <form
        className='page-login__form'
        name='change-user-data-form'
        noValidate
        onSubmit={onSubmit}
        autoComplete='off'
      >
        <header className='page-login__header'>
          <Link to='/'>
            <img src={logo} alt='Логотип' className='page-login__logo btn-hover btn-active' />
          </Link>
        </header>
        <h1 className='page-login__title'>Рады видеть!</h1>

        <InputBlock
          labelClass='page-login__field'
          titleSpanClass='page-login__desctiption'
          titleSpanContent='E&#8209;mail'
          inputClass='page-login__input page-login__input_type_email'
          errSpanClass='page-login__error'
          inputSettings={inputEmailSettings}
        />
        <InputBlock
          labelClass='page-login__field'
          titleSpanClass='page-login__desctiption'
          titleSpanContent='Пароль'
          inputClass='page-login__input page-login__input_type_password'
          errSpanClass='page-login__error'
          inputSettings={inputPasswordSettings}
        />

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
