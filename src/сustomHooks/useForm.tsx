/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import mainApi from '../helpers/utils/MainApi';
// import { IAllString } from '../helpers/Interfaces';

interface IhandleSubmit {
  e: React.FormEvent
}

interface IHandleChangeInput {
  e: React.FormEvent
  typeInput: string,
  aboutPattern: string
}

// interface IUseForm {
//   fetch: (data: IAllString) => Promise<any>;
// }

export default function useForm({ fetch, toEndFetch }: any) {
  const curUser = useCurrentUser();
  const [isValidForm, setIsValidForm] = useState(false);
  const [values, setValues] = useState<any>({});
  const [errors, setErrors] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [sbtMsg, setSbtMsg] = useState('');
  const [resData, setResData] = useState<any>(null);

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
        if (isValidInput) { // если поле валидно
          return ''; // убрать сообщение об ошибке
        }
        if (typeInput !== 'email') { // если это поле не email
          if (value.length === 0) { // инпут пустой?
            return 'Обязательное поле';
          } return `Некорректный ввод: ${aboutPattern}`;
        }
        return validationMessage; // если это email - т.к. браузерные сообщения хороши
      })()),
    });
    setIsValidForm(target.closest('form')!.checkValidity());
  };

  const handleSubmit = async ({ e }: IhandleSubmit) => {
    e.preventDefault();
    setResData(null);
    setIsFetching(true);
    fetch(values)
      .then((res: any) => {
        setResData(res);
        setSbtMsg('Успешно!');
        // объединить свойства, чтобы прокинуть name, который возвращает login()
        toEndFetch({ values: { ...values, ...res }, curUser });
      })
      .catch(async (err: any) => {
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
    sbtMsg,
    isFetching,
    isValidForm,
    setIsFetching,
    setSbtMsg,
    setValues,
  };
}
