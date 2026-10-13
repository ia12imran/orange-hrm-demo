const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { PIMPage } = require('../pages/PIMPage');
const {
    getEmployeeData,
    generateEmployeeId,
} = require('../utils/testData');

test('should update an employee job title and employment status', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const pimPage = new PIMPage(page);

    const employee = {
        ...getEmployeeData()[0],
        employeeId: generateEmployeeId(),
    };

    console.log('Employee ID for editing:', employee.employeeId);

    // Step 1: Login
    await loginPage.navigate();
    await loginPage.login('Admin', 'admin123');

    await expect(
        page.getByRole('heading', { name: 'Dashboard' })
    ).toBeVisible();

    // Step 2: Create an employee for this test
    await pimPage.openAddEmployee();
    await pimPage.addEmployee(employee);

    await expect(pimPage.successToast).toBeVisible({
        timeout: 15000,
    });

    // Step 3: Find the employee
    await pimPage.openEmployeeList();
    await pimPage.searchEmployeeById(employee.employeeId);

    const employeeRow = page
        .getByRole('row')
        .filter({ hasText: employee.employeeId });

    await expect(employeeRow).toBeVisible({
        timeout: 15000,
    });

    // Step 4: Open the employee record
    await pimPage.openEmployeeForEditing(employee.employeeId);

    // Step 5: Update job details
  await pimPage.updateJobDetails('QA Engineer', 'Full-Time Permanent');

    console.log('Employee job details updated successfully.');
});