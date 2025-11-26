const { test, expect } = require('../../src/fixtures/testFixture');
const { loadEnvConfig } = require('../../src/config/env');
const SignUpPage = require('../../src/pages/signup.page');
const BookScanPage = require('../../src/pages/bookScan.page');

const env = loadEnvConfig(process.env.TEST_ENV || 'staging');

test.describe('sign up', () => {
  test('Join as a new member and validate age', async ({ signupPage, bookScanPage }) => {
    //test data
    const uniqueId = Date.now();
    const firstname = `test_${uniqueId}`;
    const lastname = `auto_${uniqueId}`;
    const email = `auto${uniqueId}@test.com`;
    const phonenumber = `555${uniqueId.toString().slice(-7)}`;
    const password = `Pass!${uniqueId}`;


    //signup form
    await signupPage.navigate();
    await expect(signupPage.signUpText).toContainText('or sign up with your email');
    
    await signupPage.firstNameInput.fill(firstname);
    await signupPage.lastNameInput.fill(lastname);
    await signupPage.emailInput.fill(email);
    await signupPage.phoneNumberInput.fill(phonenumber);
    await signupPage.passwordInput.fill(password);
    await signupPage.page.waitForTimeout(1000);
    await signupPage.termsOfUseCheckbox.click();
    await signupPage.page.waitForTimeout(2000);
    await signupPage.submitButton.click();
    await signupPage.page.waitForTimeout(1000);

    //assertion - landing page
    await expect(bookScanPage.selectYourScanHeading).toContainText('Select your Scan');

    //Date of birth - blank field validation
    await bookScanPage.enterDOB('');
    await expect(bookScanPage.dobErrorMessage).toBeVisible();
    await expect(bookScanPage.dobErrorMessage).toContainText("Please provide your date of birth");

    //Date of birth - minumum age validation
    await bookScanPage.enterDOB('01-01-2015');
    await expect(bookScanPage.dobErrorMessage).toBeVisible();
    await expect(bookScanPage.dobErrorMessage).toContainText("to be 18 years or older");

    //Date of birth - maxmimum age validation
    await bookScanPage.enterDOB('01-01-1899');
    await expect(bookScanPage.dobErrorMessage).toBeVisible();
    await expect(bookScanPage.dobErrorMessage).toContainText("enter a date after 01-01-1900");

    //select sex at birth   
    await bookScanPage.selectSex('Male');

  });

});