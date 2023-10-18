import { IdataFilmOriginal } from '../InterfacesOfDataFilm';
import { urlMoviesApi } from '../constants';

class MoviesApi {
  urlApi: string;

  constructor() {
    this.urlApi = `${urlMoviesApi}/beatfilm-movies`;
  }

  getMovies(): Promise<IdataFilmOriginal[]> {
    return fetch(this.urlApi)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Ошибка при запросе к API.');
      })
      .catch((err) => err);
  }
}

const moviesApi = new MoviesApi();
export default moviesApi;
