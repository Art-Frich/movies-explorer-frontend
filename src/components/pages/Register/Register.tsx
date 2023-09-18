import './Register.css';

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import { inputNameSettings, inputEmailSettings, inputPasswordSettings } from '../../../helpers/constants';
import InputBlock from '../../others/InputBlock/InputBlock';
import Logo from '../../others/Logo/Logo';
import { IOnSubmitRegister } from '../../../helpers/Interfaces';

interface IRegister {
  onSubmit: (data: IOnSubmitRegister) => void;
  fetchCondition: boolean;
  submitMsg: string;
}

export default function Register({
  onSubmit, fetchCondition, submitMsg,
}: IRegister) {
  const refName = useRef<HTMLInputElement | null>(null);
  const refEmail = useRef<HTMLInputElement | null>(null);
  const refPassword = useRef<HTMLInputElement | null>(null);

  return (
    <main className='page-register'>
      <form
        className='page-register__form'
        name='register-user-form'
        onSubmit={(e) => onSubmit({
          e,
          name: refName.current?.value || '',
          email: refEmail.current?.value || '',
          password: refPassword.current?.value || '',
        })}
        autoComplete='off'
      >
        <div className='page-register__content'>
          <header className='page-register__header'>
            <Logo />
          </header>
          <h1 className='page-register__title'>Добро пожаловать!</h1>

          <InputBlock
            labelClass='page-register__field'
            titleSpanClass='page-register__desctiption'
            titleSpanContent='Имя'
            inputClass='page-register__input page-register__input_type_string'
            errSpanClass='page-register__error'
            inputSettings={inputNameSettings}
            refParent={refName}
          />
          <InputBlock
            labelClass='page-register__field'
            titleSpanClass='page-register__desctiption'
            titleSpanContent='E&#8209;mail'
            inputClass='page-register__input page-register__input_type_email'
            errSpanClass='page-register__error'
            inputSettings={inputEmailSettings}
            refParent={refEmail}
          />
          <InputBlock
            labelClass='page-register__field'
            titleSpanClass='page-register__desctiption'
            titleSpanContent='Пароль'
            inputClass='page-register__input page-register__input_type_password'
            errSpanClass='page-register__error'
            inputSettings={inputPasswordSettings}
            refParent={refPassword}
          />
        </div>
        <div className='page-register__btns'>
          <span className='page-registor__submit-result-msg'>{submitMsg}</span>
          <button
            className='page-register__btn-submit btn-reset btn-hover active-btn-effect color-btn-disabled'
            type='submit'
            name='submit-btn-change-user-data-form'
            disabled={fetchCondition}
          >
            {fetchCondition ? 'Попробуем-ка...' : 'Зарегистрироваться'}
          </button>
          <div className='page-register__yet-register'>
            <span className='page-register__yet-register-text'>
              Уже зарегистрированы?
            </span>
            <Link to='/signin' className='page-register__yet-register-link link-hover active-underline'>
              Войти
            </Link>
          </div>
        </div>
      </form>
    </main>
  );
}
