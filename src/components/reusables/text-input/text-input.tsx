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
};

function TextInput({
  name,
  value,
  label,
  width,
  placeholder,
  onChange,
}: TextInputProps): JSX.Element {
  return (
    <div style={{ width: width ? width : '100%' }}>
      <label htmlFor={name}>{label}</label>
      <input
        className={styles.input}
        id={name}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default TextInput;
