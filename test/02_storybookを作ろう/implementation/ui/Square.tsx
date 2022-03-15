import { Player } from "../models/Player";

type Props = {
  winner: Player;
  marker: Player;
  onClick: () => void;
};

function Square({ onClick, marker, winner }: Props): JSX.Element {
  const square = !marker ? (
    <button className="square" onClick={onClick} disabled={Boolean(winner)} />
  ) : (
    <button className={`square square_${marker.toLocaleLowerCase()}`} disabled>
      {marker}
    </button>
  );
  return square;
}

export default Square;
