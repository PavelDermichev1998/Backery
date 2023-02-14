import {
  ActionReducerMapBuilder,
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { authRegisterAPI, getAllPositionsAPI } from '../../services/authService';
import { NOT_FOUND_TEXT } from '../constants';

export type RoleType = { id: string; name: string };

export type PositionType = { id: string; name: string; description: string };

export type RejectType = { rejectValue: string };

type ResponseRegisterType = {
  id: string;
  name: string;
  secondName: string;
  email: string;
  password: string;
  phone: string;
  birthDay: string;
  createdAt: string;
  roles: Array<RoleType>;
  positions: Array<PositionType>;
};

export type RegisterType = {
  name: string;
  secondName: string;
  email: string;
  password: string;
  phone: string;
  birthDay: string;
  positions: Array<{ name: string }>;
};

type RegisterState = {
  user: RegisterType;
  allPositions: Array<PositionType>;
  isRegistered: boolean;
  loading: boolean;
  error: string | null;
};

const isError = (action: AnyAction) =>
  action.type.startsWith('register') && action.type.endsWith('rejected');

export const postAuthRegister = createAsyncThunk<
  ResponseRegisterType,
  RegisterType,
  RejectType
>('register/postAuthRegister', async (data, { rejectWithValue }) => {
  try {
    const response = await authRegisterAPI(data);

    return response.data;
  } catch (error) {
    return rejectWithValue(NOT_FOUND_TEXT);
  }
});

export const getAllPositions = createAsyncThunk<
  Array<PositionType>,
  undefined,
  RejectType
>('register/getAllPositions', async (data, { rejectWithValue }) => {
  try {
    const response = await getAllPositionsAPI();

    return response.data;
  } catch (error) {
    return rejectWithValue(NOT_FOUND_TEXT);
  }
});

const initialState: RegisterState = {
  user: {
    name: '',
    secondName: '',
    email: '',
    password: '',
    phone: '',
    birthDay: '',
    positions: [],
  },
  allPositions: [],
  isRegistered: false,
  loading: false,
  error: null,
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    changeUserRegisterName(state, action: PayloadAction<string>) {
      state.user.name = action.payload;
    },
    changeUserRegisterSecondName(state, action: PayloadAction<string>) {
      state.user.secondName = action.payload;
    },
    changeUserRegisterEmail(state, action: PayloadAction<string>) {
      state.user.email = action.payload;
    },
    changeUserRegisterPassword(state, action: PayloadAction<string>) {
      state.user.password = action.payload;
    },
    changeUserRegisterPhone(state, action: PayloadAction<string>) {
      state.user.phone = action.payload;
    },
    changeUserRegisterBirthDay(state, action: PayloadAction<string>) {
      state.user.birthDay = action.payload;
    },
    changeUserRegisterPosition(
      state,
      action: PayloadAction<{ isCheck: boolean; value: string }>,
    ) {
      if (!action.payload.isCheck) {
        state.user.positions.push({ name: action.payload.value });
      } else {
        state.user.positions = state.user.positions.filter(
          (p: { name: string }) => p.name !== action.payload.value,
        );
      }
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<RegisterState>) => {
    builder
      .addCase(postAuthRegister.pending, (state: RegisterState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postAuthRegister.fulfilled, (state: RegisterState) => {
        state.isRegistered = true;
        state.loading = false;
      })
      .addCase(getAllPositions.pending, (state: RegisterState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllPositions.fulfilled,
        (state: RegisterState, action: PayloadAction<Array<PositionType>>) => {
          state.allPositions = action.payload;
          state.loading = false;
        },
      )
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const {
  changeUserRegisterName,
  changeUserRegisterSecondName,
  changeUserRegisterEmail,
  changeUserRegisterPassword,
  changeUserRegisterPhone,
  changeUserRegisterBirthDay,
  changeUserRegisterPosition,
} = registerSlice.actions;
export default registerSlice.reducer;
