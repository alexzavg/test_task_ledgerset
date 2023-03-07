const { setWorldConstructor, setDefaultTimeout } = require('@cucumber/cucumber');
const playwright = require('playwright');

class CustomWorld {

  constructor() {
    this.page = null;
  };

  async openUrl(url) {
    const browser = await playwright.chromium.launch({
      channel: 'chrome',
      headless: false,
      slowMo: 250,
      args: [
        '--start-maximized',
        '--disable-extensions',
        '--incognito',
        '--no-sandbox',
        '--test-type=browser',
        '--disable-dev-shm-usage',
      ],
    });

    const context = await browser.newContext();
    this.page = await context.newPage();
    await this.page.goto(url);
  };

  async signIn(email, password) {
    await this.page.fill('[name="login"]', email);
    await this.page.fill('[name="pass"]', password);
    await this.page.click('[value="Увійти"]');
  };

  async waitForPartialUrl(url, options) {
    const pattern = new RegExp(url);
    await this.page.waitForURL(pattern, options);
  };

  async waitForMenuCategory(categoryName) {
    await this.page.waitForSelector(`.list_underlined >> text=${categoryName}`);
  };

  async clickMenuItem(itemName) {
    await this.page.click(`.sn_menu_item >> text=${itemName}`);
  };

  async selectedMenuItem(itemName) {
    await this.page.waitForSelector(`.sn_menu_item._current >> text=${itemName}`);
  };

  async composeEmail(recipientEmail, subject, body) {
    await this.page.fill('[name="subject"]', subject);
    await this.page.fill('#to', recipientEmail);
    await this.page.fill('[name="body"]', body);
  };

  async sendEmail(buttonText) {
    await this.page.click(`.send_container.clear >> text=${buttonText}`);
  };

  async checkEmailSentMessage(text) {
    await this.page.waitForSelector(`text=${text}`);
  };

  async selectMailCategory(categoryName) {
    await this.page.click(`.list_underlined >> text=${categoryName}`);
  };

  async waitForEmailInList(text) {
    await this.page.waitForSelector(`#mesgList >> text=${text}`);
  };

};

setDefaultTimeout(30 * 1000);

setWorldConstructor(CustomWorld);
