import './Profile.css';

import React from 'react';

import { inputEmailSettings, inputNameSettings } from '../../../helpers/constants';
import InputBlock from '../../others/InputBlock/InputBlock';
import { useCurrentUser } from '../../../contexts/CurrentUserContext';
// import { IFormEvent } from '../../../helpers/Interfaces';

// interface IProfile {
// onSubmit: (data: IFormEvent) => void,
// fetchCondition: boolean,
// onLogout: () => void,
// onEditBtnClick: () => void,
// isDisabledInput: boolean,
// submitMsg: string,
// submitMsgIsErr: boolean,
// setInputName: React.Dispatch<React.SetStateAction<string>>,
// setInputEmail: React.Dispatch<React.SetStateAction<string>>,

// }

export default function Profile({
  onSubmit, fetchCondition, onLogout, onEditBtnClick, isDisabledInput,
  submitMsg, submitMsgIsErr, errorsInput, onInput, isDisabledSubmitBtn,
  valuesInput,
}: any) {
  const curUser = useCurrentUser();
  return (
    <main className='page-profile'>
      <form
        className='page-profile__form'
        name='change-user-data-form'
        onSubmit={(e) => onSubmit({ e })}
        autoComplete='off'
      >
        <div className='page-profile__content'>
          <h1 className='page-profile__title'>{`Здравствуйте, ${curUser?.name} ;)`}</h1>

          <InputBlock
            labelClass='page-profile__field'
            titleSpanClass='page-profile__desctiption'
            titleSpanContent='Имя'
            inputClass='page-profile__input page-profile__input_type_string'
            errSpanClass='page-profile__error'
            inputSettings={inputNameSettings}
            values={valuesInput}
            onInput={onInput}
            errors={errorsInput}
            inputDisabled={isDisabledInput}
          />

          <InputBlock
            labelClass='page-profile__field'
            titleSpanClass='page-profile__desctiption'
            titleSpanContent='E&#8209;mail'
            inputClass='page-profile__input page-profile__input_type_email'
            errSpanClass='page-profile__error'
            inputSettings={inputEmailSettings}
            values={valuesInput}
            onInput={onInput}
            errors={errorsInput}
            inputDisabled={isDisabledInput}
          />
        </div>

        <div className='page-profile__btns'>
          <span className={`page-profile__submit-result-msg ${submitMsgIsErr
            ? 'page-profile__submit-result-msg_err'
            : 'page-profile__submit-result-msg_ok'}`}
          >
            {submitMsg}

          </span>
          {isDisabledInput && (
            <>
              <button
                className='page-profile__btn-edit btn-reset btn-hover active-underline color-text-disabled'
                type='button'
                name='btn-change-user-data-form'
                onClick={onEditBtnClick}
                disabled={fetchCondition}
              >
                Редактировать
              </button>
              <button
                className='page-profile__btn-logout btn-reset btn-hover active-underline color-text-disabled'
                type='button'
                onClick={onLogout}
                disabled={fetchCondition}
              >
                Выйти из аккаунта
              </button>
            </>
          )}

          {!isDisabledInput && (
            <button
              className='page-profile__btn-submit btn-reset btn-hover active-btn-effect color-btn-disabled'
              type='submit'
              name='submit-btn-user-data-form'
              disabled={isDisabledSubmitBtn}
            >
              {fetchCondition ? 'Попробуем-ка...' : 'Сохранить'}
            </button>
          )}
        </div>
      </form>

    </main>
  );
}
