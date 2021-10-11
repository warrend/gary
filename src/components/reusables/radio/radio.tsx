import React from 'react';
import styles from './radio.module.scss';

type RadioProps = {
  text: string;
  value: string;
  checked: boolean;
  name: string;
  onClick?: (event: React.InputHTMLAttributes<HTMLInputElement>) => void;
  disabled?: boolean;
};

function Radio({
  text,
  name,
  checked,
  onClick,
  value,
  disabled,
}: RadioProps): JSX.Element {
  return (
    <div className={styles.radio}>
      <input
        type="radio"
        id={name}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onClick={onClick}
      />

      <label htmlFor={name}>{text}</label>
    </div>
  );
}

export default Radio;
