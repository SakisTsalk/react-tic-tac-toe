import React, {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import Board from '../Board';
import { calculateWinner } from '../../utils';
import styles from './TicTacToe.module.scss';
import { PlayerName } from '../../enums';

export const TicTacToe: FC = (): ReactElement => {
  const [winner, setWinner] = useState<PlayerName | null>(null);
  const [scoreForPlayerX, setScoreForPlayerX] = useState<number>(0);
  const [scoreForPlayer0, setScoreForPlayer0] = useState<number>(0);

  const onSetWinnerCall = useCallback((values: PlayerName[]) => {
    setWinner(calculateWinner(values));
  }, []);

  useEffect(() => {
    if (winner === PlayerName.X) {
      setScoreForPlayerX((previousScore) => previousScore + 1);
    } else if (winner === PlayerName.O) {
      setScoreForPlayer0((previousScore) => previousScore + 1);
    }
  }, [winner]);

  const { width, height } = useWindowSize();

  return (
    <div className={styles.dashboard}>
      <div className={styles.score}>
        <h3>{`Player X score: ${scoreForPlayerX}`}</h3>
        <h3>{`Player O score: ${scoreForPlayer0}`}</h3>
      </div>
      <div className={styles.game}>
        <h1>Welcome to the 4x4 Tic tac toe experience</h1>
        <Board winner={winner} onValuesChange={onSetWinnerCall} />
        {winner && (
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={400}
          />
        )}
      </div>
    </div>
  );
};

export default TicTacToe;
