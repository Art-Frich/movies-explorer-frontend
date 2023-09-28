import './FooterLinkElement.css';

import React from 'react';
import { Link } from 'react-router-dom';

interface IFooterLinkElement {
  url: string,
  content: string,
}

export default function FooterLinkElement({ url, content }: IFooterLinkElement) {
  return (
    <li className='footer__list-element'>
      <Link
        to={url}
        className='footer__link link-hover active-underline'
        target='_blank'
        rel='noopener noreferer'
      >
        {content}
      </Link>
    </li>
  );
}
