import React from 'react';
import cn from 'classnames';
import styles from './button.module.scss';

type ButtonProps = {
  name: string;
  onClick: () => void;
  secondary?: boolean;
  disabled?: boolean;
};

function Button({
  name,
  onClick,
  secondary,
  disabled,
}: ButtonProps): JSX.Element {
  const btnClass = cn({
    [styles.button]: true,
    [styles.alternate]: secondary,
    [styles.disabled]: disabled,
  });

  return (
    <button
      className={btnClass}
      disabled={disabled}
      type="button"
      onClick={onClick}
    >
      {name}
    </button>
  );
}

export default Button;