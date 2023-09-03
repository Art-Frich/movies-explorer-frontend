import './SearchForm.css';

import React from 'react';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

interface SearchFormInterface {
  isShort: boolean,
  setIsShort: (newValue: boolean) => void,
}

export default function SearchForm({ isShort, setIsShort }: SearchFormInterface) {
  return (
    <section className='sercher'>
      <form className='sercher__form'>
        <input className='sercher__input input-reset' placeholder='Введите название фильма' />
        <button type='submit' className='sercher__btn-submit btn-reset btn-hover btn-active'>Поиск</button>
      </form>
      <ul className='sercher__filter-list list-reset'>
        <li className='sercher__filter-list-element'>
          <FilterCheckbox content='Короткометражки' state={isShort} setState={setIsShort} />
        </li>
      </ul>
      <div className='sercher__dividing-line' />
    </section>
  );
}
