import ingredientsReducer, {
  getIngredients,
  initialState
} from './ingredientsSlice';
import { expect, test, describe } from '@jest/globals';

const mockLoadedIngredients = [
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
    const initialStatePending = {
      ...initialState,
      error: 'Какая-то старая ошибка'
    };

    const expectedStatePending = {
      ...initialState,
      isLoading: true
    };

    const newPendingState = ingredientsReducer(
      initialStatePending,
      getIngredients.pending('test-request')
    );

    expect(newPendingState).toEqual(expectedStatePending);
  });

  test('Сохраняет ингредиенты и завершает загрузку при fulfilled', () => {
    const initialStateFulfilled = {
      ...initialState,
      isLoading: true
    };

    const expectedStateFulfilled = {
      ...initialState,
      ingredients: mockLoadedIngredients
    };

    const newFulfilledState = ingredientsReducer(
      initialStateFulfilled,
      getIngredients.fulfilled(mockLoadedIngredients, 'test-request')
    );

    expect(newFulfilledState).toEqual(expectedStateFulfilled);
  });

  test('Сохраняет ингредиенты, завершает загрузку и записывает ошибку при rejected', () => {
    const initialStateRejected = {
      ...initialState,
      ingredients: mockLoadedIngredients,
      isLoading: true
    };

    const expectedStateRejected = {
      ...initialState,
      ingredients: mockLoadedIngredients,
      error: 'Какая-то ошибка'
    };

    const mockError = new Error('Какая-то ошибка');

    const newRejectedState = ingredientsReducer(
      initialStateRejected,
      getIngredients.rejected(mockError, 'test-request')
    );

    expect(newRejectedState).toEqual(expectedStateRejected);
  });

  test('Возвращает начальное состояние для неизвестного экшена', () => {
    const initialStateUnknown = undefined;

    // Если переданный в редьюсер стейт undefined, то он берёт initialState из слайса
    // Неизвестный экшен оставляет это состояние без изменений
    const expectedStateUnknown = {
      ...initialState
    };

    const newUnknownState = ingredientsReducer(initialStateUnknown, {
      type: 'UNKNOWN'
    });

    expect(newUnknownState).toEqual(expectedStateUnknown);
  });
});
