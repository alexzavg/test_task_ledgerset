const { setWorldConstructor, setDefaultTimeout, BeforeAll, AfterAll } = require('@cucumber/cucumber');
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
    await this.page.waitForTimeout(5000);
  };

};

setDefaultTimeout(30 * 1000);

setWorldConstructor(CustomWorld);
