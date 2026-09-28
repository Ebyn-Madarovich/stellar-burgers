import { test, expect } from '@playwright/test';

test.describe('Конструктор бургера', () => {
  test.beforeEach(async ({ page }) => {
    // Созданы моковые данные для ингредиентов
    await page.routeFromHAR('tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      update: false
    });

    // Созданы моковые данные ответа на запрос данных пользователя
    await page.routeFromHAR('tests/hars/authentication.har', {
      url: '**/api/auth/user',
      update: false
    });
  });

  test.describe('Добавление ингредиентов', () => {
    test('Добавляет булку в конструктор', async ({ page }) => {
      await page.goto('/');

      const constructor = page.locator('section').filter({
        has: page.getByRole('button', {
          name: 'Оформить заказ',
          exact: true
        })
      });

      // Проверяем отсутствие булки в конструкторе до её добавления
      await expect(
        constructor.getByText('Краторная булка N-200i (верх)', {
          exact: true
        })
      ).toHaveCount(0);
      await expect(
        constructor.getByText('Краторная булка N-200i (низ)', {
          exact: true
        })
      ).toHaveCount(0);
      const bunCard = page.locator('li').filter({
        hasText: 'Краторная булка N-200i'
      });

      // Добавляем булку в конструктор по клику
      await bunCard
        .getByRole('button', { name: 'Добавить', exact: true })
        .click();

      // Проверяем наличие булки в конструкторе после клика
      await expect(
        constructor.getByText('Краторная булка N-200i (верх)', { exact: true })
      ).toBeVisible();

      await expect(
        constructor.getByText('Краторная булка N-200i (низ)', { exact: true })
      ).toBeVisible();
    });

    test('Добавляет начинку в конструктор', async ({ page }) => {
      await page.goto('/');

      const constructor = page.locator('section').filter({
        has: page.getByRole('button', {
          name: 'Оформить заказ',
          exact: true
        })
      });

      // Проверяем отсутствие начинки в конструкторе до её добавления
      await expect(
        constructor.getByText('Биокотлета из марсианской Магнолии', {
          exact: true
        })
      ).toHaveCount(0);

      const fillingCard = page.locator('li').filter({
        hasText: 'Биокотлета из марсианской Магнолии'
      });

      // Добавляем начинку в конструктор по клику
      await fillingCard
        .getByRole('button', { name: 'Добавить', exact: true })
        .click();

      // Проверяем наличие начинки в конструкторе после клика
      await expect(
        constructor.getByText('Биокотлета из марсианской Магнолии', {
          exact: true
        })
      ).toBeVisible();
    });
  });

  test.describe('Модальное окно ингредиента', () => {
    test('Открывает окно с данными выбранного ингредиента и закрывает его крестиком', async ({
      page
    }) => {
      await page.goto('/');

      const modal = page.locator('#modals');

      // Проверяем, что до клика модальное окно закрыто
      await expect(modal).toBeEmpty();

      const ingredientCard = page.locator('li').filter({
        hasText: 'Филе Люминесцентного тетраодонтимформа'
      });
      const ingredientLink = ingredientCard.getByRole('link');

      // Открываем модальное окно по клику на карточку ингредиента
      await ingredientLink.click();

      await expect(
        modal.getByRole('heading', {
          name: 'Детали ингредиента',
          exact: true
        })
      ).toBeVisible();

      await expect(
        modal.getByRole('heading', {
          name: 'Филе Люминесцентного тетраодонтимформа',
          exact: true
        })
      ).toBeVisible();

      // Закрываем модальное окно по клику на крестик
      await modal.getByRole('button').click();

      // Проверяем, что модальное окно закрылось после клика по крестику
      await expect(modal).toBeEmpty();
    });

    test('Закрывает окно по клику на оверлей', async ({ page }) => {
      await page.goto('/');

      const modalRoot = page.locator('#modals');

      // Проверяем, что до клика модальное окно закрыто
      await expect(modalRoot).toBeEmpty();

      const ingredientCard = page.locator('li').filter({
        hasText: 'Филе Люминесцентного тетраодонтимформа'
      });
      const ingredientLink = ingredientCard.getByRole('link');

      // Открываем модальное окно по клику на карточку ингредиента
      await ingredientLink.click();

      await expect(
        modalRoot.getByRole('heading', {
          name: 'Детали ингредиента',
          exact: true
        })
      ).toBeVisible();

      await expect(
        modalRoot.getByRole('heading', {
          name: 'Филе Люминесцентного тетраодонтимформа',
          exact: true
        })
      ).toBeVisible();

      const overlay = modalRoot.locator(':scope > div').last();

      // Закрываем модальное окно по клику на оверлей
      await overlay.click({
        position: { x: 5, y: 5 }
      });

      // Проверяем, что модальное окно закрылось после клика на оверлей
      await expect(modalRoot).toBeEmpty();
    });
  });

  test('Показывает номер заказа, очищает конструктор и закрывает модальное окно', async ({
    page,
    context
  }) => {
    // Созданы моковые данные ответа на запрос создания заказа
    await page.routeFromHAR('tests/hars/orders.har', {
      url: '**/api/orders',
      update: false
    });

    // #region Подставляются моковые токены авторизации
    await context.addCookies([
      {
        name: 'accessToken',
        value: 'Bearer%20test-access-token',
        url: 'http://localhost:4000'
      }
    ]);

    await page.addInitScript(() => {
      localStorage.setItem('refreshToken', 'test-refresh-token');
    });
    // #endregion

    // Начинаем следить за ответом сервера на запрос данных пользователя.
    const userResponsePromise = page.waitForResponse('**/api/auth/user');

    // При открытии страницы приложение отправляет запрос данных пользователя
    await page.goto('/');

    // Дожидаемся ответа на этот запрос
    await userResponsePromise;

    const bunId = '643d69a5c3f7b9001cfa093c';
    const fillingId = '643d69a5c3f7b9001cfa0941';

    const constructor = page.locator('section').filter({
      has: page.getByRole('button', {
        name: 'Оформить заказ',
        exact: true
      })
    });

    // #region Собирается бургер

    // Проверяем отсутствие ингредиентов в конструкторе до сборки бургера
    await expect(
      constructor.getByText('Краторная булка N-200i (верх)', {
        exact: true
      })
    ).toHaveCount(0);

    await expect(
      constructor.getByText('Краторная булка N-200i (низ)', {
        exact: true
      })
    ).toHaveCount(0);

    await expect(
      constructor.getByText('Биокотлета из марсианской Магнолии', {
        exact: true
      })
    ).toHaveCount(0);

    const bunCard = page.locator('li').filter({
      hasText: 'Краторная булка N-200i'
    });
    await bunCard
      .getByRole('button', { name: 'Добавить', exact: true })
      .click();

    const fillingCard = page.locator('li').filter({
      hasText: 'Биокотлета из марсианской Магнолии'
    });
    await fillingCard
      .getByRole('button', { name: 'Добавить', exact: true })
      .click();
    // #endregion

    const orderModal = page.locator('#modals');

    // Проверяем, что до оформления заказа модальное окно закрыто
    await expect(orderModal).toBeEmpty();

    // #region Вызывается клик по кнопке «Оформить заказ»

    // Начинаем следить за ответом сервера на POST-запрос создания заказа
    const orderResponsePromise = page.waitForResponse(
      (response) =>
        response.url().includes('/api/orders') &&
        response.request().method() === 'POST'
    );

    // Клик вызывает запрос создания заказа
    await page
      .getByRole('button', { name: 'Оформить заказ', exact: true })
      .click();

    // Получаем ответ сервера на создание заказа
    const orderResponse = await orderResponsePromise;

    // Проверяем, что в запросе переданы ID собранных ингредиентов
    expect(orderResponse.request().postDataJSON()).toEqual({
      ingredients: [bunId, fillingId, bunId]
    });
    // #endregion

    // #region Проверяется, что модальное окно открылось и номер заказа верный

    await expect(
      orderModal.getByText('идентификатор заказа', { exact: true })
    ).toBeVisible();

    await expect(
      orderModal.getByRole('heading', {
        name: '110482',
        exact: true
      })
    ).toBeVisible();
    // #endregion

    // #region Проверяется, что конструктор пуст
    await expect(
      constructor.getByText('Выберите булки', { exact: true })
    ).toHaveCount(2);

    await expect(
      constructor.getByText('Выберите начинку', { exact: true })
    ).toBeVisible();
    // #endregion

    // #region Закрывается модальное окно
    await orderModal.getByRole('button').click();

    await expect(orderModal).toBeEmpty();
    // #endregion
  });
});
