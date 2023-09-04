import React, { useState } from 'react';
import SavedMovies from '../components/pages/SavedMovies/SavedMovies';

export default function SavedMoviesContainer() {
  const [isShort, setIsShort] = useState(false);
  return (
    <SavedMovies isShort={isShort} setIsShort={setIsShort} />
  );
}
