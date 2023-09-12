import './Profile.css';

import React from 'react';

import { inputEmailSettings, inputNameSettings } from '../../../helpers/constants';
import InputBlock from '../../others/InputBlock/InputBlock';

interface IProfile {
  nameUser: string,
  onSubmit: () => void,
  fetchCondition: boolean,
  onLogout: () => void,
  userEmail: string,
  onEditBtnClick: () => void,
  isDisabledInput: boolean
}

export default function Profile({
  nameUser, onSubmit, fetchCondition,
  onLogout, userEmail, isDisabledInput, onEditBtnClick,
}: IProfile) {
  return (
    <main className='page-profile'>
      <form
        className='page-profile__form'
        name='change-user-data-form'
        onSubmit={onSubmit}
        autoComplete='off'
      >
        <div className='page-profile__content'>
          <h1 className='page-profile__title'>{`Здравствуйте, ${nameUser} ;)`}</h1>

          <InputBlock
            labelClass='page-profile__field'
            titleSpanClass='page-profile__desctiption'
            titleSpanContent='Имя'
            inputClass='page-profile__input page-profile__input_type_string'
            errSpanClass='page-profile__error'
            inputSettings={inputNameSettings}
            defaultValue={nameUser}
            inputDisabled={isDisabledInput}
          />

          <InputBlock
            labelClass='page-profile__field'
            titleSpanClass='page-profile__desctiption'
            titleSpanContent='E&#8209;mail'
            inputClass='page-profile__input page-profile__input_type_email'
            errSpanClass='page-profile__error'
            inputSettings={inputEmailSettings}
            defaultValue={userEmail}
            inputDisabled={isDisabledInput}
          />
        </div>

        <div className='page-profile__btns'>
          {isDisabledInput && (
            <>
              <button
                className='page-profile__btn-edit btn-reset btn-hover btn-active'
                type='button'
                name='btn-change-user-data-form'
                onClick={onEditBtnClick}
              >
                Редактировать
              </button>
              <button
                className='page-profile__btn-logout btn-reset btn-hover btn-active'
                type='button'
                onClick={onLogout}
              >
                Выйти из аккаунта
              </button>
            </>
          )}

          {!isDisabledInput && (
            <button
              className='page-profile__btn-submit btn-reset btn-hover btn-active'
              type='submit'
              name='submit-btn-user-data-form'
            >
              {fetchCondition ? 'Попробуем-ка...' : 'Сохранить'}
            </button>
          )}
        </div>
      </form>

    </main>
  );
}
