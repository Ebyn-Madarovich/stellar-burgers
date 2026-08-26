import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

type TOrderDetailsState = {
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

export const getOrderByNumber = createAsyncThunk(
  'orderDetails/getOrderByNumber',
  (number: number) => {
    const result = getOrderByNumberApi(number);
    return result;
  }
);

const initialState: TOrderDetailsState = {
  order: null,
  isLoading: false,
  error: null
};

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {},
  selectors: {
    selectOrderDetails: (state) => state.order,
    selectOrderDetailsLoading: (state) => state.isLoading,
    selectOrderDetailsError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.order = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload.orders[0] ?? null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка загрузки данных заказа';
      });
  }
});

export const {
  selectOrderDetails,
  selectOrderDetailsLoading,
  selectOrderDetailsError
} = orderDetailsSlice.selectors;

export default orderDetailsSlice.reducer;
