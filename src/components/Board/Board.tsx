import React, {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Square from '../Square';
import styles from './Board.module.scss';
import { PlayerName } from '../../enums';

interface IProps {
  winner: string | null;
  onValuesChange(values: PlayerName[]): void;
}

export const Board: FC<IProps> = ({
  winner,
  onValuesChange,
}: IProps): ReactElement => {
  const [values, setValues] = useState<PlayerName[]>(Array(16).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [gameEndedWithoutWinner, setGameEndedWithoutWinner] = useState<boolean>(
    false,
  );

  const checkIfGameEndedInTie = useCallback((): void => {
    if (values.filter((value) => !!value).length === 16 && !winner) {
      setGameEndedWithoutWinner(true);
    }
  }, [values, winner]);

  useEffect(() => {
    checkIfGameEndedInTie();
  }, [values, checkIfGameEndedInTie]);

  const handleClick = useCallback(
    (index: number): void => {
      const squares = [...values];
      squares[index] = xIsNext ? PlayerName.X : PlayerName.O;

      if (winner || values[index] !== null) {
        return;
      }
      setValues(squares);
      onValuesChange(squares);

      checkIfGameEndedInTie();
      setXIsNext(!xIsNext);
    },
    [
      xIsNext,
      values,
      setXIsNext,
      winner,
      onValuesChange,
      checkIfGameEndedInTie,
    ],
  );

  const getNextPlayerOrWinner = (): string => {
    if (winner) {
      return `Congratulations player ${
        xIsNext ? PlayerName.O : PlayerName.X
      } won`;
    }

    return gameEndedWithoutWinner
      ? `Game ended without a winner`
      : `Player: ${xIsNext ? PlayerName.X : PlayerName.O} it's your turn`;
  };

  const restartGame = useCallback((): void => {
    setValues(Array(16).fill(null));
    onValuesChange(Array(16).fill(null));
    setXIsNext(true);
    setGameEndedWithoutWinner(false);
  }, [onValuesChange]);

  const roundIsOver = (): boolean => {
    return !!winner || gameEndedWithoutWinner;
  };

  return (
    <>
      <h2>{getNextPlayerOrWinner()}</h2>
      <div className={styles.gameBoard}>
        {values.map((value, index) => (
          <Square
            key={Math.random()}
            value={value}
            onClick={() => handleClick(index)}
            disabled={roundIsOver()}
          />
        ))}
      </div>
      {roundIsOver() && (
        <button className={styles.restartButton} onClick={restartGame}>
          Restart
        </button>
      )}
    </>
  );
};

export default Board;
