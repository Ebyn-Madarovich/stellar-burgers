import { expect, test, describe } from '@jest/globals';

import ingredientsReducer, {
  getIngredients,
  initialIngredientsState
} from './ingredientsSlice';

const testIngredients = [
  {
    _id: 'bun-1',
    name: 'Тестовая булка',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 165,
    price: 100,
    image: '',
    image_large: '',
    image_mobile: ''
  }
];

describe('Редьюсер ingredients', () => {
  test('Включает загрузку и сбрасывает старую ошибку при pending', () => {
    const previousState = {
      ...initialIngredientsState,
      error: 'Какая-то старая ошибка'
    };

    const expectedState = {
      ...initialIngredientsState,
      isLoading: true
    };

    const action = getIngredients.pending('test-request');
    const actualState = ingredientsReducer(previousState, action);

    expect(actualState).toEqual(expectedState);
  });

  test('Сохраняет ингредиенты и завершает загрузку при fulfilled', () => {
    const previousState = {
      ...initialIngredientsState,
      isLoading: true
    };

    const expectedState = {
      ...initialIngredientsState,
      ingredients: testIngredients
    };

    const action = getIngredients.fulfilled(testIngredients, 'test-request');
    const actualState = ingredientsReducer(previousState, action);

    expect(actualState).toEqual(expectedState);
  });

  test('Сохраняет ингредиенты, завершает загрузку и записывает ошибку при rejected', () => {
    const previousState = {
      ...initialIngredientsState,
      ingredients: testIngredients,
      isLoading: true
    };

    const expectedState = {
      ...initialIngredientsState,
      ingredients: testIngredients,
      error: 'Какая-то ошибка'
    };

    const testError = new Error('Какая-то ошибка');

    const action = getIngredients.rejected(testError, 'test-request');
    const actualState = ingredientsReducer(previousState, action);

    expect(actualState).toEqual(expectedState);
  });

  test('Возвращает начальное состояние для неизвестного экшена', () => {
    const previousState = undefined;

    // Если переданный в редьюсер стейт undefined, то он берёт initialIngredientsState из слайса
    // Неизвестный экшен оставляет это состояние без изменений
    const expectedState = {
      ...initialIngredientsState
    };

    const action = { type: 'UNKNOWN' };
    const actualState = ingredientsReducer(previousState, action);

    expect(actualState).toEqual(expectedState);
  });
});
