/* eslint-disable jsx-a11y/control-has-associated-label */
import './ErrorPopup.css';

import React from 'react';
import { useErrorPopupContext } from '../../../contexts/ErrorPopupContext';

function ErrorPopup() {
  const errContext = useErrorPopupContext();
  return (
    <div className={`popup ${errContext?.isOpen ? 'popup_open' : ''}`}>
      <div className='popup__container'>
        <h2 className='popup__title'>Есть некоторые проблемы...</h2>
        <p className='popup__content'>{errContext?.erMsg}</p>
        <button
          className='popup__btn btn-reset active-btn-effect btn-hover'
          type='button'
          onClick={() => errContext?.setIsOpen(false)}
        />
      </div>
    </div>
  );
}

export default ErrorPopup;
