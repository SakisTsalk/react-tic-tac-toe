import React, { FC, ReactElement } from 'react';
import styles from './Square.module.scss';

interface IProps {
  value: string;
  onClick(): void;
  disabled?: boolean;
}

export const Square: FC<IProps> = ({
  value,
  onClick,
  disabled,
}: IProps): ReactElement => {
  return (
    <button className={styles.square} onClick={onClick} disabled={disabled}>
      {value}
    </button>
  );
};

export default Square;
