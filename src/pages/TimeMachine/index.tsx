import React, { useState, useCallback, useReducer } from 'react';
import { Link } from 'react-router-dom';
import ColorBox from '../../components/ColorBox';
import style from './TimeMachine.module.scss';
import colors from '../../constants/boxColors';
import Paths from '../../constants/paths';
import useTimeMachine from '../../hooks/useTimeMachine';
import reducer from '../../reducers/clickedBoxFocus.reducer';

const { HOME } = Paths;

const TimeMachine = () => {
  const [clickedBox, setClickedBox] = useState<number>(-1);
  const [traveling, setTraveling] = useState<boolean>(false);
  const [clickedBoxFocus, dispatch] = useReducer(reducer, {
    current: clickedBox,
    nextArray: [],
    previousArray: [],
  });
  const timeMachine = useTimeMachine<number>(clickedBox);
  console.log(timeMachine.previousValue);

  const handleClick = useCallback((index) => {
    setClickedBox(index);
    dispatch({ type: 'set', payload: { currentFocused: index } });
  }, []);

  const handlePrevious = useCallback(() => {
    dispatch({
      type: 'previous',
      payload: {
        arrayBox: [...timeMachine.previousValue],
        oldest: timeMachine.getPreviousValue(),
      },
    });
    setTraveling(true);
  }, [timeMachine]);

  const handleNext = useCallback(() => {
    dispatch({
      type: 'next',
      payload: {
        arrayBox: timeMachine.previousValue,
        oldest: timeMachine.getPreviousValue(),
      },
    });
  }, [timeMachine]);

  const handleResume = useCallback(() => {
    dispatch({ type: 'resume', payload: { currentFocused: clickedBox } });
    setTraveling(false);
  }, [timeMachine]);

  return (
    <div>
      <Link to={HOME}>
        <i className={`fa-solid fa-circle-left ${style.container__back}`} />
      </Link>
      <div className={style.container}>
        <div className={style.container__box}>
          {colors.map((color, index) => (
            <ColorBox
              key={`_${index + 1}`}
              color={color}
              handleOnClick={() => {
                handleClick(index);
              }}
              focused={clickedBoxFocus.current === index}
              isDisable={traveling}
            />
          ))}
        </div>
        <div className={style.container__options}>
          <button
            type="button"
            id="next"
            className={style.option}
            onClick={() => handleNext()}
            disabled={clickedBox === clickedBoxFocus.current}
          >
            Next
          </button>
          <button
            type="button"
            id="resume"
            className={style.option}
            onClick={() => handleResume()}
            disabled={!traveling}
          >
            Resume
          </button>
          <button
            type="button"
            id="previous"
            className={style.option}
            onClick={() => handlePrevious()}
            disabled={
              clickedBoxFocus.current === timeMachine.getPreviousValue()
              || timeMachine.getPreviousValue() === undefined
            }
          >
            Previous
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeMachine;
