import './Login.css';

import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../others/Logo/Logo';
import InputBlock from '../../others/InputBlock/InputBlock';
import { inputEmailSettings, inputPasswordSettings } from '../../../helpers/constants';
import useForm from '../../../сustomHooks/useForm';
import mainApi from '../../../helpers/utils/MainApi';
import useUserData from '../../../сustomHooks/useUserData';
import SbtBtnOfUserData from '../../others/SbtBtnOfUserData/SbtBtnOfUserData';

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
    resData,
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
            inputDisabled={isFetching}
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
            inputDisabled={isFetching}
          />
        </div>

        <div className='page-login__btns'>
          <span className={
            `page-login__submit-result-msg ${resData === null
              ? 'page-login__submit-result-msg_err'
              : 'page-login__submit-result-msg_ok'}`
          }
          >
            {sbtMsg}
          </span>
          <SbtBtnOfUserData
            isFetching={isFetching}
            isDisable={!isValidForm || isFetching}
            btnText='Войти'
          />
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
