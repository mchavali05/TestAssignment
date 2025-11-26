const BasePage = require('./base.page');
 
class LoginPage extends BasePage {
  constructor(page, expect) {
    super(page, expect);
    this.emailInput = this.locator("#email");
    this.passwordInput = this.locator("#password");
    this.submitButton = this.page.getByRole('button', { name: 'Submit'});
    this.errorMessage = this.locator(".toast");
    this.acceptCookiesButton = this.locator('[data-tid="banner-accept"]');
  }
 
  async navigate() {
    await this.goto('/login');
    await this.acceptCookiesButton.click();
    await this.waitForVisible(".sign-in-form");
  }
 
  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
 
  async assertErrorMessage(text) {
    await this.expect(this.errorMessage).toBeVisible();
    await this.expect(this.errorMessage).toHaveText(text);
  }
}
 
module.exports = LoginPage;