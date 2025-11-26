const BasePage = require('./base.page');

class BookScanPage extends BasePage {
  constructor(page, expect) {
    super(page, expect);
    this.appointmentsText = this.locator(".section-header").first();
    //Select the scan
    this.bookAScanButton = this.page.getByRole('button', { name: 'Book a scan' });
    this.selectYourScanHeading = this.locator('h4:has-text("Select your Scan")');
    //Date of birth, sex 
    this.dobInput = this.locator('#dob');
    this.dobErrorMessage = this.locator('.error-message').first();
    this.sexDropdown = this.page.getByRole('combobox');
    this.sexOptionSelection = this.page.locator('li.multiselect__element >> span.multiselect__option span');
    this.sexErrorMessage = this.locator('.error-message').last();
    //Review your Scan
    //this.bookAScanButton = this.page.getByRole('button', { name: 'Book a scan' });
    this.reviewYourScanHeading = this.locator('h4:has-text("Review your Scan")');

    this.scanTypeMRI = this.page.locator('.encounters-container > li').nth(2);

    this.selectScan = this.locator(".encounter-card.__active");
    this.selectScanText = this.locator("div[class='encounter-card __active'] p[class='encounter-title h4']");
    this.selectScanContinueButton = this.locator('#buttons-container').locator('button').last();
    this.cancelScanCancelButton = this.locator('#buttons-container').locator('button').first();

    //Schedule your scan
    this.scheduleYourScanHeading = this.locator('h4:has-text("Schedule your scan")');
    //control that opens the multiselect dropdown
    this.stateDropdownControl = this.page.locator('.multiselect__tags');
    this.stateOption = (stateName) => this.page.getByRole('option', { name: stateName });

    this.selectLocation = this.page.locator('.location-cards').locator('.location-card').nth(1);
    //Calendar right arrow selection
    this.datePicker = this.page.locator('.datepicker');
    this.nextMonth = this.page.locator('.arrows').locator('button').last();
    this.enabledDay = this.page.locator(
      '.vuecal__cell:not(.vuecal__cell--disabled):not(.vuecal__cell--before-min):not(.vuecal__cell--out-of-scope)'
    );
    this.enabledSlot = this.page.locator('.appointments__individual-appointment:visible').first();
    //schedule page continue
    this.scheduleContinueButton = this.page.locator('.submitTrigger').locator('button');

    //Reserve your appointment
    this.reserveAppointmentHeading = this.locator('h4:has-text("Reserve your appointment")');

    this.totalPrice = page.locator('.pricing-detail .__total .h4');

    //Card payment details
    this.cardFrame = this.page.frameLocator('iframe[src*="elements-inner-payment"]');
    this.cardNumberInput = this.cardFrame.locator('#Field-numberInput');
    this.cardExpiryDateInput = this.cardFrame.locator('#Field-expiryInput');
    this.cardSecurityCodeInput = this.cardFrame.locator('#Field-cvcInput');
    this.cardZipCodeInput = this.cardFrame.locator('#Field-postalCodeInput');

    //card payment error messages
    this.cardNumberError = this.cardFrame.locator('#Field-numberError');
    this.cardExpiryDateError = this.cardFrame.locator('#Field-expiryError');
    this.cardSecurityCodeError = this.cardFrame.locator('#Field-cvcError');
    this.cardZipCodeError = this.cardFrame.locator('#Field-postalCodeError');

    this.appointmentConfirmationHeading = this.locator('h4:has-text("You\'re almost done, ")');
  }

  async navigate() {
    await this.goto('');
    await this.waitForVisible(this.bookAScanButton);
  }

  async enterDOB(dateString) {
    await this.page.waitForTimeout(1000);
    await this.dobInput.fill('');
    await this.dobInput.fill(dateString);
    await this.dobInput.blur();
  }


  async selectSexAtBirth(value) {
    await this.sexDropdown.click();
    await this.sexOption(value).click();
  }

  async selectSex(sex) {
    await this.sexDropdown.click();
    await this.sexOptionSelection.filter({ hasText: sex }).first().click();
  }

  async selectAScan() {
    await this.reviewYourScanHeading.click();
  }

  async scheduleAScan() {
    await this.scheduleYourScanHeading.click();
  }

  async selectState(stateName) {
    await this.stateDropdownControl.click();
    await this.stateOption(stateName).click();
    await this.page.waitForTimeout(1000);
  }

  async clickContinue() {
    await this.selectScanContinueButton.click();
  }

  async selectNearestLocation() {
    await this.selectLocation.click({ force: true });
    await this.page.waitForTimeout(1000);
    await this.page.evaluate(async () => {
      await new Promise(resolve => {
        const distance = 400;
        const timer = setInterval(() => {
          const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
          window.scrollBy(0, distance);

          if (scrollTop + clientHeight >= scrollHeight) {
            clearInterval(timer);
            resolve(true);
          }
        }, 150);
      });
    });
  }

  async selectDateTime() {
    await this.page.waitForTimeout(1000);
    await this.nextMonth.click();
    await this.page.waitForTimeout(500);
    await this.nextMonth.click();
    await this.page.waitForTimeout(500);
    await this.enabledDay.first().click();

    //Select time
    await this.enabledSlot.click();

  }

  async clickScheduleContinue() {
    await this.page.waitForTimeout(500);
    await this.scheduleContinueButton.click();
    await this.page.waitForTimeout(500);
  }

  async enterCardNumber(number) {
    await this.cardNumberInput.fill(number);
  }

  async enterExpiryDate(expiry) {
    await this.cardExpiryDateInput.fill(expiry);
  }

  async enterCvcCode(cvc) {
    await this.cardSecurityCodeInput.fill(cvc);
  }

  async enterZip(zip) {
    await this.cardZipCodeInput.fill(zip);
  }

  async getScanTypeMRIPrice() {
    const text = await this.scanTypeMRI.innerText();
    return text.match(/[\d,.]+/)[0];
  }

  async getTotalPrice() {
    const text = await this.totalPrice.innerText();
    return text.match(/[\d,.]+/)[0];
  }


}

module.exports = BookScanPage;