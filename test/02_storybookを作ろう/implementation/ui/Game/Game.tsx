import {Board} from "../Board/Board";
import { useBoard } from '../Board/useBoard';

const Game = () => {
  const initialValues = Array(9).fill(null);
  const initialPlayer = 'O';
  const initialWinner = '';
  const props = useBoard({initialValues, initialPlayer, initialWinner});
  return <Board  {...props}/>;
}
export default Game;
