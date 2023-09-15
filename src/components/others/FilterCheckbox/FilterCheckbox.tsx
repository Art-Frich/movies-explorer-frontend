import './FilterCheckbox.css';

import React from 'react';

interface IFilterCheckbox {
  content: string,
  state: boolean,
  setState: (newValue: boolean) => void,
}

export default function FilterCheckbox({ content, state, setState }: IFilterCheckbox) {
  function chengeCheckbox() {
    setState(!state);
  }

  return (
    <div className='checkbox'>
      <label htmlFor={`filter-by-${content}`}>
        <input
          id={`filter-by-${content}`}
          className='checkbox__input'
          type='checkbox'
          checked={state}
          onChange={chengeCheckbox}
        />
        <span className='checkbox__container' />
      </label>
      <span className='checkbox__signature'>{content}</span>
    </div>
  );
}
