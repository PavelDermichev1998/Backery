import React from 'react';
import style from './Navigation.module.scss';
import dashboard from '../../assets/dashboard.svg';
import employees from '../../assets/Employees.svg';
import contracts from '../../assets/Contracts.svg';
import leaves from '../../assets/Leaves.svg';
import settings from '../../assets/Settings.svg';
import NavigateItem from '../NavigateItem';
import NAVIGATION_CONST from './Navigation.dictionary';

const Navigation = () => (
  <nav className={style.nav}>
    <div className={style['nav-wrapper']}>
      <NavigateItem
        image={dashboard}
        title={`${NAVIGATION_CONST.DASHBOARD.TITLE}`}
        link={`${NAVIGATION_CONST.DASHBOARD.LINK}`}
      />
      <NavigateItem
        image={dashboard}
        title={`${NAVIGATION_CONST.ADMIN_DASHBOARD.TITLE}`}
        link={`${NAVIGATION_CONST.ADMIN_DASHBOARD.LINK}`}
      />
      <h3>Employees</h3>
      <div className={style['navigate-items-wrapper']}>
        <NavigateItem
          image={employees}
          title={`${NAVIGATION_CONST.EMPLOYEES.TITLE}`}
          link={`${NAVIGATION_CONST.EMPLOYEES.LINK}`}
        />
        <NavigateItem
          image={contracts}
          title={`${NAVIGATION_CONST.PROFILE.TITLE}`}
          link={`${NAVIGATION_CONST.PROFILE.LINK}`}
        />
        <NavigateItem
          image={leaves}
          title={`${NAVIGATION_CONST.LOGS.TITLE}`}
          link={`${NAVIGATION_CONST.LOGS.LINK}`}
        />
      </div>
      <h3>Administration</h3>
      <NavigateItem
        image={settings}
        title={`${NAVIGATION_CONST.SETTINGS.TITLE}`}
        link={`${NAVIGATION_CONST.SETTINGS.LINK}`}
      />
    </div>
  </nav>
);

export default Navigation;
