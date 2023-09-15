import './AboutMe.css';

import React from 'react';

import { Link } from 'react-router-dom';
import photo from '../../../images/pic__COLOR_pic.png';
import SectionTitleRow from '../../others/SectionTitleRow/SectionTitleRow';

export default function AboutMe() {
  return (
    <section className='section section about-me'>
      <SectionTitleRow content='Студент' />
      <div className='about-me__info'>
        <div className='about-me__info-description'>
          <div>
            <h3 className='about-me__info-title'>Артем</h3>
            <span className='about-me__info-subtitle'>Фронтенд-разработчик, 24 года</span>
            <p className='about-me__info-text'>
              Я родился и живу в Нижнем Тагиле, закончил факультет техносферной
              безопасности в СПбПУ. У меня есть черепаха. Я люблю слушать музыку,
              а ещё увлекаюсь велосипедом. Со школы увлекаюсь разработкой. С 2022
              года решил бросить учёбу по специальности и прошёл курс по веб-разработке.
            </p>
          </div>
          <span>
            <Link
              to='https://github.com/Art-Frich'
              className='about-me__info-link link-hover active-neon'
              target='_blank'
            >
              Github
            </Link>
          </span>
        </div>
        <img className='about-me__info-photo' src={photo} alt='фото разработчика' />
      </div>
    </section>
  );
}
