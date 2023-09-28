import './MoviesCard.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { changeTimeFormat } from '../../../helpers/utils/utils';

interface IMoviesCardProps {
  data: any,
  onClickSaveBtn: (data: any) => void;
}

function MoviesCard({ data, onClickSaveBtn }: IMoviesCardProps) {
  return (
    <article className='movies-card'>
      <div className='movies-card__header'>
        <h3 className='movies-card__name'>{data.nameRU}</h3>
        <span className='movies-card__time'>{changeTimeFormat(data.duration)}</span>
      </div>
      <Link
        to={data.trailerLink}
        className='movie-card__link link-hover active-neon'
        target='_blank'
        rel='noopener noreferer'
      >
        <img src={data.image} alt='контент карточки' className='movies-card__img' />
      </Link>
      <button
        className={`movies-card__btn btn-reset btn-hover active-btn-effect ${data.btnType}`}
        onClick={(e) => {
          e.preventDefault(); // думаю, поможет от двойного клика
          onClickSaveBtn(data);
        }}
        type='submit'
        aria-label='movies-card-btn'
      />
    </article>
  );
}

export default MoviesCard;
