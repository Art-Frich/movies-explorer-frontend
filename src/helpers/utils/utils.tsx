import { urlMoviesApi } from '../constants';

export const changeTimeFormat = (duration: number): string => {
  const first = Math.floor(duration / 60);
  const second = duration % 60;

  return [first > 0 && `${first}ч`, second > 0 && `${second}м`]
    .filter((el) => el)
    .join(' ');
};

export const parseMovieData = ({
  country, year, duration, director, nameEN,
  nameRU, id, image, trailerLink, description,
}: any): any => ({
  country,
  director,
  duration,
  year,
  description,
  image: urlMoviesApi + image.url,
  trailerLink,
  thumbnail: urlMoviesApi + image.formats.thumbnail.url,
  movieId: id,
  nameRU,
  nameEN,
});
