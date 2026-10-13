const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { PIMPage } = require('../pages/PIMPage');
const {
    getEmployeeData,
    generateEmployeeId,
} = require('../utils/testData');

test('should search for an employee by Employee ID', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const pimPage = new PIMPage(page);

    // Prepare employee data with a unique, valid Employee ID.
    const employee = {
        ...getEmployeeData()[0],
        employeeId: generateEmployeeId(),
    };

    console.log('Employee ID for search:', employee.employeeId);

    // Step 1: Login
    await loginPage.navigate();
    await loginPage.login('Admin', 'admin123');

    await expect(
        page.getByRole('heading', { name: 'Dashboard' })
    ).toBeVisible();

    // Step 2: Create an employee for this test.
    await pimPage.openAddEmployee();

    await expect(pimPage.firstNameInput).toBeVisible();

    await pimPage.addEmployee(employee);

    // Verify that OrangeHRM confirms successful creation.
    await expect(pimPage.successToast).toBeVisible({
        timeout: 15000,
    });

    // Step 3: Open Employee List.
    await pimPage.openEmployeeList();

    // Step 4: Search using the generated Employee ID.
    await pimPage.searchEmployeeById(employee.employeeId);

    // Step 5: Locate the matching employee row.
    const employeeRow = page
        .getByRole('row')
        .filter({ hasText: employee.employeeId });

    await expect(employeeRow).toBeVisible({
        timeout: 15000,
    });

    // Step 6: Verify the employee's details in the same row.
    await expect(employeeRow).toContainText(employee.firstName);
    await expect(employeeRow).toContainText(employee.lastName);

    console.log('Employee search verification passed.');
});