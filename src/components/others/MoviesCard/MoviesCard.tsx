import './MoviesCard.css';

import React from 'react';
import { urlMoviesApi } from '../../../helpers/constants';
import changeTimeFormat from '../../../helpers/utils/utils';

interface IMoviesCardProps {
  data: any,
  type: string,
}

export default function MoviesCard({ data, type }: IMoviesCardProps) {
  return (
    <article className='movies-card'>
      <div className='movies-card__header'>
        <h3 className='movies-card__name'>{data.nameRU}</h3>
        <span className='movies-card__time'>{changeTimeFormat(data.duration)}</span>
      </div>
      <img src={urlMoviesApi + data.image.url} alt='контент карточки' className='movies-card__img' />
      <button
        className={`movies-card__btn btn-reset btn-hover active-btn-effect ${type}`}
        type='button'
        aria-label='movies-card-btn'
      />
    </article>
  );
}
