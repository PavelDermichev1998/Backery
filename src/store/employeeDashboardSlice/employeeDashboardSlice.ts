import {
  ActionReducerMapBuilder,
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  getAllLogsRequestsAPI,
  getUserLogRequestAPI,
  addUserLogAPI,
  exportLogsAPI,
} from '../../services/employeeDashboardService';
import EMPLOYEES_LOGS_MSG from './employeeDashboardSlice.dictionary';
import { NOT_FOUND_TEXT } from '../constants';

export interface Log {
  id: number;
  time: string;
  description: string;
  createdAt: string;
  userId: number;
}

interface EmployeesLogsState {
  logs: Log[];
  searchValue: string;
  isAdded: boolean;
  loading: boolean;
  error: string | null;
}

const isError = (action: AnyAction) =>
  action.type.startsWith('logs') && action.type.endsWith('rejected');

export const getEmployeesLogsRequest = createAsyncThunk<
  Log[],
  undefined,
  { rejectValue: string }
>('employees/getEmployeesLogsRequests', async (data, { rejectWithValue }) => {
  try {
    const response = await getAllLogsRequestsAPI();
    return response.data;
  } catch (error) {
    return rejectWithValue(`${EMPLOYEES_LOGS_MSG.NOT_FOUND}`);
  }
});

export const getEmployeeLogsRequest = createAsyncThunk<
  Log[],
  { id: string },
  { rejectValue: string }
>('employees/getEmployeeLogsRequests', async ({ id }, { rejectWithValue }) => {
  try {
    const response = await getUserLogRequestAPI(id);

    return response.data;
  } catch (error) {
    return rejectWithValue(NOT_FOUND_TEXT);
  }
});

export const postAddUserLog = createAsyncThunk<
  Log,
  { time: string; description: string },
  { rejectValue: string }
>('employees/AddLogsRequests', async (data, { rejectWithValue }) => {
  try {
    const response = await addUserLogAPI(data);

    return response.data;
  } catch (error) {
    return rejectWithValue(NOT_FOUND_TEXT);
  }
});

export const getExportLogsRequest = createAsyncThunk<
  Log[],
  undefined,
  { rejectValue: string }
>('employees/getExportLogsRequest', async (data, { rejectWithValue }) => {
  try {
    const response = await exportLogsAPI();
    return response.data;
  } catch (error) {
    return rejectWithValue(`${EMPLOYEES_LOGS_MSG.NOT_FOUND}`);
  }
});

const initialState: EmployeesLogsState = {
  logs: [],
  searchValue: '',
  loading: false,
  isAdded: false,
  error: null,
};

const employeesLogsRequestSlice = createSlice({
  name: 'employeesLogsRequest',
  initialState,
  reducers: {
    changeSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<EmployeesLogsState>) => {
    builder
      .addCase(getEmployeesLogsRequest.pending, (state: EmployeesLogsState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getEmployeesLogsRequest.fulfilled,
        (state, action: PayloadAction<Log[]>) => {
          state.logs = action.payload;
          state.loading = false;
        },
      )
      .addCase(getEmployeeLogsRequest.pending, (state: EmployeesLogsState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getEmployeeLogsRequest.fulfilled,
        (state, action: PayloadAction<Log[]>) => {
          state.logs = action.payload;
          state.loading = false;
        },
      )
      .addCase(postAddUserLog.pending, (state: EmployeesLogsState) => {
        state.error = null;
      })
      .addCase(postAddUserLog.fulfilled, (state: EmployeesLogsState) => {
        state.isAdded = true;
        state.error = null;
      })
      .addCase(getExportLogsRequest.pending, (state: EmployeesLogsState) => {
        state.error = null;
      })
      .addCase(getExportLogsRequest.fulfilled, (state: EmployeesLogsState) => {
        state.isAdded = true;
        state.error = null;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});
export const { changeSearchValue } = employeesLogsRequestSlice.actions;
export default employeesLogsRequestSlice.reducer;
