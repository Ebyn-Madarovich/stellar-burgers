// #region Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUserApi,
  registerUserApi,
  TRegisterData,
  loginUserApi,
  TLoginData,
  updateUserApi,
  logoutApi
} from '@api';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';
// #endregion

// #region Types
type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
};
// #endregion

// Проверяем сохранённые токены и получаем текущего пользователя
export const getUser = createAsyncThunk('user/getUser', () => {
  const result = getUserApi();
  return result;
});

// Регистрируем пользователя, сохраняем выданные токены и возвращаем его данные
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (registerData: TRegisterData) => {
    const response = await registerUserApi(registerData);

    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);

    return response.user;
  }
);

// Авторизуем пользователя, сохраняем выданные токены и возвращаем его данные
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (loginData: TLoginData) => {
    const response = await loginUserApi(loginData);

    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);

    return response.user;
  }
);

// Отправляем изменённые данные профиля и возвращаем обновлённого пользователя
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData: Partial<TRegisterData>) => {
    const response = await updateUserApi(userData);
    return response.user;
  }
);

// Завершаем сессию на сервере и удаляем локальные токены
export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  await logoutApi();

  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectUserLoading: (state) => state.isLoading,
    selectUserError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      // Получение текущего пользователя
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.user = null;
        state.error = action.error.message ?? 'Ошибка получения пользователя';
      })

      // Регистрация пользователя
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка регистрации';
      })

      // Вход пользователя
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка входа';
      })

      // Обновление данных профиля
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message ?? 'Ошибка обновления данных пользователя';
      })

      // Выход пользователя
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка выхода';
      });
  }
});

export const {
  selectUser,
  selectIsAuthChecked,
  selectUserLoading,
  selectUserError
} = userSlice.selectors;

export default userSlice.reducer;
