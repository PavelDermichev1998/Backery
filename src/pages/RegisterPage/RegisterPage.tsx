import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './RegisterPage.module.scss';
import MainButton from '../../components/MainButton';
import { RootState } from '../../store';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  changeUserRegisterBirthDay,
  changeUserRegisterEmail,
  changeUserRegisterName,
  changeUserRegisterPassword,
  changeUserRegisterPhone,
  changeUserRegisterSecondName,
  getAllPositions,
  PositionType,
  postAuthRegister,
} from '../../store/registerSlice/registerSlice';
import MainInput from '../../components/MainInput';
import ShowPassword from '../../components/ShowPassword';
import PositionChoose from '../../components/PositionChoose';
import ErrorMessage from '../../components/ErrorMessage';
import PublicLayout from '../../components/layouts/PublicLayout';

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    loading,
    isRegistered,
    allPositions,
    user: { name, secondName, email, password, phone, birthDay, positions },
  } = useAppSelector((state: RootState) => state.register);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [invalidPassword, setInvalidPassword] = useState<boolean>(false);
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const [invalidPhone, setInvalidPhone] = useState<boolean>(false);
  const [invalidMain, setInvalidMain] = useState<boolean>(false);

  const handleShowPasswordClick = () => {
    setIsShowPassword(!isShowPassword);
  };

  const changeUserNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvalidMain(false);
    dispatch(changeUserRegisterName(e.target.value));
  };

  const changeUserSecondNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvalidMain(false);
    dispatch(changeUserRegisterSecondName(e.target.value));
  };

  const changeUserEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvalidEmail(false);
    dispatch(changeUserRegisterEmail(e.target.value));
  };

  const changeUserPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvalidPassword(false);
    dispatch(changeUserRegisterPassword(e.target.value));
  };

  const changeUserPhoneHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvalidPhone(false);
    dispatch(changeUserRegisterPhone(e.target.value));
  };

  const changeUserBirthdayHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvalidMain(false);
    dispatch(changeUserRegisterBirthDay(e.target.value));
  };

  const handleRegisterClick = useCallback(() => {
    const regExpEmail =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    const regExpPhone = /^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$/i;

    if (!regExpEmail.test(String(email).toLowerCase())) {
      setInvalidEmail(true);
    } else if (password.length <= 7) {
      setInvalidPassword(true);
    } else if (!regExpPhone.test(String(phone))) {
      setInvalidPhone(true);
    } else if (
      name.length === 0 ||
      secondName.length === 0 ||
      birthDay.length === 0 ||
      positions.length === 0
    ) {
      setInvalidMain(true);
    } else {
      dispatch(
        postAuthRegister({
          name,
          secondName,
          email,
          password,
          phone,
          birthDay,
          positions,
        }),
      );
    }
  }, [birthDay, dispatch, email, name, password, phone, positions, secondName]);

  useEffect(() => {
    dispatch(getAllPositions());
  }, [dispatch]);

  useEffect(() => {
    document.onkeyup = (e: KeyboardEvent) => {
      if (e.keyCode === 13) {
        handleRegisterClick();
      }
      return false;
    };
  }, [handleRegisterClick]);

  useEffect(() => {
    if (isRegistered) {
      navigate('/');
    }
  }, [navigate, isRegistered]);

  return (
    <PublicLayout loading={loading} title="Registration">
      <form>
        <MainInput
          type="text"
          onChangeProps={changeUserNameHandler}
          value={name}
          title="Name"
          maxLength={45}
        />
        <MainInput
          type="text"
          onChangeProps={changeUserSecondNameHandler}
          value={secondName}
          title="Second Name"
          maxLength={45}
        />
        <MainInput
          type="text"
          onChangeProps={changeUserEmailHandler}
          value={email}
          title="Email"
          invalidInput={invalidEmail}
          errorText="Please check if the email entered is valid"
        />
        <MainInput
          type={isShowPassword ? 'text' : 'password'}
          onChangeProps={changeUserPasswordHandler}
          value={password}
          title="Password"
          errorText="Password must be more than 7 characters"
          invalidInput={invalidPassword}
        />
        <MainInput
          type="number"
          onChangeProps={changeUserPhoneHandler}
          value={phone}
          title="Phone"
          errorText="Phone number is invalid"
          invalidInput={invalidPhone}
        />
        <MainInput
          type="date"
          onChangeProps={changeUserBirthdayHandler}
          value={birthDay}
          title="Date of birth"
        />
        <div className={style['register-select-container']}>
          <div className={style.dropdown}>
            <button type="button" className={style.dropbtn}>
              Choose positions
            </button>
            <div className={style['dropdown-content']}>
              {allPositions.length === 0 ? (
                <>
                  <PositionChoose positionName="HR" />
                  <PositionChoose positionName="Accountant" />
                </>
              ) : (
                allPositions.map((pos: PositionType) => (
                  <PositionChoose positionName={pos.name} />
                ))
              )}
            </div>
          </div>
        </div>
        <ErrorMessage errorText="Fields cannot be empty" invalidInput={invalidMain} />
        <MainButton title="Register" callback={handleRegisterClick} />
      </form>
      <ShowPassword
        isShowPassword={isShowPassword}
        handleShowPasswordClick={handleShowPasswordClick}
        link="Login"
      />
    </PublicLayout>
  );
}
