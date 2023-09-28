import './NotFound.css';

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(-1);
  };

  return (
    <div className='not-found'>
      <h1 className='not-found__title'>404</h1>
      <p className='not-found__subtitle'>Страница не найдена</p>
      <button className='not-found__link link-hover active-underline btn-reset' onClick={onClick} type='button'>Назад</button>
    </div>
  );
}
