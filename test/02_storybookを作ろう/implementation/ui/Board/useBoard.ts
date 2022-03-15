import { useEffect, useState} from 'react'
import { Player } from '../../models/Player'

type Maker = "X"|"O"

export type UseBoardResult = {
  winner: Player
  squares: Player[]
  currentPlayer: Maker
  calculateWinner: (squares: Player[]) => Player|null
  setSquareValue:(index: number) => void
  resetTicTacToe: () => void
}
export const useBoard = ():UseBoardResult => {
  const [winner, setWinner] = useState<Player>(null);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Maker>(
    Math.round(Math.random() * 1) === 1 ? "X" : "O"
  );
  const calculateWinner = (squares: Player[]):Player|null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const setSquareValue = (index: number) => {
    const newData: unknown[] = squares.map((val, i) => {
      if (i === index) {
        return currentPlayer;
      }
      return val;
    });
    setSquares(newData);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const resetTicTacToe = () => {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "O");
  };

  useEffect(() => {
    const w = calculateWinner(squares);
    if (w) {
      setWinner(w);
    }

    if (!w && !squares.filter((square) => !square).length) {
      setWinner("BOTH");
    }
  });

  return {
    winner,
    squares,
    currentPlayer,
    calculateWinner,
    setSquareValue,
    resetTicTacToe
  }
}