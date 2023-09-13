import './PortfolioLinkElement.css';

import React from 'react';
import { Link } from 'react-router-dom';

interface IPortfolioLinkElement {
  url: string,
  content: string,
}

export default function PortfolioLinkElement({ url, content }: IPortfolioLinkElement) {
  return (
    <li className='portfolio__list-element'>
      <Link
        to={url}
        className='portfolio__link link-hover active-neon'
        target='_blank'
      >
        <span className='portfolio__list-element-text'>{content}</span>
        <span>↗</span>
      </Link>
    </li>
  );
}
