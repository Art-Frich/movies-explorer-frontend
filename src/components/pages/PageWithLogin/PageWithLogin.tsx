import './PageWithLogin.css';

import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../others/Logo/Logo';
import useForm from '../../../сustomHooks/useForm';
import SbtBtnOfUserData from '../../others/SbtBtnOfUserData/SbtBtnOfUserData';
import InputsOfUserData from '../../others/InputsOfUserData/InputsOfUserData';
import { useCurrentUser } from '../../../contexts/CurrentUserContext';

export default function PageWithLogin({ propsOfUseForm, inputTypes, formSetting }: any) {
  const { sbtMsg } = useCurrentUser()!;
  const {
    handleChangeInput, handleSubmit, errors,
    values, isFetching, isValidForm, resData,
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

          <InputsOfUserData
            inputTypes={inputTypes}
            inputDisabled={isFetching}
            errors={errors}
            values={values}
            handleChangeInput={handleChangeInput}
          />

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
