import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './BreadCrumbs.module.scss';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';

type InputPropsType = {
  title: string;
  link: string;
};

const BreadCrumbs = ({ title, link }: InputPropsType) => (
  <div className={style['bread-crumbs']}>
    <NavLink to={`/${link}`}>{capitalizeFirstLetter(link)} </NavLink>/ {title}
  </div>
);

export default BreadCrumbs;
