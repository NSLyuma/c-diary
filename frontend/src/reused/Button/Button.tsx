import React from 'react';
import styles from './Button.module.css';

export enum ButtonTheme {
  primary = 'primary',
  danger = 'danger',
}

export type ButtonType = 'button' | 'submit' | 'reset' | undefined;

type Props = {
  text: string;
  onClick?: () => void;
  theme: ButtonTheme;
  type?: ButtonType;
};

function Button({ text, onClick, theme, type }: Props) {
  return (
    <button
      className={`${styles.button} ${styles[`${theme}`]}`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
}

export default Button;
