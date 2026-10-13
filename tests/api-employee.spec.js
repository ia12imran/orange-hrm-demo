
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { PIMPage } = require('../pages/PIMPage');
const {
    getEmployeeData,
    generateEmployeeId,
} = require('../utils/testData');

test('should validate the created employee through the API', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const pimPage = new PIMPage(page);

    const employee = {
        ...getEmployeeData()[0],
        employeeId: generateEmployeeId(),
    };

    console.log('Employee ID for API validation:', employee.employeeId);

    // Login
    await loginPage.navigate();
    await loginPage.login('Admin', 'admin123');

    await expect(
        page.getByRole('heading', { name: 'Dashboard' })
    ).toBeVisible();

    // Create employee through the UI
    await pimPage.openAddEmployee();
    await pimPage.addEmployee(employee);

    await expect(pimPage.successToast).toBeVisible({
        timeout: 15000,
    });

    // Validate employee using the authenticated API request
    const response = await page.request.get(
        '/web/index.php/api/v2/pim/employees',
        {
            params: {
                limit: '50',
                offset: '0',
                model: 'detailed',
                nameOrId: employee.employeeId,
                includeEmployees: 'onlyCurrent',
                sortField: 'employee.firstName',
                sortOrder: 'ASC',
            },
            headers: {
                accept: 'application/json',
            },
        }
    );

    const responseBody = await response.text();

    console.log('API status:', response.status());
    console.log('API response:', responseBody);

    expect(response.status()).toBe(200);

    const body = JSON.parse(responseBody);

    expect(Array.isArray(body.data)).toBe(true);

    const apiEmployee = body.data.find(
        (item) => item.employeeId === employee.employeeId
    );

    expect(apiEmployee).toBeTruthy();
    expect(apiEmployee.firstName).toBe(employee.firstName);
    expect(apiEmployee.lastName).toBe(employee.lastName);

    console.log('API employee validation passed.');
});
