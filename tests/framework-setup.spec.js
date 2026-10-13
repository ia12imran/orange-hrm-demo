
const { test, expect } = require('@playwright/test');
const { getEmployeeData } = require('../utils/testData');

test('should load valid employee records from JSON', async () => {
  const employees = getEmployeeData();

  expect(
    employees.length,
    'At least one employee record should be available'
  ).toBeGreaterThan(0);

  for (const employee of employees) {
    expect(employee.firstName, 'First name is required').toBeTruthy();
    expect(employee.lastName, 'Last name is required').toBeTruthy();
    expect(employee.employeeId, 'Employee ID is required').toBeTruthy();
    expect(employee.jobTitle, 'Job title is required').toBeTruthy();
    expect(employee.employmentStatus, 'Employment status is required').toBeTruthy();
  }

  const employeeIds = employees.map(employee => employee.employeeId);

  expect(
    new Set(employeeIds).size,
    'Employee IDs in the test data must be unique'
  ).toBe(employeeIds.length);
});
