
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');

test('should login successfully with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.navigate();
  await loginPage.login('Admin', 'admin123');

  await expect(
    dashboardPage.dashboardHeading,
    'Dashboard should be visible after successful login'
  ).toBeVisible();

  await expect(page).toHaveURL(/dashboard/);
});
