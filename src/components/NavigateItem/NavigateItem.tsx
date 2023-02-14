import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './NavigateItem.module.scss';

type NavigateItemPropsType = {
  image: string;
  title: string;
  link: string;
};

const NavigateItem = ({ image, title, link }: NavigateItemPropsType) => (
  <div className={style['navigate-item']}>
    <img src={image} alt={title} />
    <NavLink to={link}>
      <p>{title}</p>
    </NavLink>
  </div>
);

export default NavigateItem;
