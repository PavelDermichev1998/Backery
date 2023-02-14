import React, { ReactNode } from 'react';
import style from './PublicLayout.module.scss';
import Loading from '../../Loading';
import logo from '../../../assets/logo.png';

type PropsType = {
  children: ReactNode;
  loading: boolean;
  title: string;
};

const PublicLayout = ({ children, loading, title }: PropsType) => (
  <>
    {loading ? (
      <Loading />
    ) : (
      <div className={style['public-layout']}>
        <img src={logo} alt="Logo" />
        <div className={style['layout-content']}>
          <div className={style['layout-wrapper']}>
            <p className={style['layout-text']}>{title}</p>
            {children}
          </div>
        </div>
      </div>
    )}
  </>
);

export default PublicLayout;
