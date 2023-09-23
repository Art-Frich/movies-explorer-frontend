export const inputNameSettings = {
  id: 'user-name',
  name: 'userName',
  placeholder: 'Здесь должно быть ваше имя',
  type: 'text',
  pattern: '[A-Za-zабвгдеёжзиклмнопрстуфхцчшщъыьэюяAБВГДЕЁЖЗИКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ \\-]{2,35}',
  title: 'Ожидаемый формат: от 2 до 35 символов кириллицы или латиницы.',
};

export const inputEmailSettings = {
  id: 'user-email',
  name: 'userEmail',
  placeholder: 'Здесь должен быть ваш email',
  type: 'email',
  pattern: '[\\w\\.\\d]+@[\\w]+\\.[a-z]{2,}',
  title: 'Ожидаемый формат: something22@tutu.pam',
};

export const inputPasswordSettings = {
  id: 'user-password',
  name: 'userPassword',
  placeholder: 'Здесь должен быть ваш пароль',
  type: 'password',
  pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{6,}$',
  title: 'Используйте латинский алфавит: хотя бы 1 строчную, 1 заглавную и 1 цифру при общей длине не менее 6 символов.',
};

export const urlMoviesApi = 'https://api.nomoreparties.co';
export const urlMainApi = 'http://localhost:3002/';
// export const urlMainApi = 'https://api.search-your-movies.nomoredomainsicu.ru/';
