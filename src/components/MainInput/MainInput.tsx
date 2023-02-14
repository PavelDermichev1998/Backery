import React from 'react';
import style from './MainInput.module.scss';

type InputPropsType = {
  type: string;
  onChangeProps: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  title: string;
  maxLength?: number;
  invalidInput?: boolean;
  errorText?: string;
};

const MainInput = ({
  type,
  onChangeProps,
  value,
  title,
  maxLength,
  invalidInput,
  errorText,
}: InputPropsType) => (
  <>
    <div className={style['login-email-password']}>
      <p>{title}</p>
      <input type={type} onChange={onChangeProps} value={value} maxLength={maxLength} />
    </div>
    {invalidInput && (
      <div className={style['invalid-input']}>{invalidInput ? errorText : null}</div>
    )}
  </>
);

export default MainInput;
