import React, { useEffect } from 'react';
import { TablePagination } from '@mui/material';
import ProfileLayout from '../../components/layouts/ProfileLayout';
import style from './JobRequest.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  changeSearchValue,
  getJobRequest,
} from '../../store/jobRequestSlice/jobRequestSlice';
import { RootState } from '../../store';
import JobRequestTable from '../../components/JobRequestTable';
import BreadCrumbs from '../../components/BreadCrumbs';

export default function JobRequestPage() {
  const dispatch = useAppDispatch();
  const rowsPerPage = 5;
  const { loading, users } = useAppSelector((state: RootState) => state.jobRequest);
  const [page, setPage] = React.useState(0);

  const changeSearchValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSearchValue(e.target.value));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    dispatch(getJobRequest());
  }, [dispatch]);

  return (
    <ProfileLayout loading={loading}>
      <div className={style['job-request']}>
        <h3>Candidates</h3>
        <BreadCrumbs title="Candidates" link="dashboard" />
        <div className={style['search-container']}>
          <input
            type="text"
            placeholder="Search for..."
            onChange={changeSearchValueHandler}
          />
          <button type="button" className={style['search-button']}>
            Search
          </button>
        </div>
        {users.length > 0 ? (
          <div>
            <JobRequestTable users={users} rowsPerPage={rowsPerPage} page={page} />
            <TablePagination
              className={style['pagination-container']}
              rowsPerPageOptions={[rowsPerPage]}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
            />
          </div>
        ) : (
          <div>The list of candidates is empty.</div>
        )}
      </div>
    </ProfileLayout>
  );
}
