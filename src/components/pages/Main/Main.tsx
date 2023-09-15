import './Main.css';

import React from 'react';
import Promo from '../../sections/Promo/Promo';
import AboutProject from '../../sections/AboutProject/AboutProject';
import Techs from '../../sections/Techs/Techs';
import AboutMe from '../../sections/AboutMe/AboutMe';
import Portfolio from '../../sections/Portfolio/Portfolio';

export default function Main() {
  return (
    <main>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  );
}
