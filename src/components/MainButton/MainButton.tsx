import React from 'react';
import style from './MainButton.module.scss';

type ButtonPropsType = {
  title: string;
  callback?: () => void;
};

const MainButton = ({ title, callback }: ButtonPropsType) => (
  <button type="button" className={style.button} onClick={callback}>
    {title}
  </button>
);

export default MainButton;
