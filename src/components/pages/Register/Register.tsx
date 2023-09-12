import './Register.css';

import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../images/logo.svg';
import InputBlock from '../../others/InputBlock/InputBlock';
import { inputNameSettings, inputEmailSettings, inputPasswordSettings } from '../../../helpers/constants';

interface IRegister {
  isValidForm: boolean,
  onSubmit: () => void,
  fetchCondition: boolean,

}

export default function Register({
  isValidForm, onSubmit, fetchCondition,
}: IRegister) {
  return (
    <main className='page-register'>

      <form
        className='page-register__form'
        name='register-user-form'
        noValidate
        onSubmit={onSubmit}
        autoComplete='off'
      >
        <header className='page-register__header'>
          <Link to='/'>
            <img src={logo} alt='Логотип' className='page-register__logo btn-hover btn-active' />
          </Link>
        </header>
        <h1 className='page-register__title'>Добро пожаловать!</h1>

        <InputBlock
          labelClass='page-register__field'
          titleSpanClass='page-register__desctiption'
          titleSpanContent='Имя'
          inputClass='page-register__input page-register__input_type_string'
          errSpanClass='page-register__error'
          inputSettings={inputNameSettings}
        />
        <InputBlock
          labelClass='page-register__field'
          titleSpanClass='page-register__desctiption'
          titleSpanContent='E&#8209;mail'
          inputClass='page-register__input page-register__input_type_email'
          errSpanClass='page-register__error'
          inputSettings={inputEmailSettings}
        />
        <InputBlock
          labelClass='page-register__field'
          titleSpanClass='page-register__desctiption'
          titleSpanContent='Пароль'
          inputClass='page-register__input page-register__input_type_password'
          errSpanClass='page-register__error'
          inputSettings={inputPasswordSettings}
        />

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
