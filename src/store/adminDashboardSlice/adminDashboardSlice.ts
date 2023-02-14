import {
  ActionReducerMapBuilder,
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { getCandidatesRequestsAPI } from '../../services/adminDashboard';
import ADMIN_MSG from './adminDashboardSlice.dictionary';

export interface CandidatesData {
  jobRequestsNumber: number;
  employeesNumber: number;
}

interface CandidatesDataState {
  candidates: CandidatesData;
  searchValue: string;
  loading: boolean;
  error: string | null;
}

const isError = (action: AnyAction) =>
  action.type.startsWith('AdminDashboard') && action.type.endsWith('rejected');

export const getCandidatesDataRequest = createAsyncThunk<
  CandidatesData,
  undefined,
  { rejectValue: string }
>('admin/getCandidatesDataRequests', async (data, { rejectWithValue }) => {
  try {
    const response = await getCandidatesRequestsAPI();
    return response.data;
  } catch (error) {
    return rejectWithValue(`${ADMIN_MSG.NOT_FOUND}`);
  }
});

const initialState: CandidatesDataState = {
  candidates: {
    jobRequestsNumber: 0,
    employeesNumber: 0,
  },
  searchValue: '',
  loading: false,
  error: null,
};

const candidatesDataRequestSlice = createSlice({
  name: 'employeesLogsRequest',
  initialState,
  reducers: {
    changeSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<CandidatesDataState>) => {
    builder
      .addCase(getCandidatesDataRequest.pending, (state: CandidatesDataState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getCandidatesDataRequest.fulfilled,
        (state, action: PayloadAction<CandidatesData>) => {
          state.candidates = action.payload;
          state.loading = false;
        },
      )
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});
export const { changeSearchValue } = candidatesDataRequestSlice.actions;
export default candidatesDataRequestSlice.reducer;
