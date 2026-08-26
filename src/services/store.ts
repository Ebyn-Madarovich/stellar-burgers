// #region Imports
import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';
import burgerConstructorReducer from './slices/burgerConstructorSlice';
import orderReducer from './slices/orderSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
// #endregion

// #region Types
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
// #endregion

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    // Подключили отдельную область состояния для собранного бургера.
    burgerConstructor: burgerConstructorReducer,
    // Подключили состояние запроса и данных созданного заказа.
    order: orderReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export const useDispatch: () => AppDispatch = () => dispatchHook();

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
