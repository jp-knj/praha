import Button from "../../ui/Button/Button";
import Square from "../../ui/Square/Square";
import styles from "../../styles/board.module.scss";

type Props = {
  winner: string,
  player: string,
  boards: any[],
  handlePlayClick:(index: number) => void,
  handleResetClick: () => void,
  renderStatus: () => JSX.Element
}

export const Board = ({winner, player, boards, handlePlayClick, handleResetClick, renderStatus}: Props):JSX.Element => {
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

