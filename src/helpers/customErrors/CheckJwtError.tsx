export default class CheckJwtError extends Error {
  status: number;

  message: string;

  constructor(status: number) {
    super();
    this.status = status;
    this.message = '';

    if (status === 400) {
      this.message = 'Кажется, предыдущая сессия устарела и по ней невозможно авторизоваться. Токен не передан или передан не в том формате.';
    } else if (status === 401) {
      this.message = 'Кажется, предыдущая сессия устарела и по ней невозможно авторизоваться. Переданный токен некорректен.';
    } else {
      this.message = 'Кажется, у вас нет в браузере сохраненной сессии.';
    }
  }
}
