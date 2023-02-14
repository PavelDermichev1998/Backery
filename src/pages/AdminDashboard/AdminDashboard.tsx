import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './AdminDashboard.module.scss';
import userPhoto from '../../assets/userPhoto.png';
import { ReactComponent as EmployeesIcon } from '../../assets/u270.svg';
import { ReactComponent as CandidatesIcon } from '../../assets/u299.svg';
import ProfileLayout from '../../components/layouts/ProfileLayout';
import AddEmployeeModal from '../../components/AddEmployee/AddEmployeeModal';
import { RootState } from '../../store';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getCurrentUser } from '../../store/profileSlice/profileSlice';
import { getCandidatesDataRequest } from '../../store/adminDashboardSlice/adminDashboardSlice';
import ADMIN_DASHBOARD_CONST from './AdminDashboard.dictionary';

const dateConvertion = (dateTime: string) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  } as const;
  const dt = new Date(dateTime);
  return dt.toLocaleDateString(undefined, options);
};

export default function AdminDashboard() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.profile);
  const { loading, candidates } = useAppSelector((state: RootState) => state.candidates);

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getCandidatesDataRequest());
  }, [dispatch]);

  const [isAddEmployeeModal, setIsAddEmployeeModal] = useState<boolean>(false);
  const onAddEmployee = () => {
    setIsAddEmployeeModal(true);
  };

  return (
    <ProfileLayout loading={loading}>
      <div className={style['admin-dashboard-container']}>
        <div className={style['data-box']}>
          <div className={style['dashboard-header']}>
            <div>
              <img
                className={style['avatar-box']}
                src={userPhoto}
                alt={`${ADMIN_DASHBOARD_CONST.DEFAULT_IMG_STRING}`}
                title={`${ADMIN_DASHBOARD_CONST.DEFAULT_IMG_STRING}`}
              />
            </div>
            <div className={style['info-box']}>
              <div className={style['header-info-box']}>
                <p>
                  <span className={style['text-info-name']}>
                    Welcome,
                    {` ${user.name} ${user.secondName} `}
                    (Admin)
                  </span>
                </p>
              </div>
              <div className={style['header-info-box']}>
                <p>
                  <span className={style['text-info-time']}>
                    {dateConvertion(user.createdAt)}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className={style['employees-info']}>
            <div className={style['employees-info-box']}>
              <div className={style['employees-info-image']}>
                <EmployeesIcon title={`${ADMIN_DASHBOARD_CONST.EMPLOYEE_ICON_TITLE}`} />
              </div>
              <div className={style['employees-info-text']}>
                <p className={style['employees-info-candidates']}>
                  {candidates.employeesNumber}
                </p>
                <p>Employees</p>
              </div>
              <div className={style['employees-info-button-container']}>
                <Link
                  className={style['employees-info-button']}
                  to={`${ADMIN_DASHBOARD_CONST.EMPLOYEES}`}
                >
                  <p>View all</p>
                </Link>
                <button
                  type="button"
                  onClick={onAddEmployee}
                  className={style['employees-info-button']}
                >
                  <p>Add new</p>
                </button>
                <AddEmployeeModal
                  isOpen={isAddEmployeeModal}
                  setIsOpen={setIsAddEmployeeModal}
                />
              </div>
            </div>
            <div className={style['employees-info-box']}>
              <div className={style['employees-info-image']}>
                <CandidatesIcon
                  title={`${ADMIN_DASHBOARD_CONST.CANDIDATES_ICON_TITLE}`}
                />
              </div>
              <div className={style['employees-info-text']}>
                <p className={style['employees-info-candidates']}>
                  {candidates.jobRequestsNumber}
                </p>
                <p>Candidates (Active)</p>
              </div>
              <div className={style['employees-info-button-container']}>
                <Link
                  className={style['employees-info-button']}
                  to={`${ADMIN_DASHBOARD_CONST.CANDIDATES}`}
                >
                  <p>View all</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}
