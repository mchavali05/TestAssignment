const { test, expect } = require('../../src/fixtures/testFixture');
const { loadEnvConfig } = require('../../src/config/env');
const BookScanPage = require('../../src/pages/bookScan.page');

const env = loadEnvConfig(process.env.TEST_ENV || 'staging');

test.describe('Validate MRI scan price', () => {

  test('Validate MRI scan price match from step 1 and step 3', async ({ loginPage, homePage, bookScanPage }) => {

    // Login
    const { email, password } = env.credentials.defaultUser;

    await loginPage.navigate();
    await loginPage.login(email, password);
    await expect(homePage.appointmentsText).toContainText('Appointments');


    // Select a Scan
    await bookScanPage.bookAScanButton.click();
    await expect(bookScanPage.reviewYourScanHeading).toContainText('Review your Scan');
    await bookScanPage.scanTypeMRI.click();
    const mripPrice = await bookScanPage.getScanTypeMRIPrice();
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

    //price assertion
     const totalPrice = await bookScanPage.getTotalPrice();
     await expect(totalPrice).toBe(mripPrice)
   
  });
});