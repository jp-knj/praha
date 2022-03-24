import { Player } from "../../models/Player";
import Button from "../../ui/Button";
import Square from "../../ui/Square";
import "../../styles/board.module.scss";
import { useBoard } from './useBoard';

export const Board = () => {
  const initialValues = Array(9).fill(null);
  const initialPlayer = 'O';
  const initialWinner = '';
  const [winner, player, boards, handlePlayClick, handleResetClick ] = useBoard({initialValues, initialPlayer, initialWinner});
  console.log(boards);
  return (
    <div>
      <div className="grids">
        {
          boards.map((value, index) => (
            <div
              role="button"
              tabIndex={0}
              key={index}
              onClick={() => handlePlayClick(index)}
              onKeyPress={() => handlePlayClick(index)}
            >
              {value}
            </div>
          ))
        }
      </div>z
      <div className="info">
        <h3>
          Player: {player}
          { winner && ` | Winner: ${winner}` }
        </h3>

        <button
          type="button"
          onClick={handleResetClick}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

