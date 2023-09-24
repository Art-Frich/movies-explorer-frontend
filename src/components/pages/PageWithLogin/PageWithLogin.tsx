import './PageWithLogin.css';

import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../others/Logo/Logo';
import InputBlock from '../../others/InputBlock/InputBlock';
import { inputEmailSettings, inputNameSettings, inputPasswordSettings } from '../../../helpers/constants';
import useForm from '../../../сustomHooks/useForm';
import SbtBtnOfUserData from '../../others/SbtBtnOfUserData/SbtBtnOfUserData';

export default function PageWithLogin({ propsOfUseForm, inputTypes, formSetting }: any) {
  const { inputTypeName, inputTypeEmail, inputTypePassword } = inputTypes;
  const {
    handleChangeInput, handleSubmit, errors,
    values, sbtMsg, isFetching, isValidForm, resData,
  } = useForm(propsOfUseForm);
  const {
    name, title, sbtBtnText, questionText, pathLink, linkText,
  } = formSetting;

  return (
    <main className='page-with-login'>
      <form
        className='page-with-login__form'
        name={name}
        onSubmit={(e) => handleSubmit({ e })}
        autoComplete='off'
      >
        <div className='page-with-login__content'>
          <header className='page-with-login__header'>
            <Logo />
          </header>
          <h1 className='page-with-login__title'>{title}</h1>

          {!inputTypeName ? null : (
            <InputBlock
              labelClass='page-with-login__field'
              titleSpanClass='page-with-login__desctiption'
              titleSpanContent='Имя'
              inputClass='page-with-login__input page-with-login__input_type_string'
              errSpanClass='page-with-login__error'
              inputSettings={inputNameSettings}
              values={values}
              onInput={handleChangeInput}
              errors={errors}
              inputDisabled={isFetching}
            />
          )}

          {!inputTypeEmail ? null : (
            <InputBlock
              labelClass='page-with-login__field'
              titleSpanClass='page-with-login__desctiption'
              titleSpanContent='E&#8209;mail'
              inputClass='page-with-login__input page-with-login__input_type_email'
              errSpanClass='page-with-login__error'
              inputSettings={inputEmailSettings}
              values={values}
              onInput={handleChangeInput}
              errors={errors}
              inputDisabled={isFetching}
            />
          )}

          {!inputTypePassword ? null : (
            <InputBlock
              labelClass='page-with-login__field'
              titleSpanClass='page-with-login__desctiption'
              titleSpanContent='Пароль'
              inputClass='page-with-login__input page-with-login__input_type_password'
              errSpanClass='page-with-login__error'
              inputSettings={inputPasswordSettings}
              values={values}
              onInput={handleChangeInput}
              errors={errors}
              inputDisabled={isFetching}
            />
          )}

        </div>

        <div className='page-with-login__btns'>
          <span className={
            `page-with-login__submit-result-msg ${resData === null
              ? 'page-with-login__submit-result-msg_err'
              : 'page-with-login__submit-result-msg_ok'}`
          }
          >
            {sbtMsg}
          </span>
          <SbtBtnOfUserData
            isFetching={isFetching}
            isDisable={!isValidForm || isFetching}
            btnText={sbtBtnText}
          />
          <div className='page-with-login__retrace'>
            <span className='page-with-login__retrace-text'>
              {questionText}
            </span>
            <Link
              to={pathLink}
              className='page-with-login__retrace-link link-hover active-underline'
            >
              {linkText}
            </Link>
          </div>
        </div>
      </form>
    </main>
  );
}
