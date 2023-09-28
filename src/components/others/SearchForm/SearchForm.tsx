import './SearchForm.css';

import React, {
  FormEvent, useRef, useState, useEffect,
} from 'react';

import { useLocation } from 'react-router-dom';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { inputSearcherValiditySettings } from '../../../helpers/constants';

interface ISearchForm {
  filters: Record<string, boolean>,
  setFilters: (newValue: Record<string, boolean>) => void,
  onSearch: (e: FormEvent<HTMLFormElement>, value: string) => void,
  onReset: () => void;
  userQuery: string,
  isSearch: boolean,
  isSavedPage: boolean,
}

function SearchForm({
  filters, setFilters, onSearch, onReset, userQuery, isSearch, isSavedPage,
}: ISearchForm) {
  const { regEx, erTextNoLetter, erTextOneLetter } = inputSearcherValiditySettings;

  const ref = useRef<HTMLInputElement | null>(null);
  const [erMsg, setErMsg] = useState('');

  function checkPattern() {
    const value = ref.current?.value || '';
    const valid = regEx.test(value);
    if (!valid) {
      setErMsg(value.length === 0 ? erTextNoLetter : erTextOneLetter);
    } else {
      setErMsg('');
    }
    return valid;
  }

  const onSubmit = (e: any) => {
    e?.preventDefault();
    const valid = checkPattern();
    if (valid) onSearch(e, ref.current?.value || '');
    return valid;
  };

  useEffect(() => {
    setErMsg('');
  }, [useLocation().pathname]);

  useEffect(() => {
    ref.current!.value = userQuery;
  }, [userQuery]);

  return (
    <section className='sercher'>
      <form
        className='sercher__form'
        name='search-movie-form'
        onSubmit={onSubmit}
      >
        <input
          className='sercher__input input-reset input-focus'
          placeholder='Введите название фильма'
          name='name-movie'
          defaultValue={userQuery}
          ref={ref}
        />
        <button
          type='submit'
          className='sercher__btn btn-reset btn-hover active-btn-effect color-btn-disabled'
          disabled={isSearch}
        >
          {isSearch ? 'Ищу...' : 'Поиск'}
        </button>
        <button
          type='button'
          className='sercher__btn btn-reset btn-hover active-btn-effect'
          onClick={() => {
            onReset();
            ref.current!.value = '';
            setErMsg('');
          }}
        >
          Сброс
        </button>
        <span className='sercher__err-msg'>{erMsg}</span>
      </form>
      <ul className='sercher__filter-list list-reset'>
        <li className='sercher__filter-list-element'>
          <FilterCheckbox
            content='Короткометражки'
            state={filters.isShort}
            setState={setFilters}
            name='isShort'
            isSavedPage={isSavedPage}
          />
        </li>
      </ul>
      <div className='sercher__dividing-line' />
    </section>
  );
}

export default SearchForm;
