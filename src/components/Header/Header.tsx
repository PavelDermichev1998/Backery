import React from 'react';
import style from './Header.module.scss';
import logo from '../../assets/logo.png';
import search from '../../assets/search.svg';
import notifications from '../../assets/notifications.svg';
import userPhoto from '../../assets/userPhoto.png';
import { changeIsShowModal } from '../../store/profileSlice/profileSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { RootState } from '../../store';
import ProfileModal from '../ProfileModal';
import { altImgText, placeholderText } from './constants';

const Header = () => {
  const dispatch = useAppDispatch();

  const { isShowModal } = useAppSelector((state: RootState) => state.profile);

  const handleChangeIsShowModalClick = () => {
    dispatch(changeIsShowModal(!isShowModal));
  };

  return (
    <header className={style.header}>
      <div className={style['header-wrapper']}>
        <div className={style['header-logo-container']}>
          <img className={style['header-logo']} src={logo} alt={altImgText} />
          <h1 className={style['header-text']}>Bakery Organic</h1>
        </div>
        <div className={style['header-info-wrapper']}>
          <div className={style['header-search-wrapper']}>
            <input type="text" placeholder={placeholderText} />
            <div className={style['search-img-wrapper']}>
              <img src={search} alt="Search" />
            </div>
          </div>
          <img src={notifications} alt="Notifications" />
          <button
            type="button"
            className={style['header-user-photo-button']}
            onClick={handleChangeIsShowModalClick}
          >
            <img src={userPhoto} alt="User" className={style['header-user-photo']} />
            <ProfileModal />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
