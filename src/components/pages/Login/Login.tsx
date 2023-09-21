import './Login.css';

import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../others/Logo/Logo';
import InputBlock from '../../others/InputBlock/InputBlock';
import { inputEmailSettings, inputPasswordSettings } from '../../../helpers/constants';
import useForm from '../../../сustomHooks/useForm';
import mainApi from '../../../helpers/utils/MainApi';
import useUserData from '../../../сustomHooks/useUserData';

// import { IOnSubmitLogin } from '../../../helpers/Interfaces';

// interface ILogin {
//   isValidForm: boolean,
//   onSubmit: (data: IOnSubmitLogin) => void,
//   fetchCondition: boolean,
//   submitMsg: string,
//   setIsValidForm: React.Dispatch<React.SetStateAction<boolean>>,
// }

export default function Login() {
  const { setUserDataAndLoginAndNavToFilms } = useUserData();
  const {
    handleChangeInput,
    handleSubmit,
    errors,
    values,
    sbtMsg,
    isFetching,
    isValidForm,
  } = useForm({ fetch: mainApi.toLoginUser, toEndFetch: setUserDataAndLoginAndNavToFilms });

  return (
    <main className='page-login'>
      <form
        className='page-login__form'
        name='login-user-form'
        onSubmit={(e) => handleSubmit({ e })}
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
            values={values}
            onInput={handleChangeInput}
            errors={errors}
          />
          <InputBlock
            labelClass='page-login__field'
            titleSpanClass='page-login__desctiption'
            titleSpanContent='Пароль'
            inputClass='page-login__input page-login__input_type_password'
            errSpanClass='page-login__error'
            inputSettings={inputPasswordSettings}
            values={values}
            onInput={handleChangeInput}
            errors={errors}
          />
        </div>

        <div className='page-login__btns'>
          <span className='page-login__submit-result-msg'>{sbtMsg}</span>
          <button
            className='page-login__btn-submit btn-reset btn-hover active-btn-effect color-btn-disabled'
            type='submit'
            name='submit-btn-change-user-data-form'
            disabled={!isValidForm || isFetching}
          >
            {isFetching ? 'Попробуем-ка...' : 'Войти'}
          </button>
          <div className='page-login__yet-login'>
            <span className='page-login__yet-login-text'>
              Ещё не зарегистрированы?
            </span>
            <Link
              to='/signup'
              className='page-login__yet-login-link link-hover active-underline'
            >
              Регистрация
            </Link>
          </div>
        </div>
      </form>
    </main>
  );
}
