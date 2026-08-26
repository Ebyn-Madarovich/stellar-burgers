// #region Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';
// #endregion

// #region Types
type TUserOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};
// #endregion

// Запрашиваем историю заказов авторизованного пользователя
export const getUserOrders = createAsyncThunk(
  'userOrders/getUserOrders',
  () => {
    const result = getOrdersApi();
    return result;
  }
);

const initialState: TUserOrdersState = {
  orders: [],
  isLoading: false,
  error: null
};

const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  selectors: {
    selectUserOrders: (state) => state.orders,
    selectUserOrdersLoading: (state) => state.isLoading,
    selectUserOrdersError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка загрузки истории заказов';
      });
  }
});

export const {
  selectUserOrders,
  selectUserOrdersLoading,
  selectUserOrdersError
} = userOrdersSlice.selectors;

export default userOrdersSlice.reducer;
