import React, { FormEvent, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ProfileLayout from '../../components/layouts/ProfileLayout';
import style from './Employees.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { RootState } from '../../store';
import {
  getEmployeesRequest,
  EmployeeUser,
} from '../../store/employeesSlice/employeesSlice';
import AddEmployeeModal from '../../components/AddEmployee/AddEmployeeModal';
import EMPLOYEES from './Employees.dictionary';

interface Column {
  id: 'name' | 'employeeId' | 'designation' | 'actions';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {
    id: 'name',
    label: 'Name',
    minWidth: 170,
  },
  {
    id: 'employeeId',
    label: 'Employee ID',
    minWidth: 100,
  },
  {
    id: 'designation',
    label: 'Designation',
    minWidth: 170,
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 170,
  },
];

interface Data {
  name: string;
  employeeId: number;
  designation: string;
  actions: JSX.Element;
}

function createData(
  id: number,
  firstName: string,
  secondName: string,
  employeeId: number,
  designation: string,
): Data {
  const name = `${firstName} ${secondName}`;
  const actions = <NavLink to={`/profile/${id}`}>View record</NavLink>;

  return { name, employeeId, designation, actions };
}

const tableRows = (rowData: EmployeeUser[]) => {
  const rows: Data[] = [];
  rowData.forEach((data: EmployeeUser) => {
    rows.push(
      createData(data.id, data.name, data.secondName, data.id, data.positions[0].name),
    );
  });

  return rows;
};

const filterData = (query: string, data: Data[]) => {
  if (!query) {
    return data;
  }

  return data.filter((d: Data) => d.name.toLowerCase().includes(query));
};

export default function Employees() {
  const dispatch = useAppDispatch();
  const { loading, users } = useAppSelector((state: RootState) => state.employees);

  useEffect(() => {
    dispatch(getEmployeesRequest());
  }, [dispatch]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [searchQuery, setSearchQuery] = useState('');
  const dataFiltered = filterData(searchQuery, tableRows(users));

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [isAddEmployeeModal, setIsAddEmployeeModal] = useState<boolean>(false);
  const onAddEmployee = () => {
    setIsAddEmployeeModal(true);
  };

  return (
    <ProfileLayout loading={loading}>
      <div className={style['employees-container']}>
        <h3>Employees</h3>
        <div className={style['employees-navigate']}>
          <NavLink to={`${EMPLOYEES.DASHBOARD_LINK}`}>Dashboard </NavLink>
          <p>/ Employees</p>
        </div>
        <div className={style['search-container-wrapper']}>
          <div className={style['search-container']}>
            <input
              type="text"
              placeholder={`${EMPLOYEES.SEARCH_PLACEHOLDER}`}
              onChange={(e: FormEvent<HTMLDivElement>) => {
                setSearchQuery((e.target as HTMLInputElement).value);
              }}
            />
            <button type="button" className={style['search-button']}>
              Search
            </button>
          </div>
          <button type="button" className={style['add-button']} onClick={onAddEmployee}>
            + Create Employee
          </button>
          <AddEmployeeModal
            isOpen={isAddEmployeeModal}
            setIsOpen={setIsAddEmployeeModal}
          />
        </div>
        {dataFiltered.length > 0 ? (
          <div>
            <TableContainer component={Paper} className={style['table-container']}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column: Column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: Data) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.employeeId}>
                        {columns.map((column: Column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={tableRows(users).length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        ) : (
          <div>The list of employees is empty.</div>
        )}
      </div>
    </ProfileLayout>
  );
}
