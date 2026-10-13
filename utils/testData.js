const employeeData = require('../test-data/employees.json');

function getEmployeeData() {
    return employeeData.employees;
}

function generateEmployeeId() {
    const timestamp = Date.now().toString().slice(-6);
    const randomNumber = Math.floor(10 + Math.random() * 90);

    return `IM${timestamp}${randomNumber}`;
}

module.exports = {
    getEmployeeData,
    generateEmployeeId,
};
