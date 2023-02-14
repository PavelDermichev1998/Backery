import {
  ActionReducerMapBuilder,
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { authLoginAPI } from '../../services/authService';
import { RejectType, RoleType } from '../registerSlice/registerSlice';
import { NOT_FOUND_TEXT } from '../constants';

type ResponseLoginType = {
  user: {
    id: string;
    name: string;
    secondName: string;
    email: string;
    phone: string;
    birthDay: string;
    password: string;
    createdAt: string;
    roles: Array<RoleType>;
  };
  jwtToken: string;
};

type LoginType = {
  userId: string;
  email: string;
  password: string;
  name: string;
  secondName: string;
  phone: string;
  birthDay: string;
  roles: Array<RoleType>;
};

export type LoginState = {
  user: LoginType;
  token: string;
  loading: boolean;
  error: string | null;
};

const isError = (action: AnyAction) =>
  action.type.startsWith('login') && action.type.endsWith('rejected');

export const postAuthLogin = createAsyncThunk<
  ResponseLoginType,
  { email: string; password: string },
  RejectType
>('login/postAuthLogin', async (data, { rejectWithValue }) => {
  try {
    const response = await authLoginAPI(data);

    return response.data;
  } catch (error) {
    return rejectWithValue(NOT_FOUND_TEXT);
  }
});

const initialState: LoginState = {
  user: {
    userId: '',
    email: '',
    password: '',
    name: '',
    secondName: '',
    phone: '',
    birthDay: '',
    roles: [],
  },
  token: '',
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    changeUserLoginEmail(state, action: PayloadAction<string>) {
      state.user.email = action.payload;
    },
    changeUserLoginPassword(state, action: PayloadAction<string>) {
      state.user.password = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<LoginState>) => {
    builder
      .addCase(postAuthLogin.pending, (state: LoginState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postAuthLogin.fulfilled, (state, action) => {
        state.user.userId = action.payload.user.id;
        state.user.name = action.payload.user.name;
        state.user.secondName = action.payload.user.secondName;
        state.user.phone = action.payload.user.phone;
        state.user.birthDay = action.payload.user.birthDay;
        state.user.roles = action.payload.user.roles;
        state.token = action.payload.jwtToken;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { changeUserLoginEmail, changeUserLoginPassword } = loginSlice.actions;
export default loginSlice.reducer;
