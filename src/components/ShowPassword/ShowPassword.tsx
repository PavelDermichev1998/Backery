import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './ShowPassword.module.scss';

type InputPropsType = {
  handleShowPasswordClick: () => void;
  isShowPassword: boolean;
  link: string;
};

const ShowPassword = ({
  handleShowPasswordClick,
  isShowPassword,
  link,
}: InputPropsType) => (
  <div className={style['checkbox-wrapper']}>
    <input
      type="checkbox"
      onClick={handleShowPasswordClick}
      checked={isShowPassword}
      readOnly
    />
    <button type="button" onClick={handleShowPasswordClick}>
      Show password
    </button>
    {link === 'Register' ? (
      <NavLink to="/register">Register</NavLink>
    ) : (
      <NavLink to="/">Login</NavLink>
    )}
  </div>
);

export default ShowPassword;
