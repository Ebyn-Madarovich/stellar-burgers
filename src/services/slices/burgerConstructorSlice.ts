// #region Imports
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
// #endregion

// #region Types
type TBurgerConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

type TMoveIngredientPayload = {
  fromIndex: number;
  toIndex: number;
};
// #endregion

// Начальное состояние пустого конструктора.
const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    // Булка заменяет предыдущую, а начинкам создаётся уникальный id.
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: {
          ...ingredient,
          id: nanoid()
        }
      })
    },

    // Удаляем конкретный экземпляр начинки по его уникальному id.
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },

    // Перемещаем начинку с одной позиции конструктора на другую.
    moveIngredient: (state, action: PayloadAction<TMoveIngredientPayload>) => {
      const [movedIngredient] = state.ingredients.splice(
        action.payload.fromIndex,
        1
      );

      if (movedIngredient) {
        state.ingredients.splice(action.payload.toIndex, 0, movedIngredient);
      }
    },

    // Очищаем конструктор после успешного оформления заказа.
    clearConstructor: () => initialState
  },
  selectors: {
    selectConstructor: (state) => state,
    selectConstructorBun: (state) => state.bun,
    selectConstructorIngredients: (state) => state.ingredients
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = burgerConstructorSlice.actions;

export const {
  selectConstructor,
  selectConstructorBun,
  selectConstructorIngredients
} = burgerConstructorSlice.selectors;

export default burgerConstructorSlice.reducer;
