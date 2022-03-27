import Button from "../../ui/Button/Button";
import Square from "../../ui/Square/Square";
import styles from "../../styles/board.module.scss";
import { useBoard } from './useBoard';

export const Board = () => {
  const initialValues = Array(9).fill(null);
  const initialPlayer = 'O';
  const initialWinner = '';
  const [winner, player, boards, handlePlayClick, handleResetClick, renderStatus ] = useBoard({initialValues, initialPlayer, initialWinner});

  return (
    <div>
      <div className={styles.grids}>
        {
          boards.map((marker, index) => (
            <Square
              key={index}
              index={index}
              onClick={handlePlayClick}
              marker={marker}
            />
          ))
        }
      </div>
      <div className={styles.info}>
        {renderStatus()}
        <Button onClick={handleResetClick}/>
      </div>
    </div>
  );
}

