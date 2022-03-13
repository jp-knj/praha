type Props = {
    onClick: () => void;
}

function Button({onClick}:Props):JSX.Element {
    return <button className='reset' onClick={onClick}>Reset</button>
}

export default Button;