import React, { useEffect } from 'react';
import style from './SettingsPage.module.scss';
import ProfileLayout from '../../components/layouts/ProfileLayout';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { RootState } from '../../store';
import BreadCrumbs from '../../components/BreadCrumbs';
import {
  changeProfileBirthday,
  changeProfileEmail,
  changeProfileName,
  changeProfilePhone,
  changeProfileSecondName,
  getCurrentUser,
  updateCurrentUser,
} from '../../store/profileSlice/profileSlice';
import {
  birthdayText,
  emailText,
  nameText,
  phoneText,
  saveText,
  secondNameText,
  settingsText,
} from './constants';

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const { loading, user } = useAppSelector((state: RootState) => state.profile);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const changeProfileNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeProfileName(e.target.value));
  };

  const changeProfileSecondNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeProfileSecondName(e.target.value));
  };

  const changeProfilePhoneHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeProfilePhone(e.target.value));
  };

  const changeProfileEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeProfileEmail(e.target.value));
  };

  const changeProfileBirthdayHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeProfileBirthday(e.target.value));
  };

  const handleUpdateUserProfileClick = () => {
    dispatch(
      updateCurrentUser({
        name: user.name,
        secondName: user.secondName,
        email: user.email,
        phone: user.phone,
        birthDay: user.birthDay,
      }),
    );
  };

  return (
    <ProfileLayout loading={loading}>
      <div className={style['settings-page']}>
        <h3>{settingsText}</h3>
        <BreadCrumbs title="Settings" link="profile" />
        <div className={style['settings-container']}>
          <div className={style['settings-info']}>
            <div>
              <p>{nameText}</p>
              <input type="text" value={user.name} onChange={changeProfileNameHandler} />
            </div>
            <div>
              <p>{secondNameText}</p>
              <input
                type="text"
                value={user.secondName}
                onChange={changeProfileSecondNameHandler}
              />
            </div>
            <div>
              <p>{phoneText}</p>
              <input
                type="text"
                value={user.phone}
                onChange={changeProfilePhoneHandler}
              />
            </div>
            <div>
              <p>{emailText}</p>
              <input
                type="text"
                value={user.email}
                onChange={changeProfileEmailHandler}
              />
            </div>
            <div>
              <p>{birthdayText}</p>
              <input
                type="date"
                value={user.birthDay}
                onChange={changeProfileBirthdayHandler}
              />
            </div>
          </div>
          <div className={style['settings-button-container']}>
            <button type="button" onClick={handleUpdateUserProfileClick}>
              {saveText}
            </button>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}
