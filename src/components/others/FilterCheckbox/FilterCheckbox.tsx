import './FilterCheckbox.css';

import React from 'react';
import { useMoviesApiContext } from '../../../contexts/MoviesApiContext';

interface IFilterCheckbox {
  content: string,
  state: boolean,
  setState: any,
  name: string,
  isSavedPage: boolean,
}

export default function FilterCheckbox({
  content, state, setState, name, isSavedPage,
}: IFilterCheckbox) {
  const { getAllFilms } = useMoviesApiContext()!;

  function changeCheckbox() {
    if (!isSavedPage) getAllFilms();
    setState((prev: any) => ({ ...prev, [name]: !prev[name] }));
  }

  return (
    <div className='checkbox'>
      <label htmlFor={`filter-by-${content}`}>
        <input
          id={`filter-by-${content}`}
          className='checkbox__input'
          type='checkbox'
          checked={state}
          onChange={changeCheckbox}
        />
        <span className='checkbox__container' />
      </label>
      <span className='checkbox__signature'>{content}</span>
    </div>
  );
}
