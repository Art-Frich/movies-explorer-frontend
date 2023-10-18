/* eslint-disable @typescript-eslint/lines-between-class-members */

import { IdataFilmToSave, IdataSavedFilm } from '../InterfacesOfDataFilm';
import {
  IdataLogin, IdataRegister, IdataUser, IdataUserUpdate,
} from '../InterfacesOfDataUser';
import {
  inputEmailSettings, inputNameSettings, inputPasswordSettings, urlMainApi,
} from '../constants';

class MainApi {
  pathCreateUser: string;
  pathLoginUser: string;
  pathMe: string;
  pathLogout: string;
  nameKey: string;
  emailKey: string;
  passwordKey: string;
  pathFilms: string;

  constructor() {
    this.pathCreateUser = 'signup';
    this.pathLoginUser = 'signin';
    this.pathMe = 'users/me';
    this.pathLogout = 'signout';
    this.pathFilms = 'movies/';
    this.nameKey = inputNameSettings.name;
    this.emailKey = inputEmailSettings.name;
    this.passwordKey = inputPasswordSettings.name;
  }

  // eslint-disable-next-line class-methods-use-this
  handleFetch<T>(fetch: Promise<Response>): Promise<T> {
    return fetch
      .then((res) => (res.ok ? res.json() : Promise.reject(res.json())));
  }

  checkJWT = () => this.handleFetch<IdataUser>(
    fetch(urlMainApi + this.pathMe, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  );

  toRegisterUser = (values: IdataRegister) => this.handleFetch<IdataUser>(
    fetch(urlMainApi + this.pathCreateUser, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        name: values[this.nameKey],
        email: values[this.emailKey],
        password: values[this.passwordKey],
      }),
    })
  );

  toLoginUser = (values: IdataLogin) => this.handleFetch<IdataUser>(
    fetch(urlMainApi + this.pathLoginUser, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: values[this.emailKey],
        password: values[this.passwordKey],
      }),
    })
  );

  toLogout(): Promise<Response> {
    return fetch(urlMainApi + this.pathLogout, {
      method: 'POST',
      credentials: 'include',
    });
  }

  toUpdateUserData = (values: IdataUserUpdate): Promise<IdataUser> => (
    fetch(urlMainApi + this.pathMe, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: values[this.emailKey],
        name: values[this.nameKey],
      }),
    }).then(async (res) => (res.ok ? res.json() : Promise.reject(await res.json())))
  );

  addMovie = (dataMovie: IdataFilmToSave) => this.handleFetch<{ data: IdataSavedFilm }>(
    fetch(urlMainApi + this.pathFilms, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataMovie),
    })
  );

  deleteMovie = (movieId: string) => this.handleFetch<{ data: IdataSavedFilm }>(
    fetch(`${urlMainApi + this.pathFilms + movieId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  );

  getAllSavedMovies = () => this.handleFetch<{ data: IdataSavedFilm[] }>(
    fetch(urlMainApi + this.pathFilms, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  );
}

const mainApi = new MainApi();
export default mainApi;
