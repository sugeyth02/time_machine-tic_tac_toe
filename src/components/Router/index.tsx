import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Paths from '../../constants/paths';
import Home from '../../pages/Home';
import TicTacToe from '../../pages/TicTacToe';
import TimeMachine from '../../pages/TimeMachine';

const { HOME, TIME_MACHINE, TIC_TAC_TOE } = Paths;

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path={HOME} element={<Home />} />
      <Route path={TIME_MACHINE} element={<TimeMachine />} />
      <Route path={TIC_TAC_TOE} element={<TicTacToe />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
