import { PlayerName } from '../enums';

export const calculateWinner = (squares: PlayerName[]): PlayerName | null => {
  const winningCombinations: number[][] = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12],
    [1, 6, 11],
    [2, 5, 8],
    [4, 9, 14],
    [7, 10, 13],
  ];
  let winner: string | null = null;

  winningCombinations.forEach((line) => {
    const [a, b, c, d] = line;

    if (
      (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) ||
      (squares[b] && squares[b] === squares[c] && squares[b] === squares[d])
    ) {
      winner = squares[a] ?? squares[b];
    }
  });

  return winner;
};
