const BasePage = require('./base.page');

class SignUpPage extends BasePage {
  constructor(page, expect) {
    super(page, expect);
    this.signUpText = this.page.getByText('or sign up with your email');
    this.firstNameInput = this.locator('#firstName');
    this.lastNameInput = this.locator('#lastName');
    this.emailInput = this.locator('#email');
    this.phoneNumberInput = this.locator('#phoneNumber');
    this.passwordInput = this.locator('#password');
    this.acceptCookiesButton = this.locator('[data-tid="banner-accept"]');
    this.termsOfUseCheckbox = this.locator('button.checkbox:has-text("I agree to Ezra\'s")');
    this.termsCloseLink = this.page.getByRole('link', { name: 'Close' });
    this.submitButton = this.page.getByRole('button', { name: 'Submit' });

    //home page
    this.appointmentsText = this.locator('.section-header').first();
        
  }

  async navigate() {
    await this.goto('/join');
    await this.acceptCookiesButton.click();
  }

}

module.exports = SignUpPage;