const { Given, When, Then } = require("@cucumber/cucumber");
const mailSubject = `alex_autotest_${new Date().getTime()}`;

Given('The User logged in to the system', async function() {
  await this.openUrl('https://www.i.ua');
  await this.signIn('test123a', 'test123a1');
});

Given('The User navigated to the Postal Service page', async function() {
  await this.waitForPartialUrl('https://mbox2.i.ua');
});

Then('The menu options are available: {string}', async function(string) {
  const array = string.split(', ');
  for (const category of array) {
    await this.waitForMenuCategory(category);
  };
});

When('The User click on the {string} link', async function(string) {
  await this.clickMenuItem(string);
});

Then('The {string} page is displayed properly', async function(string) {
  await this.waitForPartialUrl('https://mbox2.i.ua/compose');
  await this.selectedMenuItem(string);
});

When('The User fills all required information for the letter', async function() {
  await this.composeEmail('test123a@i.ua', mailSubject, mailSubject);
});

When('The User clicks {string}', async function(string) {
  await this.sendEmail(string);
});

Then('The email is successfully sent', async function() {
  await this.checkEmailSentMessage('Лист успішно відправлено адресатам');
  await this.selectMailCategory('Вхідні');
  await this.waitForEmailInList(mailSubject);
});
