import './MoviesCard.css';

import React from 'react';
import { urlMoviesApi } from '../../../helpers/constants';
import { changeTimeFormat } from '../../../helpers/utils/utils';

interface IMoviesCardProps {
  data: any,
  onClickSaveBtn: (data: any) => void;
}

export default function MoviesCard({ data, onClickSaveBtn }: IMoviesCardProps) {
  return (
    <article className='movies-card'>
      <div className='movies-card__header'>
        <h3 className='movies-card__name'>{data.nameRU}</h3>
        <span className='movies-card__time'>{changeTimeFormat(data.duration)}</span>
      </div>
      <img src={urlMoviesApi + data.image} alt='контент карточки' className='movies-card__img' />
      <button
        className={`movies-card__btn btn-reset btn-hover active-btn-effect ${data.btnType}`}
        onClick={() => onClickSaveBtn(data)}
        type='button'
        aria-label='movies-card-btn'
      />
    </article>
  );
}
