import { Player } from "../models/Player";

type Props = {
  winner: Player;
  value: Player;
  onClick: () => void;
};

function Square({ onClick, value, winner }: Props): JSX.Element {
  const square = !value ? (
    <button className="square" onClick={onClick} disabled={Boolean(winner)} />
  ) : (
    <button className={`square square_${value.toLocaleLowerCase()}`} disabled>
      {value}
    </button>
  );
  return square;
}

export default Square;
