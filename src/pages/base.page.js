class BasePage {
  constructor(page, expect) {
    this.page = page;
    this.expect = expect;
  }
 
  async goto(path) {
    const base = this.page.context()._options.baseURL;
    const url = base ? new URL(path, base).toString() : path;
    await this.page.goto(url);
  }
 
  locator(selector) {
    return this.page.locator(selector);
  }
 
  async waitForUrl(regex) {
    await this.expect(this.page).toHaveURL(regex);
  }
 
  async waitForVisible(selector) {
    await this.expect(this.locator(selector)).toBeVisible();
  }
 
  async getTitle() {
    return this.page.title();
  }

}
 
module.exports = BasePage;