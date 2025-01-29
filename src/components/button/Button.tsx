import styles from './button.module.css';

type TButtonProps = { children: string | JSX.Element; onClick?: () => void };

export default function Button({ children, onClick }: TButtonProps) {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
}
