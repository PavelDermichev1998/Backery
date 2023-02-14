import React from 'react';
import { ReactComponent as ActivityLine } from '../../assets/u134.svg';
import { ReactComponent as ActivityCircle } from '../../assets/u135.svg';
import style from './ActivityStats.module.scss';
import ACTIVITY_STATS_CONST from './ActivityStats.dictionary';

export interface Log {
  id: number;
  time: string;
  description: string;
  createdAt: string;
  userId: number;
}

type InputPropsType = {
  data: Log;
};

const ActivityStats = ({ data }: InputPropsType) => {
  const rowDescription = data.description.length
    ? data.description
    : `${ACTIVITY_STATS_CONST.DEFAULT_DESCRIPTION}`;

  return (
    <div className={style['activity-module']} key={data.id}>
      <div className={style['activity-indicator']}>
        <ActivityCircle title={`${ACTIVITY_STATS_CONST.ACTIVITYELEMENT.CIRCLE}`} />
        <ActivityLine
          className={style['activity-indicator-line']}
          title={`${ACTIVITY_STATS_CONST.ACTIVITYELEMENT.LINE}`}
        />
      </div>
      <div className={style['activity-text']}>
        <p>{rowDescription}</p>
        <p>{data.time}</p>
      </div>
    </div>
  );
};

export default ActivityStats;
