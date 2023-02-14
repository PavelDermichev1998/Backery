import React, { useEffect } from 'react';
import style from './ProfilePage.module.scss';
import userPhoto from '../../assets/userPhoto.png';
import ProfileLayout from '../../components/layouts/ProfileLayout';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { RootState } from '../../store';
import BreadCrumbs from '../../components/BreadCrumbs';
import { getCurrentUser } from '../../store/profileSlice/profileSlice';
import {
  birthdayText,
  emailText,
  phoneText,
  profileText,
  userAltImgText,
} from './constants';

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const { loading, user } = useAppSelector((state: RootState) => state.profile);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <ProfileLayout loading={loading}>
      <div className={style['profile-page']}>
        <h3>{profileText}</h3>
        <BreadCrumbs title={profileText} link="dashboard" />
        <div className={style['profile-container']}>
          <div className={style['profile-image-container']}>
            <img src={userPhoto} alt={userAltImgText} />
            <div>
              <div className={style['profile-name']}>
                {`${user.name} ${user.secondName}`}
              </div>
              <div className={style['profile-date']}>
                Date of Join : {user.createdAt.slice(0, 10)}
              </div>
            </div>
          </div>
          <div className={style['profile-info-container']}>
            <div className={style['profile-info']}>
              <span>{phoneText}</span>
              <span>{user.phone}</span>
            </div>
            <div className={style['profile-info']}>
              <span>{emailText}</span>
              <span>{user.email}</span>
            </div>
            <div className={style['profile-info']}>
              <span>{birthdayText}</span>
              <span>{user.birthDay}</span>
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}
