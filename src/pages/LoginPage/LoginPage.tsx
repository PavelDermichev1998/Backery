import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainButton from '../../components/MainButton';
import { RootState } from '../../store';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  changeUserLoginEmail,
  changeUserLoginPassword,
  postAuthLogin,
} from '../../store/loginSlice/loginSlice';
import MainInput from '../../components/MainInput';
import ShowPassword from '../../components/ShowPassword';
import PublicLayout from '../../components/layouts/PublicLayout';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    token,
    loading,
    user: { email, password },
  } = useAppSelector((state: RootState) => state.login);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [invalidPassword, setInvalidPassword] = useState<boolean>(false);
  const [invalidName, setInvalidName] = useState<boolean>(false);

  const handleShowPasswordClick = useCallback(() => {
    setIsShowPassword(!isShowPassword);
  }, [isShowPassword]);

  const changeUserNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvalidName(false);
    dispatch(changeUserLoginEmail(e.target.value));
  };

  const changeUserPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvalidPassword(false);
    dispatch(changeUserLoginPassword(e.target.value));
  };

  const handleLoginClick = useCallback(() => {
    if (password.length <= 7 && email.length === 0) {
      setInvalidName(true);
      setInvalidPassword(true);
    } else if (email.length === 0) {
      setInvalidName(true);
    } else if (password.length <= 7) {
      setInvalidPassword(true);
    } else {
      dispatch(postAuthLogin({ email, password }));
    }
  }, [dispatch, email, password]);

  useEffect(() => {
    localStorage.setItem('token', JSON.stringify(token));
  }, [token]);

  useEffect(() => {
    document.onkeyup = (e: KeyboardEvent) => {
      if (e.keyCode === 13) {
        handleLoginClick();
      }
      return false;
    };
  }, [handleLoginClick]);

  useEffect(() => {
    if (token) {
      navigate('/profile');
    }
  }, [navigate, token]);

  return (
    <PublicLayout loading={loading} title="Login">
      <form>
        <MainInput
          type="text"
          onChangeProps={changeUserNameHandler}
          value={email}
          title="Email Address or Personal Number"
          invalidInput={invalidName}
          errorText="Field cannot be empty"
        />
        <MainInput
          type={isShowPassword ? 'text' : 'password'}
          onChangeProps={changeUserPasswordHandler}
          value={password}
          title="Password"
          invalidInput={invalidPassword}
          errorText="Password must be more than 7 characters"
        />
        <MainButton title="Login" callback={handleLoginClick} />
      </form>
      <ShowPassword
        isShowPassword={isShowPassword}
        handleShowPasswordClick={handleShowPasswordClick}
        link="Register"
      />
    </PublicLayout>
  );
}
