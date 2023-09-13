import './Login.css';

import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../others/Logo/Logo';
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
        name='login-user-form'
        noValidate
        onSubmit={onSubmit}
        autoComplete='off'
      >
        <div className='page-login__content'>
          <header className='page-login__header'>
            <Logo />
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
        </div>

        <div className='page-login__btns'>
          <button
            className='page-login__btn-submit btn-reset btn-hover active-btn-effect'
            type='submit'
            name='submit-btn-change-user-data-form'
            disabled={!isValidForm}
          >
            {fetchCondition ? 'Попробуем-ка...' : 'Войти'}
          </button>
          <div className='page-login__yet-login'>
            <span className='page-login__yet-login-text'>
              Ещё не зарегистрированы?
            </span>
            <Link to='/signup' className='page-login__yet-login-link link-hover active-underline'>
              Регистрация
            </Link>
          </div>
        </div>
      </form>
    </main>
  );
}
