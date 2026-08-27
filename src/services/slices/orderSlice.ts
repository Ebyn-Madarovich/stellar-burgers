// #region Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi, TNewOrder } from '@api';
// #endregion

// #region Types
type TOrderState = {
  orderModalData: TNewOrder | null;
  isLoading: boolean;
  error: string | null;
};
// #endregion

// Отправляем выбранные ингредиенты на сервер для создания заказа
export const createOrder = createAsyncThunk(
  'order/createOrder',
  (ingredientIds: string[]) => {
    const result = orderBurgerApi(ingredientIds);
    return result;
  }
);

const initialState: TOrderState = {
  orderModalData: null,
  isLoading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderModalData: (state) => {
      state.orderModalData = null;
    }
  },
  selectors: {
    selectOrderModalData: (state) => state.orderModalData,
    selectOrderLoading: (state) => state.isLoading,
    selectOrderError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.orderModalData = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка оформления заказа';
      });
  }
});

export const { clearOrderModalData } = orderSlice.actions;

export const { selectOrderModalData, selectOrderLoading, selectOrderError } =
  orderSlice.selectors;

export default orderSlice.reducer;
