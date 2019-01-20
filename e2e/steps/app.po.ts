import { browser, by, element, until } from 'protractor';

export class AppPage {

  public navigateTo() {
    return browser.get('/');
  }

  public enterCardInput(text: string) {
    return element(by.id('mat-input-0'))
      .sendKeys(text);
  }

  public enterCVVInput(text: string) {
    return element(by.id('mat-input-4'))
      .sendKeys(text);
  }

  public enterMonthInput(text: string) {
    return element(by.id('mat-input-3'))
      .sendKeys(text);
  }

  public enterYearInput(text: string) {
    return element(by.id('mat-input-2'))
      .sendKeys(text);
  }

  public enterCardHolderNameInput(text: string) {
    return element(by.id('mat-input-1'))
      .sendKeys(text);
  }

  public clickPaymentButton() {
    return element(by.css('.mat-raised-button'))
      .click();
  }


  public clickCancelButton() {
    return element(by.css('.mat-raised-button'))
      .click();
  }

  public getProductDetails() {
    const condition = until.elementsLocated(by.css('.mat-card-title'));

    return browser.wait(condition, 5000);
  }

  public getPaymentDetails() {
    const condition = until.elementsLocated(by.css('.month-input'));

    return browser.wait(condition, 5000);
  }

  public getSpinner() {
    const condition = until.elementsLocated(by.css('.spinner'));
    return browser.wait(condition, 5000);
  }

  public getAuthorized() {
    const condition = until.elementsLocated(by.css('.authorized'));
    return browser.wait(condition, 5000);
  }

  public getCancelConfirmation() {
    const condition = until.elementsLocated(by.css('.cancel-title'));
    return browser.wait(condition, 5000);
  }

}
