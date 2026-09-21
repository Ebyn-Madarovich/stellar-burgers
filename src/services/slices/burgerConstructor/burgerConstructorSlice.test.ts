import { describe, test } from '@jest/globals';

describe('Редьюсер burgerConstructor', () => {
  test('Возвращает начальное состояние для неизвестного экшена', () => {});

  describe('addIngredient', () => {
    test.todo('Добавляет булку в пустой конструктор');

    test.todo('Заменяет ранее добавленную булку');

    test.todo('Добавляет начинку в конструктор');
  });

  test.todo('Удаляет начинку по её id');

  test.todo('Перемещает начинку на указанную позицию');

  test.todo('Очищает конструктор при clearConstructor');

  test.todo('Очищает конструктор при createOrder.fulfilled');
});
