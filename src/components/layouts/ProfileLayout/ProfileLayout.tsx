import React, { ReactNode } from 'react';
import style from './ProfileLayout.module.scss';
import Header from '../../Header';
import Navigation from '../../Navigation';
import Loading from '../../Loading';

type PropsType = {
  children: ReactNode;
  loading: boolean;
};

const ProfileLayout = ({ children, loading }: PropsType) => (
  <>
    {loading ? (
      <Loading />
    ) : (
      <div className={style['profile-layout']}>
        <Header />
        <div className={style['profile-layout-content']}>
          <Navigation />
          {children}
        </div>
      </div>
    )}
  </>
);

export default ProfileLayout;
