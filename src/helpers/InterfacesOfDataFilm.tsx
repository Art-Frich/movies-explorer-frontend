export interface IdataFilm {
  country: string,
  year: string,
  duration: number,
  director: string,
  nameEN: string,
  nameRU: string,
  trailerLink: string,
  description: string,
}

export interface IdataFilmOriginal extends IdataFilm {
  id: number,
  image: {
    url: string,
    formats: {
      thumbnail: {
        url: string
      }
    }
  },
}

export interface IdataFilmResult extends IdataFilm {
  movieId: number,
  image: string,
  thumbnail: string,
}

export interface IdataFilmToSave extends IdataFilmResult {
  owner: string
}

export interface IdataSavedFilm extends IdataFilmToSave {
  '_id': string
}

export type IdataOfBtnSave = (IdataFilmResult | IdataSavedFilm) & { btnType?: string };
