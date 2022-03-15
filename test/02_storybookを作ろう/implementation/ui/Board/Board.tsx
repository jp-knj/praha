import { Player } from "../../models/Player";
import Button from "../../ui/Button";
import Square from "../../ui/Square";
import {useBoard } from "./useBoard";

function Board() {
  const { winner, squares, currentPlayer, calculateWinner, insertMarker, handleResetGame } = useBoard();
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
                onClick={() => insertMarker(i)}
                value={squares[i]}
              />
            );
          })}
      </div>
      <Button onClick={handleResetGame} />
    </div>
  );
}

export default Board;
