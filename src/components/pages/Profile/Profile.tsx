import './Profile.css';

import React from 'react';

interface ProfileInterface {
  nameUser: string,
  isValidForm: boolean,
  onSubmit: () => void,
  fetchCondition: boolean,
  onLogout: () => void,
  userEmail: string,

}

export default function Profile({
  nameUser, isValidForm, onSubmit, fetchCondition, onLogout, userEmail,
}: ProfileInterface) {
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

        <label className='page-profile__field' htmlFor='user-name'>
          <span className='page-profile__desctiption'>Имя</span>
          <input
            className='page-profile__input page-profile__input_type_string input-reset'
            id='user-name'
            name='user name'
            placeholder='Name'
            defaultValue={nameUser}
            type='string'
            required
          />
        </label>

        <label className='page-profile__field' htmlFor='user-email'>
          <span className='page-profile__desctiption'>E&#8209;mail</span>
          <input
            className='page-profile__input page-profile__input_type_email input-reset'
            id='user-email'
            name='user email'
            placeholder='Email'
            defaultValue={userEmail}
            type='email'
            required
          />
        </label>

        <button
          className='page-profile__btn-submit button-reset btn-hover btn-active'
          type='submit'
          name='submit-btn-change-user-data-form'
          disabled={!isValidForm}
        >
          {fetchCondition ? 'Попробуем-ка...' : 'Редактировать'}
        </button>
      </form>

      <button
        className='page-profile__btn-logout button-reset btn-hover btn-active'
        type='button'
        onClick={onLogout}
      >
        Выйти из аккаунта
      </button>
    </main>
  );
}
