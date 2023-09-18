/* eslint-disable @typescript-eslint/lines-between-class-members */
import { IFetchLogin, IFetchRegister } from '../Interfaces';
import { urlLocalMainApi } from '../constants';
import CheckJwtError from '../customErrors/CheckJwtError';

class MainApi {
  pathCreateUser: string;
  pathLoginUser: string;
  pathMe: string;
  pathLogout: string;

  constructor() {
    this.pathCreateUser = 'signup';
    this.pathLoginUser = 'signin';
    this.pathMe = 'users/me';
    this.pathLogout = 'signout';
  }

  toRegisterUser({ email, name, password }: IFetchRegister) {
    return this.handleFetch(fetch(urlLocalMainApi + this.pathCreateUser, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }));
  }

  toLoginUser({ email, password }: IFetchLogin) {
    return fetch(urlLocalMainApi + this.pathLoginUser, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email, password,
      }),
    })
      .then((res) => (!res.ok
        ? Promise.reject(res)
        : res.json()));
  }

  // eslint-disable-next-line class-methods-use-this
  handleFetch(fetch: Promise<Response>) {
    return fetch
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      });
  }

  async checkJWT() {
    return fetch(urlLocalMainApi + this.pathMe, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .catch((err: any) => {
        throw new CheckJwtError(err.status);
      });
  }

  toLogout() {
    return fetch(urlLocalMainApi + this.pathLogout, {
      method: 'POST',
      credentials: 'include',
    });
  }
}

const mainApi = new MainApi();
export default mainApi;
