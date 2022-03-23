import { Player } from "../../models/Player";
import Button from "../../ui/Button";
import Square from "../../ui/Square";
import {useBoard } from "./useBoard";

function Board() {
  const { winner, squares, currentPlayer, calculateWinner, insertMarker, handleResetGame } = useBoard();
  return (
    <div>

      <div className="grid">
        {Array(9)
          .fill(null)
          .map((_, i) => {
            return (
              <Square
                winner={winner}
                key={i}
                onClick={() => insertMarker(i)}
                marker={squares[i]}
              />
            );
          })}
      </div>
      <Button onClick={handleResetGame} />
    </div>
  );
}

export default Board;
