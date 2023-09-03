import './MoviesCard.css';
import React from 'react';

interface MovieData {
  name: string,
  time: string,
  link: string,
}

interface MoviesCardProps {
  data: MovieData;
}

export default function MoviesCard({ data }: MoviesCardProps) {
  return (
    <article className='movie'>
      <div className='movie__header'>
        <span className='movie__name'>{data.name}</span>
        <span className='movie__time'>{data.time}</span>
      </div>
      <img src={data.link} alt='контент карточки' className='movie__img' />
      <button className='movie__btn btn-reset btn-hover btn-active' type='button' aria-label='movie-btn' />
    </article>
  );
}
