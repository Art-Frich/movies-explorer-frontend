import './MoviesCard.css';
import React from 'react';

interface IMovieData {
  name: string,
  time: string,
  link: string,
}

interface IMoviesCardProps {
  data: IMovieData,
  type: string,
}

export default function MoviesCard({ data, type }: IMoviesCardProps) {
  return (
    <article className='movies-card'>
      <div className='movies-card__header'>
        <span className='movies-card__name'>{data.name}</span>
        <span className='movies-card__time'>{data.time}</span>
      </div>
      <img src={data.link} alt='контент карточки' className='movies-card__img' />
      <button
        className={`movies-card__btn btn-reset btn-hover btn-active ${type}`}
        type='button'
        aria-label='movies-card-btn'
      />
    </article>
  );
}
