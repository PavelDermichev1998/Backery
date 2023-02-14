import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './ErrorPage.module.scss';
import MainButton from '../../components/MainButton';

export default function ErrorPage() {
  const navigate = useNavigate();

  const handleBackHomeClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <div className={style.error}>
      <h3 className={style['error-number']}>404</h3>
      <div className={style['error-title']}>Oops, This Page Could Not Be Found.</div>
      <div className={style['error-description']}>
        The page you are looking for might have been removed, had its name changed, or is
        temporarily unavailable.
      </div>
      <MainButton title="BACK HOME" callback={handleBackHomeClick} />
    </div>
  );
}
