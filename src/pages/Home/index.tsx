import React from 'react';
import { Link } from 'react-router-dom';
import style from './Home.module.scss';
import Paths from '../../constants/paths';

const { TIME_MACHINE, TIC_TAC_TOE } = Paths;

const Home = () => (
  <div className={style.container}>
    <div className={style.container__header}>
      <h1 className={style.header__title}>Welcome!</h1>
      <p className={style.header__description}>Please select an option</p>
    </div>
    <Link type="button" className={style.container__button} to={TIME_MACHINE}>
      Time Machine
    </Link>
    <Link type="button" className={style.container__button} to={TIC_TAC_TOE}>
      Tic Tac Toe
    </Link>
  </div>
);

export default Home;
