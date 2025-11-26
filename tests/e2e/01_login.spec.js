const { test, expect } = require('../../src/fixtures/testFixture');
const { loadEnvConfig } = require('../../src/config/env');
 
const env = loadEnvConfig(process.env.TEST_ENV || 'staging');
 
test.describe('Login', () => {
  test('Valid login', async ({ loginPage, homePage }) => {
    const { email, password } = env.credentials.defaultUser;
 
    await loginPage.navigate();
    await loginPage.login(email, password);
    await expect(homePage.appointmentsText).toContainText('Appointments');
 
   });
 
});
 