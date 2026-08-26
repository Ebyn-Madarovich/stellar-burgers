// #region Imports
import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';
import burgerConstructorReducer from './slices/burgerConstructorSlice';
import orderReducer from './slices/orderSlice';
import feedReducer from './slices/feedSlice';
import userOrdersReducer from './slices/userOrdersSlice';
import orderDetailsReducer from './slices/orderDetailsSlice';
import userReducer from './slices/userSlice';
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
    // Подключили список доступных ингредиентов
    ingredients: ingredientsReducer,
    // Подключили отдельную область состояния для собранного бургера
    burgerConstructor: burgerConstructorReducer,
    // Подключили состояние запроса и данных созданного заказа
    order: orderReducer,
    // Подключили данные публичной ленты заказов
    feed: feedReducer,
    // Подключили историю заказов авторизованного пользователя
    userOrders: userOrdersReducer,
    // Подключили данные конкретного заказа
    orderDetails: orderDetailsReducer,
    // Подключили данные пользователя и состояние авторизации
    user: userReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export const useDispatch: () => AppDispatch = () => dispatchHook();

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
