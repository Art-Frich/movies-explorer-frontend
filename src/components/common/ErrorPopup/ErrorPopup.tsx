/* eslint-disable jsx-a11y/control-has-associated-label */
import './ErrorPopup.css';

import React, { useState, useEffect } from 'react';
import { useErrorPopupContext } from '../../../contexts/ErrorPopupContext';

function ErrorPopup() {
  const defaultMsg = 'Или нет...';
  const [isOpen, setIsOpen] = useState(false);
  const [erMsg, setErMsg] = useState(defaultMsg);
  const errContext = useErrorPopupContext();

  useEffect(() => {
    if (erMsg && erMsg !== defaultMsg) setIsOpen(true);
  }, [erMsg]);

  useEffect(() => {
    setErMsg(errContext?.er || '');
  }, [errContext?.er]);

  useEffect(() => {
    if (!isOpen) { setTimeout(() => setErMsg(defaultMsg), 200); }
  }, [isOpen]);

  return (
    <div className={`popup ${isOpen ? 'popup_open' : ''}`}>
      <div className='popup__container'>
        <h2 className='popup__title'>Есть некоторые проблемы...</h2>
        <p className='popup__content'>{erMsg}</p>
        <button
          className='popup__btn btn-reset active-btn-effect btn-hover'
          type='button'
          onClick={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
}

export default ErrorPopup;
