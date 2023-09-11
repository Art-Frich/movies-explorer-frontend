import React, { useRef, useState } from 'react';

interface IInputBlock {
  labelClass: string,
  titleSpanClass: string,
  titleSpanContent: string,
  inputClass: string,
  errSpanClass: string,
  inputSettings: IInputSettings,
  defaultValue?: string,
}

interface IInputSettings {
  id: string,
  name: string,
  placeholder: string,
  type: string,
  pattern: string,
  title: string,
}

export default function InputBlock({
  labelClass, titleSpanClass, titleSpanContent, inputClass,
  errSpanClass, inputSettings, defaultValue,
}: IInputBlock) {
  const {
    id, name, placeholder, type, pattern, title,
  } = inputSettings;
  const ref = useRef<HTMLInputElement | null>(null);
  const [nameErrMsg, setNameErrMsg] = useState('');
  const handleChange = () => {
    if (ref.current?.validity.valid) {
      setNameErrMsg('');
    } else if (type !== 'email') {
      setNameErrMsg(`Некорректный ввод. ${title}`);
    } else if (ref.current?.value.length === 0) {
      setNameErrMsg('Обязательное поле');
    } else {
      setNameErrMsg(ref.current?.validationMessage || 'Некоректный ввод');
    }
  };

  return (
    <label className={labelClass} htmlFor={id}>
      <span className={titleSpanClass}>{titleSpanContent}</span>
      <input
        className={`${inputClass} input-reset`}
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        pattern={pattern}
        title={title}
        required
        defaultValue={defaultValue}
        onChange={handleChange}
        onSubmit={handleChange}
        ref={ref}

      />
      <span className={errSpanClass}>{nameErrMsg}</span>
    </label>
  );
}

InputBlock.defaultProps = {
  defaultValue: '',
};
