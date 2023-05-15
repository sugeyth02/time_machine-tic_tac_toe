import React from 'react';

import styles from './ColorBox.module.scss';

interface IProp {
  color: string;
  focused: boolean;
  isDisable: boolean;
  handleOnClick: () => void;
}

const ColorBox = ({
  color, focused, isDisable, handleOnClick,
}: IProp) => (
  <button
    type="button"
    className={styles.box}
    aria-label="button"
    style={
        focused
          ? { opacity: 1, backgroundColor: color }
          : { opacity: 0.5, backgroundColor: color }
      }
    onClick={() => {
      handleOnClick();
    }}
    disabled={isDisable}
  />
);
export default ColorBox;
