import React from 'react';
import Radio from '../radio';
import styles from './radio-group.module.scss';

type TRadioConfig = {
  text: string;
  value: string;
  checked: boolean;
  name: string;
  onClick: (event: React.InputHTMLAttributes<HTMLInputElement>) => void;
};

type TRadioGroupProps = {
  config: TRadioConfig[];
  row?: boolean;
};

export default function RadioGroup({
  config,
  row,
}: TRadioGroupProps): JSX.Element {
  return (
    <div className={`${styles.wrapper} ${row && styles.row}`}>
      {config &&
        config.map((item: TRadioConfig) => (
          <Radio
            key={item.text}
            text={item.text}
            value={item.value}
            checked={item.checked}
            name={item.name}
            onClick={item.onClick}
          />
        ))}
    </div>
  );
}
