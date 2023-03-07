const { Given, When, Then } = require("@cucumber/cucumber");
const { urls, credentials, pageText } = require("../../data/mailData");
const mailSubject = `alex_autotest_${new Date().getTime()}`;

Given('The User logged in to the system', async function() {
  await this.openUrl(urls.base);
  await this.signIn(credentials.admin.login, credentials.admin.password);
});

Given('The User navigated to the Postal Service page', async function() {
  await this.waitForPartialUrl(urls.postalService);
});

Then('The menu options are available: {string}', async function(emailCategories) {
  const array = emailCategories.split(', ');
  for (const category of array) {
    await this.waitForMenuCategory(category);
  };
});

When('The User click on the {string} link', async function(headerMenuCategory) {
  await this.clickMenuItem(headerMenuCategory);
});

Then('The {string} page is displayed properly', async function(headerMenuCategory) {
  await this.waitForPartialUrl(urls.compose);
  await this.selectedMenuItem(headerMenuCategory);
});

When('The User fills all required information for the letter', async function() {
  await this.composeEmail(credentials.admin.email, mailSubject, mailSubject);
});

When('The User clicks {string}', async function(buttonText) {
  await this.sendEmail(buttonText);
});

Then('The email is successfully sent', async function() {
  await this.checkEmailSentMessage(pageText.emailSentSuccess);
  await this.selectMailCategory(pageText.inbox);
  await this.waitForEmailInList(mailSubject); 
});
