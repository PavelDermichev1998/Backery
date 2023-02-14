import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import style from './LogsTable.module.scss';

interface Column {
  id: 'time' | 'created' | 'description';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {
    id: 'time',
    label: 'Time',
    minWidth: 170,
  },
  {
    id: 'created',
    label: 'Created',
    minWidth: 100,
  },
  {
    id: 'description',
    label: 'Description',
    minWidth: 170,
  },
];

interface LogData {
  time: string;
  created: string;
  description: string;
}

interface DataPropsType {
  data: LogData[];
  page: number;
  rowsPerPage: number;
}

const LogsTable = ({ data, page, rowsPerPage }: DataPropsType) => (
  <TableContainer component={Paper} className={style['table-container']}>
    <Table stickyHeader aria-label="sticky table">
      <TableHead>
        <TableRow>
          {columns.map(({ id, align, minWidth, label }: Column) => (
            <TableCell key={id} align={align} style={{ minWidth: `${minWidth}` }}>
              {label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {React.Children.toArray(
          data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row: LogData) => (
              <TableRow hover role="checkbox" tabIndex={-1}>
                {columns.map(({ id, align, format }: Column) => {
                  const value = row[id];
                  return (
                    <TableCell key={id} align={align}>
                      {format && typeof value === 'number' ? format(value) : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            )),
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

export default LogsTable;
