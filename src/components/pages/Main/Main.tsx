import './Main.css';

import React from 'react';
import Promo from '../../mainComponents/Promo/Promo';
import AboutProject from '../../mainComponents/AboutProject/AboutProject';
import Techs from '../../mainComponents/Techs/Techs';
import AboutMe from '../../mainComponents/AboutMe/AboutMe';
import Portfolio from '../../mainComponents/Portfolio/Portfolio';

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
