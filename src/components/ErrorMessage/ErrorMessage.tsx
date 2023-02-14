import React from 'react';
import style from './ErrorMessage.module.scss';

type ErrorMessagePropsType = {
  errorText: string;
  invalidInput: boolean;
};

const ErrorMessage = ({ errorText, invalidInput }: ErrorMessagePropsType) => (
  <div className={style['invalid-input']}>{invalidInput ? errorText : null}</div>
);

export default ErrorMessage;
