/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable class-methods-use-this */
interface ImoviesApiConfig {
  urlApi: string,
}

const moviesApiConfig = {
  urlApi: 'https://api.nomoreparties.co/beatfilm-movies',
};

class MoviesApi {
  urlApi: string;

  constructor(moviesApiConfig: ImoviesApiConfig) {
    this.urlApi = moviesApiConfig.urlApi;
  }

  getMovies(): Promise<any> {
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

const moviesApi = new MoviesApi(moviesApiConfig);
export default moviesApi;
