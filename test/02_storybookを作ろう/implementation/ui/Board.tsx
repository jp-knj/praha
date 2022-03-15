import { Player } from "../models/Player";
import Button from "../ui/Button";
import Square from "../ui/Square";
import {useBoard } from "../features/useBoard";
function Board() {
  const { winner, squares, currentPlayer, calculateWinner, setSquareValue, resetTicTacToe } = useBoard();
  return (
    <div>
      {!winner && <p>Hey {currentPlayer}, it's your turn</p>}
      {winner && winner !== "BOTH" && <p>Congratulations {winner}</p>}
      {winner && winner === "BOTH" && (
        <p>Congratulations you're both winners</p>
      )}
      <div className="grid">
        {Array(9)
          .fill(null)
          .map((_, i) => {
            return (
              <Square
                winner={winner}
                key={i}
                onClick={() => setSquareValue(i)}
                value={squares[i]}
              />
            );
          })}
      </div>
      <Button onClick={resetTicTacToe} />
    </div>
  );
}

export default Board;
