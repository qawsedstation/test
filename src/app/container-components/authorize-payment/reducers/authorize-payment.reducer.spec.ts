import { LoadAuthorizePaymentSuccess, LoadAuthorizePaymentFail } from '../actions/authorize-payment.actions';
import { reducer, initialState } from './authorize-payment.reducer';
import { LoadAuthorizePayment } from '../actions/authorize-payment.actions';
import { AuthorizePaymentResponse } from '../authorize-payment.response';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthorizePaymentRequest } from '../authorize-payment.request';

const mockAuthorizePaymentResponse = require('./../mocks/authorize-payment.mocks.json');


describe('AuthorizePayment Reducer', () => {
  it('should return the initial state', () => {
    const action = {} as any;

    const result = reducer(initialState, action);
    expect(result).toBe(initialState);
  });


  it('starting the http request after LoadAuthorizePayment action', () => {
    const authorizePaymentRequest: AuthorizePaymentRequest = {
      'transactionReference': 'your-transaction-reference', 'instruction':
      {
        'description': 'book', 'value': { 'currency': 'GBP', 'amount': 789 },
        'paymentInstrument':
        {
          'cvc': '666', 'type': 'card/plain', 'cardNumber': '4444333322221111', 'cardHolderName': 'John Appleseed',
          'cardExpiryDate': { 'month': 7, 'year': 2099 }
        }
      }
    };

    const result = reducer(initialState, new LoadAuthorizePayment(authorizePaymentRequest));
    expect(result.loading).toBe(true);
    expect(result.data).toBeNull();
    expect(result.error).toBeNull();
  });

  it('loads the data after LoadAuthorizePaymentSuccess action', () => {
    const result = reducer(initialState, new LoadAuthorizePaymentSuccess(mockAuthorizePaymentResponse));
    expect(result.loading).toBe(false);
    expect(result.data).toEqual(mockAuthorizePaymentResponse);
    expect(result.error).toBeNull();
  });


  it('shows an error when LoadAuthorizePaymentFail action triggered', () => {
    const error = new HttpErrorResponse({ error: 'error message' });

    const result = reducer(initialState, new LoadAuthorizePaymentFail(error));
    expect(result.loading).toBe(false);
    expect(result.data).toBeNull();
    expect(result.error).toBe(error);
  });

});



