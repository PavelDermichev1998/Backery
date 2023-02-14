import {
  ActionReducerMapBuilder,
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { getCurrentUserAPI, updateCurrentUserAPI } from '../../services/profileService';
import { PositionType, RejectType, RoleType } from '../registerSlice/registerSlice';
import { NOT_FOUND_TEXT } from '../constants';

export type RequestUserUpdateType = {
  name: string;
  secondName: string;
  phone: string;
  email: string;
  birthDay: string;
};

export type ResponseProfileType = {
  id: string;
  name: string;
  secondName: string;
  email: string;
  phone: string;
  birthDay: string;
  createdAt: string;
  roles: Array<RoleType>;
  positions: Array<PositionType>;
};

export type ProfileState = {
  user: ResponseProfileType;
  token: string;
  isShowModal: boolean;
  loading: boolean;
  error: string | null;
};

const isError = (action: AnyAction) =>
  action.type.startsWith('profile') && action.type.endsWith('rejected');

export const getCurrentUser = createAsyncThunk<
  ResponseProfileType,
  undefined,
  RejectType
>('profile/getCurrentUser', async (data, { rejectWithValue }) => {
  try {
    const response = await getCurrentUserAPI();
    return response.data;
  } catch (error) {
    return rejectWithValue(NOT_FOUND_TEXT);
  }
});

export const updateCurrentUser = createAsyncThunk<
  ResponseProfileType,
  RequestUserUpdateType,
  RejectType
>('profile/updateCurrentUser', async (data, { rejectWithValue }) => {
  try {
    const response = await updateCurrentUserAPI(data);
    return response.data;
  } catch (error) {
    return rejectWithValue(NOT_FOUND_TEXT);
  }
});

const initialState: ProfileState = {
  user: {
    id: '',
    name: '',
    secondName: '',
    email: '',
    phone: '',
    birthDay: '',
    createdAt: '',
    roles: [{ name: '', id: '' }],
    positions: [{ id: '', name: '', description: '' }],
  },
  isShowModal: false,
  token: '',
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    changeIsShowModal(state, action: PayloadAction<boolean>) {
      state.isShowModal = action.payload;
    },
    changeProfileName(state, action: PayloadAction<string>) {
      state.user.name = action.payload;
    },
    changeProfileSecondName(state, action: PayloadAction<string>) {
      state.user.secondName = action.payload;
    },
    changeProfilePhone(state, action: PayloadAction<string>) {
      state.user.phone = action.payload;
    },
    changeProfileEmail(state, action: PayloadAction<string>) {
      state.user.email = action.payload;
    },
    changeProfileBirthday(state, action: PayloadAction<string>) {
      state.user.birthDay = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<ProfileState>) => {
    builder
      .addCase(getCurrentUser.pending, (state: ProfileState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(updateCurrentUser.pending, (state: ProfileState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const {
  changeIsShowModal,
  changeProfileName,
  changeProfileSecondName,
  changeProfilePhone,
  changeProfileEmail,
  changeProfileBirthday,
} = profileSlice.actions;
export default profileSlice.reducer;
