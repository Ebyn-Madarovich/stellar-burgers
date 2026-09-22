import { test, expect } from '@playwright/test';

test.describe('Конструктор бургера', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      update: false
    });
  });

  test.describe('Добавление ингредиентов', () => {
    test('Добавляет булку в конструктор', async ({ page }) => {
      await page.goto('/');

      const bunCard = page.locator('li').filter({
        hasText: 'Краторная булка N-200i'
      });
      await bunCard
        .getByRole('button', { name: 'Добавить', exact: true })
        .click();

      const constructor = page.locator('section').filter({
        has: page.getByRole('button', { name: 'Оформить заказ', exact: true })
      });
      await expect(
        constructor.getByText('Краторная булка N-200i (верх)', { exact: true })
      ).toBeVisible();

      await expect(
        constructor.getByText('Краторная булка N-200i (низ)', { exact: true })
      ).toBeVisible();
    });

    test('Добавляет начинку в конструктор', async ({ page }) => {
      await page.goto('/');

      const fillingCard = page.locator('li').filter({
        hasText: 'Биокотлета из марсианской Магнолии'
      });
      await fillingCard
        .getByRole('button', { name: 'Добавить', exact: true })
        .click();

      const constructor = page.locator('section').filter({
        has: page.getByRole('button', { name: 'Оформить заказ', exact: true })
      });
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

      const ingredientCard = page.locator('li').filter({
        hasText: 'Филе Люминесцентного тетраодонтимформа'
      });
      const ingredientLink = ingredientCard.getByRole('link');

      await ingredientLink.click();

      await expect(
        page.getByRole('heading', {
          name: 'Детали ингредиента',
          exact: true
        })
      ).toBeVisible();

      await expect(
        page.getByRole('heading', {
          name: 'Филе Люминесцентного тетраодонтимформа',
          exact: true
        })
      ).toBeVisible();

      const modal = page.locator('#modals');

      await modal.getByRole('button').click();

      await expect(modal).toBeEmpty();
    });

    test('Закрывает окно по клику на оверлей', async ({ page }) => {
      await page.goto('/');

      const ingredientCard = page.locator('li').filter({
        hasText: 'Филе Люминесцентного тетраодонтимформа'
      });
      const ingredientLink = ingredientCard.getByRole('link');

      await ingredientLink.click();

      await expect(
        page.getByRole('heading', {
          name: 'Детали ингредиента',
          exact: true
        })
      ).toBeVisible();

      await expect(
        page.getByRole('heading', {
          name: 'Филе Люминесцентного тетраодонтимформа',
          exact: true
        })
      ).toBeVisible();

      const modalRoot = page.locator('#modals');
      const overlay = modalRoot.locator(':scope > div').last();

      await overlay.click({
        position: { x: 5, y: 5 }
      });

      await expect(modalRoot).toBeEmpty();
    });
  });

  test('Показывает номер заказа, очищает конструктор и закрывает модальное окно', async ({
    page,
    context
  }) => {
    //Созданы моковые данные ответа на запрос данных пользователя
    await page.routeFromHAR('tests/hars/authentication.har', {
      url: '**/api/auth/user',
      update: false
    });

    //Созданы моковые данные ответа на запрос создания заказа
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

    await page.goto('/');

    // #region Собирается бургер
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

    // #region Вызывается клик по кнопке «Оформить заказ»
    const orderResponsePromise = page.waitForResponse(
      (response) =>
        response.url().includes('/api/orders') &&
        response.request().method() === 'POST'
    );

    await page
      .getByRole('button', { name: 'Оформить заказ', exact: true })
      .click();

    const orderResponse = await orderResponsePromise;

    expect(orderResponse.ok()).toBeTruthy();
    // #endregion

    // #region Проверяется, что модальное окно открылось и номер заказа верный
    const orderModal = page.locator('#modals');

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
    const constructor = page.locator('section').filter({
      has: page.getByRole('button', {
        name: 'Оформить заказ',
        exact: true
      })
    });

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
