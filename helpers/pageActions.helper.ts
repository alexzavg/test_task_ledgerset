import { Page, expect, test } from "@playwright/test";

export class PageActionsHelper {

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  };

  async openUrl(url: string) {
    test.step(`Navigate to URL: '${url}'`, async () => {
      await this.page.goto(url);
    });
  };

  async refreshPage() {
    test.step(`Refresh page`, async () => {
      await this.page.reload();
      await this.page.waitForLoadState('load');
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(1000);
    });
  };

  async waitForUrl(url: string) {
    test.step(`Wait until page URL is: '${url}'`, async () => {
      await this.page.waitForURL(url);
      await this.page.waitForLoadState('load');
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(500);
    });
  };

  async waitForElement(locator: string) {
    test.step(`Wait until element: '${locator}' is visible`, async () => {
      await this.page.waitForSelector(locator);
    });
  };

  async waitForElementInvisible(locator: string) {
    test.step(`Wait until element: '${locator}' is invisible`, async () => {
      await expect(this.page.locator(locator)).not.toBeVisible();
    });
  };

  async waitForElementEnabled(locator: string) {
    test.step(`Wait until element: '${locator}' doesn't have "disabled" attribute`, async () => {
      await expect(this.page.locator(locator)).toBeEnabled();
    });
  };

  async waitForElementEditable(locator: string) {
    test.step(`Wait until element: '${locator}' doesn't have "readonly" property`, async () => {
      await expect(this.page.locator(locator)).toBeEditable();
    });
  };

  async clickElement(locator: string) {
    test.step(`Click element locator: '${locator}'`, async () => {
      await this.page.locator(locator).click();
    });
  };

  async clickElementForce(locator: string) {
    test.step(`Click element locator: '${locator}'`, async () => {
      await this.page.locator(locator).click({
        button: 'middle',
        clickCount: 10,
        delay: 250
      });
    });
  };

  async fillElement(locator: string, text: string) {
    test.step(`Fill element locator: '${locator}' with text: '${text}'`, async () => {
      const selector = this.page.locator(locator);
      await selector.fill(''); // clear field
      await selector.fill(text);
    });
  };

  async pressKey(key: string) {
     test.step(`Press '${key}' key`, async () => {
      await this.page.keyboard.press(key);
    });
  };

  async checkElementAttribute(locator: string, attr: string, value: string) {
    test.step(`Get attribute: '${attr}' from element: '${locator}'`, async () => {
      const selector = this.page.locator(locator);
      const attribute = await selector.getAttribute(attr);
      await expect(attribute).toEqual(value);
    });
  };

  async waitForElementAttribute(locator: string, attr: string, value: string, timeout = 60000) {
    test.step(`Check element '${locator}' for attribute '${attr}'`, async () => {
      const interval = 500;
      let elapsedTime = 0;
      while (elapsedTime < timeout) {
          console.log(`Checking element '${locator}' for attribute '${attr}'`);
          try {
              const selector = this.page.locator(locator);
              const attribute = await selector.getAttribute(attr);
              await expect(attribute).toEqual(value);
              return;
          } catch (error) {
              await new Promise(resolve => setTimeout(resolve, interval));
              elapsedTime += interval;
          }
      }
      throw new Error(`Timeout of ${timeout}ms reached while waiting for attribute '${attr}' with value '${value}' on element '${locator}'`);
    });
  };

  async checkElementText(locator: string, text: string) {
    test.step(`Check text from element with locator: '${locator}'`, async () => {
      const selector = this.page.locator(locator);
      const textValue = await selector.textContent();
      await expect(textValue).toEqual(text);
    });
  };

  async getElementText(locator: string) {
    let text;
    test.step(`Get text from element with locator: '${locator}'`, async () => {
      const selector = this.page.locator(locator);
      text = await selector.textContent();
    });
    return text as string;
  };

};