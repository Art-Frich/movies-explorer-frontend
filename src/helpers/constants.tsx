export const inputNameSettings = {
  id: 'user-name',
  name: 'user-name',
  placeholder: 'Здесь должно быть ваше имя',
  type: 'string',
  pattern: '[A-Za-z0-9абвгдеёжзиклмнопрстуфхцчшщъыьэюя]{2,35}',
  title: 'Ожидаемый формат: от 2 до 35 латинских символов.',
};

export const inputEmailSettings = {
  id: 'user-email',
  name: 'user-email',
  placeholder: 'Здесь должен быть ваш email',
  type: 'email',
  pattern: '[\\w\\.\\d]+@[\\w]+\\.[a-z]{2,}',
  title: 'Ожидаемый формат: something22@tutu.pam',
};

export const inputPasswordSettings = {
  id: 'user-password',
  name: 'user-password',
  placeholder: 'Здесь должен быть ваш пароль',
  type: 'password',
  pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{6,}$',
  title: 'Используйте латинский алфавит: хотя бы 1 строчную, 1 заглавную и 1 цифру при общей длине не менее 6 символов.',
};
