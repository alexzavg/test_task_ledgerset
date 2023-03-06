const { Given, When, Then, And } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given('The User logged in to the system', async function() {
  await this.openUrl('https://www.i.ua/');
  await this.signIn('test123a', 'test123a1');
});