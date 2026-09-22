import { test, expect } from '@playwright/test';

test.describe('Конструктор бургера', () => {
  test('Открывает страницу конструктора', async ({ page }) => {
    await page.routeFromHAR('tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      update: true
    });

    await page.goto('/');

    await expect(
      page.getByRole('heading', { name: 'Соберите бургер' })
    ).toBeVisible();
  });
});
