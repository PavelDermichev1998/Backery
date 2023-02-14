import React, { useCallback, useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import style from './AddEmployeeModal.module.scss';
import { AddEmployeeProps } from './AddEmployeeModal.type';
import MainInput from '../MainInput';
import PositionChoose from '../PositionChoose';
import ErrorMessage from '../ErrorMessage';
import MainButton from '../MainButton';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { RootState } from '../../store';
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
import ADD_EMPLOYEES_CONST from './AddEmployeeModal.dictionary';

export default function AddEmployeeModal({ isOpen, setIsOpen }: AddEmployeeProps) {
  const handleClose = () => setIsOpen(false);

  const dispatch = useAppDispatch();
  const {
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

  const handleAddUserClick = useCallback(() => {
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
      setIsOpen(false);
    }
  }, [
    birthDay,
    dispatch,
    email,
    name,
    password,
    phone,
    positions,
    secondName,
    setIsOpen,
  ]);

  useEffect(() => {
    dispatch(getAllPositions());
  }, [dispatch]);

  useEffect(() => {
    document.onkeyup = (e: KeyboardEvent) => {
      if (e.keyCode === 13) {
        handleAddUserClick();
      }
      return false;
    };
  }, [handleAddUserClick]);

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={style['modal-box']}>
        <form className={style['modal-box-form']}>
          <MainInput
            type="text"
            onChangeProps={changeUserNameHandler}
            value={name}
            title={`${ADD_EMPLOYEES_CONST.NAME}`}
            maxLength={45}
          />
          <MainInput
            type="text"
            onChangeProps={changeUserSecondNameHandler}
            value={secondName}
            title={`${ADD_EMPLOYEES_CONST.SECOND_NAME}`}
            maxLength={45}
          />
          <MainInput
            type="text"
            onChangeProps={changeUserEmailHandler}
            value={email}
            title={`${ADD_EMPLOYEES_CONST.EMAIL}`}
            invalidInput={invalidEmail}
            errorText={`${ADD_EMPLOYEES_CONST.EMAIL_ERROR_TEXT}`}
          />
          <MainInput
            type={isShowPassword ? 'text' : 'password'}
            onChangeProps={changeUserPasswordHandler}
            value={password}
            title={`${ADD_EMPLOYEES_CONST.PASSWORD}`}
            errorText={`${ADD_EMPLOYEES_CONST.PASSWORD_ERROR_TEXT}`}
            invalidInput={invalidPassword}
          />
          <MainInput
            type="number"
            onChangeProps={changeUserPhoneHandler}
            value={phone}
            title={`${ADD_EMPLOYEES_CONST.PHONE}`}
            errorText={`${ADD_EMPLOYEES_CONST.PHONE_ERROR_TEXT}`}
            invalidInput={invalidPhone}
          />
          <MainInput
            type="date"
            onChangeProps={changeUserBirthdayHandler}
            value={birthDay}
            title={`${ADD_EMPLOYEES_CONST.DATE}`}
          />
          <div className={style['modal-select-container']}>
            <div className={style.dropdown}>
              <button type="button" className={style.dropbtn}>
                Choose positions
              </button>
              <div className={style['dropdown-content']}>
                {allPositions.length === 0 ? (
                  <>
                    <PositionChoose
                      positionName={`${ADD_EMPLOYEES_CONST.DEFAULT_POSITION_NAME.HR}`}
                    />
                    <PositionChoose
                      positionName={`${ADD_EMPLOYEES_CONST.DEFAULT_POSITION_NAME.ACCOUNTANT}`}
                    />
                  </>
                ) : (
                  React.Children.toArray(
                    allPositions.map((pos: PositionType) => (
                      <PositionChoose positionName={pos.name} />
                    )),
                  )
                )}
              </div>
            </div>
          </div>
          <ErrorMessage
            errorText={`${ADD_EMPLOYEES_CONST.EMPTY_FIELD_ERROR}`}
            invalidInput={invalidMain}
          />
          <MainButton
            title={`${ADD_EMPLOYEES_CONST.SUBMIT_BUTTON}`}
            callback={handleAddUserClick}
          />
        </form>
        <div className={style['modal-button-wrapper']}>
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
          </div>
          <div>
            <button
              className={style['modal-button-close']}
              type="button"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
