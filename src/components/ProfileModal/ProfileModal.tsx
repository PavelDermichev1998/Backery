import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './ProfileModal.module.scss';
import { useAppSelector } from '../../hooks/redux';
import { RootState } from '../../store';
import profile from '../../assets/profile2.png';
import settings from '../../assets/settings2.png';
import logout from '../../assets/logout.png';
import { logoutAltImgText, profileAltImgText, settingsAltImgText } from './constants';

export default function ProfileModal() {
  const { isShowModal } = useAppSelector((state: RootState) => state.profile);

  return isShowModal ? (
    <div className={style['profile-modal']}>
      <p className={style['settings-container']}>Settings</p>
      <NavLink to="/profile">
        <img src={profile} alt={profileAltImgText} />
      </NavLink>
      <NavLink to="/settings">
        <img src={settings} alt={settingsAltImgText} />
      </NavLink>
      <NavLink to="/">
        <img src={logout} alt={logoutAltImgText} className={style.logout} />
      </NavLink>
    </div>
  ) : (
    <></>
  );
}
