import React from 'react';
import cn from 'classnames';
import styles from './button.module.scss';

type ButtonProps = {
  name: string;
  onClick?: () => void;
  secondary?: boolean;
  disabled?: boolean;
  type: 'button' | 'submit' | 'reset';
  style?: any;
};

function Button({
  name,
  onClick,
  secondary,
  disabled,
  type,
  style,
}: ButtonProps): JSX.Element {
  const btnClass = cn({
    [styles.button]: true,
    [styles.alternate]: secondary,
    [styles.disabled]: disabled,
  });

  return (
    <button
      style={style || {}}
      className={btnClass}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {name}
    </button>
  );
}

export default Button;
