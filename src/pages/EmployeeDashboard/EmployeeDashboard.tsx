import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import userPhoto from '../../assets/userPhoto.png';
import { ReactComponent as ButtonIcon } from '../../assets/u195.svg';
import ProfileLayout from '../../components/layouts/ProfileLayout';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { RootState } from '../../store';
import {
  getEmployeesLogsRequest,
  Log,
} from '../../store/employeeDashboardSlice/employeeDashboardSlice';
import CountDownTimer from '../../components/Timer/Timer';
import style from './EmployeeDashboard.module.scss';
import { getCurrentUser } from '../../store/profileSlice/profileSlice';
import AddLogModal from '../../components/AddLog';
import TimeProgress from '../../components/TimeProgress/TimeProgress';
import ActivityStats from '../../components/ActivityStats/ActivityStats';
import EMPLOYEE_DASHBOARD_CONST from './EmployeeDashboard.dictionary';

function timeStringToFloat(time: string) {
  const hoursMinutes = time.split(/[.:]/);
  const hours = parseInt(hoursMinutes[0], 10);
  const minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
  return hours + minutes / 60;
}

function getWeekDates(data: Log[]) {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const numDay = now.getDate();
  let weekTime = 0;
  let todayTime = 0;

  const start = new Date(now);
  start.setDate(numDay - dayOfWeek + 1);

  const end = new Date(now);
  end.setDate(numDay + (7 - dayOfWeek));

  data.forEach((element: Log) => {
    const logDate = new Date(element.createdAt.split('T')[0]);
    if (
      logDate >= new Date(start.toISOString().substring(0, 10)) &&
      logDate <= new Date(end.toISOString().substring(0, 10))
    ) {
      weekTime += timeStringToFloat(element.time);
    }
    if (logDate.toISOString().substring(0, 10) === now.toISOString().substring(0, 10)) {
      todayTime += timeStringToFloat(element.time);
    }
  });
  return [weekTime.toFixed(2), todayTime.toFixed(2)];
}

const dateConversion = (dateTime: string) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    day: 'numeric',
    month: 'long',
  } as const;
  const dt = new Date(dateTime);
  return dt.toLocaleDateString(undefined, options);
};

export default function EmployeeDashboard() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.profile);
  const { loading, logs } = useAppSelector((state: RootState) => state.logs);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const [isTimerRun, setIsTimerRun] = useState<boolean>(false);
  const [isTimerReset, setIsTimerReset] = useState<boolean>(false);
  const [isLogModalOpen, setIsLogModalOpen] = useState<boolean>(false);
  const punchStatus = isTimerRun
    ? `${EMPLOYEE_DASHBOARD_CONST.START_TIMER}`
    : `${EMPLOYEE_DASHBOARD_CONST.WAIT_START_TIMER}`;
  const todayDate = new Date();
  const onRunTimer = () => {
    setIsTimerRun(!isTimerRun);
  };

  const addLogTimeHandler = () => {
    setIsTimerReset(!isTimerReset);
    setIsLogModalOpen(!isLogModalOpen);
  };

  const [weekTime, todayTime] = getWeekDates(logs);

  useEffect(() => {
    dispatch(getEmployeesLogsRequest());
  }, [dispatch]);

  return (
    <ProfileLayout loading={loading}>
      <div className={style['employees-container']}>
        <div className={style['data-box']}>
          <div className={style['dashboard-header']}>
            <div>
              <img
                className={style['dashboard-header-avatar']}
                src={userPhoto}
                alt={`${EMPLOYEE_DASHBOARD_CONST.DEFAULT_IMG}`}
                title={`${EMPLOYEE_DASHBOARD_CONST.DEFAULT_IMG}`}
              />
            </div>
            <div className={style['dashboard-header-info-box']}>
              <div className={style['dashboard-header-info']}>
                <p>
                  <span className={style['dashboard-header-text-info-name']}>
                    Welcome,
                    {` ${user.name} ${user.secondName} `}
                  </span>
                </p>
              </div>
              <div className={style['dashboard-header-info']}>
                <p>
                  <span className={style['dashboard-header-text-info-time']}>
                    {dateConversion(user.createdAt)}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className={style['data-container']}>
            <div className={style['data-container-timesheet']}>
              <div className={style['block-info']}>
                <div className={style['title-text']}>
                  <p>Timesheet</p>
                </div>
                <div className={style['date-text']}>
                  <p>{dateConversion(user.createdAt)}</p>
                </div>
                <div className={style['button-block']}>
                  <ButtonIcon title={`${EMPLOYEE_DASHBOARD_CONST.LOG_BUTTON_TITLE}`} />
                  <button
                    className={style['button-block-button']}
                    type="button"
                    onClick={addLogTimeHandler}
                  >
                    Log time
                  </button>
                  <AddLogModal isOpen={isLogModalOpen} setIsOpen={setIsLogModalOpen} />
                </div>
              </div>
              <div className={style['punch-status']}>
                <div className={style['punch-status-text']}>
                  <p>{punchStatus}</p>
                </div>
                {isTimerRun && (
                  <div className={style['date-text']}>
                    <p>{todayDate.toUTCString()}</p>
                  </div>
                )}
              </div>
              <div className={style['work-time']}>
                <CountDownTimer
                  isRun={isTimerRun}
                  isReset={isTimerReset}
                  setIsReset={setIsTimerReset}
                />
              </div>
              {!isTimerRun ? (
                <button
                  type="button"
                  className={style['punch-button-box-punch-in']}
                  onClick={onRunTimer}
                >
                  Punch In
                </button>
              ) : (
                <button
                  type="button"
                  className={style['punch-button-box-punch-out']}
                  onClick={onRunTimer}
                >
                  Punch Out
                </button>
              )}
            </div>
            <div className={style['data-container-activity']}>
              <div className={style['block-info']}>
                <div className={style['title-text']}>
                  <p>Activity Today</p>
                </div>
              </div>
              <div className={style['activity-data']}>
                {logs.slice(0, 7).map((rowData: Log) => (
                  <ActivityStats data={rowData} />
                ))}
              </div>
            </div>
            <div className={style['data-container-stats']}>
              <div className={style['block-info']}>
                <div className={style['title-text']}>
                  <p>Stats</p>
                </div>
              </div>
              <TimeProgress
                title={`${EMPLOYEE_DASHBOARD_CONST.TODAY_TIME_PROGRESS_TITLE}`}
                time={todayTime}
                timeQuota={8}
              />
              <TimeProgress
                title={`${EMPLOYEE_DASHBOARD_CONST.WEEK_TIME_PROGRESS_TITLE}`}
                time={weekTime}
                timeQuota={40}
              />
              <div className={style['view-all-button']}>
                <NavLink className={style['all-log-button']} to="/logs">
                  View all
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}
