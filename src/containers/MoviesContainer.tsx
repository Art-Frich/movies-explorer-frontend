import React, { useState } from 'react';
import Movies from '../components/pages/Movies/Movies';

export default function MoviesContainer() {
  const [isShort, setIsShort] = useState(false);
  return (
    <Movies isShort={isShort} setIsShort={setIsShort} />
  );
}
