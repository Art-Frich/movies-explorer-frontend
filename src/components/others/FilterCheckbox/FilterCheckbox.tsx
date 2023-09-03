import './FilterCheckbox.css';

import React from 'react';

interface FilterCheckboxInterface {
  content: string,
  state: boolean,
  setState: (newValue: boolean) => void,
}

export default function FilterCheckbox({ content, state, setState }: FilterCheckboxInterface) {
  function chengeCheckbox() {
    setState(!state);
  }

  return (
    <label className='checkbox' htmlFor={`filter-by-${state}`}>
      <div>
        <input
          id={`filter-by-${state}`}
          className='checkbox__input'
          type='checkbox'
          checked={state}
          onChange={chengeCheckbox}
        />
        <div className='checkbox__container' />
      </div>

      <span className='checkbox__signature'>{content}</span>
    </label>
  );
}
