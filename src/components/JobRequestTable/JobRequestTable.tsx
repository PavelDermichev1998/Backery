import React, { useCallback } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import style from './JobRequestTable.module.scss';
import {
  JobRequestUserType,
  sentJobRequest,
} from '../../store/jobRequestSlice/jobRequestSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { RootState } from '../../store';

type InputPropsType = {
  users: Array<JobRequestUserType>;
  rowsPerPage: number;
  page: number;
};

interface Position {
  id: string;
  name: string;
  description: string;
}

const JobRequestTable = ({ users, rowsPerPage, page }: InputPropsType) => {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector((state: RootState) => state.jobRequest.searchValue);

  const handleJobRequestClick = useCallback(
    (id: string, positionName: string) => {
      dispatch(sentJobRequest({ id, positionName }));
    },
    [dispatch],
  );

  return (
    <TableContainer component={Paper} className={style['table-container']}>
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left" size="small">
              Name
            </TableCell>
            <TableCell align="left" size="small">
              Created
            </TableCell>
            <TableCell align="left" size="small">
              Position(s)
            </TableCell>
            <TableCell align="left" size="small">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users
            .filter(
              (current: JobRequestUserType) =>
                current.user.name.toUpperCase().includes(searchValue.toUpperCase()) ||
                current.user.secondName.toUpperCase().includes(searchValue.toUpperCase()),
            )
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((current: JobRequestUserType) => (
              <TableRow key={current.user.id}>
                <TableCell align="left">{`${current.user.name} ${current.user.secondName}`}</TableCell>
                <TableCell align="left">{current.user.createdAt}</TableCell>
                <TableCell align="left">
                  {current.user.positions.map(({ id, name }: Position) => (
                    <div key={id}>{name}</div>
                  ))}
                </TableCell>
                <TableCell align="left" className={style['table-buttons-container']}>
                  {current.user.positions.map(({ name }: Position) => (
                    <button
                      type="button"
                      key={name}
                      onClick={() => handleJobRequestClick(current.user.id, name)}
                    >
                      {`Approve as ${name}`}
                    </button>
                  ))}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default JobRequestTable;
