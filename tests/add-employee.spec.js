const { test, expect } = require('@playwright/test');
const path = require('path');

const { LoginPage } = require('../pages/LoginPage');
const { PIMPage } = require('../pages/PIMPage');
const {
    getEmployeeData,
    generateEmployeeId,
} = require('../utils/testData');

test('should add a new employee using JSON test data', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const pimPage = new PIMPage(page);

    const employee = {
        ...getEmployeeData()[0],
        employeeId: generateEmployeeId(),
    };

    console.log('Generated Employee ID:', employee.employeeId);
    const picturePath = path.resolve('test-assets/profile.jpg');

    await loginPage.navigate();
    await loginPage.login('Admin', 'admin123');

    await expect(page.getByRole('heading', {
        name: 'Dashboard',
    })).toBeVisible();

    await pimPage.openAddEmployee();

    await expect(pimPage.firstNameInput).toBeVisible();

    await pimPage.addEmployee(employee, picturePath);

    // Verify successful navigation to the employee details page.
    await expect(pimPage.successToast).toBeVisible({ timeout: 15000 });

    // Verify the employee name on the resulting page.
    await expect(
        page.getByRole('textbox', { name: 'First Name' })
    ).toHaveValue(employee.firstName);

    await expect(
        page.getByRole('textbox', { name: 'Last Name' })
    ).toHaveValue(employee.lastName);
});
