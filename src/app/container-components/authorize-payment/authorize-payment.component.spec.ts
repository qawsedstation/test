import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AuthorizePaymentComponent } from './authorize-payment.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadAuthorizePayment } from './actions/authorize-payment.actions';
import { AuthorizePaymentRequest } from './authorize-payment.request';
import { ProductComponent } from 'src/app/shared-components/product/product.component';
import { PaymentFormComponent } from 'src/app/shared-components/payment-form/payment-form.component';
import { CancelPaymentComponent } from '../cancel-payment/cancel-payment.component';
const mockAuthorizePaymentResponse = require('./mocks/authorize-payment.mocks.json');

describe('Authorize Payment Page', () => {
  let component: AuthorizePaymentComponent;
  let fixture: ComponentFixture<AuthorizePaymentComponent>;
  let store: Store<any>;
  let dispatchSpy;
  let element: HTMLElement;

  const authorizePaymentRequest: AuthorizePaymentRequest = {
    'transactionReference': 'your-transaction-reference',
    'instruction': {
      'description': 'book', 'value': { 'currency': 'GBP', 'amount': 789 },
      'paymentInstrument': {
        'cvc': '666', 'type': 'card/plain', 'cardNumber': '4444333322221111', 'cardHolderName': 'John Appleseed',
        'cardExpiryDate': { 'month': 7, 'year': 2099 }
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}),
        MatInputModule,
        FormsModule,
        MatCardModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule],
      declarations: [AuthorizePaymentComponent, ProductComponent, PaymentFormComponent, CancelPaymentComponent],
    }).overrideComponent(CancelPaymentComponent, {
      set: {
        selector: 'worldpay-cancel-payment',
        template: `<div id="mock-cancel-button">Mock Cancel Payment Component</div>`
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizePaymentComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    store = TestBed.get(Store);


    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the product details already from another screen', () => {
    expect(component.product.description).toBeDefined();
    expect(component.product.value.amount).toBeDefined();
    expect(component.product.value.currency).toBeDefined();
  });


  it('calls the payment request api when the user click pay now button', () => {

    component.authorizePaymentRequest = authorizePaymentRequest;

    component.payClicked({
      'cvc': '666', 'type': 'card/plain', 'cardNumber': '4444333322221111', 'cardHolderName': 'John Appleseed',
      'cardExpiryDate': { 'month': 7, 'year': 2099 }
    });
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      new LoadAuthorizePayment(authorizePaymentRequest)
    );
  });


  it('should not show the spinner when you land to the screen', () => {
    component.authorizePayment = { loading: false, error: null };
    fixture.detectChanges();
    const spinner = element.querySelector('.spinner');
    expect(spinner).toBeNull();
  });

  it('should show the spinner when the request is loading', () => {
    component.authorizePayment = { loading: true, error: null };
    fixture.detectChanges();
    const spinner = element.querySelector('.spinner');
    expect(spinner).not.toBeNull();
  });

  it('should show the authorized page and the cancell button when the outcome is returning as "Authorized"', () => {
    component.authorizePayment = { loading: false, error: null, data : mockAuthorizePaymentResponse };

    fixture.detectChanges();
    const mockCancelButton = element.querySelector('#mock-cancel-button');
    expect(mockCancelButton).not.toBeNull();
  });

});
