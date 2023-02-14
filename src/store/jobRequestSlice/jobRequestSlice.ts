import {
  ActionReducerMapBuilder,
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { getJobRequestsAPI, sentJobRequestAPI } from '../../services/jobRequestService';
import { PositionType, RejectType, RoleType } from '../registerSlice/registerSlice';
import { NOT_FOUND_TEXT } from '../constants';

type ResponseJobRequestType = Array<JobRequestUserType>;

export type JobRequestUserType = {
  id: string;
  user: {
    id: string;
    name: string;
    secondName: string;
    email: string;
    phone: string;
    createdAt: string;
    roles: Array<RoleType>;
    positions: Array<PositionType>;
  };
  position: Array<PositionType>;
  approved: boolean;
};

type JobRequestState = {
  users: ResponseJobRequestType;
  searchValue: string;
  isRegistered: boolean;
  loading: boolean;
  error: string | null;
};

const isError = (action: AnyAction) =>
  action.type.startsWith('jobRequest') && action.type.endsWith('rejected');

export const getJobRequest = createAsyncThunk<
  ResponseJobRequestType,
  undefined,
  RejectType
>('jobRequest/getJobRequests', async (data, { rejectWithValue }) => {
  try {
    const response = await getJobRequestsAPI();

    return response.data;
  } catch (error) {
    return rejectWithValue(NOT_FOUND_TEXT);
  }
});

export const sentJobRequest = createAsyncThunk<
  JobRequestUserType,
  { id: string; positionName: string },
  RejectType
>('jobRequest/sentJobRequest', async ({ id, positionName }, { rejectWithValue }) => {
  try {
    const response = await sentJobRequestAPI(id, positionName);

    return response.data;
  } catch (error) {
    return rejectWithValue(NOT_FOUND_TEXT);
  }
});

const initialState: JobRequestState = {
  users: [
    {
      id: '',
      user: {
        id: '',
        name: '',
        secondName: '',
        email: '',
        phone: '',
        createdAt: '',
        roles: [{ name: '', id: '' }],
        positions: [{ id: '', name: '', description: '' }],
      },
      position: [{ id: '', name: '', description: '' }],
      approved: false,
    },
  ],
  searchValue: '',
  isRegistered: false,
  loading: false,
  error: null,
};

const jobRequestSlice = createSlice({
  name: 'jobRequest',
  initialState,
  reducers: {
    changeSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<JobRequestState>) => {
    builder
      .addCase(getJobRequest.pending, (state: JobRequestState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getJobRequest.fulfilled,
        (state, action: PayloadAction<ResponseJobRequestType>) => {
          state.users = action.payload;
          state.loading = false;
        },
      )
      .addCase(sentJobRequest.pending, (state: JobRequestState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        sentJobRequest.fulfilled,
        (state: JobRequestState, action: PayloadAction<JobRequestUserType>) => {
          state.users = state.users.filter(
            (u: { id: string }) => u.id !== action.payload.user.id,
          );
          state.loading = false;
        },
      )
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { changeSearchValue } = jobRequestSlice.actions;
export default jobRequestSlice.reducer;
