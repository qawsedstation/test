import { LoadCancelPayment, CancelPaymentActionTypes } from '../actions/cancel-payment.actions';
import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, ReplaySubject, throwError } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';
import { Actions } from '@ngrx/effects';

import { CancelPaymentEffects } from './cancel-payment.effects';
import { CancelPaymentService } from '../services/cancel-payment.service';
import { CancelPaymentResponse } from '../cancel-payment.response';
import { CancelPaymentRequest } from '../cancel-payment.request';

import { HttpErrorResponse } from '@angular/common/http';

const mockCancelPaymentResponse = require('./../mocks/cancel-payment.mocks.json');


describe('CustomerEffects', () => {
  // tslint:disable-next-line:prefer-const
  let actions$: Observable<any>;
  let effects: CancelPaymentEffects;
  let cancelPaymentService: any;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CancelPaymentEffects,
        provideMockActions(() => actions$),
        {
          provide: CancelPaymentService,
          useValue: jasmine.createSpyObj('customerService', ['loadCancelPayment'])
        }
      ]
    });

    effects = TestBed.get(CancelPaymentEffects);
    cancelPaymentService = TestBed.get(CancelPaymentService);

  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should return a LoadCancelPaymentSuccess action, on success', function () {
    const payload: CancelPaymentResponse = mockCancelPaymentResponse;

    cancelPaymentService.loadCancelPayment.and.returnValue(of(payload));
    const cancelPaymentRequest: CancelPaymentRequest = {
      cancelLink: 'http://localhost:3003/payments/authorizations/cancellations/eyJrIjoiazNhYjYzMiJ9'
    };

    const actions: Observable<any> = cold('a', { a: new LoadCancelPayment(cancelPaymentRequest) });
    effects = new CancelPaymentEffects(new Actions(actions), cancelPaymentService);
    const expected = cold('b', {
      b:
        { type: CancelPaymentActionTypes.LoadCancelPaymentSuccess, payload: payload }
    });

    expect(effects.loadCancelPayment$).toBeObservable(expected);
  });

  it('should return a LoadCancelPaymentFail action, on failure', function () {
    const errorResponse: HttpErrorResponse = new HttpErrorResponse({ error: 'Error thrown' });
    const cancelPaymentRequest: CancelPaymentRequest = {
      cancelLink: 'http://localhost:3003/payments/authorizations/cancellations/eyJrIjoiazNhYjYzMiJ9'
    };

    cancelPaymentService.loadCancelPayment.and.returnValue(throwError(errorResponse));

    const actions: Observable<any> = cold('a', { a: new LoadCancelPayment(cancelPaymentRequest) });
    effects = new CancelPaymentEffects(new Actions(actions), cancelPaymentService);
    const expected = cold('b', {
      b:
        { type: CancelPaymentActionTypes.LoadCancelPaymentFail, error: errorResponse }
    });

    expect(effects.loadCancelPayment$).toBeObservable(expected);
  });

});
