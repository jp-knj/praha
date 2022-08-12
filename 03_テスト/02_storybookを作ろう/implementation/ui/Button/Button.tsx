import styles from "../../styles/board.module.scss";

type Props = {
  onClick: () => void;
};

const Button = ({ onClick }: Props): JSX.Element => {
  return (
    <button
      className={styles.button}
      type="button"
      onClick={onClick}
    >
    Reset
    </button>
  );
}

export default Button;
