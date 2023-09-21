import { FormEvent } from 'react';
// global
export interface IFormEvent {
  e: FormEvent<HTMLFormElement>;
}

export interface IAllString {
  [fieldName: string]: string;
}
// mainApi and submits
export interface IFetchLogin {
  email: string;
  password: string;
}

export interface IOnSubmitLogin extends IFetchLogin {
  e: FormEvent<HTMLFormElement>;
}

export interface IFetchRegister extends IFetchLogin {
  name: string;
}

export interface IOnSubmitRegister extends IFetchRegister {
  e: FormEvent<HTMLFormElement>;
}

export interface IFetchUpdateUserData {
  name: string;
  email: string;
}

export interface IOnSubmitUpdateUserData extends IFetchUpdateUserData {
  e: FormEvent<HTMLFormElement>;
}
