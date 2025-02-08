import React from 'react';
import styles from './button.module.css';

interface ButtonProps {
  children: string | JSX.Element;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
