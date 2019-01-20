import { platformBrowserDynamicTesting, BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MatButtonModule } from '@angular/material/button';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFormComponent } from './payment-form.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PaymentFormComponent', () => {
  let component: PaymentFormComponent;
  let fixture: ComponentFixture<PaymentFormComponent>;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule,
      platformBrowserDynamicTesting());

    TestBed.configureTestingModule({
      imports: [
        MatInputModule,
        FormsModule,
        MatButtonModule,
        BrowserAnimationsModule
      ],
      declarations: [PaymentFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentFormComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create the payment form component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title that idndicate that is a payment form', () => {
    expect(component).toBeTruthy();
    const title = element.querySelector('h1');
    expect(title.textContent).toEqual('PAYMENT');
  });

  it('should have a card-holder input set to empty', () => {
    expect(component).toBeTruthy();
    const cardHolder = element.querySelector('.card-holder');
    expect(cardHolder.textContent).toEqual('');
  });

  it('should have a card month expiry date input set to empty', () => {
    expect(component).toBeTruthy();
    const month = element.querySelector('.month');
    expect(month.textContent).toEqual('');
  });

  it('should have a card year expiry date input set to empty', () => {
    expect(component).toBeTruthy();
    const year = element.querySelector('.year');
    expect(year.textContent).toEqual('');
  });

  it('should have a card cvv input set to empty', () => {
    expect(component).toBeTruthy();
    const cvv = element.querySelector('.cvv');
    expect(cvv.textContent).toEqual('');
  });

  it('should have a Button with caption "Pay Now"', () => {
    expect(component).toBeTruthy();
    const cardNumber = element.querySelector('.pay-button');
    expect(cardNumber.textContent).toEqual('Pay Now');
  });
});
