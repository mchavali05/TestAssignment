const base = require('@playwright/test').test;
const expect = require('@playwright/test').expect;

const LoginPage = require('../pages/login.page');
const HomePage = require('../pages/home.page');
const BookScanPage = require('../pages/bookScan.page');
const SignUpPage = require('../pages/signup.page');
const { loadEnvConfig } = require('../config/env');

const env = loadEnvConfig(process.env.TEST_ENV || 'staging');

const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page, expect));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page, expect));
  },
  bookScanPage: async ({ page }, use) => {
    await use(new BookScanPage(page, expect));
  },
  signupPage: async ({ page }, use) => {
    await use(new SignUpPage(page, expect));
  },

  envName: async ({ }, use) => {
    await use(env.name);
  },
});

module.exports = { test, expect };