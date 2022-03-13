type Player = 'X'| 'O' | null

type Props = {
    winner: Player
    value: Player
    onClick: () => void;
}

function Square({onClick, value, winner}:Props):JSX.Element {
    const square = !value ? <button onClick={onClick} disabled={Boolean(winner)} /> : <button>{value}</button>;
    return square;
}

export default Square;