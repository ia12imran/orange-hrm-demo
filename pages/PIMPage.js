class PIMPage {
    constructor(page) {
        this.page = page;

        // Navigation
        this.pimMenu = page.getByRole('link', { name: 'PIM' });
        this.addEmployeeLink = page.getByRole('link', {
            name: 'Add Employee',
        });
        this.employeeListLink = page.getByRole('link', {
            name: 'Employee List',
        });

        // Add Employee form
        this.firstNameInput = page.getByRole('textbox', {
            name: 'First Name',
        });
        this.middleNameInput = page.getByRole('textbox', {
            name: 'Middle Name',
        });
        this.lastNameInput = page.getByRole('textbox', {
            name: 'Last Name',
        });

        this.employeeIdInput = page
            .locator('.oxd-input-group')
            .filter({ hasText: 'Employee Id' })
            .locator('input');

        this.profilePictureInput = page.locator(
            'input[type="file"]'
        );

        this.saveButton = page.getByRole('button', {
            name: 'Save',
        });

        this.successToast = page.locator('.oxd-toast--success');

        // Employee List search
        this.searchEmployeeIdInput = page
            .locator('.oxd-input-group')
            .filter({ hasText: 'Employee Id' })
            .locator('input');

        this.searchButton = page.getByRole('button', {
            name: 'Search',
        });

        this.resetButton = page.getByRole('button', {
            name: 'Reset',
        });

        // Employee List results
        this.employeeTableRows = page.getByRole('row');

        // Employee details and job section
        this.jobTab = page.getByText('Job', { exact: true });
        this.jobTitleDropdown = page
            .locator('.oxd-input-group')
            .filter({ hasText: 'Job Title' })
            .locator('.oxd-select-text');

        this.employmentStatusDropdown = page
            .locator('.oxd-input-group')
            .filter({ hasText: 'Employment Status' })
            .locator('.oxd-select-text');
    }

    async openAddEmployee() {
        await this.pimMenu.click();
        await this.addEmployeeLink.click();
    }

    async openEmployeeList() {
        await this.pimMenu.click();
        await this.employeeListLink.click();
    }

    async addEmployee(employee, picturePath) {
        await this.firstNameInput.fill(employee.firstName);
        await this.middleNameInput.fill(employee.middleName || '');
        await this.lastNameInput.fill(employee.lastName);

        await this.employeeIdInput.fill(employee.employeeId);

        if (picturePath) {
            await this.profilePictureInput.setInputFiles(picturePath);
        }

        await this.saveButton.click();
    }

    async searchEmployeeById(employeeId) {
        await this.searchEmployeeIdInput.fill(employeeId);
        await this.searchButton.click();
    }


    async openEmployeeForEditing(employeeId) {
        const employeeRow = this.employeeTableRows.filter({
            hasText: employeeId,
        });

        await employeeRow.waitFor({
            state: 'visible',
            timeout: 15000,
        });

        // Click the pencil (Edit) button, not the trash (Delete) button.
        const editButton = employeeRow.locator(
            'button:has(i.bi-pencil-fill)'
        );

        await editButton.click();
    }

    async updateJobDetails(jobTitle, employmentStatus) {
        // Open the Job section
        await this.jobTab.click();

        // Select Job Title
        await this.jobTitleDropdown.waitFor({
            state: 'visible',
            timeout: 15000,
        });

        await this.jobTitleDropdown.click();

        await this.page.getByRole('option', {
            name: jobTitle,
            exact: true,
        }).click();

        // Select Employment Status
        await this.employmentStatusDropdown.waitFor({
            state: 'visible',
            timeout: 15000,
        });

        await this.employmentStatusDropdown.click();

        await this.page.getByRole('option', {
            name: employmentStatus,
            exact: true,
        }).click();

        // Save changes
        await this.saveButton.click();

        await this.successToast.waitFor({
            state: 'visible',
            timeout: 15000,
        });
    }

}

module.exports = { PIMPage };