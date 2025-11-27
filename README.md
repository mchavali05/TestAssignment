# Playwright UI Automation Framework (JavaScript)

This repository contains an **UI automation framework** built using
**Playwright Test Runner + JavaScript**.


## Setup Instructions

### Prerequisites
- node.js
- npm
- Git
- Clone the repository

### Install Dependencies

    npm install
    npx playwright install

### Run Tests
    
#### Run all tests - Headless Mode
    npx playwright test

#### Headed Mode 
    npx playwright test --headed

#### UI Mode
    npx playwright test --ui

#### Run one test:

    npx playwright test tests/e2e/01_login.spec.js
     
## Reports

    npx playwright show-report

   
## Why the following test cases are automated 
- Login: Critical entry criteria, blocks all other flows if broken.
- Book Scan: Core 3-step business workflow validation.
- Validate Age: Boundary condition testing for compliance. 
- Validate MRI Scan Price: Ensures pricing logic is correct.

## Trade-offs and Assumptions
- Prioritized high value flows over cosmetic checks.
- Assumed stable test data and environments.
- Test accounts and sample member data are stable and safe to use in test automation.
- Common workflows automated remain consistent even if UI design changes slightly.
- API responses and backend services are reliable and available during test runs.
- Scan catalog, pricing data remain relatively status unless explicitly changed.
- Chromium/Chrome browser considered as a baseline for tests execution.
- Prefer stable data-test IDs for locator strategy, trade-off is using CSS/XPath selectors that may be slightly more fragile.
- Focus on User Acceptance tests via UI automation, cheaper and faster API checks to be done for data validations where applicable. 


## Project Structure

    project-root/   
    ├── src/
    │   ├── config/
    │   │   └── env.js
    │   ├── fixtures/
    │   │   └── testFixture.js
    │   ├── pages/
    │   │   ├── base.page.js
    │   │   ├── login.page.js
    │   │   └── ...
    │   ├── utils/
    ├── tests/
    │   └── e2e/
    │       ├── 01_login.spec.js
    │       ├── 02_bookScan.spec.js
    │       └── ...
    ├── playwright.config.js
    ├── README.md
    ├── .gitignore
    ├── package.json
    ├── test-results/
    └──/playwright-report/

## Architecture
The framework follows the Page Object Model and layered test architecture.

1. Test Layer
- Contains end-to-end test specs (*.spec.js)
- Follows naming convention for test order and clarity (01_login.spec.js, etc. though they can be run independently)
- Note: It can be reoriganized in the future by feature or module

2. Page Object Layer
- Excapsulated UI elements and actions for each page.
- Includes base page abstraction (base.page.js)

3. Fixture Layer
- Stores the setup logic (textFixture.js)

4. Config Layer
- Manages environment specific settings (env.js).

5. Playwright config (playwright.config.js)
- Centralized configuration for brwoser, retries, BaseURL, etc. 
- baseURL per environment
- projects for browser/device matrix
- reporters: HTML
- use: video settings

## Framework Trade-offs & Assumptions
- POM: Easier maintenance, but upfront design effort
- JavaScript: Fast setup, but lacks type safety (TypeScript)
- Headless mode: Faster runs, harder to debug
- Test ordering: Numbered specs help sequence, but can be brittle

## Feature Implemented 
- Modular Page Object Model
- Environment based config
- End-to-end test specs
- HTML report generation
- Video on failure

## Scalability and Future work 
- Regression tests, expand testing coverage
- Smoke tests
- API tests
- CI/CD integration
- Test data management (DB/API)
- Reusuable helpers for test data setup, teardown
- Parallel test execution across environments 




