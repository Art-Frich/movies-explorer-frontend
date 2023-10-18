import React, { useState } from 'react';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { IdataUser, IdataUserAndInputValues } from '../helpers/InterfacesOfDataUser';
import { IobjValStr } from '../helpers/InterfacesOthers';

export interface IhandleSubmit {
  e: React.FormEvent
}

export interface IHandleChangeInput {
  e: React.FormEvent
  typeInput: string,
  aboutPattern: string
}

interface IuseForm {
  sbtSucMsg?: string,
  toEndFetch: (data: IdataUserAndInputValues) => void,
  fetch: (values: IobjValStr) => Promise<IdataUser>,
}

export default function useForm({ fetch, toEndFetch, sbtSucMsg = '' }: IuseForm) {
  const {
    setSbtMsg, resData, setResData,
  } = useCurrentUser();

  const [isValidForm, setIsValidForm] = useState(false);
  const [values, setValues] = useState<IobjValStr>({});
  const [errors, setErrors] = useState<IobjValStr>({});
  const [isFetching, setIsFetching] = useState(false);

  const handleChangeInput = ({ e, typeInput, aboutPattern }: IHandleChangeInput) => {
    const target = e.target as HTMLInputElement;
    const isValidInput = target.validity.valid;
    const { name, value, validationMessage } = target;
    setValues({ ...values, [name]: value });
    setErrors({
      ...errors,
      // т.к. валидация за счет pattern, кастомизируем вывод
      // иначе получим что-то вроде "не соответствует pattern"
      [name]: ((() => {
        if (isValidInput) {
          return '';
        }
        if (typeInput !== 'email') { // если это не email
          if (value.length === 0) {
            return 'Обязательное поле';
          } return `Некорректный ввод: ${aboutPattern}`;
        }
        return validationMessage; // если это email - то браузер сам справится
      })()),
    });
    setIsValidForm(target.closest('form')!.checkValidity());
  };

  const handleSubmit = async ({ e }: IhandleSubmit) => {
    e.preventDefault();
    setResData(null);
    setSbtMsg('');
    setIsFetching(true);
    fetch(values)
      .then((res: IdataUser) => {
        setResData(res);
        setSbtMsg(`Успешно! ${sbtSucMsg}`);
        // объединить свойства, чтобы прокинуть userName, который возвращает login() и хранит в res
        // return чтобы оттянуть .finally и кнопка submit была заблокирована до конца toEndFetch
        return toEndFetch({ values: { ...values, ...res } } as IdataUserAndInputValues);
      })
      .catch(async (err: Promise<{ message: string }>) => {
        setSbtMsg(`Провал: ${(await err).message}`);
      })
      .finally(() => setIsFetching(false));
  };

  return {
    handleChangeInput,
    handleSubmit,
    resData,
    errors,
    values,
    isFetching,
    isValidForm,
    setIsFetching,
    setValues,
  };
}
