import './MoviesCardList.css';

import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList() {
  const data = [
    {
      name: 'name1',
      time: 'time1',
      link: 'https://avatars.akamai.steamstatic.com/f71b0f42307a52e56cd8242d74b128b1446be1f1_full.jpg',
    },
    {
      name: 'name1',
      time: 'time1',
      link: 'https://avatars.akamai.steamstatic.com/f71b0f42307a52e56cd8242d74b128b1446be1f1_full.jpg',

    },
    {
      name: 'name1',
      time: 'time1',
      link: 'https://avatars.akamai.steamstatic.com/f71b0f42307a52e56cd8242d74b128b1446be1f1_full.jpg',

    },
    {
      name: 'name1',
      time: 'time1',
      link: 'https://avatars.akamai.steamstatic.com/f71b0f42307a52e56cd8242d74b128b1446be1f1_full.jpg',

    },
  ];

  return (
    <section className='movies-list'>
      <ul className='movies-list__list list-reset'>
        {data.map((el, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <li className='movies-list__list-element' key={i}>
            <MoviesCard data={el} />
          </li>
        ))}
      </ul>
    </section>
  );
}
