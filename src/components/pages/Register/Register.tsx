import './Register.css';

import React from 'react';
import { Link } from 'react-router-dom';

import { inputNameSettings, inputEmailSettings, inputPasswordSettings } from '../../../helpers/constants';
import InputBlock from '../../others/InputBlock/InputBlock';
import Logo from '../../others/Logo/Logo';
import useForm from '../../../сustomHooks/useForm';
import mainApi from '../../../helpers/utils/MainApi';
import useUserData from '../../../сustomHooks/useUserData';
import SbtBtnOfUserData from '../../others/SbtBtnOfUserData/SbtBtnOfUserData';
// import { IOnSubmitRegister } from '../../../helpers/Interfaces';

// interface IRegister {
//   onSubmit: (data: IOnSubmitRegister) => void;
//   fetchCondition: boolean;
//   submitMsg: string;
// }

export default function Register() {
  const sbtSucMsg = 'Подождите ещё немного и я перекину вас к фильмам ;)';
  const { setUserDataAndLoginAndNavToFilms } = useUserData();
  const toEndFetch = ({ values, curUser }: any) => mainApi.toLoginUser(values)
    .then(() => setUserDataAndLoginAndNavToFilms({ values, curUser }))
    // eslint-disable-next-line no-alert
    .catch(() => alert('Непредвиденная богами ошибка при попытке автоматического логининга'));

  const {
    handleChangeInput,
    handleSubmit,
    errors,
    values,
    sbtMsg,
    isFetching,
    isValidForm,
    resData,
  } = useForm({ fetch: mainApi.toRegisterUser, toEndFetch, sbtSucMsg });

  return (
    <main className='page-register'>
      <form
        className='page-register__form'
        name='register-user-form'
        onSubmit={(e) => handleSubmit({ e })}
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
            values={values}
            onInput={handleChangeInput}
            errors={errors}
            inputDisabled={isFetching}
          />
          <InputBlock
            labelClass='page-register__field'
            titleSpanClass='page-register__desctiption'
            titleSpanContent='E&#8209;mail'
            inputClass='page-register__input page-register__input_type_email'
            errSpanClass='page-register__error'
            inputSettings={inputEmailSettings}
            values={values}
            onInput={handleChangeInput}
            errors={errors}
            inputDisabled={isFetching}
          />
          <InputBlock
            labelClass='page-register__field'
            titleSpanClass='page-register__desctiption'
            titleSpanContent='Пароль'
            inputClass='page-register__input page-register__input_type_password'
            errSpanClass='page-register__error'
            inputSettings={inputPasswordSettings}
            values={values}
            onInput={handleChangeInput}
            errors={errors}
            inputDisabled={isFetching}
          />
        </div>
        <div className='page-register__btns'>
          <span className={
            `page-register__submit-result-msg ${resData === null
              ? 'page-register__submit-result-msg_err'
              : 'page-register__submit-result-msg_ok'}`
          }
          >
            {sbtMsg}
          </span>
          <SbtBtnOfUserData
            isFetching={isFetching}
            isDisable={!isValidForm || isFetching}
            btnText='Зарегистрироваться'
          />
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
