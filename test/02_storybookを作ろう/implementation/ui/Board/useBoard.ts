import { useState, useMemo } from 'react';
import { Player } from '../../models/Player'

type Maker = "X"|"O"
type Board = ReadonlyArray<number[]>
export type UseBoardResult = {
  winner: Player
  squares: ReadonlyArray<Player>
  currentPlayer: Maker
  insertMarker:(index: number) => void
  handleResetGame: () => void
}
export const useBoard = (initialValues = Array(9).fill('')):UseBoardResult => {
  const [isPlayerNext, setIsPlayerNext] = useState<boolean>(false);
  const [winner, setWinner] = useState<Player>(null);
  const [squares, setSquares] = useState<Maker[]>(initialValues);
  const [currentPlayer, setCurrentPlayer] = useState<Maker>(
    Math.round(Math.random() * 1) === 1 ? "X" : "O"
  );

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const isWinner = (values: number[]) => {
    for (const [i, j, k] of lines) {
      if (
        values[i]
        && values[i] === values[j]
        && values[j] === values[k]) {
        return true;
      }
    }
    return false;
  };


  const insertMarker = (index: number) => {
    const newData: Maker[] = squares.map((val, i) => {
      if (i === index) {
        return currentPlayer;
      }
      return val;
    });
    setSquares(newData);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const handleResetGame = () => {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "O");
  };

  return {
    winner,
    squares,
    currentPlayer,
    insertMarker,
    handleResetGame
  }
}