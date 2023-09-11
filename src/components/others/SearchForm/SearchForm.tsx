import './SearchForm.css';

import React from 'react';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

interface ISearchForm {
  isShort: boolean,
  setIsShort: (newValue: boolean) => void,
}

export default function SearchForm({ isShort, setIsShort }: ISearchForm) {
  return (
    <section className='sercher'>
      <form className='sercher__form'>
        <input
          className='sercher__input input-reset'
          placeholder='Введите название фильма'
          minLength={2}
          maxLength={150}
        />
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
