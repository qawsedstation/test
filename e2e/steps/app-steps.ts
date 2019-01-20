import { expect } from 'chai';
import { AppPage } from './app.po';
import { Given, When, Then, Before, After } from 'cucumber';
import { browser } from 'protractor';


let app: AppPage;

Before(() => {
  app = new AppPage();
});


Given('I am on the payment page',
  () => app.navigateTo());

Then('I should see some the the product details that I\'m going to buy',
  () => app.getProductDetails()
    .then(elems => expect(elems.length).to.be.greaterThan(0)));

Then('I should see some the payment page',
  () => app.getPaymentDetails()
    .then(elems => expect(elems.length).to.be.greaterThan(0)));

When('I type {string} into the card number input field',
  (string: string) => app.enterCardInput(string));

When('I type {string} into the cardholder input field',
  (string: string) => app.enterCardHolderNameInput(string));

When('I type {string} into the month input field',
  (string: string) => app.enterMonthInput(string));

When('I type {string} into the year input field',
  (string: string) => app.enterYearInput(string));

When('I type {string} into the cvv input field',
  (string: string) => app.enterCVVInput(string));

Then('I click into the payment button',
  () => app.clickPaymentButton());

Then('I should see the spinner', () => app.getSpinner()
  .then(elems => expect(elems.length).to.be.greaterThan(0)));

Then('I should see that the page is Authorized', () => app.getAuthorized()
  .then(elems => expect(elems.length).to.be.greaterThan(0)));

Then('I click into the cancel button', () => app.clickCancelButton());

Then('I can confirm that the payment is cancelled', () => app.getCancelConfirmation()
  .then(elems => expect(elems.length).to.be.greaterThan(0)));

