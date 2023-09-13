import './SectionTitleRow.css';

import React from 'react';

interface ISectionTitleRow {
  content: string,
}

export default function SectionTitleRow({ content }: ISectionTitleRow) {
  return (
    <>
      <h2 className='section__title'>{content}</h2>
      <div className='section__row' />
    </>
  );
}
