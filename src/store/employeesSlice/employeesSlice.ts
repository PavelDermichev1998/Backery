import {
  ActionReducerMapBuilder,
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { getEmployeesRequestsAPI } from '../../services/employeesService';
import EMPLOYEES_MSG from './employeesSlice.dictionary';

interface Roles {
  id: number;
  name: string;
}

interface Interface {
  id: number;
  name: string;
  description: string;
}

export interface EmployeeUser {
  id: number;
  name: string;
  secondName: string;
  email: string;
  phone: string;
  password: string;
  birthDay: string;
  createdAt: string;
  roles: Roles[];
  positions: Interface[];
}

interface EmployeesState {
  users: EmployeeUser[];
  searchValue: string;
  loading: boolean;
  error: string | null;
}

const isError = (action: AnyAction) =>
  action.type.startsWith('employees') && action.type.endsWith('rejected');

export const getEmployeesRequest = createAsyncThunk<
  EmployeeUser[],
  undefined,
  { rejectValue: string }
>('employees/getEmployeesRequests', async (data, { rejectWithValue }) => {
  try {
    const response = await getEmployeesRequestsAPI();
    return response.data;
  } catch (error) {
    return rejectWithValue(`${EMPLOYEES_MSG.NOT_FOUND}`);
  }
});

const initialState: EmployeesState = {
  users: [],
  searchValue: '',
  loading: false,
  error: null,
};

const employeesRequestSlice = createSlice({
  name: 'employeesRequest',
  initialState,
  reducers: {
    changeSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<EmployeesState>) => {
    builder
      .addCase(getEmployeesRequest.pending, (state: EmployeesState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getEmployeesRequest.fulfilled,
        (state, action: PayloadAction<EmployeeUser[]>) => {
          state.users = action.payload;
          state.loading = false;
        },
      )
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});
export const { changeSearchValue } = employeesRequestSlice.actions;
export default employeesRequestSlice.reducer;
