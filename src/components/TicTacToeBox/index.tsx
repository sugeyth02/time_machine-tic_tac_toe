import React from 'react';
import styles from './TicTacToeBox.module.scss';

interface IProps {
  player: string;
  setPlayerCallback: (index: number) => void;
  index: number;
  disable: boolean;
}

const TicTacToeBox = ({
  player,
  setPlayerCallback,
  index,
  disable,
}: IProps) => (
  <button
    type="button"
    className={styles.box}
    aria-label="button"
    disabled={disable || player !== ''}
    onClick={() => {
      setPlayerCallback(index);
    }}
  >
    {player}
  </button>
);
export default TicTacToeBox;
