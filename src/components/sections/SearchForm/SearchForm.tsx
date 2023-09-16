import './SearchForm.css';

import React, { FormEvent, useRef } from 'react';

import FilterCheckbox from '../../others/FilterCheckbox/FilterCheckbox';

interface ISearchForm {
  isShort: boolean,
  setIsShort: (newValue: boolean) => void,
  onSearch: (e: FormEvent<HTMLFormElement>, value: string) => void,
  fetchCondition: boolean,
  onReset: () => void;

}

export default function SearchForm({
  isShort, setIsShort, onSearch, fetchCondition, onReset,
}: ISearchForm) {
  const ref = useRef<HTMLInputElement | null>(null);

  return (
    <section className='sercher'>
      <form className='sercher__form' name='search-movie-form' onSubmit={(e) => onSearch(e, ref.current?.value || '')}>
        <input
          className='sercher__input input-reset input-focus'
          placeholder='Введите название фильма'
          name='name-movie'
          minLength={2}
          required
          ref={ref}
        />
        <button type='submit' className='sercher__btn btn-reset btn-hover active-btn-effect'>
          {fetchCondition ? 'Ищу...' : 'Поиск'}
        </button>
        <button
          type='button'
          className='sercher__btn btn-reset btn-hover active-btn-effect'
          onClick={() => {
            onReset();
            ref.current!.value = '';
          }}
        >
          Сброс
        </button>
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
