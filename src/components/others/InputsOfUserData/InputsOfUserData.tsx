import React from 'react';
import InputBlock from '../InputBlock/InputBlock';
import { inputEmailSettings, inputNameSettings, inputPasswordSettings } from '../../../helpers/constants';
import { IHandleChangeInput } from '../../../сustomHooks/useForm';
import { IobjValBool, IobjValStr } from '../../../helpers/InterfacesOthers';

interface IInputOfUserData {
  inputTypes: IobjValBool,
  inputDisabled: boolean,
  errors: IobjValStr,
  values: IobjValStr,
  handleChangeInput: (data: IHandleChangeInput) => void,
  // eslint-disable-next-line react/require-default-props
  isProfile?: boolean,
}

export default function InputsOfUserData({
  inputTypes, inputDisabled, errors, values, handleChangeInput, isProfile = false,
}: IInputOfUserData) {
  const { inputTypeName, inputTypeEmail, inputTypePassword } = inputTypes;
  return (
    <>
      {!inputTypeName ? null : (
        <InputBlock
          labelClass={`page-${isProfile ? 'profile' : 'with-login'}__field`}
          titleSpanClass={`page-${isProfile ? 'profile' : 'with-login'}__description`}
          titleSpanContent='Имя'
          inputClass={
            `page-${isProfile ? 'profile' : 'with-login'}__input
            page-${isProfile ? 'profile' : 'with-login'}__input_type_string`
          }
          errSpanClass={`page-${isProfile ? 'profile' : 'with-login'}__error`}
          inputSettings={inputNameSettings}
          values={values}
          onInput={handleChangeInput}
          errors={errors}
          inputDisabled={inputDisabled}
        />
      )}

      {!inputTypeEmail ? null : (
        <InputBlock
          labelClass={`page-${isProfile ? 'profile' : 'with-login'}__field`}
          titleSpanClass={`page-${isProfile ? 'profile' : 'with-login'}__description`}
          titleSpanContent='E&#8209;mail'
          inputClass={
            `page-${isProfile ? 'profile' : 'with-login'}__input
            page-${isProfile ? 'profile' : 'with-login'}__input_type_email`
          }
          errSpanClass={`page-${isProfile ? 'profile' : 'with-login'}__error`}
          inputSettings={inputEmailSettings}
          values={values}
          onInput={handleChangeInput}
          errors={errors}
          inputDisabled={inputDisabled}
        />
      )}

      {!inputTypePassword ? null : (
        <InputBlock
          labelClass='page-with-login__field'
          titleSpanClass='page-with-login__description'
          titleSpanContent='Пароль'
          inputClass='page-with-login__input page-with-login__input_type_password'
          errSpanClass='page-with-login__error'
          inputSettings={inputPasswordSettings}
          values={values}
          onInput={handleChangeInput}
          errors={errors}
          inputDisabled={inputDisabled}
        />
      )}
    </>
  );
}
