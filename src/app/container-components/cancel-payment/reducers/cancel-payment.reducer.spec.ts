import { LoadCancelPaymentSuccess, LoadCancelPaymentFail } from '../actions/cancel-payment.actions';
import { reducer, initialState } from './cancel-payment.reducer';
import { LoadCancelPayment } from '../actions/cancel-payment.actions';
import { CancelPaymentResponse } from '../cancel-payment.response';
import { HttpErrorResponse } from '@angular/common/http';
import { CancelPaymentRequest } from '../cancel-payment.request';

const mockCancelPaymentResponse  = require('./../mocks/cancel-payment.mocks.json');


describe('CancelPayment Reducer', () => {
  it('should return the initial state', () => {
    const action = {} as any;

    const result = reducer(initialState, action);
    expect(result).toBe(initialState);
  });


  it('starting the http request after LoadCancelPayment action', () => {
    const cancelPaymentRequest: CancelPaymentRequest = {
      cancelLink: 'http://localhost:3003/payments/authorizations/cancellations/eyJrIjoiazNhYjYzMiJ9'
    };

    const result = reducer(initialState, new LoadCancelPayment(cancelPaymentRequest));
    expect(result.loading).toBe(true);
    expect(result.data).toBeNull();
    expect(result.error).toBeNull();
  });

  it('loads the data after LoadCancelPaymentSuccess action', () => {
    const result = reducer(initialState, new LoadCancelPaymentSuccess(mockCancelPaymentResponse));
    expect(result.loading).toBe(false);
    expect(result.data).toEqual(mockCancelPaymentResponse);
    expect(result.error).toBeNull();
  });


  it('shows an error when LoadCancelPaymentFail action triggered', () => {
    const error = new HttpErrorResponse({ error: 'error message' });

    const result = reducer(initialState, new LoadCancelPaymentFail(error));
    expect(result.loading).toBe(false);
    expect(result.data).toBeNull();
    expect(result.error).toBe(error);
  });

});



