
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');

test('should logout successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    // Step 1: Open the login page
    await loginPage.navigate();

    // Step 2: Login as Admin
    await loginPage.login('Admin', 'admin123');

    // Step 3: Verify Dashboard
    await dashboardPage.verifyDashboardVisible();

    await expect(
        page.getByRole('heading', { name: 'Dashboard' })
    ).toBeVisible();

    // Step 4: Logout
    await dashboardPage.logout();

    // Step 5: Verify the login page is displayed
    await expect(
        page.locator('input[name="username"]')
    ).toBeVisible({ timeout: 15000 });

    await expect(page).toHaveURL(/\/auth\/login/);

    console.log('Logout verification passed.');
});
