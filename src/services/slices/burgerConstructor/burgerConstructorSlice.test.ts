import { expect, test, describe } from '@jest/globals';

import burgerConstructorReducer, {
  initialConstructorState,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from './burgerConstructorSlice';

import type { TBurgerConstructorState } from './burgerConstructorSlice';
import { createOrder } from '../orderSlice';

const firstBun = {
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
};

const secondBun = {
  ...firstBun,
  _id: 'bun-2',
  name: 'Вторая тестовая булка'
};

const testIngredients = [
  {
    _id: 'main-1',
    name: 'Тестовая котлета',
    type: 'main',
    proteins: 15,
    fat: 10,
    carbohydrates: 5,
    calories: 170,
    price: 200,
    image: '',
    image_large: '',
    image_mobile: ''
  },
  {
    _id: 'sauce-1',
    name: 'Тестовый соус',
    type: 'sauce',
    proteins: 1,
    fat: 5,
    carbohydrates: 4,
    calories: 65,
    price: 50,
    image: '',
    image_large: '',
    image_mobile: ''
  }
];

describe('Редьюсер burgerConstructor', () => {
  test('Возвращает начальное состояние для неизвестного экшена', () => {
    const previousState = undefined;

    // Если переданный в редьюсер стейт undefined, то он берёт initialConstructorState из слайса
    // Неизвестный экшен оставляет это состояние без изменений
    const expectedState = {
      bun: null,
      ingredients: []
    };

    const action = { type: 'UNKNOWN' };
    const actualState = burgerConstructorReducer(previousState, action);

    expect(actualState).toEqual(expectedState);
  });

  describe('addIngredient', () => {
    test('Добавляет булку в пустой конструктор', () => {
      const previousState = {
        ...initialConstructorState
      };

      const action = addIngredient(firstBun);

      const expectedState = {
        ...initialConstructorState,
        bun: action.payload
      };

      const actualState = burgerConstructorReducer(previousState, action);

      expect(actualState).toEqual(expectedState);
    });

    test('Заменяет ранее добавленную булку', () => {
      const previousState = {
        ...initialConstructorState,
        bun: addIngredient(firstBun).payload
      };

      const action = addIngredient(secondBun);

      const expectedState = {
        ...initialConstructorState,
        bun: action.payload
      };

      const actualState = burgerConstructorReducer(previousState, action);

      expect(actualState).toEqual(expectedState);
    });

    test('Добавляет начинку в конструктор', () => {
      const previousState: TBurgerConstructorState = {
        ...initialConstructorState,
        bun: addIngredient(firstBun).payload
      };

      // массив экшенов, где в пейлоауде каждого экшена лежит преобразованный игридиент с уникальным айди
      const actions = testIngredients.map((ingredient) =>
        addIngredient(ingredient)
      );

      // только игнридиенты с уникальным айди
      const ingredients = actions.map((action) => action.payload);

      const expectedState = {
        ...previousState,
        ingredients
      };

      let actualState = previousState;

      for (const action of actions) {
        actualState = burgerConstructorReducer(actualState, action);
      }

      expect(actualState).toEqual(expectedState);
    });
  });

  test('Удаляет начинку по её id', () => {
    const ingredients = testIngredients.map(
      (ingredient) => addIngredient(ingredient).payload
    );
    const previousState = {
      bun: addIngredient(firstBun).payload,
      ingredients
    };

    const action = removeIngredient(ingredients[0].id);

    const expectedState = {
      ...previousState,
      ingredients: ingredients.slice(1)
    };

    const actualState = burgerConstructorReducer(previousState, action);

    expect(actualState).toEqual(expectedState);
  });

  test('Перемещает начинку на указанную позицию', () => {
    const ingredients = testIngredients.map(
      (ingredient) => addIngredient(ingredient).payload
    );
    const previousState = {
      bun: addIngredient(firstBun).payload,
      ingredients
    };

    const action = moveIngredient({ fromIndex: 0, toIndex: 1 });

    const expectedState = {
      ...previousState,
      ingredients: [ingredients[1], ingredients[0]]
    };

    const actualState = burgerConstructorReducer(previousState, action);

    expect(actualState).toEqual(expectedState);
  });

  test('Очищает конструктор при clearConstructor', () => {
    const ingredients = testIngredients.map(
      (ingredient) => addIngredient(ingredient).payload
    );
    const previousState = {
      bun: addIngredient(firstBun).payload,
      ingredients
    };

    const action = clearConstructor();

    const expectedState = initialConstructorState;

    const actualState = burgerConstructorReducer(previousState, action);

    expect(actualState).toEqual(expectedState);
  });

  test('Очищает конструктор при createOrder.fulfilled', () => {
    const ingredients = testIngredients.map(
      (ingredient) => addIngredient(ingredient).payload
    );
    const previousState = {
      bun: addIngredient(firstBun).payload,
      ingredients
    };

    const testOrderResponse = {
      success: true,
      name: 'Тестовый бургер',
      order: {
        _id: 'order-1',
        status: 'done',
        name: 'Тестовый бургер',
        owner: {
          name: 'Тестовый пользователь',
          email: 'test@example.com',
          createdAt: '2026-01-01T00:00:00.000Z',
          updatedAt: '2026-01-01T00:00:00.000Z'
        },
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
        number: 12345,
        price: 450
      }
    };

    const action = createOrder.fulfilled(testOrderResponse, 'test-request', []);

    const expectedState = initialConstructorState;

    const actualState = burgerConstructorReducer(previousState, action);

    expect(actualState).toEqual(expectedState);
  });
});
