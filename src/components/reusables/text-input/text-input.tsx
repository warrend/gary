import React from 'react';
import cn from 'classnames';
import styles from './text-input.module.scss';

type TextInputProps = {
  value: string | number;
  label?: string;
  name: string;
  width?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
};

function TextInput({
  name,
  value,
  label,
  width,
  placeholder,
  onChange,
  type,
}: TextInputProps): JSX.Element {
  return (
    <div style={{ width: width ? width : '100%' }} className={styles.wrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        className={styles.input}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
      />
    </div>
  );
}

export default TextInput;
