import {
  IformSettings,
  IinputSearcherValiditySettings,
  IinputUserDataSettings,
  IoptionsUseSetterVisibleFilms,
} from './InterfacedOfConstants';

export const inputNameSettings = {
  id: 'user-name',
  name: 'userName',
  placeholder: 'Здесь должно быть ваше имя',
  type: 'text',
  pattern: '^[A-Za-zа-яёА-ЯЁ\\s\\-\']{2,35}$',
  title: 'Ожидаемый формат: от 2 до 35 символов кириллицы или латиницы.',
} as IinputUserDataSettings;

export const inputEmailSettings = {
  id: 'user-email',
  name: 'userEmail',
  placeholder: 'Здесь должен быть ваш email',
  type: 'email',
  pattern: '[\\w\\.\\d]+@[\\w]+\\.[a-z]{2,}',
  title: 'Ожидаемый формат: something22@tutu.pam',
} as IinputUserDataSettings;

export const inputPasswordSettings = {
  id: 'user-password',
  name: 'userPassword',
  placeholder: 'Здесь должен быть ваш пароль',
  type: 'password',
  pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{6,}$',
  title: 'Используйте латинский алфавит: хотя бы 1 строчную, 1 заглавную и 1 цифру при общей длине не менее 6 символов.',
} as IinputUserDataSettings;

export const inputSearcherValiditySettings = {
  regEx: /^[a-zа-яё0-9].*$/i,
  erTextNoLetter: 'Нужно ввести ключевое слово',
  erTextOneLetter: 'Первый символ должен быть из латинского или русского алфавита, также это может быть число',
} as IinputSearcherValiditySettings;

export const optionsUseSetterVisibleFilms = {
  toTwoColumnWidth: 1095,
  toOneColumnWidth: 683,
  baseLimitThreeColumn: 12,
  baseLimitTwoColumn: 8,
  baseLimitOneColumn: 5,
  addedLimitThreeColumn: 3,
  addedLimitTwoColumn: 2,
  addedLimitOneColumn: 2,
} as IoptionsUseSetterVisibleFilms;

export const formLoginSettings = {
  name: 'login-user-form',
  title: 'Рады видеть!',
  sbtBtnText: 'Войти',
  questionText: 'Ещё не зарегистрированы?',
  pathLink: '/signup',
  linkText: 'Регистрация',
} as IformSettings;

export const formRegisterSettings = {
  name: 'register-user-form',
  title: 'Добро пожаловать!',
  sbtBtnText: 'Зарегистрироваться',
  questionText: 'Уже зарегистрированы?',
  pathLink: '/signin',
  linkText: 'Войти',
} as IformSettings;

export const urlMoviesApi = 'https://api.nomoreparties.co';
// export const urlMainApi = 'http://localhost:3002/';
export const urlMainApi = 'https://api.search-your-movies.nomoredomainsicu.ru/';
