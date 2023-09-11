import './Profile.css';

import React from 'react';

import { inputEmailSettings, inputNameSettings } from '../../../helpers/constants';
import InputBlock from '../../others/InputBlock/InputBlock';

interface IProfile {
  nameUser: string,
  isValidForm: boolean,
  onSubmit: () => void,
  fetchCondition: boolean,
  onLogout: () => void,
  userEmail: string,

}

export default function Profile({
  nameUser, isValidForm, onSubmit, fetchCondition, onLogout, userEmail,
}: IProfile) {
  return (
    <main className='page-profile'>
      <form
        className='page-profile__form'
        name='change-user-data-form'
        noValidate
        onSubmit={onSubmit}
        autoComplete='off'
      >

        <h1 className='page-profile__title'>{`Здравствуйте, ${nameUser} ;)`}</h1>

        <InputBlock
          labelClass='page-profile__field'
          titleSpanClass='page-profile__desctiption'
          titleSpanContent='E&#8209;mail'
          inputClass='page-profile__input page-profile__input_type_string'
          errSpanClass='page-profile__error'
          inputSettings={inputNameSettings}
          defaultValue={nameUser}
        />

        <InputBlock
          labelClass='page-profile__field'
          titleSpanClass='page-profile__desctiption'
          titleSpanContent='E&#8209;mail'
          inputClass='page-profile__input page-profile__input_type_email'
          errSpanClass='page-profile__error'
          inputSettings={inputEmailSettings}
          defaultValue={userEmail}
        />

        <button
          className='page-profile__btn-submit btn-reset btn-hover btn-active'
          type='submit'
          name='submit-btn-change-user-data-form'
          disabled={!isValidForm}
        >
          {fetchCondition ? 'Попробуем-ка...' : 'Редактировать'}
        </button>
      </form>

      <button
        className='page-profile__btn-logout btn-reset btn-hover btn-active'
        type='button'
        onClick={onLogout}
      >
        Выйти из аккаунта
      </button>
    </main>
  );
}
