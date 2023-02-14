import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import style from './TimeProgress.module.scss';

type InputPropsType = {
  title: string;
  time: string;
  timeQuota: number;
};

const TimeProgress = ({ title, time, timeQuota }: InputPropsType) => (
  <div className={style['time-progress']}>
    <div className={style['stats-text']}>
      <p>{title}</p>
      <div className={style['date-text']}>
        <p>
          {time}/{timeQuota}
        </p>
      </div>
    </div>
    <LinearProgress
      variant="determinate"
      color="success"
      value={(Number(time) * 100) / Number(timeQuota)}
    />
  </div>
);

export default TimeProgress;
