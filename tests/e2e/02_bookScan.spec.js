const { test, expect } = require('../../src/fixtures/testFixture');
const { loadEnvConfig } = require('../../src/config/env');
const BookScanPage = require('../../src/pages/bookScan.page');

const env = loadEnvConfig(process.env.TEST_ENV || 'staging');

test.describe('Book a scan', () => {

  test('Three steps scan workflow', async ({ loginPage, homePage, bookScanPage }) => {

    // Login
    const { email, password } = env.credentials.defaultUser;

    await loginPage.navigate();
    await loginPage.login(email, password);
    await expect(homePage.appointmentsText).toContainText('Appointments');


    // Select a Scan
    await bookScanPage.bookAScanButton.click();
    await expect(bookScanPage.reviewYourScanHeading).toContainText('Review your Scan');
    await bookScanPage.scanTypeMRI.click();
    await bookScanPage.clickContinue();
    await expect(bookScanPage.scheduleYourScanHeading).toContainText('Schedule your scan');


    // Schedule a Scan
    await bookScanPage.selectState("California");
    await bookScanPage.selectNearestLocation();
    await expect(bookScanPage.nextMonth).toBeVisible();
    await bookScanPage.selectDateTime();
    await bookScanPage.clickScheduleContinue();
    

    //Reserve your appointment
     await expect(bookScanPage.reserveAppointmentHeading).toBeVisible();
     await expect(bookScanPage.reserveAppointmentHeading).toContainText('Reserve your appointment');
    
    //Enter card payment details
    await bookScanPage.enterCardNumber('4242 4242 4242 4242');
    await bookScanPage.enterExpiryDate('12/34');
    await bookScanPage.enterCvcCode('321');
    await bookScanPage.enterZip('94104');

    //card assertions
    await expect(bookScanPage.cardNumberInput).toHaveValue('4242 4242 4242 4242');
    await expect(bookScanPage.cardExpiryDateInput).toHaveValue('12 / 34');
    await expect(bookScanPage.cardSecurityCodeInput).toHaveValue('321');
    await expect(bookScanPage.cardZipCodeInput).toHaveValue('94104');

    await bookScanPage.clickContinue();
    
    //compete booking scan page assertion
    await expect(bookScanPage.appointmentConfirmationHeading).toBeVisible();
    await expect(bookScanPage.appointmentConfirmationHeading).toContainText("You\'re almost done, ");
  });
});