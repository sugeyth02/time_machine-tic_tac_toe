/* eslint-disable no-nested-ternary */
import React, {
  useCallback, useEffect, useState, useReducer,
} from 'react';
import { Link } from 'react-router-dom';
import useTimeMachine from '../../hooks/useTimeMachine';
import Paths from '../../constants/paths';
import TicTacToeBox from '../../components/TicTacToeBox';
import style from './TicTacToe.module.scss';
import calculateWinner from '../../utilities/winner';
import reducer from '../../reducers/boardTravel.reducer';

const { HOME } = Paths;

interface IBoard {
  boxes: string[];
  xisNext: boolean;
}

const TicTacToe = () => {
  const [winner, setWinner] = useState<string>('');
  const [isReplay, setReplay] = useState(false);
  const [replayIndex, setReplayIndex] = useState(0);
  const [board, setBoard] = useState<IBoard>({
    boxes: Array(9).fill(''),
    xisNext: true,
  });
  const [boardTravel, dispatch] = useReducer(reducer, {
    current: -1,
    traveling: false,
  });
  const timeMachine = useTimeMachine<string[]>(board.boxes);

  useEffect(() => {
    if (!boardTravel.traveling) {
      dispatch({
        type: 'set',
        payload: { current: timeMachine.previousValue.length - 1 },
      });
    }
  }, [timeMachine.previousValue.length]);

  useEffect(() => {
    const winnerAux = calculateWinner(board.boxes);
    if (winnerAux) {
      setWinner(winnerAux);
    }
  }, [board.boxes]);

  const setPlayerCallback = useCallback(
    (index) => {
      if (winner !== '') {
        return;
      }
      const currentBoard = board.boxes.slice();
      currentBoard[index] = board.xisNext ? 'X' : 'O';
      setBoard((prev) => ({ boxes: currentBoard, xisNext: !prev.xisNext }));
    },
    [board, winner],
  );
  const handleRestart = useCallback(() => {
    setBoard({ boxes: Array(9).fill(''), xisNext: true });
    setWinner('');
    setReplay(false);
    dispatch({
      type: 'set',
      payload: { current: 0, isTraveling: false },
    });
  }, []);

  const handleNext = useCallback(() => {
    dispatch({
      type: 'next',
      payload: { arrayTravel: timeMachine.previousValue.length },
    });
  }, [timeMachine.getPreviousValue]);

  const handleResume = useCallback(() => {
    dispatch({
      type: 'set',
      payload: {
        current: timeMachine.previousValue.length - 1,
        isTraveling: false,
      },
    });
  }, [timeMachine.getPreviousValue]);
  const handlePrevious = useCallback(() => {
    dispatch({ type: 'previous' });
  }, []);
  const handleReplay = useCallback(() => {
    setReplay(true);
    setInterval(() => {
      setReplayIndex((prev) => {
        if (prev + 1 < timeMachine.previousValue.length) {
          return prev + 1;
        }
        return prev;
      });
    }, 500);
  }, []);

  return (
    <div>
      <Link to={HOME}>
        <i className={`fa-solid fa-circle-left ${style.container__back}`} />
      </Link>
      <div className={style.container}>
        <div className={style.container__box}>
          {!boardTravel.traveling && !isReplay
            && board.boxes.map((e, index) => (
              <TicTacToeBox
                key={`_${index + 1}`}
                player={board.boxes[index]}
                index={index}
                disable={false}
                setPlayerCallback={setPlayerCallback}
              />
            ))}
          {boardTravel.traveling && !isReplay
            && timeMachine.previousValue[boardTravel.current].map((e, index) => (
              <TicTacToeBox
                key={`time${index + 1}`}
                player={e}
                index={index}
                setPlayerCallback={setPlayerCallback}
                disable
              />
            ))}
          {isReplay
            && timeMachine.previousValue[replayIndex].map((e, index) => (
              <TicTacToeBox
                key={`time${index + 1}`}
                player={e}
                index={index}
                setPlayerCallback={setPlayerCallback}
                disable
              />
            ))}
        </div>
        <div className={style.container__options}>
          <button
            type="button"
            id="next"
            className={style.option}
            onClick={() => {
              handleNext();
            }}
            disabled={!boardTravel.traveling || isReplay}
          >
            Next
          </button>
          {winner === '' ? (
            <button
              type="button"
              id="resume"
              disabled={isReplay || !boardTravel.traveling}
              className={style.option}
              onClick={() => {
                handleResume();
              }}
            >
              Resume
            </button>
          ) : (
            <button
              type="button"
              id="replay"
              className={style.option}
              onClick={() => {
                handleReplay();
              }}
            >
              Replay
            </button>
          )}
          <button
            type="button"
            id="previous"
            className={style.option}
            onClick={() => {
              handlePrevious();
            }}
            disabled={boardTravel.current <= 1 || isReplay}
          >
            Previous
          </button>
          <p className={style.header}>{winner ? 'Winner:' : 'Next to play:'}</p>
          <div className={style.player}>
            <p>{winner === '' ? (board.xisNext ? 'X' : '0') : winner}</p>
          </div>
          <button
            type="button"
            id="restart"
            className={style.option}
            onClick={() => {
              handleRestart();
            }}
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
