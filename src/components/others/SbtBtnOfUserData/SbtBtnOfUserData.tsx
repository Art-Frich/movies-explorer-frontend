import './SbtBtnOfUserData.css';
import React from 'react';

interface ISbtBtnOfUserData {
  isFetching: boolean,
  isDisable: boolean,
  btnText: string,
}

export default function SbtBtnOfUserData({ isFetching, isDisable, btnText }: ISbtBtnOfUserData) {
  return (
    <button
      className='btn-submit-of-user-data btn-reset btn-hover active-btn-effect color-btn-disabled'
      type='submit'
      name='submit-btn-change-user-data-form'
      disabled={isDisable}
    >
      {isFetching ? 'Попробуем-ка...' : btnText}
    </button>
  );
}
