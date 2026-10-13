
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { PIMPage } = require('../pages/PIMPage');
const {
    getEmployeeData,
    generateEmployeeId,
} = require('../utils/testData');

test('should delete an employee successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const pimPage = new PIMPage(page);

    const employee = {
        ...getEmployeeData()[0],
        employeeId: generateEmployeeId(),
    };

    console.log('Employee ID for deletion:', employee.employeeId);

    // Step 1: Login
    await loginPage.navigate();
    await loginPage.login('Admin', 'admin123');

    await expect(
        page.getByRole('heading', { name: 'Dashboard' })
    ).toBeVisible();

    // Step 2: Create an employee to delete
    await pimPage.openAddEmployee();
    await pimPage.addEmployee(employee);

    await expect(pimPage.successToast).toBeVisible({
        timeout: 15000,
    });

    // Step 3: Search for the employee
    await pimPage.openEmployeeList();
    await pimPage.searchEmployeeById(employee.employeeId);

    const employeeRow = page
        .getByRole('row')
        .filter({ hasText: employee.employeeId });

    await expect(employeeRow).toBeVisible({
        timeout: 15000,
    });

    // Step 4: Click the Delete button for this employee
    await employeeRow.locator('button:has(i.bi-trash)').click();

    // Step 5: Confirm deletion
    await page.getByRole('button', { name: 'Yes, Delete' }).click();

    // Step 6: Verify the employee is no longer in the list
    await expect(employeeRow).toHaveCount(0, {
        timeout: 15000,
    });

    console.log('Employee deleted successfully.');
});
