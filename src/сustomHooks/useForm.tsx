import React, { useState } from 'react';
import { useCurrentUser } from '../contexts/CurrentUserContext';

interface IhandleSubmit {
  e: React.FormEvent
}

interface IHandleChangeInput {
  e: React.FormEvent
  typeInput: string,
  aboutPattern: string
}

export default function useForm({ fetch, toEndFetch, sbtSucMsg = '' }: any) {
  const { setSbtMsg } = useCurrentUser()!;

  const [isValidForm, setIsValidForm] = useState(false);
  const [values, setValues] = useState<any>({});
  const [errors, setErrors] = useState({});
  const [isFetching, setIsFetching] = useState(false);
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
      .then((res: any) => {
        setResData(res);
        setSbtMsg(`Успешно! ${sbtSucMsg}`);
        // объединить свойства, чтобы прокинуть userName, который возвращает login() и хранит в res
        // return чтобы оттянуть .finally и кнопка submit была заблокирована до конца toEndFetch
        return toEndFetch({ values: { ...values, ...res } });
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
    isFetching,
    isValidForm,
    setIsFetching,
    setValues,
  };
}
