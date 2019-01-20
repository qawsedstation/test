import { LoadCancelPayment } from './actions/cancel-payment.actions';
import { CancelPaymentRequest } from './cancel-payment.request';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { CancelPaymentComponent } from './cancel-payment.component';
const mockCancelPaymentResponse = require('./mocks/cancel-payment.mocks.json');
const mockAuthorizePaymentResponse = require('../authorize-payment/mocks/authorize-payment.mocks.json');

describe('Cancell Payment Component', () => {
  let component: CancelPaymentComponent;
  let fixture: ComponentFixture<CancelPaymentComponent>;
  let store: Store<any>;
  let element: HTMLElement;
  let dispatchSpy;
  const cancelPaymentRequest: CancelPaymentRequest = {
    cancelLink: 'http://localhost:3003/payments/authorizations/cancellations/eyJrIjoiazNhYjYzMiJ9'
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [CancelPaymentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelPaymentComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    element = fixture.nativeElement;
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();


    fixture.detectChanges();
  });

  it('should create the cancell payment component', () => {
    expect(component).toBeTruthy();
  });


  it('should show the cancel payment button if not pressed yet', () => {
    component.authorizePayment = { loading: false, error: null };

    fixture.detectChanges();
    const cancelButton = element.querySelector('.cancel-payment-button');
    expect(cancelButton).not.toBeNull();
  });

  it('should not show the cancel payment button if is already cancelled', () => {
    component.cancelPayment = { loading: false, error: null, data: mockCancelPaymentResponse };

    fixture.detectChanges();
    const cancelButton = element.querySelector('.cancel-payment-button');
    expect(cancelButton).toBeNull();
  });

  it('should confirm that the payment is canceled with a message', () => {
    component.cancelPayment = { loading: false, error: null, data: mockCancelPaymentResponse };

    fixture.detectChanges();
    const cancelMessage = element.querySelector('.cancel-title');
    expect(cancelMessage.textContent).toBe('The payment is cancelled');
  });

  it('not be able to call the cancel request api when the user click into cancel Button and link is empty', () => {

    component.cancelPaymentRequest = cancelPaymentRequest;

    component.cancelPaymentButton();
    expect(dispatchSpy).toHaveBeenCalledTimes(0);
  });

  it('calls the cancel request api when the user click into cancel Button', () => {

    component.cancelPaymentRequest = cancelPaymentRequest;
    component.authorizePayment = { loading: false, error: null, data: mockAuthorizePaymentResponse };
    fixture.detectChanges();


    component.cancelPaymentButton();
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      new LoadCancelPayment(cancelPaymentRequest)
    );
  });
});
