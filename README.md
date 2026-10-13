# OrangeHRM Playwright Automation Framework

## Project Overview

This project is a UI and API automation framework built using **Playwright with JavaScript**. It automates key employee lifecycle workflows on the OrangeHRM demo application.

The framework uses the Page Object Model (POM), JSON-based test data, and Playwright assertions to support readable, reusable, and maintainable automated tests.

**Application under test:** https://opensource-demo.orangehrmlive.com/

## Technology Stack

- JavaScript (CommonJS)
- Playwright Test
- Node.js and npm
- Page Object Model (POM)
- JSON-based test data
- Playwright API testing
- HTML test reporting

## Automated Test Coverage

The current test suite contains eight tests covering the following scenarios:

| Test file | Coverage |
|---|---|
| `login.spec.js` | Login with valid credentials |
| `add-employee.spec.js` | Create a new employee |
| `search-employee.spec.js` | Search for an employee by Employee ID |
| `edit-employee.spec.js` | Update job title and employment status |
| `api-employee.spec.js` | Validate employee details through the API |
| `delete-employee.spec.js` | Delete an employee and verify removal |
| `logout.spec.js` | Logout and verify the login page |
| `framework-setup.spec.js` | Validate employee test data loaded from JSON |

**Latest test execution:** 8 passed, 0 failed.

## Project Structure

```text
orangehrm-playwright-js/
├── pages/
│   ├── DashboardPage.js
│   ├── LoginPage.js
│   └── PIMPage.js
├── test-assets/
│   └── profile.jpg
├── test-data/
│   └── employees.json
├── tests/
│   ├── add-employee.spec.js
│   ├── api-employee.spec.js
│   ├── delete-employee.spec.js
│   ├── edit-employee.spec.js
│   ├── framework-setup.spec.js
│   ├── login.spec.js
│   ├── logout.spec.js
│   └── search-employee.spec.js
├── utils/
│   └── testData.js
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md
```

## Prerequisites

Install the following before running the project:

- Node.js and npm
- Git (optional, for version control)
- Visual Studio Code or another code editor

## Installation

Clone the repository or download the project source code.

Install dependencies:

```bash
npm install
```

Install the Playwright Chromium browser:

```bash
npx playwright install chromium
```

## Running Tests

Run the complete test suite:

```bash
npm test
```

Run tests with a visible browser:

```bash
npm run test:headed
```

Run a specific test:

```bash
npx playwright test tests/login.spec.js
```

Run the API validation test:

```bash
npx playwright test tests/api-employee.spec.js
```

Run tests in debug mode:

```bash
npm run test:debug
```

List discovered tests:

```bash
npx playwright test --list
```

## HTML Test Report

Open the Playwright HTML report:

```bash
npm run report
```

If a report has not been generated yet, run the tests first. Review the Playwright configuration for the enabled reporters and report output settings.

The generated `playwright-report/` and `test-results/` directories are excluded from Git by `.gitignore`.

## Framework Design

### Page Object Model

Page-specific locators and actions are organized into reusable classes under `pages/`.

- `LoginPage.js` — login page interactions.
- `DashboardPage.js` — dashboard verification and logout.
- `PIMPage.js` — employee creation, search, editing, and related interactions.

### Data-Driven Testing

Employee test data is maintained in `test-data/employees.json` and accessed through `utils/testData.js`.

The framework generates employee IDs dynamically in relevant tests to reduce collisions when creating test records.

### API Validation

The API test creates an employee through the UI, then sends an authenticated GET request to the OrangeHRM employee-list API using Playwright's browser-context request functionality. It verifies the HTTP status and compares the returned employee ID and name with the test data.

## Test Configuration

The project uses `playwright.config.js` for test discovery, browser settings, timeouts, and reporting.

The current suite runs in Chromium with one worker.

## Notes and Limitations

- This project targets the public OrangeHRM demo environment. Availability, data, and behavior may change.
- Demo test accounts are for learning and assessment purposes; never use real or sensitive credentials in committed files.
- Employee creation and deletion tests modify records on the demo site.
- The API test depends on an authenticated session and the demo API endpoint remaining available.
- The reported eight passing tests reflect the latest successful run and should be confirmed again before submission.

## Author

**Mohd Imran**

Quality Engineering | Playwright Automation | JavaScript | UI and API Testing
