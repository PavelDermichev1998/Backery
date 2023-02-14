import React, { useCallback } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Dayjs } from 'dayjs';
import { postAddUserLog } from '../../store/employeeDashboardSlice/employeeDashboardSlice';
import MainButton from '../MainButton';
import { AddLogProps } from './AddLogModal.type.';
import style from './AddLogModal.module.scss';
import { useAppDispatch } from '../../hooks/redux';
import ADD_LOGS_CONST from './AddLogModal.dictionary';

export default function AddLogModal({ isOpen, setIsOpen }: AddLogProps) {
  const handleClose = () => setIsOpen(false);
  const [time, setValue] = React.useState<string>(`${ADD_LOGS_CONST.DEFAULT_TIME}`);
  const [description, setDescriptionValue] = React.useState<string>('');
  const handleChange = (newValue: Dayjs | null) => {
    if (newValue) {
      setValue(newValue.format(`${ADD_LOGS_CONST.TIME_FORMAT}`).toString());
    } else {
      setValue('');
    }
  };
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescriptionValue(e.target.value);
  };
  const dispatch = useAppDispatch();

  const handleAddLogClick = useCallback(() => {
    const addLog = async () => {
      const response = await dispatch(postAddUserLog({ time, description }));
      if (response.meta.requestStatus === `${ADD_LOGS_CONST.SUCCESS_REQUEST_STATUS}`) {
        setIsOpen(false);
      }
    };

    addLog();
  }, [dispatch, time, description, setIsOpen]);

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={style['modal-box']}>
        <form className={style['modal-box-form']}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <TimePicker
                label={`${ADD_LOGS_CONST.TIME_LABEL}`}
                value={time}
                inputFormat={`${ADD_LOGS_CONST.TIME_FORMAT}`}
                onChange={handleChange}
                views={['hours', 'minutes', 'seconds']}
                renderInput={(params: TextFieldProps) => <TextField {...params} />}
              />
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                value={description}
                label={`${ADD_LOGS_CONST.DESCRIPTION_LABEL}`}
                onChange={handleTextChange}
              />
            </Stack>
          </LocalizationProvider>
          <div className={style['modal-button-add']}>
            <MainButton
              title={`${ADD_LOGS_CONST.SUBMIT_BUTTON_LABEL}`}
              callback={handleAddLogClick}
            />
          </div>
        </form>
        <div className={style['modal-button-wrapper']}>
          <div>
            <button
              className={style['modal-button-close']}
              type="button"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
