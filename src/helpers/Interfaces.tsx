import { FormEvent } from 'react';

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
