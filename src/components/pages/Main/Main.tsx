import './Main.css';

import React from 'react';
import Promo from '../../others/Promo/Promo';
import AboutProject from '../../others/AboutProject/AboutProject';
import Techs from '../../others/Techs/Techs';
import AboutMe from '../../others/AboutMe/AboutMe';

// import Header from '../../common/Header/Header';

export default function Main() {
  return (
    <main>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
    </main>
  );
}
