const BasePage = require('./base.page');
 
class HomePage extends BasePage {
  constructor(page, expect) {
    super(page, expect);
    this.appointmentsText = this.locator(".section-header").first();
  }
}
 
module.exports = HomePage;