import React, { useState, useEffect } from 'react';
import { Dayjs } from 'dayjs';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { NavLink } from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import ProfileLayout from '../../components/layouts/ProfileLayout';
import style from './Logs.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { RootState } from '../../store';
import {
  getEmployeesLogsRequest,
  getExportLogsRequest,
  Log,
} from '../../store/employeeDashboardSlice/employeeDashboardSlice';
import AddLogModal from '../../components/AddLog';
import { useExportingFile } from '../../hooks/useDowloadHook';
import LogsTable from '../../components/LogsTable/LogsTable';
import LOGS_CONST from './Logs.dictionary';

interface LogData {
  time: string;
  created: string;
  description: string;
}

function createData(time: string, created: string, description: string): LogData {
  return { time, created, description };
}

const createTableRows = (rowData: Log[]) =>
  rowData.map((data: Log) => createData(data.time, data.createdAt, data.description));

const filterData = (query: Dayjs | null, data: LogData[]) => {
  if (!query) {
    return data;
  }

  return data.filter(
    (d: LogData) =>
      d.created.split(' ')[0] === query.format(`${LOGS_CONST.DATE_FORMAT}`).toString(),
  );
};

export default function Logs() {
  const dispatch = useAppDispatch();
  const { loading, logs } = useAppSelector((state: RootState) => state.logs);
  const downloadCsvFile = () => dispatch(getExportLogsRequest());
  const { ref, url, prepareLink, name } = useExportingFile({
    apiDefinition: downloadCsvFile,
  });

  const refreshData = async () => {
    const response = await dispatch(getEmployeesLogsRequest());

    if (response.meta.requestStatus === `${LOGS_CONST.SUCCESS_REQUEST_STATUS}`) {
      prepareLink();
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [isAddLogModal, setIsAddLogModal] = useState<boolean>(false);
  const onAddLog = () => {
    setIsAddLogModal(true);
  };

  const [dateValue, setValue] = React.useState<Dayjs | null>(null);

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  const dataFiltered = filterData(dateValue, createTableRows(logs));

  return (
    <ProfileLayout loading={loading}>
      <div className={style['employees-container']}>
        <h3>Employees</h3>
        <div className={style['employees-navigate']}>
          <NavLink to={`${LOGS_CONST.DASHBOARD_LINK}`}>Dashboard </NavLink>
          <p>/ Logs</p>
        </div>
        <div className={style['search-container-wrapper']}>
          <div className={style['search-container']}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack>
                <DesktopDatePicker
                  className={style['search-container-date-picker']}
                  label={`${LOGS_CONST.DATEPICKER_LABEL}`}
                  inputFormat={`${LOGS_CONST.DATE_FORMAT}`}
                  value={dateValue}
                  onChange={handleChange}
                  renderInput={(params: TextFieldProps) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </div>
          <button type="button" className={style['add-button']} onClick={onAddLog}>
            + Create Log
          </button>
          <AddLogModal isOpen={isAddLogModal} setIsOpen={setIsAddLogModal} />
        </div>
        {dataFiltered.length > 0 ? (
          <div>
            <LogsTable data={dataFiltered} page={page} rowsPerPage={rowsPerPage} />
            <div className={style['table-footer']}>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={createTableRows(logs).length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
              <div>
                <a href={url} download={name} className="hidden" ref={ref.current?.click}>
                  <button className={style['download-button']} type="button">
                    Download: CSV
                  </button>
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div>The list of logs is empty.</div>
        )}
      </div>
    </ProfileLayout>
  );
}
